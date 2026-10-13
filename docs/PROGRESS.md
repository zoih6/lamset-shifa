# Progress — Lamset Shifa Reels ad

| Part | t (s) | Status |
|---|---|---|
| Sample S1–S3 + S4 start | 0–16.8 | ✅ rendered, sound QA PASS (−14.07 LUFS, TP −1.95), awaiting approval |
| S4 rest → S9 Wamd outro | 16.8–64.5 | ⏳ after approval |

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
