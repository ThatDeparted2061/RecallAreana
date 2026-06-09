import { useState } from "react";
import type { Question } from "../types";
import { useApp } from "../lib/store";
import { renderAnswer } from "../lib/utils";
import { DiffChip, SubjectChip } from "./ui";

/**
 * Practice-style question card: answer hidden until revealed.
 * Shows all metadata (difficulty, topic, company tag) + bookmark / done actions.
 */
export default function QuestionCard({
  q,
  showSubject = false,
  defaultOpen = false,
  verdict,
}: {
  q: Question;
  showSubject?: boolean;
  defaultOpen?: boolean;
  /** optional quiz verdict badge: true = knew, false = missed */
  verdict?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const { getProgress, toggleBookmark, toggleMastered, markSeen } = useApp();
  const p = getProgress(q.id);

  const reveal = () => {
    if (!open) markSeen(q.id);
    setOpen(!open);
  };

  return (
    <article className="card animate-fade-in p-5 sm:p-6">
      {/* meta row */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="rounded-lg bg-slate-100 px-2 py-1 font-mono text-[11px] font-bold text-slate-500 dark:bg-white/5 dark:text-slate-400">
          Q{q.number}
        </span>
        <DiffChip d={q.difficulty} />
        {showSubject && <SubjectChip id={q.subject} />}
        <span className="hidden text-xs font-medium text-slate-400 sm:inline">
          {q.topic}
        </span>
        {q.company && (
          <span className="inline-flex items-center gap-1 rounded-full border border-violet-500/20 bg-violet-500/10 px-2.5 py-1 text-xs font-semibold text-violet-600 dark:text-violet-300">
            🏢 {q.company}
          </span>
        )}
        {verdict !== undefined && (
          <span
            className={`ml-auto rounded-full px-2.5 py-1 text-xs font-bold ${
              verdict
                ? "bg-emerald-500/12 text-emerald-600 dark:text-emerald-300"
                : "bg-rose-500/12 text-rose-600 dark:text-rose-300"
            }`}
          >
            {verdict ? "✓ Knew it" : "✗ Missed"}
          </span>
        )}
      </div>

      {/* question */}
      <h3 className="text-[15px] font-bold leading-relaxed sm:text-base">
        {q.question}
      </h3>

      {/* answer */}
      {open && (
        <div className="answer-prose mt-4 animate-fade-in rounded-xl border border-slate-200/80 bg-slate-50/80 p-4 text-sm text-slate-600 dark:border-white/5 dark:bg-white/[0.03] dark:text-slate-300">
          <div className="mb-2 text-[10px] font-extrabold uppercase tracking-widest text-brand-500 dark:text-brand-300">
            Model answer
          </div>
          <div dangerouslySetInnerHTML={{ __html: renderAnswer(q.answer) }} />
        </div>
      )}

      {/* actions */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button onClick={reveal} className={open ? "btn-ghost !py-2 text-xs" : "btn-primary !py-2 text-xs"}>
          {open ? "Hide answer" : "Show answer"}
        </button>
        <button
          onClick={() => toggleMastered(q.id)}
          className={`btn !py-2 text-xs ${
            p.mastered
              ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300"
              : "border border-slate-200 bg-white/60 text-slate-500 hover:text-emerald-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-400"
          }`}
          title="Mark as done / mastered"
        >
          {p.mastered ? "✓ Done" : "Mark done"}
        </button>
        <button
          onClick={() => toggleBookmark(q.id)}
          className={`ml-auto flex h-9 w-9 items-center justify-center rounded-xl border text-base transition ${
            p.bookmarked
              ? "border-amber-400/40 bg-amber-400/15 text-amber-500"
              : "border-slate-200 bg-white/60 text-slate-400 hover:text-amber-500 dark:border-white/10 dark:bg-white/5"
          }`}
          title="Bookmark"
        >
          {p.bookmarked ? "★" : "☆"}
        </button>
      </div>
    </article>
  );
}
