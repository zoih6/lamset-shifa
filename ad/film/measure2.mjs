import { chromium } from 'playwright';
import { resolve } from 'node:path'; import { pathToFileURL } from 'node:url';
const b = await chromium.launch({ args: ['--allow-file-access-from-files'] });
const p = await b.newPage({ viewport: { width: 1200, height: 900 } });
p.on('pageerror', e => console.log('ERR', e.message));
await p.goto(pathToFileURL(resolve('index.html')).href);
await p.waitForFunction(() => window.ready === true, null, { timeout: 30000 });
const out = await p.evaluate(() => {
  const S3 = (t, size, n) => KT.stretch(t, { font: 'Cairo', weight: 900, size, color: '#f0b357' }, n);
  const r = {};
  for (const [name, txt, size, n] of [['خطوة','خطوة',104,3],['الأفضل','الأفضل.',96,2],['توحد','اضطراب طيف التوحد',74,2],['خطوات','بخطوات مدروسة',76,2],['رحلة','رحلة',100,3]])
    r[name] = S3(txt, size, n).map(w => Math.round(w.w));
  r['title48'] = [Math.round(KT.word('نقدم مجموعة من الخدمات المتخصصة', { font: 'Cairo', weight: 800, size: 48 }).w)];
  return r;
});
console.log(JSON.stringify(out, null, 1));
await b.close();
