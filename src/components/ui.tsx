import type { ReactNode } from "react";
import type { Difficulty } from "../types";
import { DIFFICULTY_THEME, SUBJECT_THEME, SUBJECT_BY_ID } from "../lib/data";

/* ---------- Difficulty chip ---------- */
export function DiffChip({ d, small }: { d: Difficulty; small?: boolean }) {
  const t = DIFFICULTY_THEME[d];
  return (
    <span
      className={`${t.chip} inline-flex items-center gap-1.5 rounded-full border-2 font-bold uppercase tracking-meta ${
        small ? "px-2 py-0.5 text-[9px]" : "px-3 py-1 text-[10px]"
      }`}
    >
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
      className={`inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-cream font-bold uppercase tracking-meta text-ink dark:border-cream dark:bg-ink dark:text-cream ${
        small ? "px-2 py-0.5 text-[9px]" : "px-3 py-1 text-[10px]"
      }`}
    >
      <span className="font-display">{t?.index}</span>
      {small ? t?.abbr : name}
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
  colorClass = "text-ink dark:text-mustard",
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
          className="stroke-ink/15 dark:stroke-cream/15"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeDasharray={c}
          strokeDashoffset={c * (1 - v)}
          className={`ring-progress stroke-current ${colorClass}`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-display text-xl leading-none">{label}</span>
        {sub && <span className="meta mt-1 opacity-60">{sub}</span>}
      </div>
    </div>
  );
}

/* ---------- Horizontal bar ---------- */
export function Bar({
  value,
  className = "",
}: {
  value: number; // 0..1
  className?: string;
}) {
  return (
    <div className={`bar-track ${className}`}>
      <div className="bar-fill" style={{ width: `${Math.max(0, Math.min(1, value)) * 100}%` }} />
    </div>
  );
}

/* ---------- Section heading ---------- */
export function SectionTitle({
  kicker,
  children,
  right,
}: {
  kicker?: string;
  children: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="mb-5 flex items-end justify-between gap-3 border-b-2 border-ink pb-3 dark:border-cream">
      <div>
        {kicker && <div className="meta mb-1 opacity-50">{kicker}</div>}
        <h2 className="display text-2xl sm:text-3xl">{children}</h2>
      </div>
      {right}
    </div>
  );
}

/* ---------- Empty state ---------- */
export function EmptyState({ icon, title, body, action }: { icon: string; title: string; body?: string; action?: ReactNode }) {
  return (
    <div className="card flex flex-col items-center gap-3 px-6 py-14 text-center">
      <div className="text-4xl">{icon}</div>
      <div className="display text-2xl">{title}</div>
      {body && <p className="max-w-sm text-sm opacity-70">{body}</p>}
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}

/* ---------- Toggle switch ---------- */
export function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label?: string }) {
  return (
    <button type="button" onClick={() => onChange(!on)} className="flex items-center gap-3 text-left">
      <span
        className={`relative inline-flex h-7 w-12 shrink-0 items-center border-2 border-ink transition-colors dark:border-cream ${
          on ? "bg-ink dark:bg-mustard" : "bg-transparent"
        }`}
        style={{ borderRadius: 2 }}
      >
        <span
          className={`absolute h-4 w-4 transition-all ${
            on ? "left-6 bg-mustard dark:bg-ink" : "left-1 bg-ink dark:bg-cream"
          }`}
          style={{ borderRadius: 1 }}
        />
      </span>
      {label && <span className="meta">{label}</span>}
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
    <div className="inline-flex flex-wrap border-2 border-ink dark:border-cream" style={{ borderRadius: 2 }}>
      {options.map((o, i) => (
        <button
          key={String(o.value)}
          onClick={() => onChange(o.value)}
          className={`px-3.5 py-2 text-[10px] font-bold uppercase tracking-meta transition-colors ${
            i > 0 ? "border-l-2 border-ink dark:border-cream" : ""
          } ${
            o.value === value
              ? "bg-ink text-cream dark:bg-mustard dark:text-ink"
              : "bg-transparent opacity-60 hover:bg-mustard hover:text-ink hover:opacity-100"
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
  const items: number[] = [];
  const add = (n: number) => {
    if (n >= 1 && n <= pages && !items.includes(n)) items.push(n);
  };
  add(1);
  for (let p = page - 1; p <= page + 1; p++) add(p);
  add(pages);
  items.sort((a, b) => a - b);
  const withDots: (number | "…")[] = [];
  let prev = 0;
  for (const it of items) {
    if (prev && it - prev > 1) withDots.push("…");
    withDots.push(it);
    prev = it;
  }
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <button className="btn-ghost !px-4 !py-2" disabled={page === 1} onClick={() => onPage(page - 1)}>
        ← Prev
      </button>
      {withDots.map((it, i) =>
        it === "…" ? (
          <span key={`d${i}`} className="px-1 font-display">…</span>
        ) : (
          <button
            key={it}
            onClick={() => onPage(it)}
            className={`h-10 min-w-10 border-2 border-ink px-2 font-display text-sm transition-colors dark:border-cream ${
              it === page
                ? "bg-ink text-cream dark:bg-mustard dark:text-ink"
                : "bg-transparent hover:bg-mustard hover:text-ink"
            }`}
            style={{ borderRadius: 2 }}
          >
            {it}
          </button>
        )
      )}
      <button className="btn-ghost !px-4 !py-2" disabled={page === pages} onClick={() => onPage(page + 1)}>
        Next →
      </button>
    </div>
  );
}

/* ---------- Modal ---------- */
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
      <div className="absolute inset-0 bg-ink/70" onClick={onClose} />
      <div className="card relative z-10 w-full max-w-md animate-scale-in p-6 !shadow-brutal-lg">
        <h3 className="display mb-4 text-2xl">{title}</h3>
        {children}
      </div>
    </div>
  );
}

/* ---------- Marquee ---------- */
export function Marquee({ text, className = "" }: { text: string; className?: string }) {
  const chunk = (
    <span className="meta mx-0 flex items-center">
      {Array.from({ length: 6 }).map((_, i) => (
        <span key={i} className="flex items-center">
          <span className="px-4 py-2.5">{text}</span>
          <span className="text-mustard dark:text-ink">●</span>
        </span>
      ))}
    </span>
  );
  return (
    <div className={`marquee ${className}`} aria-hidden="true">
      <div className="marquee-track">
        {chunk}
        {chunk}
      </div>
    </div>
  );
}
