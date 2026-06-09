import { useRef, useState } from "react";
import { useApp } from "../lib/store";
import { Modal, Segmented, Toggle } from "../components/ui";
import { TOTAL } from "../lib/data";

const STORAGE_KEY = "recall-arena:v1";

export default function Settings() {
  const { prefs, setPrefs, resetProgress, clearHistory, progress, history } = useApp();
  const [confirm, setConfirm] = useState<null | "progress" | "history">(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [importMsg, setImportMsg] = useState<string | null>(null);

  const exportData = () => {
    const raw = window.localStorage.getItem(STORAGE_KEY) ?? "{}";
    const blob = new Blob([raw], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `recallarena-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (typeof parsed !== "object" || parsed === null || !("progress" in parsed)) {
          throw new Error("bad shape");
        }
        window.localStorage.setItem(STORAGE_KEY, String(reader.result));
        setImportMsg("Imported! Reloading…");
        setTimeout(() => window.location.reload(), 700);
      } catch {
        setImportMsg("That file doesn't look like a RecallArena backup.");
      }
    };
    reader.readAsText(file);
  };

  const seen = Object.values(progress).filter((p) => p.seen).length;

  return (
    <div className="mx-auto max-w-2xl space-y-8 animate-fade-in">
      <header>
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-500 dark:text-brand-300">
          Make it yours
        </p>
        <h1 className="mt-1 text-3xl font-black tracking-tight">
          Settings <span className="gradient-text">&amp; Data</span> ⚙
        </h1>
      </header>

      {/* Blitz defaults */}
      <section className="card space-y-5 p-6">
        <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-400">Blitz defaults</h2>
        <div>
          <div className="mb-1.5 text-xs font-bold text-slate-400">Time per card</div>
          <Segmented<number>
            value={prefs.secondsPerQuestion}
            onChange={(v) => setPrefs({ secondsPerQuestion: v })}
            options={[
              { value: 15, label: "15s" },
              { value: 30, label: "30s" },
              { value: 45, label: "45s" },
              { value: 60, label: "60s" },
              { value: 0, label: "No timer" },
            ]}
          />
        </div>
        <div>
          <div className="mb-1.5 text-xs font-bold text-slate-400">Default number of cards</div>
          <Segmented<number>
            value={prefs.defaultCount}
            onChange={(v) => setPrefs({ defaultCount: v })}
            options={[
              { value: 5, label: "5" },
              { value: 10, label: "10" },
              { value: 15, label: "15" },
              { value: 20, label: "20" },
              { value: 30, label: "30" },
            ]}
          />
        </div>
        <Toggle on={prefs.shuffle} onChange={(v) => setPrefs({ shuffle: v })} label="Shuffle cards by default" />
      </section>

      {/* Practice */}
      <section className="card space-y-5 p-6">
        <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-400">Practice library</h2>
        <div>
          <div className="mb-1.5 text-xs font-bold text-slate-400">Questions per page</div>
          <Segmented<number>
            value={prefs.pageSize}
            onChange={(v) => setPrefs({ pageSize: v })}
            options={[
              { value: 5, label: "5" },
              { value: 10, label: "10" },
              { value: 20, label: "20" },
              { value: 50, label: "50" },
            ]}
          />
        </div>
      </section>

      {/* Data */}
      <section className="card space-y-4 p-6">
        <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-400">Your data</h2>
        <p className="text-xs leading-relaxed text-slate-400">
          Everything is stored locally in your browser — {seen} of {TOTAL} questions touched,{" "}
          {history.length} blitz{history.length !== 1 ? "es" : ""} recorded. Export a backup to move
          devices, import to restore.
        </p>
        <div className="flex flex-wrap gap-2">
          <button className="btn-primary !py-2 text-xs" onClick={exportData}>
            ⬇ Export backup
          </button>
          <button className="btn-ghost !py-2 text-xs" onClick={() => fileRef.current?.click()}>
            ⬆ Import backup
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && importData(e.target.files[0])}
          />
        </div>
        {importMsg && <p className="text-xs font-bold text-brand-500">{importMsg}</p>}
      </section>

      {/* Danger zone */}
      <section className="card space-y-3 border-rose-500/20 p-6">
        <h2 className="text-sm font-extrabold uppercase tracking-wider text-rose-500">Danger zone</h2>
        <div className="flex flex-wrap gap-2">
          <button className="btn-danger !py-2 text-xs" onClick={() => setConfirm("progress")}>
            Reset question progress
          </button>
          <button className="btn-danger !py-2 text-xs" onClick={() => setConfirm("history")}>
            Clear history &amp; streak
          </button>
        </div>
      </section>

      <Modal
        open={confirm !== null}
        title={confirm === "progress" ? "Reset all question progress?" : "Clear history & streak?"}
        onClose={() => setConfirm(null)}
      >
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {confirm === "progress"
            ? "Mastered marks, bookmarks and seen-status on every question will be wiped. Quiz history stays."
            : "All blitz attempts and your streak will be deleted. Question progress stays."}{" "}
          This can't be undone.
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <button className="btn-ghost" onClick={() => setConfirm(null)}>
            Cancel
          </button>
          <button
            className="btn-danger"
            onClick={() => {
              if (confirm === "progress") resetProgress();
              else clearHistory();
              setConfirm(null);
            }}
          >
            Yes, do it
          </button>
        </div>
      </Modal>
    </div>
  );
}
