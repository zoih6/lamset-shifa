// ═══════════════════════════════════════════════════════════════════════════════════
//  SHOT G 52.56–58.87  النداء: العنوان + الرقمان
//  SHOT H 58.87–61.60  الخاتمة الصامتة: الرقمان + شعار لمسة شفاء + شعار ومض
// ═══════════════════════════════════════════════════════════════════════════════════
(() => {
  const { C, SAFE, bg, glass, lightPool, motes, txt, logoPlate, logoPlain, spr, clamp, lerp, ease } = SH;
  const P = {}, V = VO.P;
  const N1 = '775591666', N2 = '775581666';

  INITS.push(async () => {
    const W3 = (t, o) => KT.word(t, Object.assign({ font: 'Cairo', weight: 700, color: C.cream }, o));
    P.c1 = W3('زورونا في صنعاء', { size: 44, color: 'rgba(246,241,230,.82)' });
    P.c2 = W3('شارع الزبيري', { size: 78, weight: 900 });
    P.c3 = W3('جوار مستشفى سيبلاس', { size: 46, weight: 700, color: 'rgba(246,241,230,.85)' });
    P.c4 = W3('أو تواصلوا معنا عبر الأرقام التالية:', { size: 46, weight: 700, color: 'rgba(246,241,230,.88)' });
  });

  // a glass pill holding one phone number (Latin tabular digits, Inter)
  function numberPill(cx, cy, num, t, t0, { w = 560, h = 108, alpha = 1 } = {}) {
    const k = spr(t, t0, 'card'); if (k <= .001) return;
    const a = clamp(k * 3) * alpha;
    g.save(); g.globalAlpha = a; g.translate(cx, cy + (1 - k) * 46);
    glass(-w / 2, -h / 2, w, h, { r: h / 2, fill: .12, stroke: .26, tintTop: .08 });
    icon('phone', w / 2 - 62, 0, 44, { color: C.amber, lw: 2.2, k: clamp(k * 2), alpha: .95 });
    g.font = '700 58px Inter'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillStyle = C.cream; g.fillText(num, -14, 2);
    g.restore();
  }

  // the address card (map pin + three lines)
  function addressCard(cyOff, t, t0, { alpha = 1 } = {}) {
    const k = spr(t, t0, 'card'); if (k <= .001) return;
    const w = 860, x = (W - w) / 2, y = 660 + cyOff, h = 400;
    g.save(); g.globalAlpha = alpha * clamp(k * 3); g.translate(0, (1 - k) * 60);
    glass(x, y, w, h, { r: 36, fill: .10, stroke: .20, tintTop: .06, lift: (1 - k) * .8 });
    icon('map-pin', W / 2, y + 82, 62, { color: C.amber, lw: 2.2, k: clamp((t - t0 - .2) / .7), alpha: .95 });
    KT.show(P.c1, t, { x: W / 2, y: y + 190, ax: .5, t0: t0 + .35, in: 'rise', dist: 20, fade: 7 });
    KT.show(P.c2, t, { x: W / 2, y: y + 276, ax: .5, t0: t0 + 1.45, in: 'wipe', dur: .7 });
    KT.show(P.c3, t, { x: W / 2, y: y + 350, ax: .5, t0: t0 + 2.50, in: 'wipe', dur: .8 });
    g.restore();
  }

  // ── G · call to action ──────────────────────────────────────────────────────────
  SHOTS.push({
    a: 52.56, b: 58.87, tin: 'push', whipDir: -1, focus: [W / 2, 900], draw: (t) => {
      bg(t, { a: 52.56, b: 58.87, s0: 1.05, s1: 1.0 });
      lightPool(W / 2, 1150, 640, .34);
      motes(t, { n: 12, seed: 41, alpha: .4, area: [W * .15, H * .35, W * .7, H * .45] });
      addressCard(0, t, 52.62);
      KT.show(P.c4, t, { x: W / 2, y: 1150, ax: .5, t0: 56.58, in: 'wipe', dur: 1.1 });
      numberPill(W / 2, 1272, N1, t, 57.62);
      numberPill(W / 2, 1392, N2, t, 58.12);
    }
  });

  // ── H · silent end slate ────────────────────────────────────────────────────────
  SHOTS.push({
    a: 58.87, b: 61.60, tin: 'cut', draw: (t) => {
      bg(t, { a: 58.87, b: 61.60, s0: 1.0, s1: 1.02 });
      const rise = ease(58.87, 59.75, t);                        // the CTA block settles up
      lightPool(W / 2, 900, 660, .38 + .06 * Math.sin(t * 2));
      motes(t, { n: 14, seed: 41, alpha: .45, area: [W * .15, H * .3, W * .7, H * .5] });

      // the numbers rise into their final place and stay
      const y1 = lerp(1272, 690, rise), y2 = lerp(1392, 820, rise);
      KT.show(P.c4, t, { x: W / 2, y: lerp(1150, 560, rise), ax: .5, t0: 56.58, in: 'wipe', dur: 1.1, t1: 59.1, out: 'fade', outDur: .35 });
      numberPill(W / 2, y1, N1, t, 57.62);
      numberPill(W / 2, y2, N2, t, 58.12);

      // brands
      logoPlate('logolamsat', W / 2, 1140, 520, t, 59.55);
      if (t > 60.15) { const k = clamp((t - 60.15) / .5);
        g.save(); g.globalAlpha = k * .55; line([[W / 2 - 150 * k, 1362], [W / 2 + 150 * k, 1362]], 1, { color: 'rgba(246,241,230,.5)', width: 2 }); g.restore(); }
      logoPlain('logowamd', W / 2, 1428, 132, t, 60.35, { spring: 'snap' });
    }
  });
})();
