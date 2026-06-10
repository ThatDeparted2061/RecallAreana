import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { BlitzConfig } from "./BlitzSetup";
import { filterQuestions, QUESTION_BY_ID } from "../lib/data";
import { useApp } from "../lib/store";
import type { Question } from "../types";
import { formatTime, renderAnswer, shuffle as shuffleArr, uid } from "../lib/utils";
import { DiffChip, Modal, SubjectChip } from "../components/ui";
import QuestionCard from "../components/QuestionCard";

type Phase = "countdown" | "play" | "done";
interface Result {
  qid: string;
  known: boolean;
  flagged: boolean;
  answered: boolean;
}

export default function BlitzPlay() {
  const nav = useNavigate();
  const location = useLocation();
  const config = location.state as BlitzConfig | null;
  const { bookmarkedIds, mistakeIds, progress, addAttempt, toggleBookmark, getProgress } = useApp();

  const deck: Question[] = useMemo(() => {
    if (!config) return [];
    let qs = filterQuestions({ subjects: config.subjects, difficulties: config.difficulties });
    if (config.source === "bookmarks") qs = qs.filter((q) => bookmarkedIds.includes(q.id));
    if (config.source === "mistakes") qs = qs.filter((q) => mistakeIds.includes(q.id));
    if (config.source === "unseen") qs = qs.filter((q) => !progress[q.id]?.seen);
    if (config.shuffle) qs = shuffleArr(qs);
    return qs.slice(0, config.count);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [phase, setPhase] = useState<Phase>("countdown");
  const [tick, setTick] = useState(3);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [results, setResults] = useState<Result[]>([]);
  const [confirmQuit, setConfirmQuit] = useState(false);
  const [timeUp, setTimeUp] = useState(false);

  const totalSec = config && config.secondsPerQuestion > 0 ? config.count * config.secondsPerQuestion : 0;
  const [remaining, setRemaining] = useState(totalSec);
  const savedRef = useRef(false);
  const startedAt = useRef(Date.now());

  useEffect(() => {
    if (!config || deck.length === 0) nav("/blitz", { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (phase !== "countdown") return;
    const t = setInterval(() => {
      setTick((n) => {
        if (n <= 0) {
          clearInterval(t);
          setPhase("play");
          startedAt.current = Date.now();
          return 0;
        }
        return n - 1;
      });
    }, 800);
    return () => clearInterval(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "play" || totalSec === 0) return;
    const t = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(t);
          setTimeUp(true);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [phase, totalSec]);

  useEffect(() => {
    if (timeUp && phase === "play") finish(results);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeUp]);

  const score = results.filter((r) => r.known).length;
  const q = deck[idx];

  function answer(known: boolean) {
    if (!q || phase !== "play") return;
    const r: Result = { qid: q.id, known, flagged: false, answered: true };
    const next = [...results, r];
    setResults(next);
    if (known) advance(next);
    else setFlipped(true);
  }

  function advance(current: Result[]) {
    setFlipped(false);
    if (idx + 1 >= deck.length) finish(current);
    else setIdx(idx + 1);
  }

  function finish(current: Result[]) {
    if (savedRef.current || !config) return;
    savedRef.current = true;
    const answeredIds = new Set(current.map((r) => r.qid));
    const padded: Result[] = [
      ...current,
      ...deck
        .filter((d) => !answeredIds.has(d.id))
        .map((d) => ({ qid: d.id, known: false, flagged: false, answered: false })),
    ];
    setResults(padded);
    addAttempt({
      id: uid(),
      date: Date.now(),
      subjects: config.subjects,
      difficulties: config.difficulties,
      total: deck.length,
      score: padded.filter((r) => r.known).length,
      durationSec: totalSec > 0 ? totalSec - remaining : Math.round((Date.now() - startedAt.current) / 1000),
      mode:
        config.source === "mistakes"
          ? "Mistakes"
          : config.source === "bookmarks"
          ? "Bookmarks"
          : config.source === "unseen"
          ? "Unseen"
          : "Custom",
      results: padded.map(({ qid, known, flagged }) => ({ qid, known, flagged })),
    });
    setPhase("done");
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (phase !== "play") return;
      if (flipped) {
        if (e.key === " " || e.key === "Enter" || e.key === "ArrowRight") {
          e.preventDefault();
          advance(results);
        }
        return;
      }
      if (e.key === "1" || e.key.toLowerCase() === "k") answer(true);
      if (e.key === "2" || e.key.toLowerCase() === "d") answer(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (!config || deck.length === 0) return null;

  /* ================= COUNTDOWN ================= */
  if (phase === "countdown") {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-mustard text-ink">
        <p className="meta">Get ready</p>
        <div key={tick} className="display animate-pop text-[10rem] leading-none sm:text-[16rem]">
          {tick > 0 ? tick : "GO"}
        </div>
        <p className="meta opacity-60">
          {deck.length} cards{totalSec > 0 ? ` · ${formatTime(totalSec)} on the clock` : " · untimed"}
        </p>
      </div>
    );
  }

  /* ================= RESULTS ================= */
  if (phase === "done") {
    const missed = results.filter((r) => !r.known);
    const pct = Math.round((score / deck.length) * 100);
    const bySubject = config.subjects
      .map((sid) => {
        const rs = results.filter((r) => QUESTION_BY_ID[r.qid]?.subject === sid);
        return { sid, total: rs.length, ok: rs.filter((r) => r.known).length };
      })
      .filter((x) => x.total > 0);

    return (
      <div className="mx-auto max-w-3xl space-y-10 py-10 animate-fade-in">
        <header className="card overflow-hidden !p-0">
          <div className="bg-mustard p-8 text-center text-ink">
            <p className="meta">Blitz complete</p>
            <div className="display mt-3 text-[6rem] leading-none sm:text-[8rem]">{pct}%</div>
            <div className="meta mt-2">
              {score}/{deck.length} known ·{" "}
              {formatTime(totalSec > 0 ? totalSec - remaining : Math.round((Date.now() - startedAt.current) / 1000))}
              {timeUp && " · time ran out"}
            </div>
          </div>
          <div className="border-t-2 border-ink p-6 text-center dark:border-cream">
            <h1 className="display text-3xl">
              {pct >= 85 ? "Interview-ready." : pct >= 70 ? "Strong run." : pct >= 40 ? "Getting there." : "Grind time."}
            </h1>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              {missed.length > 0 && (
                <button
                  className="btn-danger"
                  onClick={() =>
                    nav("/blitz/run", {
                      replace: true,
                      state: {
                        ...config,
                        source: "mistakes",
                        count: missed.length,
                        shuffle: true,
                      } satisfies BlitzConfig,
                    })
                  }
                >
                  Blitz the {missed.length} missed ↻
                </button>
              )}
              <button className="btn-primary" onClick={() => nav("/blitz")}>
                New Blitz ⚡
              </button>
              <button className="btn-ghost" onClick={() => nav("/")}>
                Home
              </button>
            </div>
          </div>
        </header>

        {bySubject.length > 1 && (
          <section>
            <h2 className="meta mb-3 border-b-2 border-ink pb-2 dark:border-cream">By subject</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {bySubject.map(({ sid, total, ok }) => (
                <div
                  key={sid}
                  className="card-flat flex items-center justify-between px-4 py-3"
                >
                  <SubjectChip id={sid} />
                  <span className="display text-2xl">
                    {ok}<span className="opacity-40">/{total}</span>
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="meta mb-4 border-b-2 border-ink pb-2 dark:border-cream">
            Review all answers — {results.length} cards
          </h2>
          <div className="space-y-4">
            {results.map((r) => {
              const rq = QUESTION_BY_ID[r.qid];
              if (!rq) return null;
              return <QuestionCard key={r.qid} q={rq} showSubject defaultOpen={!r.known} verdict={r.known} />;
            })}
          </div>
        </section>
      </div>
    );
  }

  /* ================= PLAY ================= */
  const prog = getProgress(q.id);
  return (
    <div className="flex min-h-screen flex-col py-4">
      {/* top bar */}
      <div className="mx-auto flex w-full max-w-3xl items-center gap-4">
        <button
          onClick={() => setConfirmQuit(true)}
          className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-ink bg-transparent transition-colors hover:bg-bad hover:text-ink dark:border-cream"
          style={{ borderRadius: 2 }}
          title="Quit blitz"
        >
          ✕
        </button>
        <div className="flex-1">
          <div className="meta mb-1.5 flex justify-between opacity-70">
            <span>
              {String(idx + 1).padStart(2, "0")} / {String(deck.length).padStart(2, "0")}
            </span>
            <span>✓ {score}</span>
          </div>
          <div className="h-3 overflow-hidden border-2 border-ink dark:border-cream" style={{ borderRadius: 2 }}>
            <div
              className="h-full bg-ink transition-all duration-500 dark:bg-mustard"
              style={{ width: `${((idx + (flipped ? 0.5 : 0)) / deck.length) * 100}%` }}
            />
          </div>
        </div>
        {totalSec > 0 && (
          <div
            className={`display shrink-0 border-2 border-ink px-3 py-1.5 text-xl tabular-nums dark:border-cream ${
              remaining <= 30 ? "animate-pulse bg-bad text-ink" : "bg-mustard text-ink"
            }`}
            style={{ borderRadius: 2 }}
          >
            {formatTime(remaining)}
          </div>
        )}
      </div>

      {/* card */}
      <div className="mx-auto flex w-full max-w-3xl flex-1 items-center py-6">
        <div className="flip-scene w-full">
          <div
            key={q.id}
            className={`flip-card relative w-full ${flipped ? "is-flipped" : ""}`}
            style={{ minHeight: 460 }}
          >
            {/* FRONT — question */}
            <div className="flip-face card absolute inset-0 flex flex-col p-6 !shadow-brutal-lg sm:p-10">
              <div className="flex flex-wrap items-center gap-2">
                <SubjectChip id={q.subject} />
                <DiffChip d={q.difficulty} />
                <span className="meta hidden opacity-40 sm:inline">{q.topic}</span>
                <button
                  onClick={() => toggleBookmark(q.id)}
                  className={`ml-auto flex h-9 w-9 items-center justify-center border-2 text-lg transition-colors ${
                    prog.bookmarked
                      ? "border-ink bg-mustard text-ink dark:border-cream"
                      : "border-ink/25 text-ink/30 hover:border-ink hover:text-ink dark:border-cream/25 dark:text-cream/30 dark:hover:border-cream dark:hover:text-cream"
                  }`}
                  style={{ borderRadius: 2 }}
                  title="Bookmark"
                >
                  {prog.bookmarked ? "★" : "☆"}
                </button>
              </div>
              {q.company && (
                <span
                  className="meta mt-3 w-fit border-2 border-ink bg-mustard px-2.5 py-1 text-ink dark:border-cream"
                  style={{ borderRadius: 2 }}
                >
                  {q.company}
                </span>
              )}
              <div className="flex flex-1 items-center">
                <h2 className="animate-slide-up text-xl font-bold leading-relaxed sm:text-2xl">{q.question}</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => answer(false)} className="btn-danger !py-4 !text-sm">
                  ✗ Didn't know
                </button>
                <button onClick={() => answer(true)} className="btn-success !py-4 !text-sm">
                  ✓ Knew it
                </button>
              </div>
              <p className="meta mt-3 text-center opacity-40">K = knew it · D = didn't know</p>
            </div>

            {/* BACK — answer */}
            <div className="flip-face flip-back card absolute inset-0 flex flex-col p-6 !shadow-brutal-lg sm:p-10">
              <div className="flex items-center gap-2">
                <span
                  className="meta border-2 border-ink bg-bad px-2.5 py-1 text-ink dark:border-cream"
                  style={{ borderRadius: 2 }}
                >
                  ✗ Marked as missed
                </span>
                <span className="meta ml-auto opacity-50">Model answer</span>
              </div>
              <div
                className="answer-prose scroll-area mt-4 flex-1 overflow-y-auto pr-2 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: renderAnswer(q.answer) }}
              />
              <button onClick={() => advance(results)} className="btn-primary mt-5 !py-4">
                Next card → <span className="opacity-50">(space)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal open={confirmQuit} title="Quit this blitz?" onClose={() => setConfirmQuit(false)}>
        <p className="text-sm opacity-70">Progress in this run won't be saved to your history.</p>
        <div className="mt-5 flex justify-end gap-2">
          <button className="btn-ghost" onClick={() => setConfirmQuit(false)}>
            Keep going
          </button>
          <button className="btn-danger" onClick={() => nav("/blitz")}>
            Quit
          </button>
        </div>
      </Modal>
    </div>
  );
}
