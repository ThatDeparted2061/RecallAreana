import {
  createContext,
  useCallback,
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

const STORAGE_KEY = "recall-arena:v1";

const defaultPrefs: Preferences = {
  secondsPerQuestion: 45,
  defaultCount: 10,
  shuffle: true,
  showTimer: true,
  pageSize: 10,
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
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(load);
  const firstRender = useRef(true);

  // Apply theme to <html>
  useEffect(() => {
    const root = document.documentElement;
    if (state.theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [state.theme]);

  // Persist (skip nothing — debounced via microtask is unnecessary here)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore quota errors */
    }
  }, [state]);

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
      // also fold per-question results into progress
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

  const resetProgress = () =>
    setState((s) => ({ ...s, progress: {} }));

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
  // Mistakes: most recent quiz verdict was "didn't know" and not since mastered
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
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
