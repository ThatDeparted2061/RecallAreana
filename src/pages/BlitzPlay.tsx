import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { BlitzConfig } from "./BlitzSetup";
import { filterQuestions, QUESTION_BY_ID } from "../lib/data";
import { useApp } from "../lib/store";
import type { Question } from "../types";
import { formatTime, renderAnswer, shuffle as shuffleArr, uid } from "../lib/utils";
import { DiffChip, Modal, ProgressRing, SubjectChip } from "../components/ui";
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

  /* ---------- build the deck once ---------- */
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
  const [tick, setTick] = useState(3); // 3..2..1..GO
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [results, setResults] = useState<Result[]>([]);
  const [confirmQuit, setConfirmQuit] = useState(false);
  const [timeUp, setTimeUp] = useState(false);

  const totalSec = config && config.secondsPerQuestion > 0 ? config.count * config.secondsPerQuestion : 0;
  const [remaining, setRemaining] = useState(totalSec);
  const savedRef = useRef(false);
  const startedAt = useRef(Date.now());

  /* ---------- guards ---------- */
  useEffect(() => {
    if (!config || deck.length === 0) nav("/blitz", { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------- 3-2-1 countdown ---------- */
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

  /* ---------- global timer ---------- */
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

  /* time ran out → finish, unanswered count as missed */
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
    if (known) {
      setResults(next);
      advance(next);
    } else {
      setResults(next);
      setFlipped(true); // show the solution; advance on "Next"
    }
  }

  function advance(current: Result[]) {
    setFlipped(false);
    if (idx + 1 >= deck.length) {
      finish(current);
    } else {
      setIdx(idx + 1);
    }
  }

  function finish(current: Result[]) {
    if (savedRef.current || !config) return;
    savedRef.current = true;
    // pad unanswered as missed
    const answeredIds = new Set(current.map((r) => r.qid));
    const padded: Result[] = [
      ...current,
      ...deck.filter((d) => !answeredIds.has(d.id)).map((d) => ({ qid: d.id, known: false, flagged: false, answered: false })),
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

  /* ---------- keyboard shortcuts ---------- */
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
      <div className="flex min-h-[80vh] flex-col items-center justify-center">
        <p className="mb-6 text-sm font-bold uppercase tracking-[0.3em] text-slate-400">Get ready</p>
        <div key={tick} className="animate-pop text-[7rem] font-black leading-none gradient-text sm:text-[9rem]">
          {tick > 0 ? tick : "GO!"}
        </div>
        <p className="mt-6 text-xs text-slate-400">
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
      <div className="mx-auto max-w-3xl space-y-8 py-10 animate-fade-in">
        <header className="card relative overflow-hidden p-8 text-center">
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-brand-500/20 to-fuchsia-500/15 blur-3xl" />
          <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-slate-400">Blitz complete</p>
          <div className="mt-5 flex justify-center">
            <ProgressRing
              value={score / deck.length}
              size={140}
              stroke={12}
              label={`${pct}%`}
              sub={`${score}/${deck.length} known`}
              colorClass={pct >= 70 ? "text-emerald-500" : pct >= 40 ? "text-amber-500" : "text-rose-500"}
            />
          </div>
          <h1 className="mt-5 text-2xl font-black">
            {pct >= 85 ? "Interview-ready 🏆" : pct >= 70 ? "Strong run 💪" : pct >= 40 ? "Getting there 📈" : "Grind time 🔁"}
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            {timeUp ? "Time ran out — unanswered cards counted as missed. " : ""}
            Took {formatTime(totalSec > 0 ? totalSec - remaining : Math.round((Date.now() - startedAt.current) / 1000))}.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
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
                🔁 Blitz the {missed.length} missed
              </button>
            )}
            <button className="btn-primary" onClick={() => nav("/blitz")}>
              ⚡ New Blitz
            </button>
            <button className="btn-ghost" onClick={() => nav("/")}>
              Home
            </button>
          </div>
        </header>

        {/* per-subject breakdown */}
        {bySubject.length > 1 && (
          <section className="card p-5">
            <h2 className="mb-3 text-sm font-extrabold uppercase tracking-wider text-slate-400">By subject</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {bySubject.map(({ sid, total, ok }) => (
                <div key={sid} className="flex items-center justify-between rounded-xl border border-slate-200/70 px-4 py-3 dark:border-white/5">
                  <SubjectChip id={sid} />
                  <span className="text-sm font-black">
                    {ok}<span className="text-slate-400">/{total}</span>
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* full review */}
        <section>
          <h2 className="mb-4 text-lg font-extrabold">Review all answers</h2>
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
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white/70 text-slate-400 transition hover:text-rose-500 dark:border-white/10 dark:bg-white/5"
          title="Quit blitz"
        >
          ✕
        </button>
        <div className="flex-1">
          <div className="mb-1 flex justify-between text-[11px] font-bold text-slate-400">
            <span>
              Card {idx + 1}/{deck.length}
            </span>
            <span className="text-emerald-500">✓ {score}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-200/80 dark:bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-500 to-violet-500 transition-all duration-500"
              style={{ width: `${((idx + (flipped ? 0.5 : 0)) / deck.length) * 100}%` }}
            />
          </div>
        </div>
        {totalSec > 0 && (
          <div
            className={`shrink-0 rounded-xl border px-3 py-1.5 font-mono text-sm font-black tabular-nums ${
              remaining <= 30
                ? "animate-pulse border-rose-500/40 bg-rose-500/10 text-rose-500"
                : "border-slate-200 bg-white/70 text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
            }`}
          >
            ⏱ {formatTime(remaining)}
          </div>
        )}
      </div>

      {/* card */}
      <div className="mx-auto flex w-full max-w-3xl flex-1 items-center py-6">
        <div className="flip-scene w-full">
          <div key={q.id} className={`flip-card relative w-full ${flipped ? "is-flipped" : ""}`} style={{ minHeight: 420 }}>
            {/* FRONT — question */}
            <div className="flip-face card absolute inset-0 flex flex-col p-6 sm:p-10">
              <div className="flex flex-wrap items-center gap-2">
                <SubjectChip id={q.subject} />
                <DiffChip d={q.difficulty} />
                <span className="hidden text-xs text-slate-400 sm:inline">{q.topic}</span>
                <button
                  onClick={() => toggleBookmark(q.id)}
                  className={`ml-auto text-xl transition hover:scale-110 ${prog.bookmarked ? "text-amber-400" : "text-slate-300 dark:text-slate-600"}`}
                  title="Bookmark"
                >
                  {prog.bookmarked ? "★" : "☆"}
                </button>
              </div>
              {q.company && (
                <span className="mt-3 inline-flex w-fit items-center gap-1 rounded-full border border-violet-500/20 bg-violet-500/10 px-2.5 py-1 text-xs font-semibold text-violet-600 dark:text-violet-300">
                  🏢 {q.company}
                </span>
              )}
              <div className="flex flex-1 items-center">
                <h2 className="animate-slide-up text-xl font-extrabold leading-relaxed sm:text-2xl">{q.question}</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => answer(false)} className="btn-danger !py-4 text-base">
                  ✗ Didn't know
                </button>
                <button onClick={() => answer(true)} className="btn-success !py-4 text-base">
                  ✓ Knew it
                </button>
              </div>
              <p className="mt-3 text-center text-[10px] font-medium text-slate-400">
                Keyboard: <kbd className="rounded bg-slate-200/70 px-1 dark:bg-white/10">K</kbd> knew it ·{" "}
                <kbd className="rounded bg-slate-200/70 px-1 dark:bg-white/10">D</kbd> didn't know
              </p>
            </div>

            {/* BACK — answer */}
            <div className="flip-face flip-back card absolute inset-0 flex flex-col p-6 sm:p-10">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-rose-500/12 px-2.5 py-1 text-xs font-bold text-rose-500">✗ Marked as missed</span>
                <span className="ml-auto text-[10px] font-extrabold uppercase tracking-widest text-brand-500 dark:text-brand-300">
                  Model answer
                </span>
              </div>
              <div
                className="answer-prose scroll-area mt-4 flex-1 overflow-y-auto pr-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300"
                dangerouslySetInnerHTML={{ __html: renderAnswer(q.answer) }}
              />
              <button onClick={() => advance(results)} className="btn-primary mt-5 !py-3.5">
                Next card → <span className="text-xs opacity-70">(space)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal open={confirmQuit} title="Quit this blitz?" onClose={() => setConfirmQuit(false)}>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Progress in this run won't be saved to your history.
        </p>
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
