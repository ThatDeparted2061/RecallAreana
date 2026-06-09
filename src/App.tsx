import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useApp } from "./lib/store";
import Dashboard from "./pages/Dashboard";
import BlitzSetup from "./pages/BlitzSetup";
import BlitzPlay from "./pages/BlitzPlay";
import Practice from "./pages/Practice";
import PracticeSubject from "./pages/PracticeSubject";
import Review from "./pages/Review";
import Stats from "./pages/Stats";
import Settings from "./pages/Settings";

const NAV = [
  { to: "/", label: "Home", icon: "⌂" },
  { to: "/blitz", label: "Blitz", icon: "⚡" },
  { to: "/practice", label: "Practice", icon: "📚" },
  { to: "/review", label: "Review", icon: "🎯" },
  { to: "/stats", label: "Stats", icon: "📈" },
  { to: "/settings", label: "Settings", icon: "⚙" },
];

function ThemeToggle() {
  const { theme, toggleTheme } = useApp();
  return (
    <button
      onClick={toggleTheme}
      title="Toggle theme"
      className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white/70 text-base transition hover:scale-105 dark:border-white/10 dark:bg-white/5"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}

function Logo() {
  return (
    <NavLink to="/" className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-violet-600 text-lg font-black text-white shadow-glow">
        R
      </span>
      <span className="text-lg font-extrabold tracking-tight">
        Recall<span className="gradient-text">Arena</span>
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
      {!inQuiz && (
        <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-slate-50/80 backdrop-blur-md dark:border-white/5 dark:bg-slate-950/70">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
            <Logo />
            <nav className="hidden items-center gap-1 md:flex">
              {NAV.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  end={n.to === "/"}
                  className={({ isActive }) =>
                    `rounded-xl px-3.5 py-2 text-sm font-semibold transition ${
                      isActive
                        ? "bg-gradient-to-br from-brand-500/15 to-violet-500/15 text-brand-600 dark:text-brand-300"
                        : "text-slate-500 hover:bg-slate-200/50 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-slate-100"
                    }`
                  }
                >
                  {n.label}
                </NavLink>
              ))}
            </nav>
            <ThemeToggle />
          </div>
        </header>
      )}

      <main className={`mx-auto w-full max-w-6xl flex-1 px-4 sm:px-6 ${inQuiz ? "" : "py-8 pb-24 md:pb-12"}`}>
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

      {/* Mobile bottom nav */}
      {!inQuiz && (
        <nav className="fixed inset-x-0 bottom-0 z-40 flex justify-around border-t border-slate-200/70 bg-white/90 py-2 backdrop-blur-md dark:border-white/5 dark:bg-slate-950/90 md:hidden">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === "/"}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 rounded-lg px-3 py-1 text-[10px] font-semibold ${
                  isActive
                    ? "text-brand-600 dark:text-brand-300"
                    : "text-slate-400"
                }`
              }
            >
              <span className="text-base leading-none">{n.icon}</span>
              {n.label}
            </NavLink>
          ))}
        </nav>
      )}
    </div>
  );
}
