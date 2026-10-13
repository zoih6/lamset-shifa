# Progress — Lamset Shifa Reels ad

| Part | t (s) | Status |
|---|---|---|
| Sample S1–S3 + S4 start | 0–16.8 | ✅ approved by the client («رهييب اكمله») |
| S4b قدراته · S5 services tree · S6 steps/family/growth · S7 journey · S8 contact + end card · S9 Wamd | 16.8–64.8 | ✅ 3 contact-sheet rounds → rendered in parts p2 (16.8–37.6) + p3 (37.6–64.8) |
| Final mix + QA + release | 0–64.8 | see release v1.0 |

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
