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
| B: seed sprouts, 7 service stations, spectrum infinity | 16.84–37.30 | ✅ |
| C: steps / heart&home / growth / new day / REVEAL «بل رحلة» | 37.30–52.56 | ✅ |
| D: address pin, end card + numbers | 52.56–61.30 | ✅ |
| E: Wamd studio outro (arcs + badge spring + shimmer) | 61.37–64.80 | ✅ |

## v3.0 «الخط الواحد» — FULL (2026-10-13)
- Render: parts p1..p4 (0–16.8 | 16.8–37.6 | 37.6–61.4 | 61.4–64.8), `--sub 6`, → 1944 fr.
- Sound: `export_cues --config audio/sound.json` → mix → qa **0 FAIL / 12 warn** (−14.15 LUFS, TP −1.75), release encodes re-check PASS.
- Sound lessons that mattered: heroes placed ON stressed VO words get crushed by the mix target — partner them with a bright chime (band moves 4–8 k) or they fail the 3 dB body gate; one cue sat at 2.9 dB after 4 rounds → demoted to support (documented), picture still carries the moment (FLASH + spectrum fill).
- encode_release.sh is now orientation-aware (a 9:16 reel was being squished to 1920×1080 and still passing QA — always ffprobe deliverables). v2.0 release assets were re-uploaded at the correct orientation from the master.


**Lessons (v2):**
- qa.py `appear` needs a change ≥ 3× the local motion. In a one-take world the camera is always moving, so hero beats need a hard single-frame event (a `cut` word plus a 1-frame light flash). Find the true frame by frame-diffing the render, then put the cue there.
- Fast camera pans ghost with 2–3 sub-frames. Use a zoom-out "swoop" (lower screen speed) and `--sub 6`.
