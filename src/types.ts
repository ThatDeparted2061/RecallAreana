export type Difficulty = "Easy" | "Medium" | "Hard";

export interface Question {
  id: string;
  subject: string; // subject id e.g. "os"
  subjectName: string;
  topic: string;
  number: number;
  difficulty: Difficulty;
  question: string;
  answer: string;
  source: string | null;
  company: string | null;
}

export interface SubjectMeta {
  id: string;
  name: string;
  count: number;
  topics: string[];
}

export interface QuestionBank {
  subjects: SubjectMeta[];
  questions: Question[];
  meta: { total: number; generated: string };
}

/* ----- persisted progress ----- */
export interface QuestionProgress {
  seen?: boolean;
  mastered?: boolean;
  bookmarked?: boolean;
  /** last self-graded result in a quiz: true = knew it */
  lastKnown?: boolean;
}

export interface QuizAttempt {
  id: string;
  date: number; // epoch ms
  subjects: string[]; // subject ids
  difficulties: Difficulty[];
  total: number;
  score: number;
  durationSec: number;
  mode: string; // "Custom" | "Mistakes" | "Bookmarks" | ...
  results: { qid: string; known: boolean; flagged: boolean }[];
}

export interface Streak {
  current: number;
  longest: number;
  lastStudyDay: string | null; // YYYY-MM-DD
  days: string[]; // list of active days (YYYY-MM-DD)
}

export interface Preferences {
  secondsPerQuestion: number;
  defaultCount: number;
  shuffle: boolean;
  showTimer: boolean;
  /** questions per page in the practice library */
  pageSize: number;
}

export interface AppState {
  theme: "dark" | "light";
  progress: Record<string, QuestionProgress>;
  history: QuizAttempt[];
  streak: Streak;
  prefs: Preferences;
}
