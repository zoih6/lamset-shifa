// ═══ S8 · 52.40–61.30 · «زورونا في صنعاء – ش الزبيري جوار مستشفى سيبلاس، أو تواصلوا معنا عبر الأرقام» ═══════
// the photo lifts like a curtain → «زورونا» + pin drop + address card → phone pills on «الأرقام»
// → brand end card (logo + numbers + address) — the frame people screenshot.
(() => {
  const P = {}, cx = W / 2, POP = [260, 15];
  const CARD = { y: 910, w: 920, h: 360 };
  const LEAVES = [[-60, 330, -.35, 330, 0, 3, -300, -120], [1150, 560, 3.75, 280, 0, 0, 380, 0], [-40, 1640, .3, 300, 0, 0, -320, 120], [1120, 1780, 3.55, 240, 1, 2, 300, 200]];
  INITS.push(async () => {
    const D9 = { font: DISPLAY, weight: 900 }, U7 = { font: UI, weight: 700 };
    P.zur = KT.word('زورونا', { ...D9, size: 140, color: BR.deep });
    P.san = KT.word('صنعاء', { font: DISPLAY, weight: 800, size: 86, color: BR.deep });
    P.zub = KT.word('شارع الزبيري', { ...U7, size: 66, color: BR.deep });
    P.sib = KT.word('جوار مستشفى سيبلاس', { ...U7, size: 64, color: BR.teal });
    P.tws = KT.word('تواصلوا معنا', { ...U7, size: 68, color: BR.mint });
    P.n1 = BRAND.ltr('775 591 666', { size: 84, color: '#fff' });
    P.n2 = BRAND.ltr('775 581 666', { size: 84, color: '#fff' });
    P.nn = BRAND.ltr('775591666   |   775581666', { size: 56, weight: 800, color: BR.deep });
    P.ad = KT.word('صنعاء – شارع الزبيري – جوار مستشفى سيبلاس', { ...U7, size: 50, color: BR.teal });
  });
  cue.move('to-logo', when.ease(59.40, 59.75, ease), { sound: 'swish/fs-14176-28-wav-3' });
  cue.appear('logo-end', 59.80, { sound: 'chime' });

  function pin(x, y, s) { g.save(); g.translate(x, y); g.scale(s, s);
    BRAND.softShadow(() => { g.beginPath(); g.moveTo(0, 0); g.bezierCurveTo(-30, -40, -78, -80, -78, -130); g.arc(0, -130, 78, Math.PI, 0); g.bezierCurveTo(78, -80, 30, -40, 0, 0); g.closePath();
      const pg = g.createLinearGradient(0, -210, 0, 0); pg.addColorStop(0, BR.mint); pg.addColorStop(1, BR.deep); g.fillStyle = pg; g.fill(); }, { blur: 30, dy: 18, a: .25 });
    g.fillStyle = BR.cream; g.beginPath(); g.arc(0, -132, 30, 0, 7); g.fill(); g.restore(); }
  function phoneRow(Nw, y, k, ko) { if (k <= .002) return; const w = 820, h = 140;
    g.save(); g.translate((1 - Math.min(1, k)) * 90, -ko * 120); g.globalAlpha = clamp(k * 2) * (1 - ko);
    BRAND.softShadow(() => { BRAND.archPath(g, cx, y, w, h, h / 2, h / 2); g.fillStyle = BR.deep; g.fill(); }, { blur: 30, dy: 14, a: .25 });
    const bx = cx + w / 2 - h / 2; g.fillStyle = BR.gold; g.beginPath(); g.arc(bx, y, h / 2 - 14, 0, 7); g.fill();
    icon('phone', bx, y, 58, { color: '#fff', lw: 2.2 });
    g.drawImage(Nw.img, cx - 40 - Nw.img.width / 2, y - Nw.img.height / 2 + 4); g.restore(); }

  SHOTS.push({ a: 52.40, b: 61.30, tin: 'cut', draw: (t) => {
    BRAND.stage();
    const ox = (t0) => KT.eIn((t - t0) / .32);                // contact block leaves (59.40+)
    // «زورونا» + pin
    KT.show(P.zur, t, { x: cx, y: 330, t0: 52.58, in: 'mask', t1: 59.40, out: 'lift', outDur: .3 });
    { const k = spring(t - 53.0, ...POP); if (k > 0) { const ko = ox(59.43), y = lerp(-200, 650, Math.min(k, 1.2)) - ko * 140;
      const rk = clamp((t - 53.12) / .7); if (rk > 0 && rk < 1) { g.save(); g.strokeStyle = BR.gold; g.globalAlpha = (1 - rk) * .8; g.lineWidth = 4; g.beginPath(); g.ellipse(cx, 652, 40 + 130 * KT.eOut(rk), (40 + 130 * KT.eOut(rk)) * .32, 0, 0, 7); g.stroke(); g.restore(); }
      g.save(); g.globalAlpha = 1 - ko; g.fillStyle = 'rgba(6,40,36,.12)'; g.beginPath(); g.ellipse(cx, 656, 56 * Math.min(1, k), 14, 0, 0, 7); g.fill(); pin(cx, y, 1); g.restore(); } }
    // address card
    { const k = spring(t - 53.40, ...SPR.card); if (k > 0) { const ko = ox(59.46), y = CARD.y + (1 - k) * 160 - ko * 160;
      g.save(); g.globalAlpha = clamp(k * 2) * (1 - ko);
      BRAND.softShadow(() => { BRAND.archPath(g, cx, y, CARD.w, CARD.h, 44, 44); g.fillStyle = '#fffdf8'; g.fill(); }, { blur: 40, dy: 20, a: .16 });
      g.fillStyle = BR.gold; g.fillRect(cx + CARD.w / 2 - 14, y - CARD.h / 2 + 50, 6, CARD.h - 100);
      g.restore();
      const a = { alpha: 1 - ko };
      KT.show(P.san, t, { x: cx, y: y - 100, t0: 53.50, in: 'mask', ...a });
      KT.show(P.zub, t, { x: cx, y: y + 2, t0: 54.04, in: 'rise', dist: 30, ...a });
      KT.show(P.sib, t, { x: cx, y: y + 102, t0: 54.94, in: 'rise', dist: 30, ...a }); } }
    KT.show(P.tws, t, { x: cx, y: 1170, t0: 56.78, in: 'rise', dist: 36, t1: 59.50, out: 'lift', outDur: .3 });
    phoneRow(P.n1, 1320, Math.max(0, spring(t - 57.90, ...POP)), ox(59.52));
    phoneRow(P.n2, 1490, Math.max(0, spring(t - 58.30, ...POP)), ox(59.56));
    // ── brand end card ──
    LEAVES.forEach(([x, y, r, L, gold, bl, fx, fy], i) => { const k = spring(t - 59.70 - i * .06, ...SPR.card); if (k <= 0) return; const ko = KT.eIn((t - 61.0) / .3), m = (1 - k) + ko;
      if (bl) g.filter = `blur(${bl}px)`; BRAND.leaf(x + fx * m + Math.sin(t * .8 + i) * 6, y + fy * m, L, r + (1 - k) * .5, { k: 1, alpha: clamp(k * 3) * (1 - ko), gold: !!gold }); g.filter = 'none'; });
    { const k = spring(t - 59.80, ...POP); if (k > 0) { const ko = KT.eIn((t - 61.0) / .3), w = 820 * lerp(.8, 1, k) * (1 - ko * .15), h = w * A.logo.height / A.logo.width;
      g.save(); g.globalAlpha = clamp((t - 59.8) / .12) * (1 - ko); g.drawImage(A.logo, cx - w / 2, 820 - h / 2, w, h); g.restore();
      const a = { alpha: 1 - ko };
      g.save(); g.globalAlpha = clamp((t - 60.0) / .25) * (1 - ko); g.drawImage(P.nn.img, cx - P.nn.img.width / 2, 1250 - P.nn.img.height / 2 + (1 - easeOut(60, 60.4, t)) * 30); g.restore();
      KT.show(P.ad, t, { x: cx, y: 1345, sc: Math.min(1, 880 / P.ad.w), t0: 60.15, in: 'rise', dist: 30, ...a });
      KT.underline(t, 60.05, cx, 1180, 160, { width: 5, dur: .35, t1: 60.95, outDur: .25 }); } }
    // curtain: the S7 photo lifts away
    { const k = KT.eIn((t - 52.40) / .45); if (k < 1) { g.save(); g.translate(0, -k * (H + 40)); g.beginPath(); g.rect(0, 0, W, H); g.clip(); S7draw(t); g.restore();
      g.save(); g.fillStyle = BR.gold; g.fillRect(0, H - k * (H + 40), W, 10); g.restore(); } }
  } });
})();
