// ═══ Lamset Shifa · brand toolkit (shared by every scene) ═══════════════════════════════
// palette from logo.png · one accent (gold) · leaves = steps = growth
const BR = { cream: '#f6f1e7', cream2: '#efe5d3', deep: '#064a44', teal: '#0e6b5c', mint: '#3fa58a', leafL: '#7cc4a0',
  gold: '#c6982f', goldL: '#e2bd62', white: '#ffffff', ink: '#0b3d37' };
const BRAND = (() => {
  let bgC = null, vigC = null;
  INITS.push(async () => {
    await loadImg('emblem', 'assets/emblem.png'); await loadImg('wordmark', 'assets/wordmark.png'); await loadImg('logo', 'assets/logo.png');
    bgC = mk(W, H); { const x = bgC.getContext('2d'), gr = x.createRadialGradient(W * .5, H * .42, 80, W * .5, H * .5, H * .75);
      gr.addColorStop(0, '#fbf8f1'); gr.addColorStop(.6, BR.cream); gr.addColorStop(1, '#eadfca'); x.fillStyle = gr; x.fillRect(0, 0, W, H); }
    vigC = mk(W, H); { const x = vigC.getContext('2d'), gr = x.createRadialGradient(W / 2, H * .48, H * .35, W / 2, H / 2, H * .85);
      gr.addColorStop(0, 'rgba(40,30,10,0)'); gr.addColorStop(1, 'rgba(40,30,10,.16)'); x.fillStyle = gr; x.fillRect(0, 0, W, H); }
  });
  const stage = () => { g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.drawImage(bgC, 0, 0); g.restore(); };
  const post = (t) => { g.setTransform(1, 0, 0, 1, 0, 0); g.drawImage(vigC, 0, 0); };
  // a leaf along +x from (0,0), length L, half-width w
  function leafPath(c, L, w, bend = .12) { c.beginPath(); c.moveTo(0, 0);
    c.bezierCurveTo(L * .25, -w * 1.25, L * .7, -w * (1 + bend), L, 0); c.bezierCurveTo(L * .72, w * (1 - bend) * .9, L * .28, w * 1.05, 0, 0); c.closePath(); }
  function leaf(x, y, L, rot, { w = L * .34, k = 1, alpha = 1, c1 = BR.teal, c2 = BR.leafL, rib = true, gold = false } = {}) {
    if (k <= .002 || alpha <= .002) return; g.save(); g.translate(x, y); g.rotate(rot); g.scale(k, k); g.globalAlpha *= alpha;
    const gr = g.createLinearGradient(0, -w, L, w); gr.addColorStop(0, gold ? BR.goldL : c2); gr.addColorStop(1, gold ? BR.gold : c1);
    leafPath(g, L, w); g.fillStyle = gr; g.fill();
    if (rib) { g.strokeStyle = 'rgba(255,255,255,.28)'; g.lineWidth = Math.max(1.5, L * .025); g.lineCap = 'round';
      g.beginPath(); g.moveTo(L * .08, 0); g.quadraticCurveTo(L * .5, -w * .12, L * .9, 0); g.stroke(); }
    g.restore();
  }
  // arch / pill / circle window path (morphs: w,h, top radius, bottom radius)
  function archPath(c, cx, cy, w, h, rt, rb) { const x = cx - w / 2, y = cy - h / 2; rt = Math.max(0, Math.min(rt, w / 2, h / 2)); rb = Math.max(0, Math.min(rb, w / 2, h / 2));
    c.beginPath(); c.moveTo(x + rt, y); c.lineTo(x + w - rt, y); c.arcTo(x + w, y, x + w, y + rt, rt); c.lineTo(x + w, y + h - rb); c.arcTo(x + w, y + h, x + w - rb, y + h, rb);
    c.lineTo(x + rb, y + h); c.arcTo(x, y + h, x, y + h - rb, rb); c.lineTo(x, y + rt); c.arcTo(x, y, x + rt, y, rt); c.closePath(); }
  // cover-fit an image into the current clip box (bx,by,bw,bh) with zoom s around focus fx,fy
  function cover(img, bx, by, bw, bh, { s = 1, fx = .5, fy = .5, alpha = 1 } = {}) {
    const base = Math.max(bw / img.width, bh / img.height) * s, w = img.width * base, h = img.height * base;
    const x = clamp(bx + bw / 2 - fx * w, bx + bw - w, bx), y = clamp(by + bh / 2 - fy * h, by + bh - h, by);
    g.save(); g.globalAlpha *= alpha; g.drawImage(img, x, y, w, h); g.restore();
  }
  function softShadow(fn, { blur = 40, dy = 24, a = .22 } = {}) { g.save(); g.shadowColor = `rgba(6,40,36,${a})`; g.shadowBlur = blur; g.shadowOffsetY = dy; fn(); g.restore(); }
  // pill tag: rounded rect with text (pre-rendered word) + gold dot
  function pill(Wd, x, y, k, { fill = BR.deep, dot = true, alpha = 1, padX = 54, h = null } = {}) {
    if (k <= .002) return; const ww = Wd.w + padX * 2 + (dot ? 34 : 0), hh = h || Wd.size * 1.9;
    g.save(); g.translate(x, y); g.scale(lerp(.6, 1, k), lerp(.6, 1, k)); g.globalAlpha *= clamp(k * 2) * alpha;
    softShadow(() => { archPath(g, 0, 0, ww, hh, hh / 2, hh / 2); g.fillStyle = fill; g.fill(); }, { blur: 30, dy: 14, a: .25 });
    const tx = dot ? -17 : 0; g.drawImage(Wd.img, tx - Wd.img.width / 2, -Wd.img.height / 2 + Wd.size * .06);
    if (dot) { g.fillStyle = BR.goldL; g.beginPath(); g.arc(ww / 2 - padX * .62, 0, 10, 0, 7); g.fill(); }
    g.restore(); return { w: ww, h: hh };
  }
  const img = (k) => A[k];
  return { stage, post, leaf, leafPath, archPath, cover, softShadow, pill, img };
})();
