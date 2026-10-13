// ═══ S9 · 61.30–64.80 · Wamd studio outro (rebuilt from 2.png in the ad's language) ══════════════════════════
// a pink ribbon (the badge's own ribbon) sweeps through → a gradient ring draws → the badge pops inside it
// → «تصميم وإنتاج» → a light streak crosses the badge → soft fade.
(() => {
  const P = {}, cx = W / 2, cy = 960, R = 330, POP = [260, 15];
  const PINK = '#e0207f', PINKD = '#b8005e', BLUE = '#2638c8', PURP = '#6a2bd0', GREEN = '#0f7a52';
  INITS.push(async () => {
    await loadImg('wamd', 'assets/wamd.png');
    P.cr = KT.word('تصميم وإنتاج', { font: UI, weight: 700, size: 66, color: '#3b3550' });
  });
  cue.move('ribbon', when.ease(61.30, 61.95, ease), { sound: 'whoosh/fs-449988-whoosh-med-high-1' });
  cue.hero('wamd', when.spring(61.78, POP), { on: 'land', sound: 'thump/fs-133282-thump-on-carpet-2+tap' });
  cue.appear('shine', 62.70, { sound: 'shimmer' });

  function ribbon(t) {
    const head = ease(61.30, 61.95, t), tail = ease(61.55, 62.25, t); if (head <= 0 || tail >= 1) return;
    const P0 = [-200, 1500], P1 = [300, 600], P2 = [800, 1500], P3 = [1300, 500], N = 70;
    const B = (u) => { const a = 1 - u; return [a * a * a * P0[0] + 3 * a * a * u * P1[0] + 3 * a * u * u * P2[0] + u * u * u * P3[0], a * a * a * P0[1] + 3 * a * a * u * P1[1] + 3 * a * u * u * P2[1] + u * u * u * P3[1]]; };
    g.save(); const gr = g.createLinearGradient(0, 400, W, 1500); gr.addColorStop(0, PINK); gr.addColorStop(1, PINKD);
    g.strokeStyle = gr; g.lineWidth = 120; g.lineCap = 'round'; g.beginPath();
    for (let i = 0; i <= N; i++) { const p = B(lerp(tail, head, i / N)); i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1]); } g.stroke(); g.restore();
  }
  function ring(t) { const k = KT.eInOut((t - 61.55) / .6); if (k <= 0) return;
    g.save(); g.lineWidth = 16; g.lineCap = 'round';
    const cg = g.createConicGradient ? g.createConicGradient(-Math.PI / 2, cx, cy) : null;
    if (cg) { cg.addColorStop(0, PURP); cg.addColorStop(.3, BLUE); cg.addColorStop(.55, PINK); cg.addColorStop(.8, GREEN); cg.addColorStop(1, PURP); g.strokeStyle = cg; } else g.strokeStyle = PINK;
    g.beginPath(); g.arc(cx, cy, R + 34, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * k); g.stroke(); g.restore(); }
  function diamond(x, y, s, col, k, rot) { if (k <= 0) return; g.save(); g.translate(x, y); g.rotate(rot); g.scale(k, k); g.fillStyle = col;
    g.beginPath(); g.moveTo(0, -s); g.lineTo(s * .6, 0); g.lineTo(0, s); g.lineTo(-s * .6, 0); g.closePath(); g.fill(); g.restore(); }

  SHOTS.push({ a: 61.30, b: 64.80, tin: 'cut', draw: (t) => {
    g.save(); g.fillStyle = '#faf7f1'; g.fillRect(0, 0, W, H); g.restore();
    const end = ease(64.15, 64.75, t);
    g.save(); g.globalAlpha = 1 - end;
    ribbon(t); ring(t);
    { const k = spring(t - 61.78, ...POP); if (k > 0) { const s = lerp(.55, 1, k), d = R * 2 * s, rot = (1 - Math.min(1, k)) * -.35;
      g.save(); g.translate(cx, cy); g.rotate(rot);
      BRAND.softShadow(() => { g.beginPath(); g.arc(0, 0, d / 2 * .985, 0, 7); g.fillStyle = '#efe9d6'; g.fill(); }, { blur: 50, dy: 24, a: .22 });
      g.drawImage(A.wamd, -d / 2, -d / 2 * A.wamd.height / A.wamd.width, d, d * A.wamd.height / A.wamd.width);
      // shine streak clipped to the badge
      const ks = (t - 62.70) / .55; if (ks > 0 && ks < 1) { g.beginPath(); g.arc(0, 0, d / 2, 0, 7); g.clip(); g.rotate(.5); const x = lerp(-d, d, KT.eInOut(ks));
        const sg = g.createLinearGradient(x - 70, 0, x + 70, 0); sg.addColorStop(0, 'rgba(255,255,255,0)'); sg.addColorStop(.5, 'rgba(255,255,255,.55)'); sg.addColorStop(1, 'rgba(255,255,255,0)');
        g.fillStyle = sg; g.fillRect(x - 70, -d, 140, d * 2); }
      g.restore(); } }
    diamond(cx - R - 40, cy - R + 10, 34, GREEN, Math.max(0, spring(t - 62.0, ...POP)), -.3);
    diamond(cx + R + 30, cy - R + 60, 26, PINK, Math.max(0, spring(t - 62.08, ...POP)), .4);
    diamond(cx + R - 10, cy + R + 30, 20, BLUE, Math.max(0, spring(t - 62.16, ...POP)), -.2);
    KT.show(P.cr, t, { x: cx, y: cy - R - 150, t0: 62.10, in: 'rise', dist: 30 });
    g.restore();
  } });
})();
