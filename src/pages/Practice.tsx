import { Link } from "react-router-dom";
import { QUESTIONS, SUBJECTS, SUBJECT_THEME } from "../lib/data";
import { useApp } from "../lib/store";
import { Bar } from "../components/ui";

export default function Practice() {
  const { progress } = useApp();

  return (
    <div className="space-y-8 animate-fade-in">
      <header>
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-500 dark:text-brand-300">
          Exhaustive study
        </p>
        <h1 className="mt-1 text-3xl font-black tracking-tight">
          Practice <span className="gradient-text">Library</span> 📚
        </h1>
        <p className="mt-2 max-w-xl text-sm text-slate-500 dark:text-slate-400">
          Work through every question, subject by subject. Answers stay hidden
          until you ask — read the question, answer out loud, then check.
        </p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2">
        {SUBJECTS.map((s, i) => {
          const t = SUBJECT_THEME[s.id];
          const qs = QUESTIONS.filter((q) => q.subject === s.id);
          const done = qs.filter((q) => progress[q.id]?.mastered).length;
          const seen = qs.filter((q) => progress[q.id]?.seen).length;
          const counts = {
            Easy: qs.filter((q) => q.difficulty === "Easy").length,
            Medium: qs.filter((q) => q.difficulty === "Medium").length,
            Hard: qs.filter((q) => q.difficulty === "Hard").length,
          };
          return (
            <Link
              key={s.id}
              to={`/practice/${s.id}`}
              className="card group relative overflow-hidden p-6 transition hover:-translate-y-1 hover:shadow-glow"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div
                className={`pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-gradient-to-br ${t.from} ${t.to} opacity-15 blur-2xl transition group-hover:opacity-30`}
              />
              <div className="relative">
                <div className="flex items-start justify-between">
                  <span className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${t.from} ${t.to} text-2xl shadow-md`}>
                    {t.icon}
                  </span>
                  <span className="text-2xl text-slate-300 transition group-hover:translate-x-1 group-hover:text-brand-400 dark:text-slate-600">
                    →
                  </span>
                </div>
                <h2 className="mt-4 text-xl font-extrabold">{s.name}</h2>
                <p className="mt-1 text-xs text-slate-400">
                  {s.count} questions · {s.topics.length} topics
                </p>

                <div className="mt-4 flex gap-2 text-[10px] font-bold">
                  <span className="rounded-full bg-emerald-500/12 px-2 py-0.5 text-emerald-600 dark:text-emerald-300">
                    {counts.Easy} Easy
                  </span>
                  <span className="rounded-full bg-amber-500/12 px-2 py-0.5 text-amber-600 dark:text-amber-300">
                    {counts.Medium} Medium
                  </span>
                  <span className="rounded-full bg-rose-500/12 px-2 py-0.5 text-rose-600 dark:text-rose-300">
                    {counts.Hard} Hard
                  </span>
                </div>

                <div className="mt-4">
                  <div className="mb-1 flex justify-between text-[11px] font-semibold text-slate-400">
                    <span>{done} mastered · {seen} seen</span>
                    <span>{Math.round((done / s.count) * 100)}%</span>
                  </div>
                  <Bar value={done / s.count} colorClass={`bg-gradient-to-r ${t.from} ${t.to}`} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
