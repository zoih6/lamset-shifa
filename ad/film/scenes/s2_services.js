// ═══════════════════════════════════════════════════════════════════════════════════
//  SHOT C 14.38–21.08  الفلسفة: لكل حالة احتياجاتها · لكل شخص قدراته
//  SHOT D 21.08–37.32  الخدمات: شبكة تظهر مع النطق + لحظة بطولة لاضطراب طيف التوحد
// ═══════════════════════════════════════════════════════════════════════════════════
(() => {
  const { C, SAFE, bg, pathAt, pathU, drawPath, footprint, node, glass, tile, lightPool, motes, txt, flowRight } = SH;
  const P = {}, V = VO.P;
  const X = SAFE.right;
  const SV = [['t1', 'hand'], ['t2', 'sparkles'], ['t3', 'baby'], ['t4', 'message-circle'],
              ['t5', 'book-open'], ['t6', 'brain'], ['t7', 'shapes']];

  INITS.push(async () => {
    const W3 = (t, o) => KT.word(t, Object.assign({ font: 'Cairo', weight: 700, color: C.cream }, o));
    P.c0 = W3('نؤمن أن', { size: 42, color: 'rgba(246,241,230,.70)' });
    P.c1 = W3('لكل حالة احتياجاتها', { size: 56, weight: 800 });
    P.c2 = W3('ولكل شخص قدراته', { size: 56, weight: 800 });
    P.c3 = W3('التي تستحق أن تكتشف وتنمى.', { size: 46, color: 'rgba(246,241,230,.85)' });
    P.s0 = W3('نقدم مجموعة من الخدمات المتخصصة', { size: 48, weight: 800 });
    P.h1 = KT.stretch('اضطراب طيف التوحد', { font: 'Cairo', weight: 900, size: 68, color: C.amber }, 2);
    P.h2 = W3('برامج متخصصة', { size: 44, color: 'rgba(246,241,230,.85)' });
  });

  // ── C · philosophy ───────────────────────────────────────────────────────────────
  SHOTS.push({
    a: 14.38, b: 21.08, tin: 'push', whipDir: -1, focus: [W / 2, 900], draw: (t) => {
      bg(t, { a: 14.38, b: 21.08, s0: 1.02, s1: 1.06, plate: 'pHands', plateA: .20, plateBlur: 34 });
      lightPool(620, 1000, 520, .34);
      motes(t, { n: 10, seed: 11, alpha: .35 });
      g.save(); g.globalAlpha = .75; drawPath(pathU(t)); g.restore();

      KT.show(P.c0, t, { x: X, y: 690, ax: 1, t0: 14.42, in: 'rise', dist: 22, fade: 8, t1: 17.0, out: 'fade', outDur: .3 });
      // card 1
      const k1 = spr(t, 15.20, 'card');
      if (k1 > .001) {
        const a1 = t > 17.4 ? .45 : 1;
        g.save(); g.globalAlpha = a1;
        tile(SAFE.left, 760, SAFE.right - SAFE.left, 176, t, 15.20, { icon: 'heart-handshake', label: 'لكل حالة احتياجاتها', labelSize: 54 });
        g.restore();
      }
      // card 2 (enters on «ولكل شخص قدراته» 16.98)
      const k2 = spr(t, 17.10, 'card');
      if (k2 > .001) {
        g.save(); g.globalAlpha = t > 18.9 ? .78 : 1;
        tile(SAFE.left, 986, SAFE.right - SAFE.left, 176, t, 17.10, { icon: 'sparkles', label: 'ولكل شخص قدراته', labelSize: 54 });
        g.restore();
      }
      KT.show(P.c3, t, { x: X - 40, y: 1225, ax: 1, t0: 18.52, in: 'wipe', dur: 1.0 });
      if (t > 18.9) {
        const kk = clamp((t - 19.1) / .8), w = 320 * kk;
        g.save(); g.globalAlpha = .7; line([[X - 40, 1272], [X - 40 - w, 1272]], 1, { color: C.amber, width: 3 }); g.restore();
      }
      // a node on the path for each philosophy beat
      [[14.38], [16.98], [18.52]].forEach(([ts]) => { const p = pathAt(pathU(ts)); node(p.x, p.y, t, ts + .05, { r: 10 }); });
    }
  });

  // ── D · the eight services ──────────────────────────────────────────────────────
  SHOTS.push({
    a: 21.08, b: 37.32, tin: 'push', whipDir: -1, focus: [W / 2, 700], draw: (t) => {
      bg(t, { a: 21.08, b: 37.32, s0: 1.03, s1: 1.08 });
      lightPool(540, 900, 640, .30);
      g.save(); g.globalAlpha = .55; drawPath(pathU(t)); g.restore();

      KT.show(P.s0, t, { x: X, y: 540, ax: 1, t0: 21.12, in: 'wipe', dur: .9, t1: 34.2, out: 'lift', outDur: .35 });

      // 7 rows, one per spoken service; the newest is the hero, the older ones settle back
      const rowsY = [650, 760, 870, 980, 1090, 1200, 1310];
      let cur = -1;
      SV.forEach(([id, ic], i) => { if (t >= V(id).s) cur = i; });
      const heroTime = V('t8').s;                                  // 33.82 — the autism beat takes over
      const toHero = clamp((t - heroTime) / .55);                  // 0→1 while the rows leave

      SV.forEach(([id, ic], i) => {
        const s = V(id).s, label = V(id).text;
        if (t < s - .05) return;
        const isCur = (i === cur && toHero < .1);
        const a = (1 - toHero) * (isCur ? 1 : (cur >= 0 && i < cur ? .52 : .8));
        if (a <= .01) return;
        const dy = -toHero * (60 + i * 26);
        g.save(); g.translate(0, dy); g.globalAlpha = a;
        tile(SAFE.left, rowsY[i], SAFE.right - SAFE.left, 96, t, s - .18,
          { icon: ic, label, labelSize: isCur ? 50 : 44, accent: isCur });
        g.restore();
        if (toHero < .1) { const p = pathAt(pathU(s)); node(p.x, p.y, t, s + .02, { r: isCur ? 12 : 8 }); }
      });

      // HERO CARD · اضطراب طيف التوحد
      if (toHero > 0) {
        const k = spr(t, heroTime + .18, 'card');
        const bw = 860, bx = (W - bw) / 2, by = 800, bh = 400;
        glass(bx, by, bw, bh, { r: 40, fill: .12 * k, stroke: .28, alpha: clamp(k * 2) * (1 - clamp((t - 36.6) / .5)), tintTop: .08 });
        g.save(); g.globalAlpha = clamp(k * 2);
        icon('puzzle', W / 2, by + 118, 104, { color: C.amber, lw: 2, k: clamp((t - heroTime - .3) / .8), alpha: .95 });
        KT.show(P.h1, t, { x: W / 2, y: by + 250, ax: .5, t0: heroTime + .55, in: 'none', keys: [[heroTime + .55, 2], [heroTime + .95, 0], [heroTime + 1.5, 1]], t1: 36.8, out: 'lift', outDur: .34 });
        KT.show(P.h2, t, { x: W / 2, y: by + 332, ax: .5, t0: heroTime + 1.25, in: 'rise', dist: 24, fade: 8, t1: 36.7, out: 'lift', outDur: .34 });
        g.restore();
      }
    }
  });
})();
