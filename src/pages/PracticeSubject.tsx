import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DIFFICULTIES, QUESTIONS, SUBJECT_BY_ID, SUBJECT_THEME } from "../lib/data";
import type { Difficulty } from "../types";
import { useApp } from "../lib/store";
import { EmptyState, Pagination, Segmented } from "../components/ui";
import QuestionCard from "../components/QuestionCard";

export default function PracticeSubject() {
  const { subjectId = "" } = useParams();
  const nav = useNavigate();
  const subject = SUBJECT_BY_ID[subjectId];
  const { progress, prefs, setPrefs } = useApp();

  const [diffs, setDiffs] = useState<Difficulty[]>([]);
  const [topic, setTopic] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"all" | "todo" | "done" | "starred" | "company">("all");
  const [page, setPage] = useState(1);

  const pageSize = prefs.pageSize;

  const all = useMemo(() => QUESTIONS.filter((q) => q.subject === subjectId), [subjectId]);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    return all.filter((q) => {
      if (diffs.length && !diffs.includes(q.difficulty)) return false;
      if (topic !== "all" && q.topic !== topic) return false;
      const p = progress[q.id] ?? {};
      if (view === "todo" && p.mastered) return false;
      if (view === "done" && !p.mastered) return false;
      if (view === "starred" && !p.bookmarked) return false;
      if (view === "company" && !q.company) return false;
      if (s && !(q.question + " " + q.answer + " " + q.topic).toLowerCase().includes(s)) return false;
      return true;
    });
  }, [all, diffs, topic, search, view, progress]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  useEffect(() => setPage(1), [diffs, topic, search, view, pageSize]);
  useEffect(() => {
    if (page > pages) setPage(pages);
  }, [page, pages]);

  if (!subject) {
    return (
      <EmptyState
        icon="🤔"
        title="Subject not found"
        action={<Link to="/practice" className="btn-primary">Back to library</Link>}
      />
    );
  }

  const t = SUBJECT_THEME[subjectId];
  const done = all.filter((q) => progress[q.id]?.mastered).length;
  const slice = filtered.slice((page - 1) * pageSize, page * pageSize);
  const toggleDiff = (d: Difficulty) =>
    setDiffs((cur) => (cur.includes(d) ? cur.filter((x) => x !== d) : [...cur, d]));

  return (
    <div className="space-y-8 animate-fade-in">
      {/* header */}
      <header className="-mx-4 -mt-8 border-b-2 border-ink bg-mustard text-ink dark:border-cream sm:-mx-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-5 px-4 pb-6 pt-8 sm:px-6">
          <div className="min-w-0">
            <div className="meta flex items-center gap-2 opacity-60">
              <Link to="/practice" className="underline underline-offset-4 hover:no-underline">
                Library
              </Link>
              <span>/</span>
              <span>{t.abbr}</span>
            </div>
            <h1 className="display mt-1 flex items-end gap-3 text-5xl sm:text-7xl">
              <span className="opacity-25">{t.index}</span>
              {subject.name}
            </h1>
            <div className="meta mt-3">
              {done}/{subject.count} mastered · {subject.topics.length} topics
            </div>
            <div className="mt-2 h-3 w-full max-w-md border-2 border-ink" style={{ borderRadius: 2 }}>
              <div className="h-full bg-ink transition-all duration-700" style={{ width: `${(done / subject.count) * 100}%` }} />
            </div>
          </div>
          <button
            onClick={() => nav("/blitz", { state: { subjects: [subjectId] } })}
            className="btn border-ink bg-ink text-cream hover:bg-cream hover:text-ink"
          >
            Blitz this subject ⚡
          </button>
        </div>
      </header>

      {/* filters */}
      <section className="card-flat space-y-4 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${subject.count} questions…`}
            className="input max-w-xs"
          />
          {DIFFICULTIES.map((d) => (
            <button key={d} onClick={() => toggleDiff(d)} className={`chip ${diffs.includes(d) ? "chip-on" : "chip-off"}`}>
              {d}
            </button>
          ))}
          <select value={topic} onChange={(e) => setTopic(e.target.value)} className="input !w-auto max-w-[16rem]">
            <option value="all">All topics</option>
            {subject.topics.map((tp) => (
              <option key={tp} value={tp}>
                {tp}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Segmented<typeof view>
            value={view}
            onChange={setView}
            options={[
              { value: "all", label: "All" },
              { value: "todo", label: "To do" },
              { value: "done", label: "Done" },
              { value: "starred", label: "★" },
              { value: "company", label: "Company" },
            ]}
          />
          <div className="meta flex items-center gap-2 opacity-70">
            Per page
            <Segmented<number>
              value={pageSize}
              onChange={(v) => setPrefs({ pageSize: v })}
              options={[
                { value: 5, label: "5" },
                { value: 10, label: "10" },
                { value: 20, label: "20" },
                { value: 50, label: "50" },
              ]}
            />
          </div>
        </div>
        <p className="meta opacity-50">
          {filtered.length} match · page {page}/{pages}
        </p>
      </section>

      {/* questions */}
      {slice.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="No questions match"
          body="Loosen the filters or clear the search."
          action={
            <button
              className="btn-ghost"
              onClick={() => {
                setDiffs([]);
                setTopic("all");
                setSearch("");
                setView("all");
              }}
            >
              Clear filters
            </button>
          }
        />
      ) : (
        <div className="space-y-4">
          {slice.map((q) => (
            <QuestionCard key={q.id} q={q} />
          ))}
        </div>
      )}

      <Pagination
        page={page}
        pages={pages}
        onPage={(p) => {
          setPage(p);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    </div>
  );
}
