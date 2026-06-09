import raw from "../data/questions.json";
import type { Question, QuestionBank, SubjectMeta, Difficulty } from "../types";

const bank = raw as unknown as QuestionBank;

export const SUBJECTS: SubjectMeta[] = bank.subjects;
export const QUESTIONS: Question[] = bank.questions;
export const TOTAL = bank.questions.length;

export const DIFFICULTIES: Difficulty[] = ["Easy", "Medium", "Hard"];

export const SUBJECT_BY_ID: Record<string, SubjectMeta> = Object.fromEntries(
  SUBJECTS.map((s) => [s.id, s])
);

export const QUESTION_BY_ID: Record<string, Question> = Object.fromEntries(
  QUESTIONS.map((q) => [q.id, q])
);

/** Short accent colours per subject (used across the UI). */
export const SUBJECT_THEME: Record<
  string,
  { from: string; to: string; text: string; soft: string; icon: string }
> = {
  os: {
    from: "from-indigo-500",
    to: "to-blue-600",
    text: "text-indigo-500",
    soft: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-300",
    icon: "🧩",
  },
  cn: {
    from: "from-cyan-500",
    to: "to-sky-600",
    text: "text-cyan-500",
    soft: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-300",
    icon: "🌐",
  },
  dbms: {
    from: "from-emerald-500",
    to: "to-teal-600",
    text: "text-emerald-500",
    soft: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
    icon: "🗄️",
  },
  oops: {
    from: "from-orange-500",
    to: "to-amber-600",
    text: "text-orange-500",
    soft: "bg-orange-500/10 text-orange-600 dark:text-orange-300",
    icon: "☕",
  },
  lld: {
    from: "from-fuchsia-500",
    to: "to-pink-600",
    text: "text-fuchsia-500",
    soft: "bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-300",
    icon: "🏗️",
  },
};

export const DIFFICULTY_THEME: Record<
  Difficulty,
  { chip: string; dot: string; ring: string }
> = {
  Easy: {
    chip: "bg-emerald-500/12 text-emerald-600 dark:text-emerald-300 border border-emerald-500/20",
    dot: "bg-emerald-500",
    ring: "text-emerald-500",
  },
  Medium: {
    chip: "bg-amber-500/12 text-amber-600 dark:text-amber-300 border border-amber-500/20",
    dot: "bg-amber-500",
    ring: "text-amber-500",
  },
  Hard: {
    chip: "bg-rose-500/12 text-rose-600 dark:text-rose-300 border border-rose-500/20",
    dot: "bg-rose-500",
    ring: "text-rose-500",
  },
};

export interface QuestionFilter {
  subjects?: string[];
  difficulties?: Difficulty[];
  topics?: string[];
  search?: string;
  companyOnly?: boolean;
}

export function filterQuestions(f: QuestionFilter): Question[] {
  const search = f.search?.trim().toLowerCase();
  return QUESTIONS.filter((q) => {
    if (f.subjects && f.subjects.length && !f.subjects.includes(q.subject))
      return false;
    if (
      f.difficulties &&
      f.difficulties.length &&
      !f.difficulties.includes(q.difficulty)
    )
      return false;
    if (f.topics && f.topics.length && !f.topics.includes(q.topic)) return false;
    if (f.companyOnly && !q.company) return false;
    if (search) {
      const hay = (q.question + " " + q.answer + " " + q.topic).toLowerCase();
      if (!hay.includes(search)) return false;
    }
    return true;
  });
}
