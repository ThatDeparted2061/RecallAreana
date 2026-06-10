# RecallArena ⚡

Flashcard quizzes + an exhaustive practice library for core-CS SDE interview prep, built from my own question bank: **1,013 questions** across Operating Systems, Computer Networks, DBMS & SQL, OOP & Java, and LLD & System Design. Every question carries a difficulty tag (Easy / Medium / Hard), topic, and — where known — the company it was asked at.

Design: **modern-brutalist / editorial** — mustard `#F4D068`, stark black, off-white cream, oversized Anton display type, hard 2px borders, offset block shadows, marquee banner, custom dot cursor. Light (cream) and noir (black) themes.

## Features

**⚡ Blitz** — the flashcard quiz mode
- Pick subjects, difficulty mix, question pool (all / unseen / mistakes / bookmarks), card count, time per card (or untimed)
- 3-2-1 countdown, then one flashcard at a time: *Knew it* (point, answer stays hidden) or *Didn't know* (card flips to the model answer, no point)
- Global countdown auto-submits; full results review with per-subject breakdown and one-tap "Blitz the missed"
- Keyboard: `K` knew it, `D` didn't know, `Space` next

**📚 Practice Library** — per-subject, paginated (5/10/20/50), answers hidden until clicked, filters for difficulty / topic / search / done / starred / company-tagged, bookmarks + mark-done

**🎯 Review Deck** — blitz mistakes + bookmarks, drillable as a deck
**📈 Scoreboard** — mastery per subject & difficulty, score trend, 14-day activity, streaks, history
**⚙ Controls** — defaults (timer, counts, page size, cursor), JSON export/import, resets

**🔐 Google sign-in + cloud sync (optional)** — sign in with your Gmail and progress follows you across devices (Firebase Auth + Firestore). Without setup, the app runs 100% locally.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/ (single self-contained index.html)
```

## Deploy to Vercel

1. Push to GitHub:
   ```bash
   git remote add origin https://github.com/<you>/recall-arena.git
   git push -u origin main
   ```
2. [vercel.com/new](https://vercel.com/new) → Import the repo → **Deploy** (`vercel.json` handles config).

## Enable Google sign-in (cloud sync) — one-time, ~5 min

1. Go to [console.firebase.google.com](https://console.firebase.google.com) → **Add project** → name it `recall-arena` (Analytics off is fine).
2. **Build → Authentication → Get started → Sign-in method → Google → Enable** → Save.
3. **Build → Firestore Database → Create database** → Production mode → pick `asia-south1` (Mumbai) → Enable.
4. Firestore → **Rules** tab → paste and Publish:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{uid} {
         allow read, write: if request.auth != null && request.auth.uid == uid;
       }
     }
   }
   ```
5. Project overview → **⚙ Project settings → Your apps → Web app (`</>`)** → register (no hosting) → copy the `firebaseConfig` object.
6. Paste it into **`src/firebase-config.ts`** (replace `null`), commit, push — Vercel redeploys.
7. After first deploy: **Authentication → Settings → Authorized domains → Add domain** → your `*.vercel.app` domain (`localhost` already works).

That's it — a **Sign in** button appears in the nav. Progress merges across devices (never overwrites: union of mastered/bookmarks, deduped history).

## Updating the question bank

Edit the markdown in `question-sources/`, then:

```bash
python3 scripts/parse_markdown.py   # regenerates src/data/questions.json
```

## Stack

Vite + React 18 + TypeScript + Tailwind CSS + Firebase (auth + Firestore, optional). Single-file static bundle via `vite-plugin-singlefile` — deploys to any static host.
