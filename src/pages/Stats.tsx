import { Link } from "react-router-dom";
import { DIFFICULTIES, QUESTIONS, SUBJECTS, SUBJECT_THEME, TOTAL } from "../lib/data";
import { useApp } from "../lib/store";
import { Bar, EmptyState, SectionTitle, SubjectChip } from "../components/ui";
import { formatTime, relativeTime, todayKey } from "../lib/utils";

export default function Stats() {
  const { progress, history, streak } = useApp();

  const mastered = Object.values(progress).filter((p) => p.mastered).length;
  const seen = Object.values(progress).filter((p) => p.seen).length;
  const answeredTotal = history.reduce((a, h) => a + h.total, 0);
  const knownTotal = history.reduce((a, h) => a + h.score, 0);
  const accuracy = answeredTotal > 0 ? Math.round((knownTotal / answeredTotal) * 100) : 0;
  const timeSpent = history.reduce((a, h) => a + h.durationSec, 0);

  /* last 20 attempt scores for the sparkline */
  const recent = [...history].slice(0, 20).reverse();
  const sparkW = 280;
  const sparkH = 60;
  const points = recent.map((h, i) => {
    const x = recent.length > 1 ? (i / (recent.length - 1)) * sparkW : sparkW / 2;
    const y = sparkH - (h.score / h.total) * sparkH;
    return `${x},${y}`;
  });

  /* last 14 days activity strip */
  const days: { key: string; active: boolean }[] = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = todayKey(d);
    days.push({ key, active: streak.days.includes(key) });
  }

  return (
    <div className="space-y-10 animate-fade-in">
      <header>
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-500 dark:text-brand-300">
          Your numbers
        </p>
        <h1 className="mt-1 text-3xl font-black tracking-tight">
          Progress <span className="gradient-text">Stats</span> 📈
        </h1>
      </header>

      {/* headline numbers */}
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Num label="Mastered" value={`${mastered}`} sub={`of ${TOTAL} (${Math.round((mastered / TOTAL) * 100)}%)`} />
        <Num label="Seen" value={`${seen}`} sub={`${TOTAL - seen} untouched`} />
        <Num label="Blitz accuracy" value={`${accuracy}%`} sub={`${knownTotal}/${answeredTotal} cards`} />
        <Num label="Streak" value={`${streak.current} 🔥`} sub={`best ${streak.longest} · ${formatTime(timeSpent)} on the clock`} />
      </section>

      {/* activity + sparkline */}
      <section className="grid gap-4 lg:grid-cols-2">
        <div className="card p-5">
          <h2 className="mb-4 text-sm font-extrabold uppercase tracking-wider text-slate-400">Last 14 days</h2>
          <div className="flex items-end gap-1.5">
            {days.map((d) => (
              <div key={d.key} className="flex flex-1 flex-col items-center gap-1">
                <div
                  title={d.key}
                  className={`h-9 w-full rounded-md ${
                    d.active
                      ? "bg-gradient-to-b from-brand-400 to-violet-500 shadow-sm"
                      : "bg-slate-200/70 dark:bg-white/5"
                  }`}
                />
                <span className="text-[8px] font-bold text-slate-400">{d.key.slice(8)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card p-5">
          <h2 className="mb-4 text-sm font-extrabold uppercase tracking-wider text-slate-400">
            Blitz scores · last {recent.length || 0}
          </h2>
          {recent.length >= 2 ? (
            <svg viewBox={`-4 -6 ${sparkW + 8} ${sparkH + 12}`} className="h-24 w-full">
              <polyline
                points={points.join(" ")}
                fill="none"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="stroke-brand-500"
              />
              {recent.map((h, i) => {
                const [x, y] = points[i].split(",").map(Number);
                const pct = h.score / h.total;
                return (
                  <circle
                    key={h.id}
                    cx={x}
                    cy={y}
                    r="4"
                    className={pct >= 0.7 ? "fill-emerald-500" : pct >= 0.4 ? "fill-amber-500" : "fill-rose-500"}
                  />
                );
              })}
            </svg>
          ) : (
            <p className="py-6 text-center text-xs text-slate-400">Run at least two blitzes to see your trend.</p>
          )}
        </div>
      </section>

      {/* per subject mastery */}
      <section>
        <SectionTitle>Mastery by subject</SectionTitle>
        <div className="card divide-y divide-slate-200/70 dark:divide-white/5">
          {SUBJECTS.map((s) => {
            const t = SUBJECT_THEME[s.id];
            const qs = QUESTIONS.filter((q) => q.subject === s.id);
            const done = qs.filter((q) => progress[q.id]?.mastered).length;
            const byDiff = DIFFICULTIES.map((d) => {
              const dq = qs.filter((q) => q.difficulty === d);
              return { d, total: dq.length, done: dq.filter((q) => progress[q.id]?.mastered).length };
            });
            return (
              <div key={s.id} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center">
                <div className="flex w-56 shrink-0 items-center gap-3">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${t.from} ${t.to} text-lg`}>
                    {t.icon}
                  </span>
                  <div>
                    <div className="text-sm font-extrabold">{s.name}</div>
                    <div className="text-[11px] font-semibold text-slate-400">
                      {done}/{s.count} · {Math.round((done / s.count) * 100)}%
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <Bar value={done / s.count} colorClass={`bg-gradient-to-r ${t.from} ${t.to}`} />
                  <div className="mt-2 flex gap-3 text-[10px] font-bold text-slate-400">
                    {byDiff.map(({ d, total, done: dd }) => (
                      <span key={d}>
                        {d}: {dd}/{total}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* history */}
      <section>
        <SectionTitle>Blitz history</SectionTitle>
        {history.length === 0 ? (
          <EmptyState
            icon="🗒️"
            title="No blitzes yet"
            body="Your finished quizzes will appear here with scores and timing."
            action={<Link to="/blitz" className="btn-primary">Run your first Blitz</Link>}
          />
        ) : (
          <div className="card divide-y divide-slate-200/70 dark:divide-white/5">
            {history.slice(0, 25).map((h) => {
              const pct = Math.round((h.score / h.total) * 100);
              return (
                <div key={h.id} className="flex flex-wrap items-center gap-3 p-4">
                  <span
                    className={`w-14 rounded-lg px-2 py-1 text-center text-sm font-black ${
                      pct >= 70
                        ? "bg-emerald-500/12 text-emerald-600 dark:text-emerald-300"
                        : pct >= 40
                        ? "bg-amber-500/12 text-amber-600 dark:text-amber-300"
                        : "bg-rose-500/12 text-rose-600 dark:text-rose-300"
                    }`}
                  >
                    {pct}%
                  </span>
                  <span className="text-sm font-bold">
                    {h.score}/{h.total}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500 dark:bg-white/5 dark:text-slate-400">
                    {h.mode}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {h.subjects.slice(0, 3).map((sid) => (
                      <SubjectChip key={sid} id={sid} small />
                    ))}
                    {h.subjects.length > 3 && (
                      <span className="text-[10px] font-bold text-slate-400">+{h.subjects.length - 3}</span>
                    )}
                  </div>
                  <span className="ml-auto text-xs font-semibold text-slate-400">
                    {formatTime(h.durationSec)} · {relativeTime(h.date)}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

function Num({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="card p-5">
      <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">{label}</div>
      <div className="mt-1 text-3xl font-black tracking-tight">{value}</div>
      {sub && <div className="mt-0.5 text-[11px] font-medium text-slate-400">{sub}</div>}
    </div>
  );
}
