import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DIFFICULTIES, SUBJECTS, SUBJECT_THEME, filterQuestions } from "../lib/data";
import type { Difficulty } from "../types";
import { useApp } from "../lib/store";
import { Segmented, Toggle } from "../components/ui";
import { formatTime } from "../lib/utils";

export type BlitzSource = "all" | "unseen" | "mistakes" | "bookmarks";

export interface BlitzConfig {
  subjects: string[];
  difficulties: Difficulty[];
  source: BlitzSource;
  count: number;
  secondsPerQuestion: number; // 0 = untimed
  shuffle: boolean;
}

const COUNT_PRESETS = [5, 10, 15, 20, 30, 50];

export default function BlitzSetup() {
  const nav = useNavigate();
  const location = useLocation();
  const preset = (location.state ?? {}) as Partial<BlitzConfig>;
  const { prefs, bookmarkedIds, mistakeIds, progress } = useApp();

  const [subjects, setSubjects] = useState<string[]>(preset.subjects ?? SUBJECTS.map((s) => s.id));
  const [difficulties, setDifficulties] = useState<Difficulty[]>(preset.difficulties ?? [...DIFFICULTIES]);
  const [source, setSource] = useState<BlitzSource>(preset.source ?? "all");
  const [count, setCount] = useState(preset.count ?? prefs.defaultCount);
  const [spq, setSpq] = useState(preset.secondsPerQuestion ?? prefs.secondsPerQuestion);
  const [shuffle, setShuffle] = useState(preset.shuffle ?? prefs.shuffle);

  /* pool of eligible questions under current filters */
  const pool = useMemo(() => {
    let qs = filterQuestions({ subjects, difficulties });
    if (source === "bookmarks") qs = qs.filter((q) => bookmarkedIds.includes(q.id));
    if (source === "mistakes") qs = qs.filter((q) => mistakeIds.includes(q.id));
    if (source === "unseen") qs = qs.filter((q) => !progress[q.id]?.seen);
    return qs;
  }, [subjects, difficulties, source, bookmarkedIds, mistakeIds, progress]);

  useEffect(() => {
    if (count > pool.length && pool.length > 0) setCount(Math.min(count, pool.length));
  }, [pool.length]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleSubject = (id: string) =>
    setSubjects((cur) => (cur.includes(id) ? cur.filter((s) => s !== id) : [...cur, id]));
  const toggleDiff = (d: Difficulty) =>
    setDifficulties((cur) => (cur.includes(d) ? cur.filter((x) => x !== d) : [...cur, d]));

  const effectiveCount = Math.min(count, pool.length);
  const totalSec = spq > 0 ? effectiveCount * spq : 0;
  const canStart = effectiveCount > 0 && subjects.length > 0 && difficulties.length > 0;

  const start = () => {
    const config: BlitzConfig = {
      subjects,
      difficulties,
      source,
      count: effectiveCount,
      secondsPerQuestion: spq,
      shuffle,
    };
    nav("/blitz/run", { state: config });
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8 animate-fade-in">
      <header>
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-500 dark:text-brand-300">
          Flashcard quiz
        </p>
        <h1 className="mt-1 text-3xl font-black tracking-tight">
          Build your <span className="gradient-text">Blitz</span> ⚡
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Pick subjects, difficulty and length. Cards come one at a time — call
          <em> knew it </em>or<em> didn't know</em>, honestly.
        </p>
      </header>

      {/* Subjects */}
      <section className="card p-5 sm:p-6">
        <h2 className="mb-3 text-sm font-extrabold uppercase tracking-wider text-slate-400">1 · Subjects</h2>
        <div className="flex flex-wrap gap-2">
          {SUBJECTS.map((s) => {
            const on = subjects.includes(s.id);
            const t = SUBJECT_THEME[s.id];
            return (
              <button
                key={s.id}
                onClick={() => toggleSubject(s.id)}
                className={`chip ${on ? "chip-on" : "chip-off"}`}
              >
                <span>{t.icon}</span>
                {s.name}
                <span className={`text-[10px] ${on ? "text-white/80" : "text-slate-400"}`}>{s.count}</span>
              </button>
            );
          })}
        </div>
        <div className="mt-3 flex gap-3 text-xs font-semibold">
          <button className="text-brand-500 hover:underline" onClick={() => setSubjects(SUBJECTS.map((s) => s.id))}>
            Select all
          </button>
          <button className="text-slate-400 hover:underline" onClick={() => setSubjects([])}>
            Clear
          </button>
        </div>
      </section>

      {/* Difficulty + source */}
      <section className="card p-5 sm:p-6">
        <h2 className="mb-3 text-sm font-extrabold uppercase tracking-wider text-slate-400">2 · Difficulty &amp; pool</h2>
        <div className="flex flex-wrap gap-2">
          {DIFFICULTIES.map((d) => {
            const on = difficulties.includes(d);
            return (
              <button key={d} onClick={() => toggleDiff(d)} className={`chip ${on ? "chip-on" : "chip-off"}`}>
                {d}
              </button>
            );
          })}
        </div>
        <div className="mt-4">
          <Segmented<BlitzSource>
            value={source}
            onChange={setSource}
            options={[
              { value: "all", label: "All questions" },
              { value: "unseen", label: "Unseen only" },
              { value: "mistakes", label: `Mistakes (${mistakeIds.length})` },
              { value: "bookmarks", label: `Bookmarks (${bookmarkedIds.length})` },
            ]}
          />
        </div>
        <p className="mt-3 text-xs font-semibold text-slate-400">
          {pool.length.toLocaleString()} questions match your filters
        </p>
      </section>

      {/* Length + timer */}
      <section className="card p-5 sm:p-6">
        <h2 className="mb-3 text-sm font-extrabold uppercase tracking-wider text-slate-400">3 · Length &amp; timer</h2>

        <div className="flex flex-wrap items-center gap-2">
          {COUNT_PRESETS.map((n) => (
            <button
              key={n}
              onClick={() => setCount(n)}
              disabled={pool.length === 0}
              className={`chip ${count === n ? "chip-on" : "chip-off"}`}
            >
              {n}
            </button>
          ))}
          <div className="ml-1 flex items-center gap-2 text-xs font-semibold text-slate-400">
            or custom
            <input
              type="number"
              min={1}
              max={Math.max(1, pool.length)}
              value={count}
              onChange={(e) => setCount(Math.max(1, Number(e.target.value) || 1))}
              className="input !w-20 !px-2 !py-1.5 text-center"
            />
          </div>
        </div>

        <input
          type="range"
          min={1}
          max={Math.max(1, Math.min(100, pool.length))}
          value={Math.min(count, Math.max(1, pool.length))}
          onChange={(e) => setCount(Number(e.target.value))}
          className="mt-4 w-full accent-indigo-500"
        />

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="mb-1.5 text-xs font-bold text-slate-400">Time per card</div>
            <Segmented<number>
              value={spq}
              onChange={setSpq}
              options={[
                { value: 15, label: "15s" },
                { value: 30, label: "30s" },
                { value: 45, label: "45s" },
                { value: 60, label: "60s" },
                { value: 0, label: "No timer" },
              ]}
            />
          </div>
          <Toggle on={shuffle} onChange={setShuffle} label="Shuffle order" />
        </div>
      </section>

      {/* Summary + start */}
      <section className="card sticky bottom-16 z-30 flex flex-wrap items-center justify-between gap-4 border-brand-500/30 p-5 shadow-glow md:bottom-4">
        <div className="text-sm">
          <span className="font-black">{effectiveCount}</span>
          <span className="text-slate-400"> cards · </span>
          <span className="font-black">{spq > 0 ? formatTime(totalSec) : "untimed"}</span>
          {spq > 0 && <span className="text-slate-400"> total</span>}
        </div>
        <button onClick={start} disabled={!canStart} className="btn-primary !px-8 !py-3 text-base">
          Start Blitz →
        </button>
      </section>
    </div>
  );
}
