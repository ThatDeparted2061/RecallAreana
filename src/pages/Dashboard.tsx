import { Link, useNavigate } from "react-router-dom";
import { QUESTIONS, SUBJECTS, SUBJECT_THEME, TOTAL } from "../lib/data";
import { useApp } from "../lib/store";
import { Bar, ProgressRing, SectionTitle } from "../components/ui";
import { relativeTime } from "../lib/utils";

export default function Dashboard() {
  const nav = useNavigate();
  const { progress, history, streak, bookmarkedIds, mistakeIds } = useApp();

  const mastered = Object.values(progress).filter((p) => p.mastered).length;
  const seen = Object.values(progress).filter((p) => p.seen).length;
  const attempts = history.length;
  const avgScore =
    attempts > 0
      ? Math.round(
          (history.reduce((a, h) => a + h.score / h.total, 0) / attempts) * 100
        )
      : 0;

  return (
    <div className="space-y-10">
      {/* ---------- Hero ---------- */}
      <section className="card relative overflow-hidden p-6 sm:p-10">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-br from-brand-500/25 to-fuchsia-500/20 blur-3xl" />
        <div className="relative flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.2em] text-brand-500 dark:text-brand-300">
              SDE Fresher · Core CS Prep
            </p>
            <h1 className="text-3xl font-black leading-tight tracking-tight sm:text-4xl">
              Train your recall.
              <br />
              <span className="gradient-text">Walk in ready.</span>
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              {TOTAL.toLocaleString()} interviewer-phrased questions across OS,
              Networks, DBMS &amp; SQL, OOP &amp; Java, and LLD &amp; System
              Design — drilled as flashcards, the way you'll be asked.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={() => nav("/blitz")} className="btn-primary">
                ⚡ Start a Blitz
              </button>
              <button onClick={() => nav("/practice")} className="btn-ghost">
                📚 Practice Library
              </button>
            </div>
          </div>

          <div className="flex items-center gap-6 sm:gap-8">
            <ProgressRing
              value={mastered / TOTAL}
              size={120}
              stroke={10}
              label={`${Math.round((mastered / TOTAL) * 100)}%`}
              sub="mastered"
            />
            <div className="space-y-3 text-sm">
              <Stat label="Questions seen" value={seen} />
              <Stat label="Mastered" value={mastered} accent />
              <Stat label="Day streak" value={`${streak.current} 🔥`} />
              {attempts > 0 && <Stat label="Avg blitz score" value={`${avgScore}%`} />}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Needs attention ---------- */}
      {(mistakeIds.length > 0 || bookmarkedIds.length > 0) && (
        <section className="grid gap-4 sm:grid-cols-2">
          {mistakeIds.length > 0 && (
            <Link
              to="/review"
              className="card group flex items-center justify-between p-5 transition hover:-translate-y-0.5 hover:shadow-glow"
            >
              <div>
                <div className="text-sm font-extrabold text-rose-500">
                  🎯 {mistakeIds.length} weak spot{mistakeIds.length > 1 ? "s" : ""}
                </div>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Questions you missed in blitzes — drill them down to zero.
                </p>
              </div>
              <span className="text-xl transition group-hover:translate-x-1">→</span>
            </Link>
          )}
          {bookmarkedIds.length > 0 && (
            <Link
              to="/review"
              className="card group flex items-center justify-between p-5 transition hover:-translate-y-0.5 hover:shadow-glow"
            >
              <div>
                <div className="text-sm font-extrabold text-amber-500">
                  ★ {bookmarkedIds.length} bookmarked
                </div>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Your saved questions, one tap away.
                </p>
              </div>
              <span className="text-xl transition group-hover:translate-x-1">→</span>
            </Link>
          )}
        </section>
      )}

      {/* ---------- Subjects ---------- */}
      <section>
        <SectionTitle
          right={
            <Link to="/practice" className="text-xs font-bold text-brand-500 hover:underline">
              View all →
            </Link>
          }
        >
          Subjects
        </SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SUBJECTS.map((s, i) => {
            const t = SUBJECT_THEME[s.id];
            const subjQs = QUESTIONS.filter((q) => q.subject === s.id);
            const done = subjQs.filter((q) => progress[q.id]?.mastered).length;
            return (
              <div
                key={s.id}
                className="card group p-5 transition hover:-translate-y-0.5 hover:shadow-glow"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="mb-3 flex items-center justify-between">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${t.from} ${t.to} text-xl shadow-sm`}
                  >
                    {t.icon}
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    {done}/{s.count}
                  </span>
                </div>
                <h3 className="font-extrabold">{s.name}</h3>
                <p className="mt-0.5 text-xs text-slate-400">
                  {s.topics.length} topics · {s.count} questions
                </p>
                <Bar value={done / s.count} className="mt-3" colorClass={`bg-gradient-to-r ${t.from} ${t.to}`} />
                <div className="mt-4 flex gap-2">
                  <Link to={`/practice/${s.id}`} className="btn-ghost flex-1 !py-2 text-xs">
                    Practice
                  </Link>
                  <button
                    onClick={() => nav("/blitz", { state: { subjects: [s.id] } })}
                    className="btn-primary flex-1 !py-2 text-xs"
                  >
                    ⚡ Blitz
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------- Recent blitzes ---------- */}
      {history.length > 0 && (
        <section>
          <SectionTitle
            right={
              <Link to="/stats" className="text-xs font-bold text-brand-500 hover:underline">
                Full history →
              </Link>
            }
          >
            Recent blitzes
          </SectionTitle>
          <div className="grid gap-3 sm:grid-cols-3">
            {history.slice(0, 3).map((h) => {
              const pct = Math.round((h.score / h.total) * 100);
              return (
                <div key={h.id} className="card flex items-center gap-4 p-4">
                  <ProgressRing
                    value={h.score / h.total}
                    size={56}
                    stroke={6}
                    label={<span className="text-xs">{pct}%</span>}
                    colorClass={pct >= 70 ? "text-emerald-500" : pct >= 40 ? "text-amber-500" : "text-rose-500"}
                  />
                  <div className="min-w-0">
                    <div className="truncate text-sm font-bold">
                      {h.score}/{h.total} · {h.mode}
                    </div>
                    <div className="text-xs text-slate-400">
                      {h.subjects.map((s) => s.toUpperCase()).join(" · ")} · {relativeTime(h.date)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string | number; accent?: boolean }) {
  return (
    <div>
      <div className={`text-xl font-black leading-none ${accent ? "gradient-text" : ""}`}>{value}</div>
      <div className="mt-0.5 text-[11px] font-medium text-slate-400">{label}</div>
    </div>
  );
}
