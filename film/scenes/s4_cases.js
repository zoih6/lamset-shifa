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
  });
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
    KT.show(P.nom, t, { x: cx, y: 560, t0: 14.12, in: 'rise', dist: 40 });
    KT.show(P.kul, t, { x: cx, y: 700, t0: 15.02, in: 'mask' });
    KT.show(P.ihk, t, { x: cx, y: 868, t0: 15.88, in: 'pop', spring: 'pop' });
    // shapes: each has its own bob/spin phase (no two alike); all nod together on «احتياجاتها»
    const nod = Math.exp(-Math.max(0, t - 15.95) * 6) * Math.sin(Math.max(0, t - 15.95) * 18) * (t > 15.95 ? 1 : 0);
    // one case (a single dot) waits… then splits into seven different shapes on «حالة»
    const S0 = [540, 1420];
    if (t < ST[0] + .12) { const k = spring(t - 14.30, ...POP), b = 1 + Math.sin((t - 14.3) * 3.2) * .05;
      if (k > 0) { g.save(); g.fillStyle = BR.teal; g.beginPath(); g.arc(S0[0], S0[1], Math.max(0, 70 * k * b * (1 - clamp((t - ST[0]) / .12))), 0, 7); g.fill(); g.restore(); } }
    SH.forEach(([kind, x, y, s, col, r0, spin], i) => {
      const k = spring(t - ST[i], ...POP); if (k <= 0) return;
      const lt = t - ST[i], bob = Math.sin(lt * (1.3 + i * .23) + i) * 9, rot = r0 + lt * spin + (1 - k) * .8;
      g.save(); g.translate(lerp(S0[0], x, k), lerp(S0[1], y, k) + bob); g.rotate(rot); const sc = Math.max(0, Math.min(k, 1.15)) * (1 + nod * .08); g.scale(sc, sc);
      BRAND.softShadow(() => shape(kind, s, col), { blur: 26, dy: 14, a: .16 });
      g.restore();
    });
  } });
})();
