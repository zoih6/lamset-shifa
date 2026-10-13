// ═══════════════════════════════════════════════════════════════════════════════════
//  SHOT A 0.00–9.58  الخطّاف: أثر قدم → خط نور → طريق
//  SHOT B 9.58–14.38 كتلة العلامة (الشعار على لوحة كريمية + وصف التخصص)
// ═══════════════════════════════════════════════════════════════════════════════════
(() => {
  const { C, SAFE, bg, pathAt, pathU, drawPath, footprint, stepRipple, lightPool, motes, txt, flowRight, logoPlate } = SH;
  const P = {}, V = VO.P;
  const X = SAFE.right;                       // RTL: text starts from the right edge

  INITS.push(async () => {
    const W3 = (t, o) => KT.word(t, Object.assign({ font: 'Cairo', weight: 700, color: C.cream }, o));
    P.a1 = W3('لأن كل', { size: 54, color: 'rgba(246,241,230,.78)' });
    P.a2 = KT.stretch('خطوة', { font: 'Cairo', weight: 900, size: 104, color: C.amber }, 3);
    P.a3 = W3('صغيرة', { size: 54, color: 'rgba(246,241,230,.78)' });
    P.b1 = W3('قد تكون بداية', { size: 58 });
    P.b2 = W3('لتغيير كبير.', { size: 78, weight: 800 });
    P.c1 = W3('نحن هنا لمساعدتك', { size: 58 });
    P.c2 = W3('على الوصول إلى', { size: 50, color: 'rgba(246,241,230,.8)' });
    P.c3 = KT.stretch('الأفضل.', { font: 'Cairo', weight: 900, size: 96, color: C.amberL }, 2);
    P.k1 = W3('بمركز', { size: 46, color: 'rgba(246,241,230,.72)' });
    P.k2 = W3('للعلاج الفيزيائي', { size: 60, weight: 800 });
    P.k3 = W3('وإعادة التأهيل الطبي', { size: 60, weight: 800 });
  });

  // ── A · hook ────────────────────────────────────────────────────────────────────
  SHOTS.push({
    a: 0.00, b: 9.58, tin: 'cut', draw: (t) => {
      bg(t, { a: 0, b: 9.58, s0: 1.0, s1: 1.05, plate: 'pBokeh', plateA: .30, plateBlur: 26 });
      lightPool(560, 1560, 620, .55 + .12 * Math.sin(t * .7));
      motes(t, { n: 16, seed: 5, alpha: .55 });

      // the path grows continuously behind everything
      const u = pathU(t);
      drawPath(u);

      // three footprints land on the beat (the path's "steps")
      const steps = [[1.78, 1], [3.45, -1], [4.75, 1], [6.30, -1], [8.10, 1]];
      for (const [ts, side] of steps) {
        const p = pathAt(pathU(ts + .12)), k = clamp((t - ts) / .45);
        if (k > 0) {
          footprint(p.x, p.y, p.ang, k, { side, alpha: .9 });
          if (t < ts + .9) stepRipple(p.x, p.y, t, ts, { r1: 150 });
        }
      }

      // TEXT · line 1 — «لأن كل خطوة صغيرة» (hero = خطوة, kashida on the beat)
      const L1 = flowRight([{ Wd: P.a1 }, { Wd: P.a2, mw: 362 }, { Wd: P.a3 }], X, 470, { gap: 22 });
      KT.show(L1[0].Wd, t, { x: L1[0].x, y: L1[0].y, ax: 1, t0: .20, in: 'wipe', dur: .9, t1: 3.30, out: 'sink', outDur: .34 });
      KT.show(P.a2, t, { x: L1[1].x, y: L1[1].y + 6, ax: 1, t0: 1.86, in: 'none', keys: [[1.86, 3], [2.24, 0], [2.70, 1]], t1: 3.34, out: 'sink', outDur: .34 });
      const r2 = KT.show(L1[2].Wd, t, { x: L1[2].x, y: L1[2].y, ax: 1, t0: 2.44, in: 'rise', dist: 34, fade: 8, t1: 3.28, out: 'sink', outDur: .34 });

      // TEXT · line 2 — «قد تكون بداية لتغيير كبير.»
      const L2 = flowRight([{ Wd: P.b2 }, { Wd: P.b1 }], X, 640, { gap: 24 });
      KT.show(L2[0].Wd, t, { x: L2[0].x, y: L2[0].y, ax: 1, t0: 3.06, in: 'wipe', dur: .8, t1: 5.55, out: 'lift', outDur: .34 });
      KT.show(L2[1].Wd, t, { x: L2[1].x, y: L2[1].y, ax: 1, t0: 4.38, in: 'rise', dist: 30, fade: 8, t1: 5.52, out: 'lift', outDur: .34 });

      // TEXT · line 3 — «نحن هنا لمساعدتك على الوصول إلى الأفضل.»
      KT.show(P.c1, t, { x: X, y: 470, ax: 1, t0: 5.72, in: 'wipe', dur: .9, t1: 7.70, out: 'sink', outDur: .3 });
      const L3 = flowRight([{ Wd: P.c3, mw: 397 }, { Wd: P.c2 }], X, 640, { gap: 24 });
      KT.show(L3[1].Wd, t, { x: L3[1].x, y: L3[1].y, ax: 1, t0: 7.58, in: 'rise', dist: 30, fade: 9 });
      const hero = KT.show(P.c3, t, { x: L3[0].x, y: L3[0].y, ax: 1, t0: 8.58, in: 'none', keys: [[8.58, 2], [8.96, 0], [9.40, 1]] });
      if (hero) KT.underline(t, 8.58 + KT.F(6), (hero.left + hero.right) / 2, hero.bottom + 26, hero.w * .92, { width: 6, dur: .45, color: C.amber });
    }
  });

  // ── B · brand block ─────────────────────────────────────────────────────────────
  SHOTS.push({
    a: 9.58, b: 14.38, tin: 'push', whipDir: -1, focus: [W / 2, 700], draw: (t) => {
      bg(t, { a: 9.58, b: 14.38, s0: 1.04, s1: 1.0, plate: 'pRoom', plateA: .22, plateBlur: 30 });
      lightPool(540, 820, 560, .40);
      drawPath(pathU(t));
      const p = pathAt(pathU(11.2)); if (t > 10.9) footprint(p.x, p.y, p.ang, clamp((t - 10.9) / .45), { side: -1, alpha: .8 });

      KT.show(P.k1, t, { x: X, y: 600, ax: 1, t0: 9.62, in: 'rise', dist: 26, fade: 8, t1: 12.9, out: 'sink', outDur: .3 });
      logoPlate('logolamsat', W / 2, 830, 620, t, 10.44);                       // lands on «لمسة شفاء» (10.56)
      KT.show(P.k2, t, { x: W / 2, y: 1130, ax: .5, t0: 11.36, in: 'wipe', dur: .8 });
      KT.show(P.k3, t, { x: W / 2, y: 1220, ax: .5, t0: 12.56, in: 'wipe', dur: .8 });
      // service line under the name
      if (t > 12.9) { const k = clamp((t - 12.9) / .5); g.save(); g.globalAlpha = k * .8;
        line([[W / 2 - 210 * k, 1075], [W / 2 + 210 * k, 1075]], 1, { color: C.amber, width: 3, alpha: .8 }); g.restore(); }
    }
  });
})();
