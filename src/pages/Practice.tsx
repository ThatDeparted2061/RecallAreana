import { Link } from "react-router-dom";
import { QUESTIONS, SUBJECTS, SUBJECT_THEME } from "../lib/data";
import { useApp } from "../lib/store";
import { Marquee } from "../components/ui";

export default function Practice() {
  const { progress } = useApp();

  return (
    <div className="space-y-10 animate-fade-in">
      <header className="border-b-2 border-ink pb-6 dark:border-cream">
        <p className="meta opacity-50">Exhaustive study</p>
        <h1 className="display mt-2 text-6xl sm:text-8xl">
          The
          <br />
          Library<span className="text-mustard">.</span>
        </h1>
        <p className="mt-4 max-w-md text-sm font-medium opacity-70">
          Every question, subject by subject. Answers stay hidden until you ask — read, answer out
          loud, then check.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2">
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
          const inverted = i % 2 === 1;
          return (
            <Link
              key={s.id}
              to={`/practice/${s.id}`}
              className={`card-flat card-hover group p-6 ${
                inverted ? "!bg-ink !text-cream dark:!border-cream" : "dark:!bg-cream dark:!text-ink"
              }`}
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className="flex items-start justify-between">
                <span className="display text-7xl opacity-15">{t.index}</span>
                <span className="font-display text-3xl transition-transform group-hover:translate-x-1">→</span>
              </div>
              <h2 className="display mt-2 text-3xl sm:text-4xl">{s.name}</h2>
              <div className="meta mt-2 opacity-60">
                {s.count} questions · {s.topics.length} topics
              </div>

              <div className="meta mt-5 flex flex-wrap gap-2">
                <span className="border-2 border-current bg-ok px-2 py-0.5 text-ink" style={{ borderRadius: 2 }}>
                  {counts.Easy} Easy
                </span>
                <span className="border-2 border-current bg-mustard px-2 py-0.5 text-ink" style={{ borderRadius: 2 }}>
                  {counts.Medium} Med
                </span>
                <span className="border-2 border-current bg-bad px-2 py-0.5 text-ink" style={{ borderRadius: 2 }}>
                  {counts.Hard} Hard
                </span>
              </div>

              <div className="mt-5">
                <div className="meta mb-1.5 flex justify-between opacity-60">
                  <span>
                    {done} mastered · {seen} seen
                  </span>
                  <span>{Math.round((done / s.count) * 100)}%</span>
                </div>
                <div
                  className={`h-3 w-full border-2 ${inverted ? "border-cream" : "border-ink dark:border-ink"}`}
                  style={{ borderRadius: 2 }}
                >
                  <div
                    className={`h-full transition-all duration-700 ${inverted ? "bg-mustard" : "bg-ink dark:bg-ink"}`}
                    style={{ width: `${(done / s.count) * 100}%` }}
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <Marquee text="Read · Answer out loud · Check · Repeat" className="-mx-4 sm:-mx-6" />
    </div>
  );
}
