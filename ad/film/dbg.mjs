import { chromium } from 'playwright';
import { resolve } from 'node:path'; import { pathToFileURL } from 'node:url';
const b = await chromium.launch({ args: ['--allow-file-access-from-files'] });
const p = await b.newPage({ viewport: { width: 1200, height: 900 } });
p.on('console', m => console.log('console:', m.text())); p.on('pageerror', e => console.log('ERR', e.message));
await p.goto(pathToFileURL(resolve('index.html')).href);
try { await p.waitForFunction(() => window.ready === true, null, { timeout: 30000 }); }
catch(e) { console.log('NOT READY'); }
console.log(await p.evaluate(() => {
  const out = {};
  out.ready = window.ready;
  out.hasKT = typeof window.KT;
  out.stretch = typeof (window.KT && KT.stretch);
  try { const s = KT.stretch('خطوة', { font: 'Cairo', weight: 900, size: 104, color: '#f0b357' }, 3); out.sLen = s.length; out.s0 = !!s[0]; out.s0w = s[0] && s[0].w; } catch (e) { out.stretchErr = e.message; }
  try { const w = KT.word('لأن كل', { font: 'Cairo', weight: 700, size: 54, color: '#f6f1e6' }); out.ww = w && w.w; } catch (e) { out.wordErr = e.message; }
  try { out.kashida = KT.kashida('خطوة', 2); } catch (e) { out.kashErr = e.message; }
  out.shots = (window.SHOTS||[]).map(s => [s.a, s.b]);
  out.assets = Object.keys(window.A || {});
  return out;
}));
await b.close();
