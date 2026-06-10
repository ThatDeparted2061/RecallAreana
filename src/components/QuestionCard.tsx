import { useState } from "react";
import type { Question } from "../types";
import { useApp } from "../lib/store";
import { renderAnswer } from "../lib/utils";
import { DiffChip, SubjectChip } from "./ui";

/**
 * Practice-style question card: answer hidden until revealed.
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
    <article className="card-flat animate-fade-in p-5 sm:p-6">
      {/* meta row */}
      <div className="flex flex-wrap items-center gap-2">
        <span
          className="border-2 border-ink px-2 py-0.5 font-display text-xs dark:border-cream"
          style={{ borderRadius: 2 }}
        >
          Q{q.number}
        </span>
        <DiffChip d={q.difficulty} />
        {showSubject && <SubjectChip id={q.subject} small />}
        <span className="meta hidden opacity-40 sm:inline">{q.topic}</span>
        {q.company && (
          <span
            className="meta border-2 border-ink bg-mustard px-2 py-0.5 text-ink dark:border-cream"
            style={{ borderRadius: 2 }}
          >
            {q.company}
          </span>
        )}
        {verdict !== undefined && (
          <span
            className={`meta ml-auto border-2 border-ink px-2.5 py-1 text-ink dark:border-cream ${
              verdict ? "bg-ok" : "bg-bad"
            }`}
            style={{ borderRadius: 2 }}
          >
            {verdict ? "✓ Knew it" : "✗ Missed"}
          </span>
        )}
      </div>

      {/* question */}
      <h3 className="mt-3 text-[15px] font-bold leading-relaxed sm:text-base">{q.question}</h3>

      {/* answer */}
      {open && (
        <div
          className="answer-prose mt-4 animate-fade-in border-2 border-ink bg-paper p-4 text-sm text-ink dark:border-cream dark:bg-cream/5 dark:text-cream/90"
          style={{ borderRadius: 2 }}
        >
          <div className="meta mb-2 opacity-50">Model answer</div>
          <div dangerouslySetInnerHTML={{ __html: renderAnswer(q.answer) }} />
        </div>
      )}

      {/* actions */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button onClick={reveal} className={`${open ? "btn-ghost" : "btn-primary"} !px-5 !py-2`}>
          {open ? "Hide answer" : "Show answer"}
        </button>
        <button
          onClick={() => toggleMastered(q.id)}
          className={`btn !px-5 !py-2 ${
            p.mastered
              ? "border-ink bg-ok text-ink hover:bg-ink hover:text-ok dark:border-cream"
              : "border-ink/30 bg-transparent text-ink/50 hover:border-ink hover:text-ink dark:border-cream/30 dark:text-cream/50 dark:hover:border-cream dark:hover:text-cream"
          }`}
        >
          {p.mastered ? "✓ Done" : "Mark done"}
        </button>
        <button
          onClick={() => toggleBookmark(q.id)}
          title="Bookmark"
          className={`ml-auto flex h-10 w-10 items-center justify-center border-2 text-lg transition-colors ${
            p.bookmarked
              ? "border-ink bg-mustard text-ink dark:border-cream"
              : "border-ink/30 text-ink/40 hover:border-ink hover:text-ink dark:border-cream/30 dark:text-cream/40 dark:hover:border-cream dark:hover:text-cream"
          }`}
          style={{ borderRadius: 2 }}
        >
          {p.bookmarked ? "★" : "☆"}
        </button>
      </div>
    </article>
  );
}
