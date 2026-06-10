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

/** Editorial-brutalist theming: subjects keyed by index number + icon, not color. */
export const SUBJECT_THEME: Record<
  string,
  { index: string; abbr: string; icon: string }
> = {
  os: { index: "01", abbr: "OS", icon: "🧩" },
  cn: { index: "02", abbr: "CN", icon: "🌐" },
  dbms: { index: "03", abbr: "DBMS", icon: "🗄️" },
  oops: { index: "04", abbr: "OOP", icon: "☕" },
  lld: { index: "05", abbr: "LLD", icon: "🏗️" },
};

export const DIFFICULTY_THEME: Record<
  Difficulty,
  { chip: string; dot: string; ring: string }
> = {
  Easy: {
    chip: "border-ink bg-ok text-ink dark:border-cream",
    dot: "bg-ok",
    ring: "text-ok",
  },
  Medium: {
    chip: "border-ink bg-mustard text-ink dark:border-cream",
    dot: "bg-mustard",
    ring: "text-mustard",
  },
  Hard: {
    chip: "border-ink bg-bad text-ink dark:border-cream",
    dot: "bg-bad",
    ring: "text-bad",
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
