// ═══ S5 · 21.00–37.30 · «نقدم مجموعة من الخدمات المتخصصة، تشمل …» ═══════════════════════════════════════
// the sprout of S4 keeps growing: a stem climbs the right side, the camera climbs with it, every service is a
// node → branch → icon badge → name. At the end the camera pulls out: the whole tree of services.
(() => {
  const P = {}, cx = W / 2, POP = [260, 15], GAP = 420, Y0 = 980, BX = 708, LX = 592;
  const SV = [
    ['العلاج الوظيفي', 'hand-heart', 24.08],
    ['تنمية المهارات', 'blocks', 25.14],
    ['التدخل المبكر', 'baby', 26.38],
    ['علاج النطق واللغة', 'message-circle-heart', 27.54],
    ['صعوبات التعلم', 'book-open', 29.14],
    ['العلاج النفسي السلوكي', 'brain', 30.28],
    ['التطور الشامل السلوكي', 'sprout', 32.06],
    ['برامج متخصصة', 'puzzle', 34.70],
  ].map(([name, ic, t0], i) => ({ name, ic, t0, y: Y0 - i * GAP, side: i % 2 }));
  const sx = (y) => 860 + 26 * Math.sin(y * .005);
  // camera: newest row sits at screen y ≈ 560 (older rows stack below), then pull out to the whole tree
  const camKeys = [[0, 0], ...SV.slice(2).map((s, i) => [s.t0 - .4, GAP * (i + 1)])];
  const camOf = (t) => track(t, camKeys, 60, 15);
  const tipKeys = [[21.0, 1500], [23.9, Y0 - 40], ...SV.slice(1).map((s) => [s.t0 - .12, s.y - 40])];
  function tipOf(t) { if (t <= tipKeys[0][0]) return tipKeys[0][1];
    for (let i = 1; i < tipKeys.length; i++) if (t < tipKeys[i][0]) return lerp(tipKeys[i - 1][1], tipKeys[i][1], ease(tipKeys[i - 1][0], tipKeys[i][0], t));
    return tipKeys[tipKeys.length - 1][1]; }

  INITS.push(async () => {
    P.nqd = KT.word('نقدم مجموعة من', { font: UI, weight: 700, size: 76, color: BR.mint });
    P.khd = KT.word('الخدمات', { font: DISPLAY, weight: 900, size: 160, color: BR.deep });
    P.mtk = KT.word('المتخصصة', { font: DISPLAY, weight: 800, size: 116, color: BR.gold });
    SV.forEach((s) => { s.W = KT.word(s.name, { font: DISPLAY, weight: 800, size: 66, color: BR.deep }); });
    P.aut = KT.word('لاضطراب طيف التوحد', { font: UI, weight: 700, size: 54, color: BR.gold });
  });
  SV.forEach((s, i) => { if (i === 0 || i === 2 || i === 6) cue.appear('svc' + i, s.t0 + .05, { sound: 'pop/fs-253956-bubble-pop-1', pan: .3 }); });
  cue.hero('tree', when.ease(36.15, 36.95, ease), { on: 'land', sound: 'thump/fs-133282-thump-on-carpet-2+tap' });
  cue.move('tree-out', when.ease(37.05, 37.45, (a, b, t) => KT.eIn((t - a) / (b - a))), { sound: 'whoosh/fs-449994-whoosh-med-mid-wav-1' });

  SHOTS.push({ a: 21.0, b: 37.45, tin: 'cut', draw: (t) => {
    BRAND.stage();
    const kz = ease(36.15, 36.95, t), s = lerp(1, .6, kz), cam = lerp(camOf(t), 1640, kz);
    const kx = KT.eIn((t - 37.05) / .4), exitY = -1500 * kx;
    // header (screen space; leaves before the climb)
    KT.show(P.nqd, t, { x: cx, y: 330, t0: 21.0, in: 'rise', dist: 40, t1: 24.80, out: 'lift', outDur: .3 });
    KT.show(P.khd, t, { x: cx, y: 500, t0: 22.30, in: 'mask', t1: 24.84, out: 'lift', outDur: .3 });
    KT.show(P.mtk, t, { x: cx, y: 668, t0: 22.86, in: 'pop', spring: 'pop', t1: 24.88, out: 'lift', outDur: .3 });
    KT.underline(t, 23.05, cx, 752, 300, { width: 7, dur: .4, t1: 24.7, outDur: .25 });
    g.save(); g.globalAlpha = 1 - kx; g.translate(cx, 960 + exitY); g.scale(s, s); g.translate(-cx - (1 - s) * 0 , -960 + cam);
    // stem
    const tip = tipOf(t);
    g.save(); const sg = g.createLinearGradient(0, 2000, 0, tip); sg.addColorStop(0, BR.deep); sg.addColorStop(1, BR.mint);
    g.strokeStyle = sg; g.lineWidth = 12; g.lineCap = 'round'; g.beginPath(); g.moveTo(sx(2000), 2000);
    for (let y = 2000; y >= tip; y -= 10) g.lineTo(sx(y), y); g.lineTo(sx(tip), tip); g.stroke(); g.restore();
    // S4 sprout leaves stay at the base
    BRAND.leaf(sx(1500), 1560, 120, -.6); BRAND.leaf(sx(1500), 1620, 100, -2.5);
    // tip bud
    BRAND.leaf(sx(tip), tip + 4, 70, -Math.PI / 2 + Math.sin(t * 3) * .08, { c1: BR.mint, c2: BR.leafL, rib: false });
    // rows
    SV.forEach((r, i) => {
      if (t < r.t0 - .1) return; const y = r.y, nx = sx(y), last = i === 7;
      const kn = spring(t - r.t0 + .1, ...POP), kb = easeOut(r.t0 - .02, r.t0 + .3, t), kg = spring(t - r.t0 - .04, ...POP), ki = easeOut(r.t0 + .06, r.t0 + .6, t);
      // decorative leaf on the outer side of the stem
      BRAND.leaf(nx + 4, y - 6, 112, r.side ? -.55 : .35, { k: Math.max(0, spring(t - r.t0 - .12, ...SPR.card)), gold: last });
      // branch node → badge
      if (kb > 0) { g.save(); g.strokeStyle = BR.teal; g.lineWidth = 6; g.lineCap = 'round'; g.beginPath(); g.moveTo(nx, y);
        const ex = lerp(nx, BX + 60, kb); g.quadraticCurveTo(lerp(nx, (nx + BX) / 2, kb), y - 30 * kb, ex, y); g.stroke(); g.restore(); }
      g.save(); g.fillStyle = BR.gold; g.beginPath(); g.arc(nx, y, Math.max(0, 14 * kn), 0, 7); g.fill(); g.restore();
      BRAND.badge(r.ic, BX, y, 76, Math.max(0, kg), ki, last ? { fill: BR.gold, ring: '#fff', color: '#fff' } : {});
      const sc = Math.min(1, 540 / r.W.w);
      KT.show(r.W, t, { x: LX + r.W.pad - 0, y: last ? y - 30 : y, ax: 1, sc, t0: r.t0 + .04, in: 'mask' });
      if (last) KT.show(P.aut, t, { x: LX + P.aut.pad, y: y + 50, ax: 1, t0: 36.40, in: 'rise', dist: 30 });
    });
    g.restore();
  } });
})();
