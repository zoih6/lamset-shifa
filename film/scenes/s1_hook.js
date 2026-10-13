// ═══ S1–S3 · 0.00–14.10 · «لأن كل خطوة صغيرة…» → «نحن هنا…» → logo «بمركز لمسة شفاء…» ═══════════════════
// leaf-steps tap up the frame → the last step is a gold dot → it opens into an arch window (first step)
// → the arch folds into a gold disc under «كبير» → the disc irises open onto hands → the iris closes into the logo ring.
(() => {
  const P = {}, cx = W / 2, POP = [260, 15];
  const AR = { cx: 540, cy: 1262, w: 800, h: 1020, rb: 56 };          // arch window
  const D = { cy: 1010, r: 420 };                                     // gold disc
  const E = { cx: 540, cy: 800, w: 600 };                             // emblem
  const STEP_T = [0.10, 0.29, 0.47, 0.64, 0.80, 0.95];
  const steps = STEP_T.map((t0, i) => ({ t0, x: 540 + (i % 2 ? -58 : 58) + Math.sin(i * .9) * 26, y: 1880 - i * 118, r: -Math.PI / 2 + (i % 2 ? .2 : -.2) }));
  // big framing leaves, partly off-frame (depth): [x, y, rot, L, gold, blur, fromX, fromY]
  const LEAVES = [[-60, 330, -.35, 330, 0, 3, -300, -120], [1150, 560, 3.75, 280, 0, 0, 380, 0], [-40, 1640, .3, 300, 0, 0, -320, 120], [1120, 1780, 3.55, 240, 1, 2, 300, 200]];

  INITS.push(async () => {
    await loadImg('step', 'assets/gen/step.jpg'); await loadImg('hands', 'assets/gen/hands.jpg');
    const D9 = { font: DISPLAY, weight: 900 }, U7 = { font: UI, weight: 700 };
    P.lan = KT.word('لأن', { ...U7, size: 72, color: BR.mint });
    P.kul = KT.word('كل خطوة', { ...D9, size: 132, color: BR.deep });
    P.sag = KT.word('صغيرة', { font: DISPLAY, weight: 800, size: 132, color: BR.gold });
    P.qad = KT.word('قد تكون', { ...U7, size: 72, color: BR.mint });
    P.bid = KT.word('بداية', { ...D9, size: 160, color: BR.deep });
    P.lit = KT.word('لتغيير', { ...U7, size: 76, color: BR.mint });
    P.kab = KT.word('كبير', { ...D9, size: 300, color: BR.deep });
    P.nah = KT.word('نحن هنا', { ...D9, size: 136, color: '#ffffff' });
    P.mus = KT.word('لمساعدتك', { ...U7, size: 74, color: '#e6f2ee' });
    P.ala = KT.word('على الوصول إلى', { ...U7, size: 70, color: '#e6f2ee' });
    P.afd = KT.word('الأفضل', { ...D9, size: 176, color: BR.goldL });
    P.p1 = KT.word('للعلاج الفيزيائي', { ...U7, size: 60, color: '#ffffff' });
    P.p2 = KT.word('وإعادة التأهيل الطبي', { ...U7, size: 60, color: '#ffffff' });
  });

  // ── sound cues (same t0 / springs as the picture) ──
  [0, 2, 4].forEach((i) => cue.appear('step' + i, STEP_T[i], { sound: 'tap', pan: (steps[i].x / 540 - 1) }));
  cue.appear('dot', 1.18, { sound: 'pop/fs-253956-bubble-pop-1' });
  cue.move('arch-open', when.spring(1.40, 'card'), { sound: 'whoosh/fs-449992-whoosh-short-low-wav-1' });
  cue.hero('kabir', when.spring(5.18, POP), { on: 'land', sound: 'thump/fs-133282-thump-on-carpet-2+tap' });
  cue.move('iris-open', when.ease(5.72, 6.32), { sound: 'whoosh/fs-449994-whoosh-med-mid-wav-1' });
  cue.appear('afdal', 8.64, { sound: 'chime' });
  cue.hero('emblem', when.spring(9.40, POP), { on: 'appear', sound: 'thump/fs-187136-body-fall-wav-1+tap' });
  cue.appear('pill1', 11.36, { sound: 'pop/fs-253956-bubble-pop-1' });

  const archPerim = (w, h) => 2 * (w + h) - (4 - Math.PI) * w / 2;

  // ═══ shot A · 0 – 9.0 ═══
  SHOTS.push({ a: 0, b: 9.0, tin: 'cut', draw: (t) => {
    BRAND.stage();
    // 1 · leaf footsteps (each step = a leaf), older steps soften
    const ce = ease(0, 1.45, t), camS = lerp(2.0, 1, ce), camF = lerp(1880, 1290, ce), camA = lerp(1000, 1290, ce);   // camera follows the newest step, then pulls out
    g.save(); g.translate(cx, camA); g.scale(camS, camS); g.translate(-cx, -camF);
    if (t < 2.2) steps.forEach((s, i) => {
      const k = KT.spr(t - s.t0, 'pop'); if (k <= 0) return;
      const age = clamp((t - s.t0 - .25) / .6), L = 118, rk = clamp((t - s.t0 - .06) / .55);
      if (rk > 0 && rk < 1) { g.save(); g.strokeStyle = i === steps.length - 1 ? BR.gold : BR.mint; g.globalAlpha = (1 - rk) * .6; g.lineWidth = 3;
        g.beginPath(); g.ellipse(s.x, s.y, 30 + 90 * KT.eOut(rk), (30 + 90 * KT.eOut(rk)) * .45, 0, 0, 7); g.stroke(); g.restore(); }
      const out = clamp((t - 1.5) / .45);
      BRAND.leaf(s.x - Math.cos(s.r) * L / 2, s.y - Math.sin(s.r) * L / 2, L, s.r, { k: Math.max(0, k), alpha: (1 - age * .45) * (1 - out) });
    });
    g.restore();
    // 2 · gold dot → arch window → gold disc
    const kd = KT.spr(t - 1.18, 'pop');
    if (kd > 0 && t < 5.74) {
      const km = spring(t - 1.40, ...SPR.card), kh = spring(t - 1.47, ...SPR.card), kf = spring(t - 4.92, ...SPR.snap);
      let w = lerp(44 * kd, AR.w, km), h = lerp(44 * kd, AR.h, kh), cy = AR.cy, rb = lerp(w / 2, AR.rb, kh);
      if (t < 1.40) { w = h = 44 * Math.max(0, kd); rb = w / 2; }
      w = lerp(w, D.r * 2, kf); h = lerp(h, D.r * 2, kf); cy = lerp(cy, D.cy, kf); rb = lerp(rb, D.r, kf);
      // hero bump when «كبير» lands
      const bump = 1 + .045 * Math.exp(-Math.max(0, t - 5.26) * 7) * Math.sin(Math.max(0, t - 5.26) * 22) * (t > 5.26 ? 1 : 0);
      w *= bump; h *= bump;
      const grow = 1 + .1 * spring(t - 5.2, ...SPR.card); if (t > 5.2) { w *= grow; h *= grow; }
      const x0 = AR.cx - w / 2, y0 = cy - h / 2, dg = g.createLinearGradient(0, y0, 0, y0 + h); dg.addColorStop(0, BR.goldL); dg.addColorStop(1, BR.gold);
      BRAND.softShadow(() => { BRAND.archPath(g, AR.cx, cy, w, h, w / 2, rb); g.fillStyle = dg; g.fill(); }, { blur: 50, dy: 26, a: .18 * clamp((t - 1.5) * 2) });
      const pa = clamp((t - 1.46) / .22) * (1 - clamp((t - 4.96) / .22));
      if (pa > 0) { g.save(); BRAND.archPath(g, AR.cx, cy, w, h, w / 2, rb); g.clip();
        BRAND.cover(A.step, x0, y0, w, h, { s: lerp(1.2, 1.04, easeOut(1.4, 5.0, t)), fx: .42, fy: .66, alpha: pa });
        g.restore(); }
      // gold hairline arch, offset, trims on after the window settles
      const kl = easeOut(1.9, 2.6, t) * (1 - clamp((t - 4.85) / .15));
      if (kl > 0) { const ow = AR.w + 44, oh = AR.h + 44, Pm = archPerim(ow, oh);
        g.save(); BRAND.archPath(g, AR.cx, AR.cy, ow, oh, ow / 2, AR.rb + 22); g.setLineDash([Pm * kl, Pm]); g.lineDashOffset = -Pm * .25;
        g.strokeStyle = BR.gold; g.lineWidth = 4; g.stroke(); g.restore(); }
    }
    // 3 · type
    KT.show(P.lan, t, { x: cx, y: 300, t0: .98, in: 'rise', dist: 40, t1: 2.96, out: 'lift', outDur: .26 });
    KT.show(P.kul, t, { x: cx, y: 438, t0: 1.66, in: 'mask', t1: 3.0, out: 'lift', outDur: .26 });
    { const ks = KT.spr(t - 2.66, 'snap'), sc = lerp(1, .64, ks);             // «صغيرة» shrinks — it is small
      KT.show(P.sag, t, { x: cx, y: 590 - ks * 40, sc, t0: 2.46, in: 'pop', spring: 'pop', t1: 3.02, out: 'lift', outDur: .26 }); }
    KT.show(P.qad, t, { x: cx, y: 330, t0: 3.04, in: 'rise', dist: 40, t1: 4.30, out: 'lift', outDur: .24 });
    const bb = KT.show(P.bid, t, { x: cx, y: 485, t0: 3.80, in: 'pop', spring: 'pop', t1: 4.34, out: 'lift', outDur: .24 });
    // stair underline: three steps climbing to the reading end (left), ends in a gold head
    { const k = easeOut(3.96, 4.42, t) * (1 - clamp((t - 4.32) / .2));
      if (k > 0) { const y = 600, x1 = 770, x0 = 310, n = 3, st = (x1 - x0) / n, pts = [[x1, y]];
        for (let i = 0; i < n; i++) { pts.push([x1 - st * (i + 1) + 8, y - i * 22]); pts.push([x1 - st * (i + 1), y - (i + 1) * 22]); }
        line(pts, k, { color: BR.gold, width: 8 });
        if (k > .97) { g.fillStyle = BR.gold; g.beginPath(); g.arc(pts[pts.length - 1][0], pts[pts.length - 1][1], 12, 0, 7); g.fill(); } } }
    KT.show(P.lit, t, { x: cx, y: 330, t0: 4.44, in: 'rise', dist: 40, t1: 5.62, out: 'lift', outDur: .22 });
    KT.show(P.kab, t, { x: cx, y: D.cy + 14, t0: 5.18, in: 'zoom', from: 2.4, spring: 'pop', t1: 5.80, out: 'zoom', outDur: .3 });

    // 4 · iris opens onto hands (gold rim leads, photo follows)
    if (t >= 5.70) {
      const kg = ease(5.70, 6.30, t), kp = ease(5.80, 6.42, t), cyI = lerp(D.cy, 960, kg);
      const rg = lerp(D.r * 1.1, 1320, kg), rp = lerp(0, 1320, kp);
      g.save(); g.fillStyle = BR.gold; g.beginPath(); g.arc(cx, cyI, rg, 0, 7); g.fill(); g.restore();
      if (rp > 1) { g.save(); g.beginPath(); g.arc(cx, cyI, rp, 0, 7); g.clip(); drawHands(t); g.restore(); }
    }
    // 5 · S2 type on the photo
    KT.show(P.nah, t, { x: cx, y: 1350, t0: 5.94, in: 'mask', t1: 7.56, out: 'lift', outDur: .26 });
    KT.show(P.mus, t, { x: cx, y: 1490, t0: 6.78, in: 'rise', dist: 36, t1: 7.60, out: 'lift', outDur: .24 });
    KT.show(P.ala, t, { x: cx, y: 1330, t0: 7.70, in: 'rise', dist: 36, t1: 8.96, out: 'lift', outDur: .26 });
    KT.show(P.afd, t, { x: cx, y: 1470, t0: 8.62, in: 'pop', spring: 'pop', t1: 9.0, out: 'lift', outDur: .3 });
    { const k = easeOut(8.74, 9.1, t);
      if (k > 0) { const y = 1600, x1 = 760, x0 = 320, n = 3, st = (x1 - x0) / n, pts = [[x1, y]];
        for (let i = 0; i < n; i++) { pts.push([x1 - st * (i + 1) + 8, y - i * 20]); pts.push([x1 - st * (i + 1), y - (i + 1) * 20]); }
        line(pts, k, { color: BR.goldL, width: 7 }); } }
  } });

  function drawHands(t, alpha = 1) {
    BRAND.cover(A.hands, 0, 0, W, H, { s: lerp(1.16, 1.02, easeOut(5.8, 9.4, t)), fx: .68, fy: .56, alpha });
    const gr = g.createLinearGradient(0, 880, 0, H); gr.addColorStop(0, 'rgba(6,60,54,0)'); gr.addColorStop(.45, 'rgba(6,60,54,.72)'); gr.addColorStop(1, 'rgba(4,46,42,.94)');
    g.save(); g.globalAlpha = alpha; g.fillStyle = gr; g.fillRect(0, 880, W, H - 880); g.restore();
  }

  // ═══ shot B · 9.0 – 14.1 · iris closes into the logo ═══
  SHOTS.push({ a: 9.0, b: 14.1, tin: 'cut', draw: (t) => {
    BRAND.stage();
    const ki = ease(9.0, 9.52, t), icy = lerp(960, E.cy, ki), ir = lerp(1320, 282, ki);
    const out = (t0) => KT.eIn((t - t0) / .32);                         // shared exit curve (13.8+)
    // big framing leaves slide in from outside the frame, sway, leave the same way
    LEAVES.forEach(([x, y, r, L, gold, bl, fx, fy], i) => {
      const k = spring(t - 9.58 - i * .07, ...SPR.card); if (k <= 0) return;
      const ko = out(13.78 + i * .03), m = (1 - k) + ko;
      const px = x + fx * m + Math.sin(t * .8 + i) * 6, py = y + fy * m + Math.cos(t * .7 + i * 2) * 8;
      if (bl) g.filter = `blur(${bl}px)`;
      BRAND.leaf(px, py, L, r + (1 - k) * .5 + Math.sin(t * 1.0 + i * 1.7) * .04, { k: 1, alpha: clamp(k * 3) * (1 - ko), gold: !!gold });
      g.filter = 'none';
    });
    // iris photo + gold rim
    const pa = 1 - clamp((t - 9.42) / .18);
    if (pa > 0) {
      g.save(); g.globalAlpha = pa; g.fillStyle = BR.gold; g.beginPath(); g.arc(cx, icy, ir + 14, 0, 7); g.fill(); g.restore();
      g.save(); g.beginPath(); g.arc(cx, icy, ir, 0, 7); g.clip(); g.globalAlpha = pa; drawHands(t, 1); g.restore();
    }
    // emblem pops out of the closed iris
    { const k = spring(t - 9.40, ...POP); if (k > 0) { const ko = out(13.8), s = lerp(.72, 1, k) * (1 + .012 * Math.sin((t - 9.4) * 1.6)) * (1 - ko * .1);
      const w = E.w * s, h = w * A.emblem.height / A.emblem.width;
      g.save(); g.globalAlpha = clamp((t - 9.40) / .12) * (1 - ko); g.drawImage(A.emblem, E.cx - w / 2, E.cy - h / 2 - ko * 90, w, h); g.restore(); } }
    // wordmark wipes in right → left
    { const k = easeOut(9.95, 10.85, t); if (k > 0) { const ko = out(13.86), w = 900, h = w * A.wordmark.height / A.wordmark.width, x0 = cx - w / 2, y0 = 1112 + (1 - k) * 24 - ko * 90;
      g.save(); g.globalAlpha = 1 - ko; g.beginPath(); g.rect(x0 + w * (1 - k) - 30, y0 - 20, w * k + 60, h + 40); g.clip(); g.drawImage(A.wordmark, x0, y0, w, h); g.restore(); } }
    // two service pills
    [[P.p1, 11.36, 1370], [P.p2, 12.56, 1492]].forEach(([Wd, t0, y], i) => {
      const k = spring(t - t0, ...POP); if (k <= 0) return; const ko = out(13.92 + i * .05);
      g.save(); g.translate((1 - Math.min(1, k)) * 70, -ko * 90); BRAND.pill(Wd, cx, y, Math.max(0, k), { alpha: 1 - ko }); g.restore();
    });
  } });
})();
