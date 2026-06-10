import { useRef, useState } from "react";
import { useApp } from "../lib/store";
import { Modal, Segmented, Toggle } from "../components/ui";
import { TOTAL } from "../lib/data";
import { relativeTime } from "../lib/utils";
import { authErrorMessage } from "../lib/cloud";

const STORAGE_KEY = "recall-arena:v1";

export default function Settings() {
  const {
    prefs,
    setPrefs,
    resetProgress,
    clearHistory,
    progress,
    history,
    cloudEnabled,
    user,
    syncStatus,
    lastSyncedAt,
    signIn,
    signOutNow,
  } = useApp();
  const [confirm, setConfirm] = useState<null | "progress" | "history">(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [importMsg, setImportMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [authErr, setAuthErr] = useState<string | null>(null);

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
    <div className="mx-auto max-w-2xl space-y-10 animate-fade-in">
      <header className="border-b-2 border-ink pb-6 dark:border-cream">
        <p className="meta opacity-50">Make it yours</p>
        <h1 className="display mt-2 text-6xl sm:text-7xl">
          Controls<span className="text-mustard">.</span>
        </h1>
      </header>

      {/* Account / sync */}
      <section className="card-flat p-6">
        <h2 className="meta mb-4 border-b-2 border-ink pb-2 dark:border-cream">Account &amp; sync</h2>
        {!cloudEnabled ? (
          <div className="space-y-3">
            <p className="text-sm font-medium opacity-70">
              Cloud sync is <b>not configured</b>. Your progress lives in this browser only (use
              Export below to move it). To enable Google sign-in + cross-device sync, follow the
              5-minute setup in the README — create a free Firebase project and paste its config
              into <code className="bg-mustard px-1.5 py-0.5 text-ink" style={{ borderRadius: 2 }}>src/firebase-config.ts</code>.
            </p>
          </div>
        ) : user ? (
          <div className="flex flex-wrap items-center gap-4">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt=""
                referrerPolicy="no-referrer"
                className="h-12 w-12 border-2 border-ink object-cover dark:border-cream"
                style={{ borderRadius: 2 }}
              />
            ) : (
              <span
                className="flex h-12 w-12 items-center justify-center border-2 border-ink bg-mustard font-display text-lg text-ink dark:border-cream"
                style={{ borderRadius: 2 }}
              >
                {(user.displayName ?? user.email ?? "?").charAt(0).toUpperCase()}
              </span>
            )}
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-bold">{user.displayName ?? user.email}</div>
              <div className="meta mt-0.5 opacity-60">
                {syncStatus === "synced" && lastSyncedAt && `● Synced ${relativeTime(lastSyncedAt)}`}
                {syncStatus === "syncing" && "○ Syncing…"}
                {syncStatus === "error" && "✕ Sync error — changes kept locally"}
              </div>
            </div>
            <button
              className="btn-ghost !px-5 !py-2"
              onClick={async () => {
                setBusy(true);
                await signOutNow();
                setBusy(false);
              }}
              disabled={busy}
            >
              Sign out
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="max-w-sm text-sm font-medium opacity-70">
                Sign in with Google and your progress follows you to any device.
              </p>
              <button
                className="btn-primary"
                disabled={busy}
                onClick={async () => {
                  setBusy(true);
                  setAuthErr(null);
                  try {
                    await signIn();
                  } catch (e) {
                    console.error(e);
                    setAuthErr(authErrorMessage(e));
                  } finally {
                    setBusy(false);
                  }
                }}
              >
                {busy ? "…" : "Sign in with Google"}
              </button>
            </div>
            {window.location.protocol === "file:" && !authErr && (
              <p className="meta border-2 border-bad p-3 text-bad" style={{ borderRadius: 2 }}>
                Heads-up: you opened this as a file — Google sign-in needs http(s). Run `npm run
                dev` or use your deployed URL.
              </p>
            )}
            {authErr && (
              <p className="meta border-2 border-bad p-3 text-bad" style={{ borderRadius: 2 }}>
                {authErr}
              </p>
            )}
          </div>
        )}
      </section>

      {/* Blitz defaults */}
      <section className="card-flat space-y-5 p-6">
        <h2 className="meta border-b-2 border-ink pb-2 dark:border-cream">Blitz defaults</h2>
        <div>
          <div className="meta mb-2 opacity-60">Time per card</div>
          <Segmented<number>
            value={prefs.secondsPerQuestion}
            onChange={(v) => setPrefs({ secondsPerQuestion: v })}
            options={[
              { value: 15, label: "15s" },
              { value: 30, label: "30s" },
              { value: 45, label: "45s" },
              { value: 60, label: "60s" },
              { value: 0, label: "Off" },
            ]}
          />
        </div>
        <div>
          <div className="meta mb-2 opacity-60">Default number of cards</div>
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

      {/* Interface */}
      <section className="card-flat space-y-5 p-6">
        <h2 className="meta border-b-2 border-ink pb-2 dark:border-cream">Interface</h2>
        <div>
          <div className="meta mb-2 opacity-60">Questions per page (practice)</div>
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
        <Toggle
          on={prefs.fancyCursor}
          onChange={(v) => setPrefs({ fancyCursor: v })}
          label="Custom dot cursor (desktop)"
        />
      </section>

      {/* Data */}
      <section className="card-flat space-y-4 p-6">
        <h2 className="meta border-b-2 border-ink pb-2 dark:border-cream">Your data</h2>
        <p className="text-xs font-medium leading-relaxed opacity-60">
          {seen} of {TOTAL} questions touched · {history.length} blitz
          {history.length !== 1 ? "es" : ""} recorded. Export a backup to move devices manually, or
          sign in above for automatic sync.
        </p>
        <div className="flex flex-wrap gap-2">
          <button className="btn-primary !px-5 !py-2" onClick={exportData}>
            ⬇ Export backup
          </button>
          <button className="btn-ghost !px-5 !py-2" onClick={() => fileRef.current?.click()}>
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
        {importMsg && <p className="meta text-bad">{importMsg}</p>}
      </section>

      {/* Danger zone */}
      <section className="card-flat space-y-3 !border-bad p-6">
        <h2 className="meta border-b-2 border-bad pb-2 text-bad">Danger zone</h2>
        <div className="flex flex-wrap gap-2">
          <button className="btn-danger !px-5 !py-2" onClick={() => setConfirm("progress")}>
            Reset question progress
          </button>
          <button className="btn-danger !px-5 !py-2" onClick={() => setConfirm("history")}>
            Clear history &amp; streak
          </button>
        </div>
        {user && (
          <p className="meta opacity-50">Heads-up: while signed in, resets sync to the cloud too.</p>
        )}
      </section>

      <Modal
        open={confirm !== null}
        title={confirm === "progress" ? "Reset all question progress?" : "Clear history & streak?"}
        onClose={() => setConfirm(null)}
      >
        <p className="text-sm opacity-70">
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
