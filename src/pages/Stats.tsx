import { Link } from "react-router-dom";
import { DIFFICULTIES, QUESTIONS, SUBJECTS, SUBJECT_THEME, TOTAL } from "../lib/data";
import { useApp } from "../lib/store";
import { EmptyState, SectionTitle, SubjectChip } from "../components/ui";
import { formatTime, relativeTime, todayKey } from "../lib/utils";

export default function Stats() {
  const { progress, history, streak } = useApp();

  const mastered = Object.values(progress).filter((p) => p.mastered).length;
  const seen = Object.values(progress).filter((p) => p.seen).length;
  const answeredTotal = history.reduce((a, h) => a + h.total, 0);
  const knownTotal = history.reduce((a, h) => a + h.score, 0);
  const accuracy = answeredTotal > 0 ? Math.round((knownTotal / answeredTotal) * 100) : 0;
  const timeSpent = history.reduce((a, h) => a + h.durationSec, 0);

  const recent = [...history].slice(0, 20).reverse();
  const sparkW = 280;
  const sparkH = 64;
  const points = recent.map((h, i) => {
    const x = recent.length > 1 ? (i / (recent.length - 1)) * sparkW : sparkW / 2;
    const y = sparkH - (h.score / h.total) * sparkH;
    return `${x},${y}`;
  });

  const days: { key: string; active: boolean }[] = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = todayKey(d);
    days.push({ key, active: streak.days.includes(key) });
  }

  return (
    <div className="space-y-12 animate-fade-in">
      <header className="border-b-2 border-ink pb-6 dark:border-cream">
        <p className="meta opacity-50">Your numbers</p>
        <h1 className="display mt-2 text-6xl sm:text-8xl">
          The
          <br />
          Scoreboard<span className="text-ok">.</span>
        </h1>
      </header>

      {/* headline numbers */}
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Num label={`Mastered of ${TOTAL}`} value={`${mastered}`} sub={`${Math.round((mastered / TOTAL) * 100)}%`} invert />
        <Num label="Seen" value={`${seen}`} sub={`${TOTAL - seen} untouched`} />
        <Num label="Blitz accuracy" value={`${accuracy}%`} sub={`${knownTotal}/${answeredTotal} cards`} />
        <Num label="Streak" value={`${streak.current}`} sub={`best ${streak.longest} · ${formatTime(timeSpent)} total`} />
      </section>

      {/* activity + trend */}
      <section className="grid gap-5 lg:grid-cols-2">
        <div className="card-flat p-5">
          <h2 className="meta mb-4 border-b-2 border-ink pb-2 dark:border-cream">Last 14 days</h2>
          <div className="flex items-end gap-1.5">
            {days.map((d) => (
              <div key={d.key} className="flex flex-1 flex-col items-center gap-1.5">
                <div
                  title={d.key}
                  className={`h-10 w-full border-2 border-ink dark:border-cream ${
                    d.active ? "bg-mustard" : "bg-transparent opacity-30"
                  }`}
                  style={{ borderRadius: 2 }}
                />
                <span className="meta text-[8px] opacity-50">{d.key.slice(8)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card-flat p-5">
          <h2 className="meta mb-4 border-b-2 border-ink pb-2 dark:border-cream">
            Blitz scores · last {recent.length || 0}
          </h2>
          {recent.length >= 2 ? (
            <svg viewBox={`-6 -8 ${sparkW + 12} ${sparkH + 16}`} className="h-24 w-full">
              <polyline
                points={points.join(" ")}
                fill="none"
                strokeWidth="3"
                strokeLinecap="square"
                className="stroke-ink dark:stroke-cream"
              />
              {recent.map((h, i) => {
                const [x, y] = points[i].split(",").map(Number);
                const pct = h.score / h.total;
                return (
                  <rect
                    key={h.id}
                    x={x - 4}
                    y={y - 4}
                    width="8"
                    height="8"
                    className={`stroke-ink stroke-2 dark:stroke-cream ${
                      pct >= 0.7 ? "fill-ok" : pct >= 0.4 ? "fill-mustard" : "fill-bad"
                    }`}
                  />
                );
              })}
            </svg>
          ) : (
            <p className="meta py-8 text-center opacity-50">Run at least two blitzes to see your trend.</p>
          )}
        </div>
      </section>

      {/* per subject mastery */}
      <section>
        <SectionTitle kicker="Coverage">Mastery by subject</SectionTitle>
        <div className="card-flat divide-y-2 divide-ink dark:divide-cream">
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
                <div className="flex w-64 shrink-0 items-center gap-3">
                  <span className="display text-3xl opacity-25">{t.index}</span>
                  <div>
                    <div className="display text-xl">{s.name}</div>
                    <div className="meta opacity-50">
                      {done}/{s.count} · {Math.round((done / s.count) * 100)}%
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="h-4 w-full border-2 border-ink dark:border-cream" style={{ borderRadius: 2 }}>
                    <div className="h-full bg-ink transition-all duration-700 dark:bg-mustard" style={{ width: `${(done / s.count) * 100}%` }} />
                  </div>
                  <div className="meta mt-2 flex gap-4 opacity-50">
                    {byDiff.map(({ d, total, done: dd }) => (
                      <span key={d}>
                        {d} {dd}/{total}
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
        <SectionTitle kicker="Log">Blitz history</SectionTitle>
        {history.length === 0 ? (
          <EmptyState
            icon="🗒️"
            title="No blitzes yet"
            body="Your finished quizzes will appear here with scores and timing."
            action={<Link to="/blitz" className="btn-primary">Run your first Blitz</Link>}
          />
        ) : (
          <div className="card-flat divide-y-2 divide-ink dark:divide-cream">
            {history.slice(0, 25).map((h) => {
              const pct = Math.round((h.score / h.total) * 100);
              return (
                <div key={h.id} className="flex flex-wrap items-center gap-3 p-4">
                  <span
                    className={`display w-16 border-2 border-ink px-2 py-1 text-center text-lg text-ink dark:border-cream ${
                      pct >= 70 ? "bg-ok" : pct >= 40 ? "bg-mustard" : "bg-bad"
                    }`}
                    style={{ borderRadius: 2 }}
                  >
                    {pct}%
                  </span>
                  <span className="font-display text-lg">
                    {h.score}/{h.total}
                  </span>
                  <span className="meta border-2 border-ink px-2 py-0.5 dark:border-cream" style={{ borderRadius: 2 }}>
                    {h.mode}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {h.subjects.slice(0, 3).map((sid) => (
                      <SubjectChip key={sid} id={sid} small />
                    ))}
                    {h.subjects.length > 3 && <span className="meta opacity-50">+{h.subjects.length - 3}</span>}
                  </div>
                  <span className="meta ml-auto opacity-50">
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

function Num({ label, value, sub, invert }: { label: string; value: string; sub?: string; invert?: boolean }) {
  return (
    <div className={`card-flat p-5 ${invert ? "!bg-ink !text-cream dark:!bg-mustard dark:!text-ink dark:!border-cream" : ""}`}>
      <div className="meta opacity-50">{label}</div>
      <div className="display mt-1 text-4xl sm:text-5xl">{value}</div>
      {sub && <div className="meta mt-1 opacity-50">{sub}</div>}
    </div>
  );
}
