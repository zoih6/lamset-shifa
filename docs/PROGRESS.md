# Progress — Lamset Shifa Reels ad

| Part | t (s) | Status |
|---|---|---|
| Sample S1–S3 + S4 start | 0–16.8 | ✅ approved by the client («رهييب اكمله») |
| S4b قدراته · S5 services tree · S6 steps/family/growth · S7 journey · S8 contact + end card · S9 Wamd | 16.8–64.8 | ✅ 3 contact-sheet rounds → rendered in parts p2 (16.8–37.6) + p3 (37.6–64.8) |
| Final mix + QA + release | 0–64.8 | ✅ release v2.0 (v1.0 = the earlier «الخطوة الأولى» ad, untouched) |

## Rebuild after a sandbox reset
```bash
curl -fsSL https://raw.githubusercontent.com/zoih6/motion-doc-studio/main/install.sh | MDS_HOME=/var/tmp/mds bash
git clone https://github.com/zoih6/lamset-shifa && cd lamset-shifa && ln -s /var/tmp/mds/node_modules node_modules
cd film && ffmpeg -i ../VID-20261008-WA0000_033531695.aac -ar 48000 -ac 2 audio/vo.wav && ffmpeg -i audio/music_src.mp3 -ar 48000 -ac 2 audio/music.wav
../tools/sound_layer.sh setup . && ../tools/sound_layer.sh kit .
PAGE=index.html ../tools/cs.sh check 6 1 3 5.3 6.5 10.5 15.8      # contact sheet
PAGE=index.html node ../tools/render.mjs --from 0 --to 16.8 --out out/sample_video.mp4 --workers 1
PAGE=index.html node ../tools/export_cues.mjs && uv run sound-layer/scripts/mix.py audio/cues.json
```

---
# v2 «الخط الواحد» (one line, one take) — started 2026-10-13
Brief + storyboard: `docs/v2/brief.md` · project: `film2/` (engine files are loaded from `../film/`; `film2/kit` → `../film/kit`).
Rebuild the sound inputs (ignored files), from `film2/`:
- `../tools/sound_layer.sh setup . && ../tools/sound_layer.sh kit .`
- `ffmpeg -i audio/music_src.mp3 -ar 48000 -ac 2 audio/music.wav`
- `ffmpeg -i ../VID-…aac -ar 48000 -ac 1 audio/vo.wav`

| Part | Span (s) | Status |
|---|---|---|
| A: touch, footsteps, «نحن هنا», stairs/star, seal, fingerprint | 0–16.8 | ✅ sample rendered (`--sub 6`), sound QA PASS → pre-release `v2-sample` |
| B: discover/grow, 8 services | 16.8–37.3 | ⏳ after sample approval |
| C: steps / heart / family / growth / day, journey pull-back, contact, end card | 37.3–61.3 | ⏳ |
| D: Wamd outro | 61.3–64.8 | ⏳ |

**Lessons (v2):**
- qa.py `appear` needs a change ≥ 3× the local motion. In a one-take world the camera is always moving, so hero beats need a hard single-frame event (a `cut` word plus a 1-frame light flash). Find the true frame by frame-diffing the render, then put the cue there.
- Fast camera pans ghost with 2–3 sub-frames. Use a zoom-out "swoop" (lower screen speed) and `--sub 6`.
