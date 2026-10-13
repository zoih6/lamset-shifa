import { chromium } from 'playwright';
import { resolve } from 'node:path'; import { pathToFileURL } from 'node:url';
const b = await chromium.launch({ args: ['--allow-file-access-from-files'] });
const p = await b.newPage({ viewport: { width: 1200, height: 900 } });
p.on('pageerror', e => console.log('ERR', e.message));
await p.goto(pathToFileURL(resolve('index.html')).href);
await p.waitForFunction(() => window.ready === true, null, { timeout: 30000 });
const out = await p.evaluate(() => {
  const W3 = (t, o) => KT.word(t, Object.assign({ font: 'Cairo', weight: 700, color: '#f6f1e6' }, o));
  const S3 = (t, o, n) => KT.stretch(t, Object.assign({ font: 'Cairo', weight: 900, size: 100, color: '#f0b357' }, o), n);
  const lines = {
    'L1 hook':   [W3('لأن كل',{size:54}), S3('خطوة',{size:104},3)[0], W3('صغيرة',{size:54})],
    'L2 hook':   [W3('لتغيير كبير.',{size:78,weight:800}), W3('قد تكون بداية',{size:58})],
    'L3 hook':   [S3('الأفضل.',{size:96},2)[0], W3('على الوصول إلى',{size:50})],
    'svc title': [W3('نقدم مجموعة من الخدمات المتخصصة',{size:54,weight:800})],
    'hero aut':  [S3('اضطراب طيف التوحد',{size:74},2)[0]],
    'brand dsc': [W3('للعلاج الفيزيائي',{size:60,weight:800}), W3('وإعادة التأهيل الطبي',{size:60,weight:800})],
    'phil 1':    [W3('لكل حالة احتياجاتها',{size:54,weight:800})],
    'phil 2':    [W3('ولكل شخص قدراته',{size:54,weight:800})],
    'phil 3':    [W3('التي تستحق أن تكتشف وتنمى.',{size:46})],
    'meth 1b':   [S3('بخطوات مدروسة',{size:76},2)[0]],
    'meth 2':    [W3('واهتمام حقيقي',{size:64,weight:800})],
    'meth 3':    [W3('لمساندة الأطفال والأسر',{size:60,weight:800})],
    'meth 4':    [W3('وتحقيق تطور ملموس',{size:62,weight:800})],
    'sig 2':     [W3('لأن الشفاء ليس',{size:64,weight:800})],
    'sig 3':     [W3('بل',{size:52}), S3('رحلة',{size:100},3)[0], W3('نحو حياة أفضل.',{size:60,weight:800})],
    'cta 1':     [W3('زورونا في صنعاء',{size:44})],
    'cta 2':     [W3('شارع الزبيري',{size:78,weight:900})],
    'cta 3':     [W3('جوار مستشفى سيبلاس',{size:46,weight:700})],
    'cta 4':     [W3('أو تواصلوا معنا عبر الأرقام التالية:',{size:46,weight:700})],
  };
  const res = [];
  for (const [k, ws] of Object.entries(lines)) {
    const gap = 24, total = ws.reduce((s, w) => s + w.w, 0) + gap * (ws.length - 1);
    res.push({ line: k, total: Math.round(total), fits888: total <= 888, parts: ws.map(w => Math.round(w.w)) });
  }
  // phone number widths (Inter 58)
  const c = document.createElement('canvas').getContext('2d');
  c.font = '700 58px Inter';
  res.push({ line: 'phone', total: Math.round(c.measureText('775591666').width), fits888: c.measureText('775591666').width < 430 });
  return res;
});
for (const r of out) console.log((r.fits888 ? 'OK   ' : 'OVER ') + r.line.padEnd(10), 'total', String(r.total).padStart(5), JSON.stringify(r.parts || ''));
await b.close();
