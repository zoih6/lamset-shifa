# إعلان مركز لمسة شفاء — «الخطوة الأولى»

فيديو موشن جرافيك إعلاني، عمودي 9:16 للريلز، 61.6 ثانية، مبني على التعليق الصوتي المرفوع في هذا المستودع.

## شاهد الفيديو
- `output/lamset_shifa_1080x1920.mp4` — النسخة الأصلية 1080×1920 (45 MB)
- `output/lamset_shifa_720p.mp4` — نسخة أخف 608×1080 للتجربة والرفع السريع (7.7 MB)
- `output/poster.jpg` — صورة الغلاف · `output/contact.jpg` — sheet ملامسة (16 لقطة من الفيلم)

## بنية المشروع
```
ad/                          مشروع الفيلم (Motion-Doc Studio v2.1)
  docs/brief.md              البريف المعتمد
  docs/production_prompt.md  وصف الإنتاج الكامل
  docs/concepts.md           ثلاثة اتجاهات + المختار
  docs/research.md           المصادر وقواعد المنصة
  docs/vo_script.txt         النص الحرفي للتعليق (المرجع الذهبي)
  docs/vo_word_timings.json  توقيت كل كلمة (ساعة الفيلم)
  docs/vo_timeline.md        الجدول الزمني المقروء
  film/index.html            صفحة الفيلم (1080×1920، كل إطار = render(t))
  film/scenes/*.js           المشاهد (s1_hook · s2_services · s3_method · s4_cta)
  film/assets/               الخلفيات المولّدة + الشعاران
  tools/                     سكربتات المشروع
```

## كيف تُعاد بناء أي تعديل
```bash
bash <(curl -fsSL https://raw.githubusercontent.com/zoih6/motion-doc-studio/main/install.sh)   # مرة واحدة
cd ad/film
PAGE=index.html node ../tools/still.mjs 12 24 36 51          # لقطات سريعة للمراجعة
PAGE=index.html node ../tools/render.mjs --from 0 --to 61.6 --out /tmp/silent.mp4 --sub 2 --crf 18
ffmpeg -i /tmp/silent.mp4 -i ../../VID-20261008-WA0000_033531695.aac \
  -map 0:v -map 1:a -af "volume=-1.6dB" -c:v copy -c:a aac -b:a 192k -shortest final.mp4
```

## القياسات على الملف المُسلَّم
| البند | القيمة |
|---|---|
| المدة | 61.610 ث = مدة الصوت (1848 إطار @ 30fps) |
| المقاس | 1080×1920 (9:16) |
| المستوى الصوتي | −14.9 LUFS · الذروة الحقيقية −1.0 dBFS |
| الموسيقى | بدون موسيقى (بقرار العميل) — التعليق الصوتي فقط |

## ملاحظات
- الرقمان 775591666 و 775581666 **معروضان على الشاشة** (الصوت ينتهي عند «عبر الأرقام التالية:» ولا يقرؤهما).
- العنوان مكتوب كاملًا: **شارع** الزبيري.
- شعار المركز (أخضر) يظهر على لوحة كريمية ليكون مقروءًا على الخلفية التركوازية؛ شعار «ومض» في آخر لقطة.
