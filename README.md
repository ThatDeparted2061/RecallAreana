# RecallArena ⚡

Flashcard quizzes + an exhaustive practice library for core-CS SDE interview prep, built from my own question bank: **1,013 questions** across Operating Systems, Computer Networks, DBMS & SQL, OOP & Java, and LLD & System Design. Every question carries a difficulty tag (Easy / Medium / Hard), topic, and — where known — the company it was asked at.

## Features

**⚡ Blitz** — the flashcard quiz mode
- Pick subjects, difficulty mix, question pool (all / unseen / mistakes / bookmarks), number of cards, and time per card (or untimed)
- 3-2-1 countdown, then one flashcard at a time: call *Knew it* (point, answer stays hidden) or *Didn't know* (card flips to the model answer, no point)
- Global countdown timer sized to your quiz; auto-submits when time runs out
- Full results review: score, per-subject breakdown, every answer expanded for the ones you missed, and a one-tap "Blitz the missed" re-run
- Keyboard: `K` knew it, `D` didn't know, `Space` next

**📚 Practice Library** — exhaustive study mode
- Per-subject, paginated (5/10/20/50 per page) — never one giant page
- Answers hidden until you click *Show answer*
- Filter by difficulty, topic, search text, done/to-do, starred, company-tagged
- Mark questions done, bookmark them

**🎯 Review Deck** — mistakes from blitzes + bookmarks, with "Blitz this deck"

**📈 Stats** — mastery per subject and difficulty, blitz score trend, 14-day activity, streaks, full history

**⚙ Settings** — your defaults (timer, counts, page size), JSON export/import of all progress, resets

All progress lives in `localStorage` — no account, no backend, works offline once loaded.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/ (single self-contained index.html)
```

## Deploy to Vercel

1. Push this repo to GitHub:
   ```bash
   git remote add origin https://github.com/<you>/recall-arena.git
   git push -u origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new) → Import the repo.
3. Vercel reads `vercel.json` (Vite, `npm run build:nocheck`, output `dist`) — just click **Deploy**.

Or from the CLI: `npx vercel` in this folder.

## Updating the question bank

The source markdown lives in `question-sources/`. After editing those files:

```bash
python3 scripts/parse_markdown.py   # regenerates src/data/questions.json
```

## Stack

Vite + React 18 + TypeScript + Tailwind CSS. Built as a single-file static bundle (`vite-plugin-singlefile`) — deployable on any static host, even openable straight from `file://`.
