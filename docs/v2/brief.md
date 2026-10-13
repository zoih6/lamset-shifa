# Lamset Shifa · v2 «الخط الواحد» (one line, one take)

**Intake (user, 2026-10-13):** same ad, more beautiful and creative motion graphics, in a NEW style.
- ★ Style «الخط الواحد»: one continuous gold line draws everything in a single take.
- ★ Pure motion graphics, no photos.
- ★ A 15 s sample first.
- ★ Fix motion-doc-studio *after* the ad.

**Format:** Reels 1080×1920, 30 fps. Same VO, same logo; the Wamd outro goes at the end.

## Concept
لمسة = a touch. The film opens on one gold touch point; the pen never lifts again (only tiny hops inside a figure).
- Every idea in the VO is a figure drawn by the same line. The camera films one big world.
- Text never fades out on its own: it stays in the world and leaves with the camera.
- At «بل رحلة» the camera pulls back and reveals that the whole film was ONE path: the journey.

## Look
| Element | Spec |
|---|---|
| Room | deep teal `#063c36` radial, with two soft light pools (12 % parallax), grain and vignette |
| Line | matte gold `#c7a75e` for dried ink with a soft drop shadow (a "raised wire"); the fresh 2600-unit trail is bright `#e9c46b` with a cream core; the pen is a white-gold dot |
| Type | Readex 700 / 300 for display, IBM Plex Sans Arabic 700 for UI; cream `#f7f2e6`, mint `#8fd8c3`, gold accent |
| Brand | the emblem sits on a cream seal drawn by the line; a light wordmark variant (`assets/wordmark_light.png`) |

## Engine (`film2/line.js`)
- **LINE:** points with time-parameter `s`.
  - `fig(svgPath)`, `add(subs, {join: flow|line|lift})`, `mark` / `mark0`;
  - pen keys `key(t, mark, ease)`;
  - `stroke(s0, s1, {shadow, core, under})`.
- **LCAM:** Hermite camera keys with log-zoom and roll; `w2s` / `s2w`.
- **BLOOM:** fills that spread from a point (radial clip).
- **wtext / wpen:** words anchored in the world, or written by the pen (RTL wipe).

## Storyboard (VO word times from `docs/vo_word_timings.json`)
| t (s) | VO | Picture |
|---|---|---|
| 0–1.0 | — | extreme close-up on the touch: a gold disc lands, ripples, the camera pulls back |
| 1.0–5.0 | لأن كل خطوة صغيرة قد تكون بداية | 7 footprints, each bigger, drawn by the pen; the camera climbs with them |
| 5.2 | لتغيير **كبير** | «كبير» slams in; every footprint fills small → big; the camera pulls back (HERO) |
| 5.7–6.8 | نحن هنا لمساعدتك | the line circles «نحن هنا» like a pen |
| 7.7–9.0 | على الوصول إلى الأفضل | stairs rise to a star that fills gold |
| 9.2–10.5 | بمركز لمسة شفاء | the line draws a full ring; a cream seal blooms; the emblem pops; the wordmark hits (HERO) |
| 11.3–13.3 | للعلاج الفيزيائي وإعادة التأهيل الطبي | the pen writes two underlines and the subtitles appear with its edge |
| 14.3–16.8 | نؤمن أن لكل حالة احتياجاتها | the pen spirals a fingerprint; a wave of light runs through the ridges |
| 16.8–21 | ولكل شخص قدراته… تكتشف وتنمى | (part 2) a magnifier finds a seed → a sprout grows into the logo's leaf figure |
| 21–37.3 | the 8 services | (part 2) the line draws 8 icons along a winding path; autism = an infinity loop |
| 37.3–46.5 | نعمل بخطوات مدروسة… | (part 3) measured dotted steps → heart → family house → rising graph → sunrise |
| 46.5–52.6 | لمسة شفاء… بل رحلة نحو حياة أفضل | (part 3) PULL BACK: the whole film is one path; light runs along it end to end |
| 52.6–61.3 | العنوان والأرقام | (part 3) a pin draws → address; a phone draws → numbers; end card |
| 61.3–64.8 | — | Wamd outro |

**Music:** "Good Morning Heaven" by Drakensson, Freesound #529624, CC0 (ambient / inspirational / uplifting).
