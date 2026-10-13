// ═══ S6 · 37.30–46.50 · «نعمل بخطوات مدروسة واهتمام حقيقي لمساندة الأطفال والأسر وتحقيق تطور ملموس…» ═════════
// a path of checked steps (care) → family window → a growth curve that ends in everyday life.
(() => {
  const P = {}, cx = W / 2, POP = [260, 15];
  const NODES = [[860, 1240], [650, 1130], [430, 1020], [220, 910]];
  const NT = [38.18, 38.50, 38.82, 39.14];
  const AR = { cx: 540, cy: 1240, w: 820, h: 1060, rb: 56 };
  // growth curve (left → right, rising) in the chart box
  const CH = { x0: 150, x1: 930, y0: 1380, y1: 820 };
  const curve = (u) => [lerp(CH.x0, CH.x1, u), CH.y0 - (CH.y0 - CH.y1) * (u * u * .55 + u * .45) + Math.sin(u * 9) * 22 * (1 - u)];
  INITS.push(async () => {
    await loadImg('family', 'assets/gen/family.jpg');
    const D9 = { font: DISPLAY, weight: 900 }, U7 = { font: UI, weight: 700 };
    P.nml = KT.word('نعمل', { ...U7, size: 80, color: BR.mint });
    P.bkh = KT.word('بخطوات', { ...D9, size: 136, color: BR.deep });
    P.mdr = KT.word('مدروسة', { ...D9, size: 136, color: BR.gold });
    P.iht = KT.word('واهتمام', { ...D9, size: 116, color: BR.deep });
    P.hqq = KT.word('حقيقي', { ...D9, size: 116, color: BR.gold });
    P.msn = KT.word('لمساندة', { ...U7, size: 80, color: BR.mint });
    P.atf = KT.word('الأطفال', { ...D9, size: 136, color: BR.deep });
    P.asr = KT.word('والأسر', { ...D9, size: 136, color: BR.gold });
    P.thq = KT.word('وتحقيق', { ...U7, size: 80, color: BR.mint });
    P.ttw = KT.word('تطور', { ...D9, size: 140, color: BR.deep });
    P.mlm = KT.word('ملموس', { ...D9, size: 140, color: BR.gold });
    P.ynk = KT.word('ينعكس على', { ...U7, size: 80, color: BR.mint });
    P.hyt = KT.word('حياتهم اليومية', { ...D9, size: 124, color: BR.deep });
  });
  cue.appear('step-a', NT[0], { sound: 'tap' });
  cue.appear('step-c', NT[2], { sound: 'tap' });
  cue.move('family', when.spring(40.70, 'card'), { sound: 'whoosh/fs-449988-whoosh-med-high-1' });
  cue.move('family-out', when.ease(42.50, 42.90, ease), { sound: 'swish/fs-14176-28-wav-3' });

  const draw = (t) => {
    BRAND.stage();
    const outA = KT.eIn((t - 40.55) / .4);              // block A leaves upward
    // ── A · «نعمل بخطوات مدروسة واهتمام حقيقي» ──
    if (outA < 1) {
      g.save(); g.translate(0, -outA * 700); g.globalAlpha = 1 - outA;
      KT.show(P.nml, t, { x: cx, y: 400, t0: 37.32, in: 'rise', dist: 40 });
      const R = BRAND.row([P.bkh, P.mdr], cx);
      KT.show(P.bkh, t, { x: R[0].x, y: 560, sc: R[0].sc, t0: 38.12, in: 'mask' });
      KT.show(P.mdr, t, { x: R[1].x, y: 560, sc: R[1].sc, t0: 38.74, in: 'mask' });
      // dashed path between step nodes, drawn right → left
      for (let i = 1; i < NODES.length; i++) { const k = easeOut(NT[i] - .3, NT[i], t); if (k > 0) line([NODES[i - 1], [lerp(NODES[i - 1][0], NODES[i][0], k), lerp(NODES[i - 1][1], NODES[i][1], k)]], 1, { color: BR.mint, width: 6, dash: [2, 18] }); }
      NODES.forEach(([x, y], i) => { const k = spring(t - NT[i], ...POP); if (k <= 0) return;
        const last = i === 3, kh = spring(t - 40.06, ...POP), pulse = last ? 1 + .06 * Math.sin(Math.max(0, t - 40.3) * 6) * (t > 40.3 ? 1 : 0) : 1;
        if (!last) BRAND.badge('check', x, y, 62, Math.max(0, k), easeOut(NT[i] + .08, NT[i] + .4, t), { fill: BR.mint, ring: null, color: '#fff' });
        else if (kh <= 0) BRAND.badge('check', x, y, 62, Math.max(0, k), 0, {});
        else BRAND.badge('heart', x, y, 62 * pulse, Math.max(0, lerp(1, kh, 1)), easeOut(40.1, 40.5, t), { fill: BR.gold, ring: null, color: '#fff' }); });
      const R2 = BRAND.row([P.iht, P.hqq], cx);
      KT.show(P.iht, t, { x: R2[0].x, y: 1470, sc: R2[0].sc, t0: 39.48, in: 'rise', dist: 50 });
      KT.show(P.hqq, t, { x: R2[1].x, y: 1470, sc: R2[1].sc, t0: 40.04, in: 'pop', spring: 'pop' });
      g.restore();
    }
    // ── B · family window «لمساندة الأطفال والأسر» ──
    { const k = spring(t - 40.70, ...SPR.card), ko = ease(42.5, 42.9, t);
      if (k > 0 && ko < 1) { const cy = AR.cy + (1 - k) * 1100 + ko * 1200, x0 = AR.cx - AR.w / 2, y0 = cy - AR.h / 2;
        BRAND.softShadow(() => { BRAND.archPath(g, AR.cx, cy, AR.w, AR.h, AR.w / 2, AR.rb); g.fillStyle = BR.gold; g.fill(); }, { blur: 50, dy: 26, a: .18 });
        g.save(); BRAND.archPath(g, AR.cx, cy, AR.w, AR.h, AR.w / 2, AR.rb); g.clip(); BRAND.cover(A.family, x0, y0, AR.w, AR.h, { s: lerp(1.15, 1.03, easeOut(40.7, 42.6, t)), fx: .5, fy: .6 }); g.restore(); } }
    KT.show(P.msn, t, { x: cx, y: 380, t0: 40.84, in: 'rise', dist: 40, t1: 42.46, out: 'lift', outDur: .24 });
    { const R = BRAND.row([P.atf, P.asr], cx);
      KT.show(P.atf, t, { x: R[0].x, y: 540, sc: R[0].sc, t0: 41.58, in: 'mask', t1: 42.50, out: 'lift', outDur: .24 });
      KT.show(P.asr, t, { x: R[1].x, y: 540, sc: R[1].sc, t0: 42.04, in: 'pop', spring: 'pop', t1: 42.54, out: 'lift', outDur: .24 }); }
    // ── C · growth «وتحقيق تطور ملموس ينعكس على حياتهم اليومية» ──
    KT.show(P.thq, t, { x: cx, y: 380, t0: 42.68, in: 'rise', dist: 40, t1: 44.30, out: 'lift', outDur: .24 });
    { const R = BRAND.row([P.ttw, P.mlm], cx);
      KT.show(P.ttw, t, { x: R[0].x, y: 540, sc: R[0].sc, t0: 43.34, in: 'mask', t1: 44.34, out: 'lift', outDur: .24 });
      KT.show(P.mlm, t, { x: R[1].x, y: 540, sc: R[1].sc, t0: 43.80, in: 'pop', spring: 'pop', t1: 44.38, out: 'lift', outDur: .24 }); }
    KT.show(P.ynk, t, { x: cx, y: 380, t0: 44.42, in: 'rise', dist: 40 });
    KT.show(P.hyt, t, { x: cx, y: 540, t0: 45.22, in: 'mask' });
    if (t > 42.85) {
      const kgd = easeOut(42.85, 43.25, t);
      g.save(); g.globalAlpha = kgd * .5; g.strokeStyle = '#d9cdb6'; g.lineWidth = 2;
      for (let i = 0; i < 4; i++) { const y = lerp(CH.y0, CH.y1, i / 3); g.beginPath(); g.moveTo(CH.x0, y); g.lineTo(lerp(CH.x0, CH.x1, kgd), y); g.stroke(); } g.restore();
      const ku = ease(43.0, 44.4, t), N = 80, pts = [];
      for (let i = 0; i <= N * ku; i++) pts.push(curve(i / N)); pts.push(curve(ku));
      if (pts.length > 1) {
        g.save(); const ag = g.createLinearGradient(0, CH.y1, 0, CH.y0); ag.addColorStop(0, 'rgba(63,165,138,.30)'); ag.addColorStop(1, 'rgba(63,165,138,0)');
        g.beginPath(); g.moveTo(pts[0][0], CH.y0); pts.forEach(([x, y]) => g.lineTo(x, y)); g.lineTo(pts[pts.length - 1][0], CH.y0); g.closePath(); g.fillStyle = ag; g.fill(); g.restore();
        line(pts, 1, { color: BR.teal, width: 10 });
        [.3, .62].forEach((u, i) => { if (ku >= u) { const [x, y] = curve(u), k = spring(t - (43.0 + 1.4 * u), ...POP); g.save(); g.fillStyle = '#fff'; g.strokeStyle = BR.teal; g.lineWidth = 6; g.beginPath(); g.arc(x, y, Math.max(0, 16 * k), 0, 7); g.fill(); g.stroke(); g.restore(); } });
        const [hx, hy] = curve(ku); g.save(); g.fillStyle = BR.gold; g.beginPath(); g.arc(hx, hy, 22 + (ku >= 1 ? 4 * Math.sin((t - 44.4) * 5) : 0), 0, 7); g.fill(); g.restore();
      }
      // everyday life: home · school · play
      [['house', 270, 45.30], ['school', 540, 45.56], ['heart-handshake', 810, 45.84]].forEach(([ic, x, t0]) => {
        const k = spring(t - t0, ...POP); if (k > 0) BRAND.badge(ic, x, 1580, 78, Math.max(0, k), easeOut(t0 + .05, t0 + .5, t)); });
    }
  };
  window.S6draw = draw;
  SHOTS.push({ a: 37.45, b: 46.28, tin: 'cut', draw });
})();
