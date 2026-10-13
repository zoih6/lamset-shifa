#!/usr/bin/env python3
"""Force-align the HUMAN-VERIFIED VO script to the audio, using whisper word timings as anchors.
usage: uv run --with faster-whisper --with numpy python3 tools/align_vo.py assets/vo/vo.aac docs/vo_script.txt docs/vo_word_timings.json
Writes: docs/vo_word_timings.json (words, aligned) + docs/vo_timeline.md
"""
import sys, json, re, difflib, subprocess
import numpy as np

src, script, out = sys.argv[1], sys.argv[2], sys.argv[3]

def norm(w):
    w = re.sub(r'[\u064B-\u0652\u0640]', '', w)          # diacritics + tatweel
    w = w.replace('أ','ا').replace('إ','ا').replace('آ','ا').replace('ٱ','ا')
    w = w.replace('ى','ي').replace('ة','ه').replace('ؤ','و').replace('ئ','ي')
    w = re.sub(r'[^\w]', '', w)
    return w

gt_text = open(script, encoding='utf-8').read().strip()
gt_words = gt_text.split()

pcm = subprocess.run(['ffmpeg','-v','error','-i',src,'-ac','1','-ar','16000','-f','f32le','-'],
                     capture_output=True, check=True).stdout
audio = np.frombuffer(pcm, np.float32); dur = len(audio)/16000

from faster_whisper import WhisperModel
m = WhisperModel('small', device='cpu', compute_type='int8', cpu_threads=2)
segs, _ = m.transcribe(audio, language='ar', word_timestamps=True, beam_size=5,
                       temperature=0.0, condition_on_previous_text=False,
                       vad_filter=False, initial_prompt=gt_text)
asr = []
for s in segs:
    for w in (s.words or []):
        asr.append(dict(w=w.word.strip(), s=round(w.start,2), e=round(w.end,2)))
print(f"ASR words: {len(asr)}  GT words: {len(gt_words)}  audio {dur:.2f}s")

asr_n = [norm(a['w']) for a in asr]
gt_n  = [norm(w) for w in gt_words]

sm = difflib.SequenceMatcher(None, gt_n, asr_n, autojunk=False)
times = [None]*len(gt_words)
matched = 0
for i, j, n in sm.get_matching_blocks():
    for k in range(n):
        times[i+k] = (asr[j+k]['s'], asr[j+k]['e']); matched += 1
print(f"exact word matches: {matched}/{len(gt_words)}")

# interpolate the unmatched GT words between the nearest anchored neighbours (char-weighted)
def fill():
    last = None
    for i, t in enumerate(times):
        if t: last = i; continue
        nxt = next((k for k in range(i+1, len(times)) if times[k]), None)
        if last is None and nxt is None:
            times[i] = (0.0, dur); continue
        if last is None:
            e0 = times[nxt][0]; span = [i, nxt]
            a = e0 - sum(len(gt_words[x]) for x in span)*0.06
        elif nxt is None:
            a = times[last][1]
        else:
            a = times[last][1]; e0 = times[nxt][0]
        if nxt is None:
            total = sum(len(gt_words[x]) for x in range(last+1, len(gt_words)))
            acc = a; 
            for x in range(last+1, len(gt_words)):
                L = len(gt_words[x])*0.06 + 0.03
                if times[x] is None: times[x] = (round(acc,2), round(acc+L,2))
                acc += len(gt_words[x])*0.06 + 0.03
            return
        gap = [x for x in range(last+1, nxt)]
        total = sum(len(gt_words[x]) for x in gap) or 1
        span = max(0.05, e0 - a); acc = a
        for x in gap:
            L = span * len(gt_words[x]) / total
            times[x] = (round(acc,2), round(acc+L,2)); acc += L
    # leading words before first anchor
    first = next((i for i,t in enumerate(times) if t), None)
    if first:
        acc = max(0.0, times[first][0] - sum(len(gt_words[x]) for x in range(first))*0.06)
        for x in range(first):
            L = len(gt_words[x])*0.06 + 0.02
            times[x] = (round(acc,2), round(acc+L,2)); acc += L
fill()
times[0] = (times[0][0], times[0][1])
# build segments by sentence punctuation of the GT script
segs_out, cur = [], []
start_idx = 0
pieces = re.split(r'(?<=[.:،,])\s+', gt_text)
idx = 0
for p in pieces:
    ws = p.split()
    if not ws: continue
    s = times[idx][0]; e = times[idx+len(ws)-1][1]
    segs_out.append(dict(s=round(s,2), e=round(e,2), text=' '.join(ws),
                         words=[dict(w=w, s=times[idx+k][0], e=times[idx+k][1]) for k,w in enumerate(ws)]))
    idx += len(ws)
json.dump(segs_out, open(out,'w'), ensure_ascii=False, indent=1)
md = out.replace('word_timings','timeline').replace('.json','.md')
with open(md,'w',encoding='utf-8') as f:
    f.write(f"# VO timeline — HUMAN SCRIPT aligned to audio ({dur:.2f}s)\n\n| start | end | text |\n|---|---|---|\n")
    for r in segs_out: f.write(f"| {r['s']:.2f} | {r['e']:.2f} | {r['text']} |\n")
print('wrote', out, md)
for r in segs_out: print(f"{r['s']:6.2f}–{r['e']:6.2f}  {r['text']}")
