import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import type {
  AppState,
  QuestionProgress,
  QuizAttempt,
  Preferences,
  Streak,
} from "../types";
import { todayKey, daysBetween } from "./utils";
import {
  CLOUD_ENABLED,
  pullCloud,
  pushCloud,
  signInGoogle,
  signOutGoogle,
  watchAuth,
  type CloudData,
  type CloudUser,
} from "./cloud";

const STORAGE_KEY = "recall-arena:v1";

const defaultPrefs: Preferences = {
  secondsPerQuestion: 45,
  defaultCount: 10,
  shuffle: true,
  showTimer: true,
  pageSize: 10,
  fancyCursor: true,
};

const defaultStreak: Streak = {
  current: 0,
  longest: 0,
  lastStudyDay: null,
  days: [],
};

function initialState(): AppState {
  const prefersDark =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  return {
    theme: prefersDark ? "dark" : "light",
    progress: {},
    history: [],
    streak: { ...defaultStreak },
    prefs: { ...defaultPrefs },
  };
}

function load(): AppState {
  if (typeof window === "undefined") return initialState();
  try {
    const rawStr = window.localStorage.getItem(STORAGE_KEY);
    if (!rawStr) return initialState();
    const parsed = JSON.parse(rawStr) as Partial<AppState>;
    const base = initialState();
    return {
      theme: parsed.theme ?? base.theme,
      progress: parsed.progress ?? {},
      history: parsed.history ?? [],
      streak: { ...defaultStreak, ...(parsed.streak ?? {}) },
      prefs: { ...defaultPrefs, ...(parsed.prefs ?? {}) },
    };
  } catch {
    return initialState();
  }
}

/* ---------- cloud <-> local merge ---------- */
function mergeProgress(
  local: Record<string, QuestionProgress>,
  remote: Record<string, QuestionProgress>
): Record<string, QuestionProgress> {
  const out: Record<string, QuestionProgress> = { ...remote };
  for (const [id, lp] of Object.entries(local)) {
    const rp = out[id] ?? {};
    out[id] = {
      seen: lp.seen || rp.seen || undefined,
      mastered: lp.mastered || rp.mastered || undefined,
      bookmarked: lp.bookmarked || rp.bookmarked || undefined,
      lastKnown: lp.lastKnown !== undefined ? lp.lastKnown : rp.lastKnown,
    };
  }
  return out;
}

function mergeStates(local: AppState, remote: Partial<CloudData>): AppState {
  const history = [...(remote.history ?? []), ...local.history]
    .filter((h, i, arr) => arr.findIndex((x) => x.id === h.id) === i)
    .sort((a, b) => b.date - a.date)
    .slice(0, 100);
  const rs = remote.streak ?? defaultStreak;
  const days = Array.from(new Set([...(rs.days ?? []), ...local.streak.days]))
    .sort()
    .slice(-90);
  const lastStudyDay =
    [rs.lastStudyDay, local.streak.lastStudyDay].filter(Boolean).sort().pop() ?? null;
  return {
    theme: local.theme, // device-local
    progress: mergeProgress(local.progress, remote.progress ?? {}),
    history,
    streak: {
      current: Math.max(local.streak.current, rs.current ?? 0),
      longest: Math.max(local.streak.longest, rs.longest ?? 0),
      lastStudyDay,
      days,
    },
    prefs: { ...defaultPrefs, ...(remote.prefs ?? {}), ...local.prefs },
  };
}

export type SyncStatus = "disabled" | "signedout" | "syncing" | "synced" | "error";

interface AppContextValue extends AppState {
  toggleTheme: () => void;
  getProgress: (qid: string) => QuestionProgress;
  patchProgress: (qid: string, patch: Partial<QuestionProgress>) => void;
  toggleBookmark: (qid: string) => void;
  toggleMastered: (qid: string) => void;
  markSeen: (qid: string) => void;
  addAttempt: (a: QuizAttempt) => void;
  recordStudyToday: () => void;
  setPrefs: (patch: Partial<Preferences>) => void;
  resetProgress: () => void;
  clearHistory: () => void;
  bookmarkedIds: string[];
  masteredIds: string[];
  mistakeIds: string[];
  /* ---- cloud ---- */
  cloudEnabled: boolean;
  user: CloudUser | null;
  syncStatus: SyncStatus;
  lastSyncedAt: number | null;
  signIn: () => Promise<void>;
  signOutNow: () => Promise<void>;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(load);
  const [user, setUser] = useState<CloudUser | null>(null);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>(
    CLOUD_ENABLED ? "signedout" : "disabled"
  );
  const [lastSyncedAt, setLastSyncedAt] = useState<number | null>(null);
  const hydrating = useRef(false);
  const pushTimer = useRef<number | null>(null);

  /* Apply theme to <html> */
  useEffect(() => {
    const root = document.documentElement;
    if (state.theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [state.theme]);

  /* Fancy cursor class on <html> */
  useEffect(() => {
    const root = document.documentElement;
    if (state.prefs.fancyCursor) root.classList.add("fancy-cursor");
    else root.classList.remove("fancy-cursor");
  }, [state.prefs.fancyCursor]);

  /* Persist locally */
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore quota errors */
    }
  }, [state]);

  /* ---- auth watcher: on sign-in, pull + merge + push ---- */
  useEffect(() => {
    const unsub = watchAuth(async (u) => {
      setUser(u);
      if (!u) {
        if (CLOUD_ENABLED) setSyncStatus("signedout");
        return;
      }
      setSyncStatus("syncing");
      hydrating.current = true;
      try {
        const remote = await pullCloud(u.uid);
        let merged: AppState | null = null;
        setState((local) => {
          merged = remote ? mergeStates(local, remote) : local;
          return merged;
        });
        // push the merged result so this device's work lands in the cloud
        const snapshot = merged ?? state;
        await pushCloud(u.uid, {
          progress: snapshot.progress,
          history: snapshot.history,
          streak: snapshot.streak,
          prefs: snapshot.prefs,
        });
        setLastSyncedAt(Date.now());
        setSyncStatus("synced");
      } catch (e) {
        console.error("sync failed", e);
        setSyncStatus("error");
      } finally {
        hydrating.current = false;
      }
    });
    return unsub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---- debounced push on changes while signed in ---- */
  useEffect(() => {
    if (!user || hydrating.current) return;
    if (pushTimer.current) window.clearTimeout(pushTimer.current);
    pushTimer.current = window.setTimeout(async () => {
      try {
        setSyncStatus("syncing");
        await pushCloud(user.uid, {
          progress: state.progress,
          history: state.history,
          streak: state.streak,
          prefs: state.prefs,
        });
        setLastSyncedAt(Date.now());
        setSyncStatus("synced");
      } catch (e) {
        console.error("push failed", e);
        setSyncStatus("error");
      }
    }, 1500);
    return () => {
      if (pushTimer.current) window.clearTimeout(pushTimer.current);
    };
  }, [state.progress, state.history, state.streak, state.prefs, user]);

  const signIn = async () => {
    await signInGoogle();
  };
  const signOutNow = async () => {
    await signOutGoogle();
    setSyncStatus(CLOUD_ENABLED ? "signedout" : "disabled");
  };

  const toggleTheme = () =>
    setState((s) => ({ ...s, theme: s.theme === "dark" ? "light" : "dark" }));

  const getProgress = (qid: string): QuestionProgress =>
    state.progress[qid] ?? {};

  const patchProgress = (qid: string, patch: Partial<QuestionProgress>) =>
    setState((s) => ({
      ...s,
      progress: {
        ...s.progress,
        [qid]: { ...(s.progress[qid] ?? {}), ...patch },
      },
    }));

  const toggleBookmark = (qid: string) =>
    setState((s) => {
      const cur = s.progress[qid] ?? {};
      return {
        ...s,
        progress: {
          ...s.progress,
          [qid]: { ...cur, bookmarked: !cur.bookmarked },
        },
      };
    });

  const toggleMastered = (qid: string) =>
    setState((s) => {
      const cur = s.progress[qid] ?? {};
      return {
        ...s,
        progress: {
          ...s.progress,
          [qid]: { ...cur, mastered: !cur.mastered, seen: true },
        },
      };
    });

  const markSeen = (qid: string) =>
    setState((s) => {
      const cur = s.progress[qid] ?? {};
      if (cur.seen) return s;
      return {
        ...s,
        progress: { ...s.progress, [qid]: { ...cur, seen: true } },
      };
    });

  const recordStudyToday = () =>
    setState((s) => {
      const today = todayKey();
      if (s.streak.lastStudyDay === today) return s;
      let current = 1;
      if (s.streak.lastStudyDay) {
        const gap = daysBetween(s.streak.lastStudyDay, today);
        if (gap === 1) current = s.streak.current + 1;
        else if (gap === 0) current = s.streak.current;
      }
      const days = s.streak.days.includes(today)
        ? s.streak.days
        : [...s.streak.days, today].slice(-90);
      return {
        ...s,
        streak: {
          current,
          longest: Math.max(current, s.streak.longest),
          lastStudyDay: today,
          days,
        },
      };
    });

  const addAttempt = (a: QuizAttempt) => {
    setState((s) => {
      const progress = { ...s.progress };
      for (const r of a.results) {
        const cur = progress[r.qid] ?? {};
        progress[r.qid] = {
          ...cur,
          seen: true,
          lastKnown: r.known,
          mastered: cur.mastered || r.known,
        };
      }
      return {
        ...s,
        progress,
        history: [a, ...s.history].slice(0, 100),
      };
    });
    recordStudyToday();
  };

  const setPrefs = (patch: Partial<Preferences>) =>
    setState((s) => ({ ...s, prefs: { ...s.prefs, ...patch } }));

  const resetProgress = () => setState((s) => ({ ...s, progress: {} }));

  const clearHistory = () =>
    setState((s) => ({ ...s, history: [], streak: { ...defaultStreak } }));

  const bookmarkedIds = useMemo(
    () =>
      Object.entries(state.progress)
        .filter(([, p]) => p.bookmarked)
        .map(([id]) => id),
    [state.progress]
  );
  const masteredIds = useMemo(
    () =>
      Object.entries(state.progress)
        .filter(([, p]) => p.mastered)
        .map(([id]) => id),
    [state.progress]
  );
  const mistakeIds = useMemo(
    () =>
      Object.entries(state.progress)
        .filter(([, p]) => p.lastKnown === false && !p.mastered)
        .map(([id]) => id),
    [state.progress]
  );

  const value: AppContextValue = {
    ...state,
    toggleTheme,
    getProgress,
    patchProgress,
    toggleBookmark,
    toggleMastered,
    markSeen,
    addAttempt,
    recordStudyToday,
    setPrefs,
    resetProgress,
    clearHistory,
    bookmarkedIds,
    masteredIds,
    mistakeIds,
    cloudEnabled: CLOUD_ENABLED,
    user,
    syncStatus,
    lastSyncedAt,
    signIn,
    signOutNow,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
