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
    <div className="mx-auto max-w-3xl space-y-10 animate-fade-in">
      <header className="border-b-2 border-ink pb-6 dark:border-cream">
        <p className="meta opacity-50">Flashcard quiz</p>
        <h1 className="display mt-2 text-6xl sm:text-7xl">
          Build your
          <br />
          Blitz<span className="text-mustard dark:text-mustard">.</span>
        </h1>
        <p className="mt-4 max-w-md text-sm font-medium opacity-70">
          Cards come one at a time. Call <em>knew it</em> or <em>didn't know</em> — honestly. Missed
          cards show the model answer and land in your review deck.
        </p>
      </header>

      {/* 01 — Subjects */}
      <section className="grid gap-4 sm:grid-cols-[5rem_1fr]">
        <div className="display text-5xl opacity-15">01</div>
        <div>
          <h2 className="meta mb-3">Subjects</h2>
          <div className="flex flex-wrap gap-2">
            {SUBJECTS.map((s) => {
              const on = subjects.includes(s.id);
              const t = SUBJECT_THEME[s.id];
              return (
                <button key={s.id} onClick={() => toggleSubject(s.id)} className={`chip ${on ? "chip-on" : "chip-off"}`}>
                  <span className="font-display">{t.index}</span>
                  {s.name}
                  <span className="opacity-60">{s.count}</span>
                </button>
              );
            })}
          </div>
          <div className="meta mt-3 flex gap-4 opacity-60">
            <button className="underline underline-offset-4 hover:no-underline" onClick={() => setSubjects(SUBJECTS.map((s) => s.id))}>
              Select all
            </button>
            <button className="underline underline-offset-4 hover:no-underline" onClick={() => setSubjects([])}>
              Clear
            </button>
          </div>
        </div>
      </section>

      {/* 02 — Difficulty & pool */}
      <section className="grid gap-4 border-t-2 border-ink pt-8 dark:border-cream sm:grid-cols-[5rem_1fr]">
        <div className="display text-5xl opacity-15">02</div>
        <div>
          <h2 className="meta mb-3">Difficulty &amp; pool</h2>
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
                { value: "all", label: "All" },
                { value: "unseen", label: "Unseen" },
                { value: "mistakes", label: `Mistakes ${mistakeIds.length}` },
                { value: "bookmarks", label: `Bookmarks ${bookmarkedIds.length}` },
              ]}
            />
          </div>
          <p className="meta mt-3 opacity-60">{pool.length.toLocaleString()} questions match</p>
        </div>
      </section>

      {/* 03 — Length & timer */}
      <section className="grid gap-4 border-t-2 border-ink pt-8 dark:border-cream sm:grid-cols-[5rem_1fr]">
        <div className="display text-5xl opacity-15">03</div>
        <div>
          <h2 className="meta mb-3">Length &amp; timer</h2>
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
            <div className="meta ml-1 flex items-center gap-2 opacity-70">
              or
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
            className="mt-5"
          />

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="meta mb-2 opacity-60">Time per card</div>
              <Segmented<number>
                value={spq}
                onChange={setSpq}
                options={[
                  { value: 15, label: "15s" },
                  { value: 30, label: "30s" },
                  { value: 45, label: "45s" },
                  { value: 60, label: "60s" },
                  { value: 0, label: "Off" },
                ]}
              />
            </div>
            <Toggle on={shuffle} onChange={setShuffle} label="Shuffle order" />
          </div>
        </div>
      </section>

      {/* Start bar */}
      <section className="card sticky bottom-16 z-30 flex flex-wrap items-center justify-between gap-4 !bg-mustard p-5 !text-ink md:bottom-4">
        <div className="display text-3xl">
          {effectiveCount} <span className="text-base opacity-60">cards</span>{" "}
          {spq > 0 ? formatTime(totalSec) : "∞"}{" "}
          {spq > 0 && <span className="text-base opacity-60">total</span>}
        </div>
        <button
          onClick={start}
          disabled={!canStart}
          className="btn border-ink bg-ink px-10 py-4 text-sm text-cream hover:bg-cream hover:text-ink"
        >
          Start Blitz →
        </button>
      </section>
    </div>
  );
}
