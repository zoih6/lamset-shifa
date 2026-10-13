// ═══ S4 · 14.10–21.00 · «نؤمن أن لكل حالة احتياجاتها، ولكل شخص قدراته التي تستحق أن تكتشف وتنمى» ═══
// every case is different → a cluster of unique soft shapes, each with its own rhythm.
(() => {
  const P = {}, cx = W / 2, POP = [260, 15];
  // [kind, x, y, size, colour, rot0, spin]
  const SH = [
    ['circle', 300, 1180, 150, BR.teal, 0, .0],
    ['rsq', 640, 1130, 190, BR.mint, .25, .18],
    ['leaf', 860, 1360, 230, BR.teal, -1.2, .1],
    ['tri', 230, 1470, 190, BR.deep, -.2, -.14],
    ['hex', 540, 1430, 180, BR.leafL, .1, .12],
    ['pill', 760, 1640, 240, BR.gold, -.35, 0],
    ['ring', 380, 1720, 120, BR.mint, 0, 0],
  ];
  const ST = SH.map((_, i) => 15.40 + i * .075);

  INITS.push(async () => {
    P.nom = KT.word('نؤمن أن', { font: UI, weight: 700, size: 80, color: BR.mint });
    P.kul = KT.word('لكل حالة', { font: DISPLAY, weight: 900, size: 150, color: BR.deep });
    P.ihk = KT.word('احتياجاتها', { font: DISPLAY, weight: 800, size: 124, color: BR.gold });
    await loadImg('blocks', 'assets/gen/blocks.jpg');
    P.wlk = KT.word('ولكل شخص', { font: UI, weight: 700, size: 80, color: BR.mint });
    P.qud = KT.word('قدراته', { font: DISPLAY, weight: 900, size: 176, color: BR.deep });
    P.tst = KT.word('التي تستحق أن', { font: UI, weight: 700, size: 76, color: BR.mint });
    P.tkt = KT.word('تُكتشف', { font: DISPLAY, weight: 900, size: 140, color: BR.deep });
    P.tnm = KT.word('وتُنمّى', { font: DISPLAY, weight: 900, size: 140, color: BR.gold });
  });
  cue.appear('discover', 19.66, { sound: 'shimmer' });
  const AR = { cx: 540, cy: 1300, w: 780, h: 880, rb: 56 };
  cue.appear('seed', 14.30, { sound: 'pop/fs-253956-bubble-pop-1' });

  function shape(kind, s, color) {
    g.fillStyle = color; g.strokeStyle = color; g.beginPath();
    if (kind === 'circle') { g.arc(0, 0, s / 2, 0, 7); g.fill(); }
    else if (kind === 'rsq') { BRAND.archPath(g, 0, 0, s, s, s * .26, s * .26); g.fill(); }
    else if (kind === 'leaf') { g.translate(-s / 2, 0); BRAND.leafPath(g, s, s * .34); g.fill(); }
    else if (kind === 'tri') { const r = s * .58; g.lineJoin = 'round'; g.lineWidth = s * .16;
      for (let i = 0; i < 3; i++) { const a = -Math.PI / 2 + i * Math.PI * 2 / 3; i ? g.lineTo(Math.cos(a) * r, Math.sin(a) * r) : g.moveTo(Math.cos(a) * r, Math.sin(a) * r); }
      g.closePath(); g.stroke(); g.fill(); }
    else if (kind === 'hex') { const r = s / 2; for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; i ? g.lineTo(Math.cos(a) * r, Math.sin(a) * r) : g.moveTo(Math.cos(a) * r, Math.sin(a) * r); } g.closePath(); g.fill(); }
    else if (kind === 'pill') { BRAND.archPath(g, 0, 0, s, s * .42, s * .21, s * .21); g.fill(); }
    else if (kind === 'ring') { g.lineWidth = s * .2; g.arc(0, 0, s / 2 - s * .1, 0, 7); g.stroke(); }
  }

  SHOTS.push({ a: 14.1, b: 21.0, tin: 'cut', draw: (t) => {
    BRAND.stage();
    KT.show(P.nom, t, { x: cx, y: 560, t0: 14.12, in: 'rise', dist: 40, t1: 16.80, out: 'lift', outDur: .26 });
    KT.show(P.kul, t, { x: cx, y: 700, t0: 15.02, in: 'mask', t1: 16.83, out: 'lift', outDur: .26 });
    KT.show(P.ihk, t, { x: cx, y: 868, t0: 15.88, in: 'pop', spring: 'pop', t1: 16.86, out: 'lift', outDur: .26 });
    // ── S4b · «ولكل شخص قدراته…» ──
    KT.show(P.wlk, t, { x: cx, y: 450, t0: 16.84, in: 'rise', dist: 40, t1: 18.60, out: 'lift', outDur: .24 });
    KT.show(P.qud, t, { x: cx, y: 620, t0: 17.84, in: 'pop', spring: 'pop', t1: 18.64, out: 'lift', outDur: .24 });
    KT.show(P.tst, t, { x: cx, y: 450, t0: 18.74, in: 'rise', dist: 40, t1: 20.80, out: 'lift', outDur: .24 });
    { const R = BRAND.row([P.tkt, P.tnm], cx, { gap: 40 });
      KT.show(P.tkt, t, { x: R[0].x, y: 620, sc: R[0].sc, t0: 19.62, in: 'mask', t1: 20.84, out: 'lift', outDur: .24 });
      KT.show(P.tnm, t, { x: R[1].x, y: 620, sc: R[1].sc, t0: 20.16, in: 'pop', spring: 'pop', t1: 20.88, out: 'lift', outDur: .24 }); }
    // arch window opens where the shapes converge (child building = abilities)
    { const km = spring(t - 17.80, ...SPR.card), kh = spring(t - 17.87, ...SPR.card), ko = KT.eIn((t - 20.62) / .4);
      if (km > 0 && ko < 1) { const w = lerp(40, AR.w, km), h = lerp(40, AR.h, kh), rb = lerp(w / 2, AR.rb, kh), cy = AR.cy + ko * 1100, x0 = AR.cx - w / 2, y0 = cy - h / 2;
        BRAND.softShadow(() => { BRAND.archPath(g, AR.cx, cy, w, h, w / 2, rb); g.fillStyle = BR.gold; g.fill(); }, { blur: 50, dy: 26, a: .18 });
        g.save(); BRAND.archPath(g, AR.cx, cy, w, h, w / 2, rb); g.clip();
        BRAND.cover(A.blocks, x0, y0, w, h, { s: lerp(1.18, 1.03, easeOut(17.8, 20.6, t)), fx: .3, fy: .55, alpha: clamp((t - 17.84) / .2) }); g.restore();
        // «تُكتشف»: a gold ring finds the tower of blocks
        KT.ring(t, 19.66, 318, 1380 + ko * 1100, 150, { width: 7, dur: .5, t1: 20.5, outDur: .3, dir: 1 }); } }
    // «وتُنمّى»: a sprout grows from the bottom edge (it becomes the services stem)
    { const ks = easeOut(20.10, 20.95, t); if (ks > 0) { const x = 860, y0 = 2000, y1 = lerp(2000, 1500, ks);
      g.save(); g.strokeStyle = BR.teal; g.lineWidth = 12; g.lineCap = 'round'; g.beginPath(); g.moveTo(x, y0);
      for (let y = y0; y >= y1; y -= 10) g.lineTo(x + 26 * Math.sin(y * .005), y); g.stroke(); g.restore();
      const kl = spring(t - 20.24, ...POP), kr = spring(t - 20.34, ...POP), ty = y1, tx = x + 26 * Math.sin(ty * .005);
      BRAND.leaf(tx, ty + 60, 120, -.6, { k: Math.max(0, kl) }); BRAND.leaf(tx, ty + 120, 100, -2.5, { k: Math.max(0, kr) }); } }
    // shapes: each has its own bob/spin phase (no two alike); all nod together on «احتياجاتها»
    const nod = Math.exp(-Math.max(0, t - 15.95) * 6) * Math.sin(Math.max(0, t - 15.95) * 18) * (t > 15.95 ? 1 : 0);
    // one case (a single dot) waits… then splits into seven different shapes on «حالة»
    const S0 = [540, 1420];
    if (t < ST[0] + .12) { const k = spring(t - 14.30, ...POP), b = 1 + Math.sin((t - 14.3) * 3.2) * .05;
      if (k > 0) { g.save(); g.fillStyle = BR.teal; g.beginPath(); g.arc(S0[0], S0[1], Math.max(0, 70 * k * b * (1 - clamp((t - ST[0]) / .12))), 0, 7); g.fill(); g.restore(); } }
    SH.forEach(([kind, x, y, s, col, r0, spin], i) => {
      const k = spring(t - ST[i], ...POP); if (k <= 0) return; const kc = ease(17.45, 17.85, t); if (kc >= 1) return;
      const lt = t - ST[i], bob = Math.sin(lt * (1.3 + i * .23) + i) * 9, rot = r0 + lt * spin + (1 - k) * .8;
      g.save(); g.translate(lerp(lerp(S0[0], x, k), AR.cx, kc), lerp(lerp(S0[1], y, k) + bob, AR.cy, kc)); g.rotate(rot + kc * 2); const sc = Math.max(0, Math.min(k, 1.15)) * (1 + nod * .08) * (1 - kc); g.scale(sc, sc);
      BRAND.softShadow(() => shape(kind, s, col), { blur: 26, dy: 14, a: .16 });
      g.restore();
    });
  } });
})();
