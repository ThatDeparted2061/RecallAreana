import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useApp } from "./lib/store";
import { authErrorMessage } from "./lib/cloud";
import Dashboard from "./pages/Dashboard";
import BlitzSetup from "./pages/BlitzSetup";
import BlitzPlay from "./pages/BlitzPlay";
import Practice from "./pages/Practice";
import PracticeSubject from "./pages/PracticeSubject";
import Review from "./pages/Review";
import Stats from "./pages/Stats";
import Settings from "./pages/Settings";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/blitz", label: "Blitz" },
  { to: "/practice", label: "Practice" },
  { to: "/review", label: "Review" },
  { to: "/stats", label: "Stats" },
  { to: "/settings", label: "Settings" },
];

/* ---------- custom dot cursor ---------- */
function CursorDot() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
      const t = e.target as HTMLElement | null;
      const interactive = t?.closest(
        "a, button, [role=button], input, select, textarea, label, summary"
      );
      el.classList.toggle("is-hover", Boolean(interactive));
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return <div id="cursor-dot" ref={ref} />;
}

function ThemeToggle() {
  const { theme, toggleTheme } = useApp();
  return (
    <button
      onClick={toggleTheme}
      title="Toggle theme"
      aria-label="Toggle theme"
      className="flex h-10 w-10 items-center justify-center border-2 border-ink bg-transparent text-base transition-colors hover:bg-ink hover:text-cream dark:border-cream dark:hover:bg-cream dark:hover:text-ink"
      style={{ borderRadius: 2 }}
    >
      {theme === "dark" ? "☀" : "●"}
    </button>
  );
}

function AuthButton() {
  const { cloudEnabled, user, signIn, signOutNow, syncStatus } = useApp();
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  if (!cloudEnabled) return null;

  if (!user) {
    return (
      <div className="relative">
        <button
          className="btn-primary !px-5 !py-2.5"
          disabled={busy}
          onClick={async () => {
            setBusy(true);
            setErr(null);
            try {
              await signIn();
            } catch (e) {
              console.error(e);
              setErr(authErrorMessage(e));
            } finally {
              setBusy(false);
            }
          }}
        >
          {busy ? "…" : "Sign in"}
        </button>
        {err && (
          <div className="card absolute right-0 top-14 z-50 w-72 p-4 !shadow-brutal">
            <div className="meta mb-1 text-bad">Sign-in failed</div>
            <p className="text-xs font-medium leading-relaxed">{err}</p>
            <button className="meta mt-2 underline underline-offset-4" onClick={() => setErr(null)}>
              Dismiss
            </button>
          </div>
        )}
      </div>
    );
  }

  const initial = (user.displayName ?? user.email ?? "?").charAt(0).toUpperCase();
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        title={user.email ?? ""}
        className="flex h-10 w-10 items-center justify-center overflow-hidden border-2 border-ink bg-mustard font-display text-sm text-ink dark:border-cream"
        style={{ borderRadius: 2 }}
      >
        {user.photoURL ? (
          <img src={user.photoURL} alt="" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
        ) : (
          initial
        )}
      </button>
      {open && (
        <div className="card absolute right-0 top-12 z-50 w-56 p-4 !shadow-brutal">
          <div className="meta truncate opacity-60">{user.email}</div>
          <div className="meta mt-1">
            {syncStatus === "synced" && "● Synced"}
            {syncStatus === "syncing" && "○ Syncing…"}
            {syncStatus === "error" && "✕ Sync error"}
            {syncStatus === "signedout" && "○ Offline"}
          </div>
          <button
            className="btn-ghost mt-3 w-full !px-4 !py-2"
            onClick={async () => {
              setOpen(false);
              await signOutNow();
            }}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}

function Logo() {
  return (
    <NavLink to="/" className="flex items-center gap-2.5">
      <span
        className="flex h-10 w-10 items-center justify-center border-2 border-ink bg-mustard font-display text-lg text-ink dark:border-cream"
        style={{ borderRadius: 2 }}
      >
        R
      </span>
      <span className="display hidden text-xl sm:block">
        Recall<span className="text-ink/40 dark:text-mustard">Arena</span>
      </span>
    </NavLink>
  );
}

export default function App() {
  const location = useLocation();
  const inQuiz = location.pathname.startsWith("/blitz/run");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex min-h-full flex-col">
      <CursorDot />

      {!inQuiz && (
        <header className="sticky top-0 z-40 border-b-2 border-ink bg-cream dark:border-cream dark:bg-ink">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
            <Logo />
            <nav className="hidden items-center md:flex">
              {NAV.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  end={n.to === "/"}
                  className={({ isActive }) =>
                    `px-3.5 py-2 text-[11px] font-bold uppercase tracking-meta transition-colors ${
                      isActive
                        ? "bg-ink text-cream dark:bg-mustard dark:text-ink"
                        : "text-ink/60 hover:text-ink dark:text-cream/60 dark:hover:text-cream"
                    }`
                  }
                  style={{ borderRadius: 2 }}
                >
                  {n.label}
                </NavLink>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <AuthButton />
              <ThemeToggle />
            </div>
          </div>
        </header>
      )}

      <main className={`mx-auto w-full max-w-6xl flex-1 px-4 sm:px-6 ${inQuiz ? "" : "py-8 pb-28 md:pb-14"}`}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/blitz" element={<BlitzSetup />} />
          <Route path="/blitz/run" element={<BlitzPlay />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/practice/:subjectId" element={<PracticeSubject />} />
          <Route path="/review" element={<Review />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </main>

      {!inQuiz && (
        <footer className="hidden border-t-2 border-ink py-4 dark:border-cream md:block">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
            <span className="meta opacity-50">RecallArena — Core CS Interview Prep</span>
            <span className="meta opacity-50">OS · CN · DBMS · OOP · LLD</span>
          </div>
        </footer>
      )}

      {/* Mobile bottom nav */}
      {!inQuiz && (
        <nav className="fixed inset-x-0 bottom-0 z-40 flex justify-around border-t-2 border-ink bg-cream py-2.5 dark:border-cream dark:bg-ink md:hidden">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === "/"}
              className={({ isActive }) =>
                `px-2 py-1.5 text-[9px] font-bold uppercase tracking-meta ${
                  isActive
                    ? "bg-ink text-cream dark:bg-mustard dark:text-ink"
                    : "text-ink/50 dark:text-cream/50"
                }`
              }
              style={{ borderRadius: 2 }}
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
      )}
    </div>
  );
}
