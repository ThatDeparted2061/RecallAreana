import { Link, useNavigate } from "react-router-dom";
import { QUESTIONS, SUBJECTS, SUBJECT_THEME, TOTAL } from "../lib/data";
import { useApp } from "../lib/store";
import { Bar, Marquee, SectionTitle } from "../components/ui";
import { relativeTime, todayKey } from "../lib/utils";

export default function Dashboard() {
  const nav = useNavigate();
  const { progress, history, streak, mistakeIds, bookmarkedIds, user, cloudEnabled } = useApp();

  const mastered = Object.values(progress).filter((p) => p.mastered).length;
  const seen = Object.values(progress).filter((p) => p.seen).length;
  const attempts = history.length;
  const avgScore =
    attempts > 0
      ? Math.round((history.reduce((a, h) => a + h.score / h.total, 0) / attempts) * 100)
      : null;

  const today = new Date();
  const dateStr = today
    .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    .toUpperCase();

  return (
    <div className="space-y-12">
      {/* ================= HERO ================= */}
      <section className="-mx-4 -mt-8 sm:-mx-6">
        <div className="border-b-2 border-ink bg-mustard text-ink dark:border-cream dark:bg-ink dark:text-cream">
          <div className="mx-auto max-w-6xl px-4 pb-8 pt-10 sm:px-6 sm:pt-14">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <h1 className="display text-[clamp(4rem,14.5vw,11rem)] dark:text-mustard">
                Recall
                <br />
                Arena
              </h1>
              <div className="max-w-xs md:pt-4 md:text-right">
                <p className="text-sm font-medium leading-relaxed">
                  {TOTAL.toLocaleString()} interviewer-phrased questions across the five core-CS
                  subjects — drilled as flashcards, the way you'll actually be asked.
                </p>
                <div className="mt-5 flex flex-wrap gap-3 md:justify-end">
                  <button
                    onClick={() => nav("/blitz")}
                    className="btn bg-ink text-cream hover:bg-cream hover:text-ink dark:border-cream dark:bg-mustard dark:text-ink dark:hover:bg-cream"
                  >
                    Start a Blitz ⚡
                  </button>
                  <button
                    onClick={() => nav("/practice")}
                    className="btn border-ink bg-transparent text-ink hover:bg-ink hover:text-mustard dark:border-cream dark:text-cream dark:hover:bg-cream dark:hover:text-ink"
                  >
                    Practice
                  </button>
                </div>
              </div>
            </div>

            {/* metadata strip */}
            <div className="meta mt-8 flex flex-wrap items-center justify-between gap-3 border-t-2 border-ink pt-4 dark:border-cream">
              <span>SDE Fresher · 2026 Cycle</span>
              <span>{dateStr}</span>
              <span>
                {mastered}/{TOTAL} mastered
                {avgScore !== null && ` · AVG ${avgScore}%`}
                {streak.current > 0 && ` · ${streak.current}-day streak`}
              </span>
              {cloudEnabled && (
                <span>{user ? `Synced · ${user.email}` : "Local only — sign in to sync"}</span>
              )}
            </div>
          </div>
        </div>
        <Marquee text="Core CS Prep — Interview Ready" />
      </section>

      {/* ================= NUMBERS ================= */}
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <NumBlock n={String(seen)} label="Questions seen" />
        <NumBlock n={String(mastered)} label="Mastered" invert />
        <NumBlock n={`${streak.current}`} label={`Day streak · best ${streak.longest}`} />
        <NumBlock n={avgScore !== null ? `${avgScore}%` : "—"} label="Avg blitz score" />
      </section>

      {/* ================= NEEDS ATTENTION ================= */}
      {(mistakeIds.length > 0 || bookmarkedIds.length > 0) && (
        <section className="grid gap-5 sm:grid-cols-2">
          {mistakeIds.length > 0 && (
            <Link to="/review" className="card card-hover flex items-center justify-between p-5">
              <div>
                <div className="display text-3xl text-bad">{mistakeIds.length}</div>
                <div className="meta mt-1">Weak spots to clear</div>
              </div>
              <span className="font-display text-2xl">→</span>
            </Link>
          )}
          {bookmarkedIds.length > 0 && (
            <Link to="/review" className="card card-hover flex items-center justify-between p-5">
              <div>
                <div className="display text-3xl">★ {bookmarkedIds.length}</div>
                <div className="meta mt-1">Bookmarked questions</div>
              </div>
              <span className="font-display text-2xl">→</span>
            </Link>
          )}
        </section>
      )}

      {/* ================= SUBJECTS ================= */}
      <section>
        <SectionTitle
          kicker="The Arena"
          right={
            <Link to="/practice" className="meta underline underline-offset-4 hover:no-underline">
              View all →
            </Link>
          }
        >
          Subjects
        </SectionTitle>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SUBJECTS.map((s, i) => {
            const t = SUBJECT_THEME[s.id];
            const subjQs = QUESTIONS.filter((q) => q.subject === s.id);
            const done = subjQs.filter((q) => progress[q.id]?.mastered).length;
            const inverted = i % 2 === 1;
            return (
              <div
                key={s.id}
                className={`card-flat card-hover flex flex-col p-5 ${
                  inverted
                    ? "!bg-ink !text-cream dark:!border-cream"
                    : "dark:!bg-cream dark:!text-ink dark:!border-cream"
                }`}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-start justify-between">
                  <span className="display text-5xl opacity-20">{t.index}</span>
                  <span className="text-2xl">{t.icon}</span>
                </div>
                <h3 className="display mt-3 text-2xl leading-none">{s.name}</h3>
                <div className="meta mt-2 opacity-60">
                  {s.count} questions · {s.topics.length} topics · {done}/{s.count} done
                </div>
                <div
                  className={`mt-4 h-3 w-full border-2 ${
                    inverted ? "border-cream" : "border-ink dark:border-ink"
                  }`}
                  style={{ borderRadius: 2 }}
                >
                  <div
                    className={`h-full transition-all duration-700 ${
                      inverted ? "bg-mustard" : "bg-ink dark:bg-ink"
                    }`}
                    style={{ width: `${(done / s.count) * 100}%` }}
                  />
                </div>
                <div className="mt-5 flex gap-2">
                  <Link
                    to={`/practice/${s.id}`}
                    className={`btn flex-1 !px-4 !py-2.5 ${
                      inverted
                        ? "border-cream bg-transparent text-cream hover:bg-cream hover:text-ink"
                        : "border-ink bg-transparent text-ink hover:bg-ink hover:text-cream dark:border-ink"
                    }`}
                  >
                    Practice
                  </Link>
                  <button
                    onClick={() => nav("/blitz", { state: { subjects: [s.id] } })}
                    className={`btn flex-1 !px-4 !py-2.5 ${
                      inverted
                        ? "border-cream bg-mustard text-ink hover:bg-cream"
                        : "border-ink bg-ink text-cream hover:bg-mustard hover:text-ink dark:border-ink"
                    }`}
                  >
                    Blitz ⚡
                  </button>
                </div>
              </div>
            );
          })}

          {/* Sixth tile — mixed all-subject blitz */}
          <button
            onClick={() => nav("/blitz", { state: { count: 20 } })}
            className="card-flat card-hover flex min-h-[16rem] flex-col items-center justify-center gap-3 !border-dashed p-5 text-center"
          >
            <span className="display text-5xl">ALL</span>
            <span className="meta opacity-60">Mixed blitz — every subject</span>
            <span className="btn-primary mt-2 !px-5 !py-2.5">Random 20 →</span>
          </button>
        </div>
      </section>

      {/* ================= RECENT ================= */}
      {history.length > 0 && (
        <section>
          <SectionTitle
            kicker="Last runs"
            right={
              <Link to="/stats" className="meta underline underline-offset-4 hover:no-underline">
                Full history →
              </Link>
            }
          >
            Recent Blitzes
          </SectionTitle>
          <div className="grid gap-4 sm:grid-cols-3">
            {history.slice(0, 3).map((h) => {
              const pct = Math.round((h.score / h.total) * 100);
              return (
                <div key={h.id} className="card-flat flex items-center gap-4 p-4">
                  <span
                    className={`display border-2 border-ink px-2.5 py-1 text-2xl dark:border-cream ${
                      pct >= 70 ? "bg-ok" : pct >= 40 ? "bg-mustard" : "bg-bad"
                    } text-ink`}
                    style={{ borderRadius: 2 }}
                  >
                    {pct}%
                  </span>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-bold">
                      {h.score}/{h.total} · {h.mode}
                    </div>
                    <div className="meta mt-0.5 opacity-50">
                      {h.subjects.map((x) => SUBJECT_THEME[x]?.abbr ?? x).join(" · ")} ·{" "}
                      {relativeTime(h.date)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* streak nudge */}
      {streak.lastStudyDay !== todayKey() && (
        <section className="card flex flex-wrap items-center justify-between gap-4 !bg-mustard p-5 !text-ink dark:!bg-mustard">
          <div>
            <div className="display text-2xl">No reps today yet.</div>
            <div className="meta mt-1 opacity-70">
              {streak.current > 0
                ? `Keep the ${streak.current}-day streak alive — one quick blitz counts.`
                : "Start a streak — one quick blitz counts."}
            </div>
          </div>
          <button
            onClick={() => nav("/blitz", { state: { count: 5 } })}
            className="btn border-ink bg-ink text-cream hover:bg-cream hover:text-ink"
          >
            5-card warm-up →
          </button>
        </section>
      )}
    </div>
  );
}

function NumBlock({ n, label, invert }: { n: string; label: string; invert?: boolean }) {
  return (
    <div
      className={`card-flat p-5 ${
        invert ? "!bg-ink !text-cream dark:!bg-mustard dark:!text-ink dark:!border-cream" : ""
      }`}
    >
      <div className="display text-4xl sm:text-5xl">{n}</div>
      <div className="meta mt-2 opacity-60">{label}</div>
    </div>
  );
}
