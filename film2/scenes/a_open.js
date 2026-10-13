// ═══ A · 0.00–16.84 · touch → footsteps that grow → «نحن هنا» → stairs to a star → the seal → a fingerprint ═══
// One line, one take. World y grows upward (negative). Every figure is drawn by the same pen.
(() => {
  const T = {};                                         // pre-rendered words
  const D7 = { font: DISPLAY, weight: 700 }, D3 = { font: DISPLAY, weight: 300 }, U7 = { font: UI, weight: 700 };
  INITS.push(async () => {
    T.lan = KT.word('لأن', { ...U7, size: 64, color: LP.mint });
    T.kul = KT.word('كل خطوة', { ...D7, size: 158, color: LP.cream });
    T.sag = KT.word('صغيرة', { ...D3, size: 86, color: LP.gold });
    T.qad = KT.word('قد تكون', { ...U7, size: 64, color: LP.mint });
    T.bid = KT.word('بداية', { ...D7, size: 212, color: LP.cream });
    T.lit = KT.word('لتغيير', { ...U7, size: 72, color: LP.mint });
    T.kab = KT.word('كبير', { ...D7, size: 390, color: LP.gold });
    T.nah = KT.word('نحن هنا', { ...D7, size: 138, color: LP.cream });
    T.mus = KT.word('لمساعدتك', { ...U7, size: 64, color: LP.mint });
    T.wus = KT.word('على الوصول إلى', { ...U7, size: 60, color: LP.mint });
    T.afd = KT.word('الأفضل', { ...D7, size: 176, color: LP.gold });
    T.ilaj = KT.word('للعلاج الفيزيائي', { ...U7, size: 66, color: LP.cream });
    T.taa = KT.word('وإعادة التأهيل الطبي', { ...U7, size: 66, color: LP.cream });
    T.nom = KT.word('نؤمن أن', { ...U7, size: 58, color: LP.mint });
    T.lkl = KT.word('لكل حالة', { ...D7, size: 134, color: LP.cream });
    T.eht = KT.word('احتياجاتها', { ...D7, size: 150, color: LP.gold });
    await loadImg('emblem', 'assets/emblem.png'); await loadImg('wmark', 'assets/wordmark_light.png');
  });

  // ── geometry (world) ───────────────────────────────────────────────────────────────────────────────
  const O = [10, 175];                                                         // first touch
  const PH = [70, 92, 120, 156, 200, 255, 320], PY = [0];
  for (let i = 1; i < PH.length; i++) PY.push(PY[i - 1] - (PH[i - 1] + PH[i]) / 2 * .95 - 10);
  const PT = [1.00, 1.52, 2.04, 2.56, 3.08, 3.62, 4.25], PD = [.34, .36, .38, .40, .42, .46, .72];
  const prints = [];
  const N2 = [0, -1720], ELL = { rx: 372, ry: 150, rot: -.05 };                 // «نحن هنا» + its circle
  const ST0 = [-420, -1950], STR = 105, STW = 180, STAR = [330, -2525];
  const M = [0, -3760], R = 290;                                               // the seal (logo)
  const UL1 = M[1] + R + 250, UL2 = UL1 + 150;                                 // subtitle baselines
  const F = [0, -4900];                                                        // fingerprint

  WORLD.build.push(() => {
    LINE.start(O[0], O[1]);
    LINE.key(0, 0); LINE.key(.32, 0);
    // the touch: one small loop around the dot, then down-left into the first heel
    PH.forEach((h, i) => {
      const L = i % 2 === 0, o = { x: (L ? -1 : 1) * h * .42, y: PY[i], sc: h / 160, cx: 50, cy: 85, fx: L ? 1 : -1, rot: L ? -.08 : .08 };
      const subs = LINE.sample(SHAPES.foot, 2).map((s) => LINE.tf(s, o));
      const p0 = subs[0][0];
      // arrive at the heel from below with a soft hook
      if (i === 0) LINE.add(subs, { c1: [O[0] + 120, O[1] - 10], c2: [p0[0] + 70, p0[1] + 70] });
      else LINE.add(subs, { k1: .5, k2: .55, dIn: [0, -1] });
      // mark where the sole (not the connector) begins
      LINE.mark0('p' + i + 's'); prints.push({ subs, o, h });
      LINE.mark('p' + i + 'e');
    });
    // re-key: the connector to each print is drawn quickly before the print itself
    PH.forEach((h, i) => { LINE.key(PT[i], 'p' + i + 's', 'io'); LINE.key(PT[i] + PD[i], 'p' + i + 'e', i === 6 ? 'oo' : 'io'); });
    // ── «نحن هنا»: the line circles the words like a pen would ──
    const ell = []; for (let i = 0; i <= 180; i++) { const a = Math.PI + i / 180 * Math.PI * 2 * 1.07, wob = 1 + .02 * Math.sin(a * 3);
      const x = Math.cos(a) * ELL.rx * wob, y = Math.sin(a) * ELL.ry * wob; ell.push([N2[0] + x * Math.cos(ELL.rot) - y * Math.sin(ELL.rot), N2[1] + x * Math.sin(ELL.rot) + y * Math.cos(ELL.rot)]); }
    LINE.add([ell], { c1: [-260, -1280], c2: [-520, -1640] });
    LINE.mark0('ellA'); LINE.mark('ellB');
    LINE.key(5.25, LINE.M.p6e); LINE.key(5.76, 'ellA', 'io'); LINE.key(6.55, 'ellB', 'o');
    // ── stairs up to a star ──
    const st = [ST0]; for (let k = 0; k < 4; k++) { const [x, y] = st[st.length - 1]; st.push([x, y - STR], [x + STW, y - STR]); }
    LINE.add([densify(st, 4)], { dIn: [0, -1], k1: .35, k2: .5 });
    LINE.mark0('stA'); LINE.mark('stairB');
    const star = densify(SHAPES.star(STAR[0], STAR[1], 88, 38), 4);
    LINE.add([star], { dIn: [0.3, -1] }); LINE.mark0('starA'); LINE.mark('starB');
    LINE.key(7.62, 'ellB'); LINE.key(7.80, 'stA', 'io'); LINE.key(8.48, 'stairB', 'io'); LINE.key(8.58, 'starA', 'io'); LINE.key(8.98, 'starB', 'o');
    T.star = star;
    // ── the seal: a full ring, then the emblem blooms inside ──
    LINE.add([SHAPES.circle(M[0], M[1], R, 0, 1, 240, -1)], { dIn: [0, -1], c1: [STAR[0] + 160, STAR[1] - 260], c2: [M[0] + R + 30, M[1] + 380] });
    LINE.mark0('ringA'); LINE.mark('ringB');
    LINE.key(9.12, 'starB'); LINE.key(9.42, 'ringA', 'io'); LINE.key(10.42, 'ringB', 'io'); LINE.key(10.80, 'ringB');
    // underlines that write the subtitles (RTL)
    LINE.add([densify([[310, UL1 + 52], [-310, UL1 + 52]], 4)], { dIn: [-1, 0], c1: [M[0] + R + 140, M[1] + 120], c2: [520, UL1 + 52] });
    LINE.mark('ul1A'); LINE.M.ul1A = LINE.S - 620; LINE.mark('ul1B');
    LINE.add([densify([[370, UL2 + 52], [-370, UL2 + 52]], 4)], { join: 'lift', liftWt: .02 });
    LINE.M.ul2A = LINE.S - 740; LINE.mark('ul2B');
    LINE.key(11.30, LINE.M.ul1A, 'io'); LINE.key(11.98, 'ul1B', 'lin'); LINE.key(12.56, LINE.M.ul2A, 'io'); LINE.key(13.32, 'ul2B', 'lin');
    // ── fingerprint: the same pen spirals inward — every case is one of a kind ──
    const fp = []; const turns = 10, n = 1300;
    for (let i = 0; i <= n; i++) { const u = i / n, th = Math.PI + u * turns * Math.PI * 2, r = 300 - 272 * u + 5 * Math.sin(th * 3) + 4 * Math.sin(th * 5 + 1) * (1 - u);
      fp.push([F[0] + Math.cos(th) * r * .8 + 12 * Math.sin(u * 9), F[1] + Math.sin(th) * r * (1.02 + .06 * Math.cos(th))]); }
    LINE.add([fp], { dIn: [0, -1], c1: [-700, UL2 + 20], c2: [-560, F[1] + 620] });
    LINE.mark('fpB'); LINE.M.fpA = LINE.S - fpLen(fp);
    LINE.key(13.85, 'ul2B'); LINE.key(14.36, LINE.M.fpA, 'io'); LINE.key(15.95, 'fpB', 'io');
    T.fpA = LINE.M.fpA;
  });
  const fpLen = (p) => p.reduce((a, q, i) => i ? a + Math.hypot(q[0] - p[i - 1][0], q[1] - p[i - 1][1]) : 0, 0);

  // ── camera (world framing) ─────────────────────────────────────────────────────────────────────────
  const ZA = 1.7, ZB = 1.12;
  LCAM.key(0, O[0], O[1] - 40, 3.4, -.04, true);
  LCAM.key(.42, O[0] * .8, O[1] - 90, 2.6, -.02);
  LCAM.key(.9, O[0] * .4, O[1] - 230 / ZA - 30, ZA);
  PH.forEach((h, i) => { const z = lerp(ZA, ZB, i / 6); LCAM.key(PT[i] + PD[i] * .6, i % 2 ? 20 : -20, PY[i] - 260 / z, z, (i % 2 ? .012 : -.012)); });
  LCAM.key(5.22, 0, -1300, 1.05, 0);
  LCAM.key(5.60, 0, -1068, .67, 0, true);                                     // pull back: the steps grew
  LCAM.key(6.30, 0, -1585, 1.0, 0);
  LCAM.key(7.55, 0, -1600, 1.02, 0, true);
  LCAM.key(8.00, 0, -1940, .80, -.01);
  LCAM.key(8.45, 0, -2290, .95, -.025);
  LCAM.key(9.05, 0, -2310, .96, -.025, true);
  LCAM.key(9.40, 120, (-2310 + M[1] + 270) / 2, .58, .03);
  LCAM.key(9.80, 0, M[1] + 270, .90, 0);
  LCAM.key(13.50, 0, M[1] + 280, .935, 0, true);
  LCAM.key(14.02, -140, (M[1] + 280 + F[1] - 30) / 2, .56, -.02);
  LCAM.key(14.55, 0, F[1] - 30, .95, .02);
  LCAM.key(16.84, 0, F[1] - 40, .99, .02);

  // ── sound ──
  cue.appear('touch', .02, { sound: 'pop/fs-253956-bubble-pop-1' });
  cue.hero('kabir', 5.267, { on: 'appear', sound: 'thump/fs-133282-thump-on-carpet-2+tap' });
  cue.move('fly1', when.ease(5.62, 6.30), { sound: 'whoosh/fs-449992-whoosh-short-low-wav-1' });
  cue.appear('star', 8.62, { sound: 'chime' });
  cue.hero('seal', 10.533, { on: 'appear', sound: 'thump/fs-187136-body-fall-wav-1+tap' });
  cue.move('fly3', when.ease(13.50, 14.55), { sound: 'whoosh/fs-449994-whoosh-med-mid-wav-1' });

  // ── world layers ───────────────────────────────────────────────────────────────────────────────────
  INITS.push(async () => {
    // blooms: every footprint lights up small→big on «كبير», the last one solid gold
    prints.forEach((p, i) => { const heel = p.subs[0][0]; BLOOM.add({ t0: 5.16 + i * .035, dur: .42, cx: heel[0], cy: heel[1], r: p.h * 1.3, alpha: i === 6 ? .96 : .28 + i * .05, shape: polyShape(p.subs) }); });
    BLOOM.add({ t0: 8.62, dur: .35, cx: STAR[0], cy: STAR[1], r: 120, alpha: .95, shape: polyShape([T.star]) });
    BLOOM.add({ t0: 10.12, dur: .5, cx: M[0], cy: M[1], r: R, alpha: 1, color: LP.cream, shape: (c) => c.arc(M[0], M[1], R - 22, 0, 7) });
  });
  WORLD.under.push((t) => {
    // touch ripples
    [0, .13, .26].forEach((d, j) => { const k = clamp((t - .04 - d) / 1.0); if (k <= 0 || k >= 1) return; g.save(); g.strokeStyle = j ? LP.mint : LP.gold; g.globalAlpha = (1 - k) * (j ? .45 : .8); g.lineWidth = (j ? 3 : 5) / LCAM.now.z;
      g.beginPath(); g.arc(O[0], O[1], 10 + 170 * KT.eOut(k), 0, 7); g.stroke(); g.restore(); });
    // the first touch lands: a soft gold disc shrinks into the pen
    { const k = clamp(t / .32); if (k < 1) { g.save(); g.fillStyle = LP.gold; g.globalAlpha = .9 * (1 - k); g.beginPath(); g.arc(O[0], O[1], (6 + 40 * (1 - KT.eOut(k))) / LCAM.now.z * 1.6, 0, 7); g.fill(); g.restore(); } }
    // emblem inside the seal
    const k = KT.spr(t - 10.36, 'pop'); if (k > 0 && A.emblem) { const w = (R - 22) * 2 * .8 * Math.max(0, k), h = w * A.emblem.height / A.emblem.width;
      g.save(); g.translate(M[0], M[1] + 4); g.rotate((1 - Math.min(1, k)) * -.25); g.drawImage(A.emblem, -w / 2, -h / 2, w, h); g.restore(); }
  });
  WORLD.over.push((t) => {
    // «نحن هنا» · «لمساعدتك»
    wtext(T.nah, t, { wx: N2[0], wy: N2[1] + 6, t0: 5.86, in: 'mask' });
    wtext(T.mus, t, { wx: 0, wy: N2[1] + 232, t0: 6.80, in: 'rise', dist: 30 });
    wtext(T.wus, t, { wx: -120, wy: -2640, t0: 7.78, in: 'rise', dist: 30 });
    wtext(T.afd, t, { wx: -120, wy: -2485, t0: 8.62, in: 'pop', spring: 'pop' });
    // the seal's wordmark + subtitles written by the pen
    if (A.wmark && t >= 10.525) { const k = KT.eOut((t - 10.525) / .3); { const c = LCAM.now, ww = 700 * c.z * lerp(1.08, 1, k), hh = ww * A.wmark.height / A.wmark.width, [x, y] = LCAM.w2s(M[0], M[1] + R + 105);
      g.save(); g.translate(x, y); g.rotate(c.r); g.drawImage(A.wmark, -ww / 2, -hh / 2, ww, hh); g.restore(); } }
    const pk = (a, b) => clamp((LINE.head(t) - LINE.M[a]) / (LINE.M[b] - LINE.M[a]));
    wpen(T.ilaj, t, { wx: 0, wy: UL1 }, pk('ul1A', 'ul1B'));
    wpen(T.taa, t, { wx: 0, wy: UL2 }, pk('ul2A', 'ul2B'));
    // fingerprint words
    wtext(T.nom, t, { wx: 0, wy: F[1] - 585, t0: 14.25, in: 'rise', dist: 30 });
    wtext(T.lkl, t, { wx: 0, wy: F[1] - 455, t0: 15.04, in: 'mask' });
    wtext(T.eht, t, { wx: 0, wy: F[1] + 478, t0: 15.92, in: 'mask' });
  });
  // screen-space words of the hook (the camera is zooming under them)
  // «احتياجاتها»: a wave of light runs out through the ridges
  (WORLD.lineFx = WORLD.lineFx || []).push((t, px, c) => {
    const k = (t - 15.90) / .85; if (k <= 0 || k >= 1) return; const a = LINE.M.fpA, b = LINE.M.fpB, hd = lerp(b, a, KT.eInOut(k)), band = 1700;
    LINE.stroke(Math.max(a, hd - band * .15), Math.min(b, hd + band), { color: '#fbe7b0', px: px * 1.15, alpha: Math.sin(Math.PI * k), z: c.z, under: .12, core: .8 });
  });
  WORLD.screen.push((t) => {
    KT.show(T.lan, t, { x: 540, y: 470, t0: 1.00, in: 'rise', dist: 30, t1: 3.42, out: 'lift' });
    KT.show(T.kul, t, { x: 540, y: 612, t0: 1.68, in: 'mask', t1: 3.46, out: 'lift' });
    KT.show(T.sag, t, { x: 540, y: 770, t0: 2.48, in: 'rise', dist: 24, t1: 3.50, out: 'lift' });
    KT.show(T.qad, t, { x: 540, y: 500, t0: 3.40, in: 'rise', dist: 30, t1: 4.20, out: 'lift', outDur: .2 });
    KT.show(T.bid, t, { x: 540, y: 668, t0: 3.80, in: 'mask', t1: 4.98, out: 'lift', outDur: .18 });
    KT.show(T.lit, t, { x: 540, y: 420, t0: 4.44, in: 'rise', dist: 30, t1: 5.56, out: 'sink', outDist: 260, outDur: .26 });
    KT.show(T.kab, t, { x: 540, y: 670, t0: 5.255, in: 'cut', t1: 5.60, out: 'sink', outDist: 420, outDur: .28 });
  });
  window.A_OPEN = { O, F, M, R, prints };
})();
