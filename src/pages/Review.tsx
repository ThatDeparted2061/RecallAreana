import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QUESTION_BY_ID } from "../lib/data";
import { useApp } from "../lib/store";
import { EmptyState, Pagination, Segmented } from "../components/ui";
import QuestionCard from "../components/QuestionCard";

type Tab = "mistakes" | "bookmarks";

export default function Review() {
  const nav = useNavigate();
  const { mistakeIds, bookmarkedIds, prefs } = useApp();
  const [tab, setTab] = useState<Tab>(mistakeIds.length > 0 ? "mistakes" : "bookmarks");
  const [page, setPage] = useState(1);

  const ids = tab === "mistakes" ? mistakeIds : bookmarkedIds;
  const questions = useMemo(() => ids.map((id) => QUESTION_BY_ID[id]).filter(Boolean), [ids]);
  const pageSize = prefs.pageSize;
  const pages = Math.max(1, Math.ceil(questions.length / pageSize));
  const slice = questions.slice((page - 1) * pageSize, page * pageSize);

  const switchTab = (t: Tab) => {
    setTab(t);
    setPage(1);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="flex flex-wrap items-end justify-between gap-5 border-b-2 border-ink pb-6 dark:border-cream">
        <div>
          <p className="meta opacity-50">Targeted revision</p>
          <h1 className="display mt-2 text-6xl sm:text-8xl">
            Clear the
            <br />
            Deck<span className="text-bad">.</span>
          </h1>
          <p className="mt-4 max-w-md text-sm font-medium opacity-70">
            Mistakes from blitzes and your starred questions. Drill them to zero before the
            interview.
          </p>
        </div>
        {questions.length > 0 && (
          <button
            className="btn-primary"
            onClick={() =>
              nav("/blitz", {
                state: {
                  source: tab === "mistakes" ? "mistakes" : "bookmarks",
                  count: Math.min(questions.length, 20),
                },
              })
            }
          >
            Blitz this deck ⚡
          </button>
        )}
      </header>

      <Segmented<Tab>
        value={tab}
        onChange={switchTab}
        options={[
          { value: "mistakes", label: `✗ Mistakes ${mistakeIds.length}` },
          { value: "bookmarks", label: `★ Bookmarks ${bookmarkedIds.length}` },
        ]}
      />

      {slice.length === 0 ? (
        tab === "mistakes" ? (
          <EmptyState
            icon="🏆"
            title="No mistakes pending"
            body='Miss a card in a Blitz and it lands here until you master it. "Mark done" also clears it.'
            action={<button className="btn-primary" onClick={() => nav("/blitz")}>Start a Blitz</button>}
          />
        ) : (
          <EmptyState
            icon="☆"
            title="No bookmarks yet"
            body="Tap the star on any question — in practice or mid-blitz — to pin it here."
            action={<button className="btn-ghost" onClick={() => nav("/practice")}>Browse the library</button>}
          />
        )
      ) : (
        <div className="space-y-4">
          {slice.map((q) => (
            <QuestionCard key={q.id} q={q} showSubject />
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
