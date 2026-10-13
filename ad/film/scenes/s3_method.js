// ═══════════════════════════════════════════════════════════════════════════════════
//  SHOT E 37.32–46.50  المنهج والحصيلة: خطوات مدروسة · اهتمام حقيقي · تطور ملموس
//  SHOT F 46.50–52.56  البصمة: «الشفاء ليس مجرد علاج، بل رحلة…» — الطريق يصير أفقًا
// ═══════════════════════════════════════════════════════════════════════════════════
(() => {
  const { C, SAFE, bg, pathAt, pathU, drawPath, footprint, stepRipple, glass, lightPool, motes, txt, flowRight, node } = SH;
  const P = {}, V = VO.P;
  const X = SAFE.right;

  INITS.push(async () => {
    const W3 = (t, o) => KT.word(t, Object.assign({ font: 'Cairo', weight: 700, color: C.cream }, o));
    P.m1a = W3('نعمل', { size: 50, color: 'rgba(246,241,230,.80)' });
    P.m1b = KT.stretch('بخطوات مدروسة', { font: 'Cairo', weight: 900, size: 76, color: C.amber }, 2);
    P.m2 = W3('واهتمام حقيقي', { size: 64, weight: 800 });
    P.m3 = W3('لمساندة الأطفال والأسر', { size: 60, weight: 800 });
    P.m4 = W3('وتحقيق تطور ملموس', { size: 62, weight: 800 });
    P.m5 = W3('ينعكس على حياتهم اليومية.', { size: 46, color: 'rgba(246,241,230,.85)' });
    P.g1 = W3('لمسة شفاء،', { size: 50, color: C.amber, weight: 800 });
    P.g2 = W3('لأن الشفاء ليس', { size: 64, weight: 800 });
    P.g2b = W3('مجرد علاج،', { size: 64, weight: 800, color: 'rgba(246,241,230,.80)' });
    P.g3a = W3('نحو حياة أفضل.', { size: 60, weight: 800 });
    P.g3b = KT.stretch('رحلة', { font: 'Cairo', weight: 900, size: 100, color: C.amber }, 3);
    P.g3c = W3('بل', { size: 52, color: 'rgba(246,241,230,.78)' });
  });

  // ── E · method & outcome ────────────────────────────────────────────────────────
  SHOTS.push({
    a: 37.32, b: 46.50, tin: 'push', whipDir: -1, focus: [W / 2, 800], draw: (t) => {
      bg(t, { a: 37.32, b: 46.50, s0: 1.0, s1: 1.06, plate: 'pHands', plateA: .26, plateBlur: 28 });
      lightPool(560, 1080, 560, .34);
      motes(t, { n: 12, seed: 21, alpha: .4 });
      g.save(); g.globalAlpha = .62; drawPath(pathU(t)); g.restore();

      // two more deliberate steps on «بخطوات مدروسة»
      [[37.95, 1], [39.10, -1]].forEach(([ts, side]) => {
        const p = pathAt(pathU(ts + .12)), k = clamp((t - ts) / .45);
        if (k > 0) { footprint(p.x, p.y, p.ang, k, { side, alpha: .85 }); if (t < ts + .9) stepRipple(p.x, p.y, t, ts, { r1: 140 }); }
      });

      // beat 1 · 37.32
      const L1 = flowRight([{ Wd: P.m1b, mw: 661 }, { Wd: P.m1a }], X, 620, { gap: 22 });
      KT.show(L1[1].Wd, t, { x: L1[1].x, y: L1[1].y, ax: 1, t0: 37.36, in: 'rise', dist: 26, fade: 8, t1: 39.3, out: 'lift', outDur: .3 });
      KT.show(P.m1b, t, { x: L1[0].x, y: L1[0].y, ax: 1, t0: 38.10, in: 'none', keys: [[38.10, 2], [38.42, 0], [38.90, 1]], t1: 39.34, out: 'lift', outDur: .3 });

      // beat 2 · 39.50 — care for children & families
      KT.show(P.m2, t, { x: X, y: 620, ax: 1, t0: 39.52, in: 'wipe', dur: .8, t1: 42.5, out: 'lift', outDur: .32 });
      KT.show(P.m3, t, { x: X - 10, y: 740, ax: 1, t0: 40.86, in: 'wipe', dur: .9, t1: 42.56, out: 'lift', outDur: .32 });
      if (t > 41.4 && t < 43.2) { const k = clamp((t - 41.4) / .5); g.save(); g.globalAlpha = .8 * (1 - clamp((t - 42.7) / .4));
        icon('users', X - 10 - 300, 740, 56, { color: C.tealMist, lw: 2.2, k, alpha: .9 }); g.restore(); }

      // beat 3 · 42.66 — measurable progress: a curve that climbs with the sentence
      KT.show(P.m4, t, { x: X, y: 620, ax: 1, t0: 42.68, in: 'wipe', dur: .8 });
      KT.show(P.m5, t, { x: X - 20, y: 736, ax: 1, t0: 44.44, in: 'wipe', dur: 1.0 });
      // the curve panel
      const pk = clamp((t - 43.30) / 1.1);
      if (pk > 0) {
        const bx = 150, bw = W - 300, by = 900, bh = 380;
        glass(bx, by, bw, bh, { r: 32, fill: .09, stroke: .16, alpha: clamp(pk * 2) * (1 - clamp((t - 45.9) / .4)), tintTop: .05 });
        const pts = [];
        for (let i = 0; i < 6; i++) { const u = i / 5; pts.push([bx + 80 + u * (bw - 160), by + bh - 70 - Math.pow(u, .82) * (bh - 150)]); }
        g.save(); g.globalAlpha = clamp(pk * 2);
        line(pts, clamp((t - 43.7) / 2.0), { color: C.amber, width: 5 });
        // dots land one by one, the last one bigger
        pts.forEach((p, i) => { const kk = spr(t, 43.9 + i * .22, 'snap'); if (kk > 0) { g.fillStyle = i === 5 ? C.amber : 'rgba(246,241,230,.85)';
          g.beginPath(); g.arc(p[0], p[1], (i === 5 ? 13 : 8) * kk, 0, 6.283); g.fill(); } });
        g.restore();
      }
    }
  });

  // ── F · the signature line — the path becomes a horizon ──────────────────────────
  SHOTS.push({
    a: 46.50, b: 52.56, tin: 'push', whipDir: -1, focus: [W / 2, 1000], draw: (t) => {
      bg(t, { a: 46.50, b: 52.56, s0: 1.06, s1: 1.0, plate: 'pBokeh', plateA: .34, plateBlur: 22 });
      motes(t, { n: 18, seed: 31, alpha: .6, area: [W * .12, H * .35, W * .76, H * .5] });

      // the path completes and flattens into a horizon
      const u = Math.min(1, pathU(t));
      g.save(); g.globalAlpha = .8; drawPath(u); g.restore();
      const hk = clamp((t - 46.9) / 1.2);
      if (hk > 0) {
        const y = 1300, half = (W / 2 - 40) * hk;
        g.save(); g.globalAlpha = .9;
        line([[W / 2 - half, y], [W / 2 + half, y]], 1, { color: C.amber, width: 4, alpha: .85 });
        g.globalCompositeOperation = 'lighter';
        const gr = g.createLinearGradient(0, y - 340 * hk, 0, y);
        gr.addColorStop(0, 'rgba(240,179,87,0)'); gr.addColorStop(1, `rgba(240,179,87,${.16 * hk})`);
        g.fillStyle = gr; g.fillRect(0, y - 340 * hk, W, 340 * hk);
        g.restore();
      }
      lightPool(W / 2, 1300, 520 * clamp((t - 47.4) / 1.4), .45);

      // TEXT
      KT.show(P.g1, t, { x: W / 2, y: 560, ax: .5, t0: 46.54, in: 'rise', dist: 24, fade: 8, t1: 50.1, out: 'sink', outDur: .3 });
      KT.show(P.g2, t, { x: W / 2, y: 700, ax: .5, t0: 47.80, in: 'wipe', dur: .8, t1: 50.14, out: 'sink', outDur: .3 });
      const st = KT.show(P.g2b, t, { x: W / 2, y: 812, ax: .5, t0: 49.24, in: 'wipe', dur: .55, t1: 50.18, out: 'sink', outDur: .3 });
      // a rule strikes «مجرد علاج،» out the moment the sentence turns
      if (st) {
        const k = clamp((t - 49.62) / .42), w = st.w * 1.02 * k;
        g.save(); g.globalAlpha = clamp((t - 49.62) / .2) * (1 - clamp((t - 50.2) / .3));
        line([[st.right + 8, 812], [st.right + 8 - w, 812]], 1, { color: C.amber, width: 6 }); g.restore();
      }
      const L = flowRight([{ Wd: P.g3c }, { Wd: P.g3b, mw: 273 }, { Wd: P.g3a }], W / 2 + 232, 1010, { gap: 24 });
      KT.show(L[0].Wd, t, { x: L[0].x, y: L[0].y, ax: 1, t0: 50.28, in: 'rise', dist: 22, fade: 7 });
      KT.show(P.g3b, t, { x: L[1].x, y: L[1].y - 4, ax: 1, t0: 50.46, in: 'none', keys: [[50.46, 3], [50.92, 0], [51.6, 1]] });
      KT.show(L[2].Wd, t, { x: L[2].x, y: L[2].y, ax: 1, t0: 51.02, in: 'wipe', dur: .7 });
    }
  });
})();
