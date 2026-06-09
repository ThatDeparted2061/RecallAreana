#!/usr/bin/env python3
import re, json, html, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "question-sources")
OUT = os.path.join(ROOT, "src", "data", "questions.json")

FILES = [
    ("os",   "Operating Systems",   "OS.md"),
    ("cn",   "Computer Networks",   "CN.md"),
    ("dbms", "DBMS & SQL",          "DBMSnSQL.md"),
    ("oops", "OOP & Java",          "OOPnJAVA.md"),
    ("lld",  "LLD & System Design", "LLDnSystemDesign.md"),
]

Q_RE   = re.compile(r'^\s*Q(\d+)\.\s*\[(Easy|Medium|Hard)\]\s*(.*)$')
SEC_RE = re.compile(r'^\s*(\d{1,2})\.\s+([A-Za-z].*\S)\s*$')

def norm_spaces(s):
    s = html.unescape(s)
    s = s.replace('–','-').replace('—','-').replace('’',"'").replace('‘',"'")
    s = s.replace('“','"').replace('”','"')
    s = re.sub(r'[ \t]+', ' ', s)
    return s.strip()

def is_noise(line):
    l = re.sub(r'\s+', ' ', line).strip()
    if not l: return False  # keep blanks for paragraph splitting
    if re.match(r'^Page \d+$', l): return True
    if 'SDE Fresher Question Bank' in l: return True
    if re.match(r'^\d+$', l) and len(l) <= 3: return True  # stray page numbers
    if l == 'Table of Contents': return True
    if re.match(r'^Volume \d+ of \d+', l): return True
    return False

def clean_answer(lines):
    # drop noise lines, then split into paragraphs on blank lines, join wrapped lines
    kept = [ln for ln in lines if not is_noise(ln)]
    paras, cur = [], []
    for ln in kept:
        if ln.strip() == '':
            if cur:
                paras.append(' '.join(cur)); cur = []
        else:
            cur.append(ln.strip())
    if cur: paras.append(' '.join(cur))
    paras = [norm_spaces(p) for p in paras if norm_spaces(p)]
    return '\n\n'.join(paras)

def parse_file(sid, sname, fname):
    path = os.path.join(SRC, fname)
    raw = open(path, encoding='utf-8', errors='replace').read().split('\n')

    # --- canonical TOC titles (numbers 1..N, first occurrence in order) ---
    canon = {}   # num -> normalized title
    for ln in raw:
        m = SEC_RE.match(ln)
        if m:
            n = int(m.group(1)); t = norm_spaces(m.group(2))
            if 1 <= n <= 15 and n not in canon:
                canon[n] = t
        # stop collecting once we hit first question (TOC is before questions)
        if Q_RE.match(ln):
            break

    # --- body section dividers: for each canon title, the LAST line index whose norm title matches ---
    sec_at = {}  # line_index -> title
    for i, ln in enumerate(raw):
        m = SEC_RE.match(ln)
        if m:
            n = int(m.group(1)); t = norm_spaces(m.group(2))
            if n in canon and canon[n] == t:
                sec_at[i] = t  # later occurrences overwrite earlier; we want body (later)
    # But we want, per title, only the latest occurrence as divider:
    title_last = {}
    for i, t in sec_at.items():
        title_last[t] = max(i, title_last.get(t, -1))
    dividers = sorted((i, t) for t, i in title_last.items())

    def section_for(line_idx):
        cur = None
        for i, t in dividers:
            if i <= line_idx: cur = t
            else: break
        return cur or "General"

    # --- find question start line indices ---
    starts = [i for i, ln in enumerate(raw) if Q_RE.match(ln)]
    questions = []
    for k, si in enumerate(starts):
        end = starts[k+1] if k+1 < len(starts) else len(raw)
        block = raw[si:end]
        m = Q_RE.match(block[0])
        qnum = int(m.group(1)); diff = m.group(2)
        qtext_parts = [m.group(3).strip()]
        # walk lines after the Q line: question continuation until note(n ) or MODEL ANSWER
        idx = 1
        source = None
        ans_start = None
        while idx < len(block):
            line = block[idx]
            s = line.strip()
            if s.upper().startswith('MODEL ANSWER'):
                ans_start = idx + 1
                break
            if re.match(r'^n\s+\S', s) or re.match(r'^[••]\s', s):
                source = norm_spaces(re.sub(r'^[n••]\s+', '', s))
                # remaining note lines until MODEL ANSWER are part of source/question note
                idx += 1
                # collect possible extra note lines (rare)
                while idx < len(block) and not block[idx].strip().upper().startswith('MODEL ANSWER') and block[idx].strip():
                    # could be continuation of question wrap appearing after note? unusual; treat as source cont
                    source = norm_spaces(source + ' ' + block[idx].strip())
                    idx += 1
                continue
            if s == '':
                idx += 1; continue
            # continuation of question text
            qtext_parts.append(s)
            idx += 1
        if ans_start is None:
            # no MODEL ANSWER found (shouldn't happen) -> skip answer
            ans_lines = []
        else:
            ans_lines = block[ans_start:]
        question = norm_spaces(' '.join(qtext_parts))
        answer = clean_answer(ans_lines)
        company = None
        if source:
            cm = re.search(r'Asked at ([A-Za-z0-9 .&/\-]+?)(?:\s*\(|$)', source)
            if cm: company = cm.group(1).strip()
        questions.append({
            "id": f"{sid}-{qnum}",
            "subject": sid,
            "subjectName": sname,
            "topic": section_for(si),
            "number": qnum,
            "difficulty": diff,
            "question": question,
            "answer": answer,
            "source": source,
            "company": company,
        })
    return questions, canon

all_q = []
summary = {}
subjects_meta = []
for sid, sname, fname in FILES:
    qs, canon = parse_file(sid, sname, fname)
    all_q.extend(qs)
    topics = []
    seen = set()
    for q in qs:
        if q["topic"] not in seen:
            seen.add(q["topic"]); topics.append(q["topic"])
    subjects_meta.append({"id": sid, "name": sname, "count": len(qs), "topics": topics})
    # diagnostics
    diffs = {}
    empty_ans = 0
    for q in qs:
        diffs[q["difficulty"]] = diffs.get(q["difficulty"],0)+1
        if not q["answer"]: empty_ans += 1
    summary[sid] = {"count": len(qs), "diffs": diffs, "topics": len(topics),
                    "empty_answers": empty_ans, "with_source": sum(1 for q in qs if q["source"]),
                    "with_company": sum(1 for q in qs if q["company"])}

data = {"subjects": subjects_meta, "questions": all_q,
        "meta": {"total": len(all_q), "generated": "RecallArena question bank"}}
json.dump(data, open(OUT,'w',encoding='utf-8'), ensure_ascii=False, indent=1)

print("TOTAL questions:", len(all_q))
for sid, s in summary.items():
    print(f"  {sid}: count={s['count']} topics={s['topics']} diffs={s['diffs']} empty_ans={s['empty_answers']} src={s['with_source']} company={s['with_company']}")
print("\nFile size:", os.path.getsize(OUT), "bytes")
