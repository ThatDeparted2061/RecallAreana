import type { ReactNode } from "react";
import type { Difficulty } from "../types";
import { DIFFICULTY_THEME, SUBJECT_THEME, SUBJECT_BY_ID } from "../lib/data";

/* ---------- Difficulty chip ---------- */
export function DiffChip({ d, small }: { d: Difficulty; small?: boolean }) {
  const t = DIFFICULTY_THEME[d];
  return (
    <span
      className={`${t.chip} inline-flex items-center gap-1.5 rounded-full font-semibold ${
        small ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${t.dot}`} />
      {d}
    </span>
  );
}

/* ---------- Subject chip ---------- */
export function SubjectChip({ id, small }: { id: string; small?: boolean }) {
  const t = SUBJECT_THEME[id];
  const name = SUBJECT_BY_ID[id]?.name ?? id;
  return (
    <span
      className={`${t?.soft ?? ""} inline-flex items-center gap-1 rounded-full font-semibold ${
        small ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs"
      }`}
    >
      <span>{t?.icon}</span> {name}
    </span>
  );
}

/* ---------- Progress ring (SVG) ---------- */
export function ProgressRing({
  value,
  size = 96,
  stroke = 8,
  label,
  sub,
  colorClass = "text-brand-500",
}: {
  value: number; // 0..1
  size?: number;
  stroke?: number;
  label?: ReactNode;
  sub?: ReactNode;
  colorClass?: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const v = Math.max(0, Math.min(1, value));
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          className="stroke-slate-200 dark:stroke-white/10"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - v)}
          className={`ring-progress stroke-current ${colorClass}`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-lg font-extrabold leading-none">{label}</span>
        {sub && <span className="mt-0.5 text-[10px] font-medium text-slate-400">{sub}</span>}
      </div>
    </div>
  );
}

/* ---------- Horizontal bar ---------- */
export function Bar({
  value,
  colorClass = "bg-gradient-to-r from-brand-500 to-violet-500",
  className = "",
}: {
  value: number; // 0..1
  colorClass?: string;
  className?: string;
}) {
  return (
    <div className={`h-2 w-full overflow-hidden rounded-full bg-slate-200/80 dark:bg-white/10 ${className}`}>
      <div
        className={`h-full rounded-full ${colorClass} transition-all duration-700`}
        style={{ width: `${Math.max(0, Math.min(1, value)) * 100}%` }}
      />
    </div>
  );
}

/* ---------- Section heading ---------- */
export function SectionTitle({ children, right }: { children: ReactNode; right?: ReactNode }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-3">
      <h2 className="text-lg font-extrabold tracking-tight">{children}</h2>
      {right}
    </div>
  );
}

/* ---------- Empty state ---------- */
export function EmptyState({ icon, title, body, action }: { icon: string; title: string; body?: string; action?: ReactNode }) {
  return (
    <div className="card flex flex-col items-center gap-2 px-6 py-12 text-center">
      <div className="text-4xl">{icon}</div>
      <div className="text-base font-bold">{title}</div>
      {body && <p className="max-w-sm text-sm text-slate-500 dark:text-slate-400">{body}</p>}
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}

/* ---------- Toggle switch ---------- */
export function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label?: string }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      className="flex items-center gap-2.5 text-sm font-medium"
    >
      <span
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
          on ? "bg-gradient-to-r from-brand-500 to-violet-500" : "bg-slate-300 dark:bg-white/15"
        }`}
      >
        <span
          className={`inline-block h-4.5 w-4.5 transform rounded-full bg-white shadow transition ${
            on ? "translate-x-6" : "translate-x-1"
          }`}
          style={{ width: 18, height: 18 }}
        />
      </span>
      {label && <span>{label}</span>}
    </button>
  );
}

/* ---------- Segmented control ---------- */
export function Segmented<T extends string | number>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="inline-flex flex-wrap gap-1 rounded-xl border border-slate-200 bg-white/60 p-1 dark:border-white/10 dark:bg-white/5">
      {options.map((o) => (
        <button
          key={String(o.value)}
          onClick={() => onChange(o.value)}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
            o.value === value
              ? "bg-gradient-to-br from-brand-500 to-violet-600 text-white shadow-sm"
              : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/* ---------- Pagination ---------- */
export function Pagination({
  page,
  pages,
  onPage,
}: {
  page: number; // 1-based
  pages: number;
  onPage: (p: number) => void;
}) {
  if (pages <= 1) return null;
  const items: (number | "…")[] = [];
  const add = (n: number) => {
    if (!items.includes(n)) items.push(n);
  };
  add(1);
  for (let p = page - 1; p <= page + 1; p++) if (p > 1 && p < pages) add(p);
  if (pages > 1) add(pages);
  const withDots: (number | "…")[] = [];
  let prev = 0;
  for (const it of items as number[]) {
    if (prev && it - prev > 1) withDots.push("…");
    withDots.push(it);
    prev = it;
  }
  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5">
      <button
        className="btn-ghost !px-3 !py-1.5 text-xs"
        disabled={page === 1}
        onClick={() => onPage(page - 1)}
      >
        ← Prev
      </button>
      {withDots.map((it, i) =>
        it === "…" ? (
          <span key={`d${i}`} className="px-1 text-slate-400">
            …
          </span>
        ) : (
          <button
            key={it}
            onClick={() => onPage(it)}
            className={`h-8 min-w-8 rounded-lg px-2 text-xs font-bold transition ${
              it === page
                ? "bg-gradient-to-br from-brand-500 to-violet-600 text-white shadow-sm"
                : "border border-slate-200 bg-white/60 text-slate-500 hover:text-slate-800 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:text-slate-100"
            }`}
          >
            {it}
          </button>
        )
      )}
      <button
        className="btn-ghost !px-3 !py-1.5 text-xs"
        disabled={page === pages}
        onClick={() => onPage(page + 1)}
      >
        Next →
      </button>
    </div>
  );
}

/* ---------- Confirm modal ---------- */
export function Modal({
  open,
  title,
  children,
  onClose,
}: {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={onClose} />
      <div className="card relative z-10 w-full max-w-md animate-scale-in p-6">
        <h3 className="mb-3 text-lg font-extrabold">{title}</h3>
        {children}
      </div>
    </div>
  );
}
