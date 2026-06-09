import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DIFFICULTIES, QUESTIONS, SUBJECT_BY_ID, SUBJECT_THEME } from "../lib/data";
import type { Difficulty } from "../types";
import { useApp } from "../lib/store";
import { Bar, EmptyState, Pagination, Segmented } from "../components/ui";
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
    <div className="space-y-6 animate-fade-in">
      {/* header */}
      <header className="card relative overflow-hidden p-6 sm:p-8">
        <div className={`pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gradient-to-br ${t.from} ${t.to} opacity-20 blur-3xl`} />
        <div className="relative flex flex-wrap items-center gap-5">
          <span className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${t.from} ${t.to} text-2xl shadow-md`}>
            {t.icon}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <Link to="/practice" className="hover:text-brand-500">Library</Link>
              <span>/</span>
              <span>{subject.name}</span>
            </div>
            <h1 className="truncate text-2xl font-black tracking-tight sm:text-3xl">{subject.name}</h1>
            <div className="mt-2 max-w-md">
              <Bar value={done / subject.count} colorClass={`bg-gradient-to-r ${t.from} ${t.to}`} />
              <div className="mt-1 text-[11px] font-semibold text-slate-400">
                {done}/{subject.count} mastered
              </div>
            </div>
          </div>
          <button
            onClick={() => nav("/blitz", { state: { subjects: [subjectId] } })}
            className="btn-primary"
          >
            ⚡ Blitz this subject
          </button>
        </div>
      </header>

      {/* filters */}
      <section className="card space-y-4 p-5">
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
              <option key={tp} value={tp}>{tp}</option>
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
              { value: "starred", label: "★ Starred" },
              { value: "company", label: "🏢 Company-tagged" },
            ]}
          />
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
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
        <p className="text-xs font-semibold text-slate-400">
          {filtered.length} question{filtered.length !== 1 ? "s" : ""} match · page {page} of {pages}
        </p>
      </section>

      {/* questions */}
      {slice.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="No questions match"
          body="Try loosening the filters or clearing the search."
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

      <Pagination page={page} pages={pages} onPage={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
    </div>
  );
}
