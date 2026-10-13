// ═══ S7 · 46.40–52.40 · «لمسة شفاء، لأن الشفاء ليس مجرد علاج، بل رحلة نحو حياة أفضل» ═══════════════════════
// the growth curve's gold head irises open onto a child running into the light. «ليس مجرد علاج» is struck,
// «بل رحلة» answers, the leaf-steps of the hook walk across again (callback).
(() => {
  const P = {}, cx = W / 2, POP = [260, 15];
  const STEPS = Array.from({ length: 7 }, (_, i) => ({ t0: 50.66 + i * .12, x: 900 - i * 125, y: 1585 + (i % 2 ? -26 : 26) }));
  INITS.push(async () => {
    await loadImg('run', 'assets/gen/run.jpg');
    const D9 = { font: DISPLAY, weight: 900 }, U7 = { font: UI, weight: 700 }, WH = '#ffffff', WS = '#e6f2ee';
    P.lms = KT.word('لمسة شفاء', { ...D9, size: 150, color: WH });
    P.lan = KT.word('لأن الشفاء', { ...U7, size: 80, color: WS });
    P.lys = KT.word('ليس مجرد علاج', { font: DISPLAY, weight: 800, size: 110, color: WH });
    P.bal = KT.word('بل رحلة', { ...D9, size: 170, color: BR.goldL });
    P.nhw = KT.word('نحو', { ...U7, size: 84, color: WS });
    P.hyt = KT.word('حياة أفضل', { ...D9, size: 122, color: WH });
  });
  cue.move('iris3', when.ease(46.28, 46.82), { sound: 'whoosh/fs-449994-whoosh-med-mid-wav-1' });
  cue.hero('rihla', when.spring(50.18, POP), { on: 'land', sound: 'thump/fs-133282-thump-on-carpet-2+tap' });

  function photo(t) {
    BRAND.cover(A.run, 0, 0, W, H, { s: lerp(1.14, 1.0, easeOut(46.4, 52.6, t)), fx: .62, fy: .5 });
    const gr = g.createLinearGradient(0, 860, 0, H); gr.addColorStop(0, 'rgba(6,60,54,0)'); gr.addColorStop(.42, 'rgba(6,60,54,.70)'); gr.addColorStop(1, 'rgba(4,46,42,.94)');
    g.fillStyle = gr; g.fillRect(0, 860, W, H - 860);
  }
  function type(t) {
    KT.show(P.lms, t, { x: cx, y: 1250, t0: 46.78, in: 'mask', t1: 47.66, out: 'lift', outDur: .24 });
    KT.show(P.lan, t, { x: cx, y: 1190, t0: 47.76, in: 'rise', dist: 40, t1: 50.10, out: 'lift', outDur: .24 });
    const b = KT.show(P.lys, t, { x: cx, y: 1340, t0: 48.82, in: 'mask', dimAt: 50.0, dimColor: 'rgba(255,255,255,.45)', t1: 50.16, out: 'sink', outDur: .26 });
    // strike-through: a gold line crosses «ليس مجرد علاج» right → left
    { const k = easeOut(49.98, 50.22, t), ko = clamp((t - 50.16) / .2); if (k > 0 && ko < 1) { const w = P.lys.w * .52;
      g.save(); g.globalAlpha = 1 - ko; g.strokeStyle = BR.goldL; g.lineWidth = 9; g.lineCap = 'round'; g.beginPath(); g.moveTo(cx + w, 1348); g.lineTo(cx + w - 2 * w * k, 1348); g.stroke(); g.restore(); } }
    KT.show(P.bal, t, { x: cx, y: 1200, t0: 50.18, in: 'pop', spring: 'pop', t1: 52.30, out: 'lift', outDur: .2 });
    const R = BRAND.row([P.nhw, P.hyt], cx, { gap: 30 });
    KT.show(P.nhw, t, { x: R[0].x, y: 1385, sc: R[0].sc, t0: 51.02, in: 'rise', dist: 36, t1: 52.32, out: 'lift', outDur: .2 });
    KT.show(P.hyt, t, { x: R[1].x, y: 1385, sc: R[1].sc, t0: 51.52, in: 'mask', t1: 52.34, out: 'lift', outDur: .2 });
    // the hook's leaf-steps walk across (right → left) — the journey
    STEPS.forEach((s, i) => { const k = KT.spr(t - s.t0, 'pop'); if (k <= 0) return; const fade = clamp((t - 52.15) / .2);
      BRAND.leaf(s.x + 40, s.y, 80, Math.PI + (i % 2 ? .2 : -.2), { k: Math.max(0, k), alpha: (1 - fade) * .95, c1: BR.mint, c2: '#e8f5ef', rib: false }); });
  }
  window.S7draw = (t) => { photo(t); type(t); };

  SHOTS.push({ a: 46.28, b: 52.40, tin: 'cut', draw: (t) => {
    if (t < 47.0) S6draw(t);
    BRAND.iris(t, 46.28, 46.82, 930, 820, cx, 960, 26, 1320, () => photo(t), { lag: .08 });
    if (t >= 46.92) photo(t);
    type(t);
  } });
})();
