// ═══════════════════════════════════════════════════════════════════════════════════
//  «الخطوة الأولى» — shared visual system (palette, background, path, footprints, glass)
//  Canvas 1080×1920 (9:16). Everything is a pure function of t. Loaded before the scenes.
// ═══════════════════════════════════════════════════════════════════════════════════
(() => {
  const C = {
    bgTop: '#04231f', bgMid: '#0a5f57', bgBot: '#03211f',
    ink: '#f6f1e6', cream: '#f6f1e6', amber: '#f0b357', amberL: '#ffd79a',
    tealMist: '#7fb3ac', panel: '244,236,220', deep: '#02201d',
  };
  const SAFE = { top: 300, bottom: 1512, left: 96, right: 984 };   // 14% top / 21% bottom / 9% sides
  const rgbaC = (rgb, a) => `rgba(${rgb},${a})`;

  // ── cached background: deep teal gradient + one warm light pool + soft vignette ──
  let BG = null;
  function buildBG() {
    const c = mk(W, H), x = c.getContext('2d');
    const gr = x.createLinearGradient(0, 0, 0, H);
    gr.addColorStop(0, C.bgTop); gr.addColorStop(.52, C.bgMid); gr.addColorStop(1, C.bgBot);
    x.fillStyle = gr; x.fillRect(0, 0, W, H);
    const pool = x.createRadialGradient(W * .5, H * .70, 0, W * .5, H * .70, W * .95);
    pool.addColorStop(0, 'rgba(240,179,87,.20)'); pool.addColorStop(.45, 'rgba(240,179,87,.07)'); pool.addColorStop(1, 'rgba(240,179,87,0)');
    x.fillStyle = pool; x.fillRect(0, 0, W, H);
    const vg = x.createRadialGradient(W / 2, H * .42, H * .28, W / 2, H / 2, H * .95);
    vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,.55)');
    x.fillStyle = vg; x.fillRect(0, 0, W, H);
    return c;
  }
  // background with a slow breathing camera (never static)
  function bg(t, { s0 = 1, s1 = 1.05, a = 0, b = 10, plate = null, plateA = 0, plateBlur = 0 } = {}) {
    if (!BG) BG = buildBG();
    const k = ease(a, b, t), s = lerp(s0, s1, k);
    g.save(); g.translate(W / 2, H / 2); g.scale(s, s); g.translate(-W / 2, -H / 2);
    g.drawImage(BG, 0, 0); g.restore();
    if (plate && A[plate] && plateA > 0) {                    // generated plate used as atmosphere only
      g.save(); g.globalAlpha = plateA;
      if (plateBlur) g.filter = `blur(${plateBlur}px)`;
      g.globalCompositeOperation = 'screen';
      const p = A[plate], k2 = ease(a, b, t), s2 = lerp(1.02, 1.1, k2);
      const w = W * s2, h = H * s2;
      g.drawImage(p, (W - w) / 2, (H - h) / 2 - 40, w, h);
      g.restore();
    }
  }

  // ── the PATH: one continuous line, the film's spine ──────────────────────────────
  const PATH = [[778, 1692], [452, 1506], [806, 1288], [332, 1042], [772, 792], [430, 556], [648, 404]];
  // cumulative lengths
  const SEG = []; let PLEN = 0;
  for (let i = 1; i < PATH.length; i++) { const l = Math.hypot(PATH[i][0] - PATH[i - 1][0], PATH[i][1] - PATH[i - 1][1]); SEG.push(l); PLEN += l; }
  function pathAt(u) {                                        // u∈[0,1] → {x,y,ang}
    let d = clamp(u) * PLEN, i = 0;
    while (i < SEG.length - 1 && d > SEG[i]) { d -= SEG[i]; i++; }
    const k = clamp(d / SEG[i]), [x0, y0] = PATH[i], [x1, y1] = PATH[i + 1];
    return { x: lerp(x0, x1, k), y: lerp(y0, y1, k), ang: Math.atan2(y1 - y0, x1 - x0) };
  }
  const pathU = (t) => clamp((t - .55) / 48.5);               // the path starts with the first footprint
  // draws the path up to progress u (draw-on), with a glowing tip
  function drawPath(u, { alpha = 1, glow = 1 } = {}) {
    if (u <= 0) return;
    g.save(); g.lineCap = 'round'; g.lineJoin = 'round';
    const pts = []; let acc = 0; pts.push(PATH[0]);
    for (let i = 0; i < SEG.length && acc < u * PLEN; i++) {
      const k = clamp((u * PLEN - acc) / SEG[i]); acc += SEG[i];
      pts.push([lerp(PATH[i][0], PATH[i + 1][0], k), lerp(PATH[i][1], PATH[i + 1][1], k)]);
    }
    g.beginPath(); g.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) g.lineTo(pts[i][0], pts[i][1]);
    g.strokeStyle = rgbaC('240,179,87', .16 * alpha); g.lineWidth = 26; g.stroke();
    g.strokeStyle = rgbaC('246,241,230', .55 * alpha); g.lineWidth = 3.2; g.stroke();
    const tip = pathAt(u);
    if (glow && u < .999) { const r = 12 + Math.sin(u * 40) * 1.5;
      g.globalCompositeOperation = 'lighter';
      const gr = g.createRadialGradient(tip.x, tip.y, 0, tip.x, tip.y, r * 4.2);
      gr.addColorStop(0, rgbaC('255,215,154', .85 * alpha)); gr.addColorStop(1, 'rgba(255,215,154,0)');
      g.fillStyle = gr; g.beginPath(); g.arc(tip.x, tip.y, r * 4.2, 0, 6.283); g.fill();
      g.globalCompositeOperation = 'source-over'; }
    g.restore();
  }
  // a footprint stamped on the path at path-position u (side = +1 / -1 alternates)
  function footprint(x, y, ang, k, { side = 1, alpha = 1, color = '255,215,154' } = {}) {
    if (k <= 0) return;
    const s = lerp(2.4, 1, Math.pow(clamp(k), .55));          // stampIn: slams down from huge
    g.save(); g.translate(x, y); g.rotate(ang + Math.PI / 2); g.translate(side * 26, 0);
    g.scale(Math.max(.02, s), Math.max(.02, s));
    g.globalAlpha = alpha * clamp(k * 3);
    g.fillStyle = rgbaC(color, .92);
    g.beginPath(); g.ellipse(0, 12, 25, 36, 0, 0, 6.283); g.fill();          // sole
    g.beginPath(); g.ellipse(0, -30, 17, 20, 0, 0, 6.283); g.fill();         // ball of the foot
    for (let i = 0; i < 5; i++) { const a = -Math.PI * .82 + i * Math.PI * .16;
      g.beginPath(); g.arc(Math.cos(a) * 40, -44 + Math.sin(a) * 22, 5.6 - i * .35, 0, 6.283); g.fill(); }
    g.restore();
  }
  // ripple ring when a footprint lands
  const stepRipple = (x, y, t, t0, o = {}) => { ripple(x, y, t, t0 + .16, { color: '255,215,154', r1: o.r1 || 130, dur: .55, width: 4 }); };
  // a node (small dot) on the path — one per service
  const node = (x, y, t, t0, { r = 11, color = C.amberL } = {}) => { const k = spr(t, t0, 'snap'); if (k <= 0) return;
    g.save(); g.fillStyle = color; g.globalAlpha = clamp(k * 2); g.beginPath(); g.arc(x, y, Math.max(0, r * k), 0, 6.283); g.fill();
    g.globalAlpha = clamp(k * 2) * .5; g.beginPath(); g.arc(x, y, Math.max(0, r * k * 2.3), 0, 6.283);
    g.strokeStyle = color; g.lineWidth = 2; g.stroke(); g.restore(); };

  // ── frosted glass panel ──────────────────────────────────────────────────────────
  function glass(x, y, w, h, { r = 28, fill = .10, stroke = .20, lift = 0, alpha = 1, tintTop = null } = {}) {
    if (alpha <= .003) return;
    g.save(); g.globalAlpha = alpha;
    if (lift) { g.save(); g.filter = `blur(${14 * lift}px)`; g.fillStyle = `rgba(0,0,0,${.28 * lift})`;
      rrect(x + 6, y + 14 * lift, w, h, r); g.fill(); g.restore(); }
    rrect(x, y, w, h, r);
    const gr = g.createLinearGradient(x, y, x, y + h);
    gr.addColorStop(0, rgbaC(C.panel, fill * 1.5)); gr.addColorStop(1, rgbaC(C.panel, fill * .7));
    g.fillStyle = gr; g.fill();
    g.strokeStyle = rgbaC('246,241,230', stroke); g.lineWidth = 1.6; g.stroke();
    if (tintTop !== null) { const hl = g.createLinearGradient(x, y, x, y + h * .5);
      hl.addColorStop(0, rgbaC('255,255,255', tintTop)); hl.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = hl; rrect(x + 1.5, y + 1.5, w - 3, h * .5, r); g.fill(); }
    g.restore();
  }
  // glass row (service tile): glass + draw-on icon at the right + label right-aligned
  function tile(x, y, w, h, t, t0, { icon: ic = null, label = null, k = 1, alpha = 1, accent = false, labelSize = 46 } = {}) {
    const kk = spr(t, t0, 'card'); if (kk <= .001) return;
    const a = clamp(kk * 3) * alpha;
    g.save(); g.globalAlpha = a;
    g.translate(0, (1 - kk) * 40);
    glass(x, y, w, h, { r: 26, fill: accent ? .16 : .10, stroke: accent ? .38 : .18,
      tintTop: accent ? .10 : .05, lift: (1 - kk) * .8 });
    if (ic) icon(ic, x + w - 74, y + h / 2, 52, { color: accent ? C.amber : C.cream, lw: 2.2, k: clamp(kk * 1.6), alpha: .95 });
    if (label) {
      g.save(); g.globalAlpha = a * clamp(kk * 2.2);
      g.font = `700 ${labelSize}px Cairo`; g.direction = 'rtl'; g.textAlign = 'right'; g.textBaseline = 'middle';
      g.fillStyle = accent ? C.amberL : C.cream;
      g.fillText(label, x + w - 132, y + h / 2 + 2); g.restore();
    }
    g.restore();
  }
  // a soft amber/cream glow blob behind a hero (the "touch" light)
  function lightPool(x, y, r, alpha = .5, color = '240,179,87') {
    g.save(); g.globalCompositeOperation = 'lighter';
    const gr = g.createRadialGradient(x, y, 0, x, y, r);
    gr.addColorStop(0, rgbaC(color, .55 * alpha)); gr.addColorStop(.5, rgbaC(color, .18 * alpha)); gr.addColorStop(1, rgbaC(color, 0));
    g.fillStyle = gr; g.beginPath(); g.arc(x, y, r, 0, 6.283); g.fill(); g.restore();
  }
  // slow ambient motes in the light (ambient layer — never generic particles everywhere)
  function motes(t, { n = 14, seed = 3, alpha = .5, area = [W * .18, H * .42, W * .64, H * .5] } = {}) {
    const r = rng(seed); g.save();
    for (let i = 0; i < n; i++) {
      const bx = area[0] + r() * area[2], by = area[1] + r() * area[3], sp = .12 + r() * .22, ph = r() * 6.28;
      const y = by - ((t * sp * 40 + ph * 90) % (area[3] + 200)) + 100;
      const x = bx + Math.sin(t * .5 + ph) * 14;
      const a = alpha * (.25 + .75 * (.5 + .5 * Math.sin(t * .8 + ph))) * clamp((y - area[1] + 60) / 120);
      if (a <= .01) continue;
      g.fillStyle = `rgba(255,225,180,${a * .5})`; g.beginPath(); g.arc(x, y, 1.6 + r() * 2.4, 0, 6.283); g.fill();
    }
    g.restore();
  }
  // line of text typeset live (RTL), used for captions we want to keep crisp
  function txt(s, x, y, size, { color = C.cream, font = 'Cairo', weight = 700, alpha = 1, align = 'right', lh = 1.35 } = {}) {
    if (!s) return; g.save(); g.globalAlpha = alpha; g.font = `${weight} ${size}px ${font}`;
    g.direction = 'rtl'; g.textAlign = align; g.textBaseline = 'middle'; g.fillStyle = color;
    String(s).split('\n').forEach((ln, i) => g.fillText(ln, x, y + i * size * lh)); g.restore();
  }
  // measure helper
  const measure = (s, size, font = 'Cairo', weight = 700) => { g.save(); g.font = `${weight} ${size}px ${font}`; g.direction = 'rtl';
    const w = g.measureText(s).width; g.restore(); return w; };

  // lay a list of KT words out on one line, right→left (RTL flow). Returns [{Wd, x, y}]
  function flowRight(items, xRight, y, { gap = 26, align = 'middle' } = {}) {
    let cur = xRight; const out = [];
    for (const it of items) { const w = (it.mw || it.Wd.w) * (it.sc || 1); out.push(Object.assign({}, it, { x: cur, y, ax: 1 })); cur -= w + gap; }
    return out;
  }
  // brand logo on a cream plate (the mark is teal — it needs a light surface on our dark stage)
  function logoPlate(key, cx, cy, w, t, t0, { alpha = 1, pad = 46, r = 34 } = {}) {
    const img = A[key]; if (!img) return;
    const k = spr(t, t0, 'card'); if (k <= .001) return;
    const h = w * img.height / img.width, pw = w + pad * 2, ph = h + pad * 2;
    g.save(); g.globalAlpha = alpha * clamp(k * 3);
    g.translate(cx, cy + (1 - k) * 90); g.scale(lerp(.94, 1, k), lerp(.94, 1, k));
    g.save(); g.filter = `blur(${18 * (1 - k)}px)`; g.fillStyle = `rgba(0,0,0,${.35 * (1 - k)})`;
    rrect(-pw / 2 + 8, -ph / 2 + 16, pw, ph, r); g.fill(); g.restore();
    rrect(-pw / 2, -ph / 2, pw, ph, r);
    const gr = g.createLinearGradient(0, -ph / 2, 0, ph / 2);
    gr.addColorStop(0, 'rgba(248,244,236,.97)'); gr.addColorStop(1, 'rgba(240,233,220,.93)');
    g.fillStyle = gr; g.fill();
    g.drawImage(img, -w / 2, -h / 2, w, h);
    g.restore();
  }
  // plain logo (light marks, e.g. the studio logo) — no plate
  function logoPlain(key, cx, cy, w, t, t0, { alpha = 1, spring = 'card' } = {}) {
    const img = A[key]; if (!img) return;
    const k = spr(t, t0, spring); if (k <= .001) return;
    const h = w * img.height / img.width;
    g.save(); g.globalAlpha = alpha * clamp(k * 2.5); g.translate(cx, cy);
    g.scale(lerp(.9, 1, k), lerp(.9, 1, k)); g.drawImage(img, -w / 2, -h / 2, w, h); g.restore();
  }

  window.SH = { C, SAFE, bg, PATH, pathAt, pathU, drawPath, footprint, stepRipple, node, glass, tile, lightPool, motes, txt, measure, rgbaC, spr, clamp, lerp, ease, easeOut, mk, flowRight, logoPlate, logoPlain };
})();
