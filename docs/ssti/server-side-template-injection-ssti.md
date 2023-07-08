# Server-side template injection (SSTI)

Ushbu bo'limda biz server-side template injection nimaligi haqida gaplashamiz va ba'zi zaifliklarni exploit qilish uchun asosiy metodlarni ko'rib chiqamiz. Shuningdek biz sizga template lardan foydalanayotganingizda ular tufayli sizning web saytingizda server-side template injection zaifliki aniqlanmasligi uchun himoyalanishni tushuntiramiz.

:::caution **Labaratoriyalar**
Agar siz SSTI zaifliklari haqida bilsangiz pastdagi link orqali, haqiqiy web sayt kabi tuzilgan laboratoriyalarni yechishingiz mumkin.\ [Barcha SSTI labaratoriyalarini ko'rish ≫](https://portswigger.net/web-security/all-labs#server-side-template-injection)
:::

Bu usul Portswigger tomonidan birinchi marotaba 2015-yilgi mavzu yuzasidan tedqiqot sahifamizda chiqarilgan. Agar saytlarda ushbu zaifliklardan qanday foydalanish mumkinligi haqida qiziqsangiz, tadqiqot sahifamizda batafsil o'qishingiz mumkin.

:::tip **Tadqiqot**
[Server-side template injection ☰](https://portswigger.net/research/server-side-template-injection)
:::

## Server-side template injection nima ? <a href="#server-side-template-injection-nima" id="server-side-template-injection-nima"></a>

Server-side template injection bu, qachonki haker local template sintaksisidan foydalanib zararli payloadni template ichiga kirita olganida, u server-side taraflama ishga tushadi.

Template enganelar o'zgarmas shablonlarni o'zgaruvchan ma'lumotlar bilan birlashtirish orqali veb-sahifalarni yaratish uchun mo'ljallangan. Server-side template injection hujumlari foydalanuvchi kiritgan maʼlumotlar maʼlumotlar sifatida o'tkazilganda emas, balki toʻgʻridan-toʻgʻri templatega birlashtirilganda sodir boʻlishi mumkin. Bu hackerlarga template mexanizmini manipulyatsiya qilish uchun o'zboshimchalik bilan shablon direktivalarini kiritish imkonini beradi va ko'pincha ularga serverni to'liq nazorat qilish imkonini beradi. Nomidan ko'rinib turibdiki, server-side template injection payloadlari server-sidedan yetkazib beriladi va baholanadi, bu esa ularni odatiy client-side template injectiondan ko'ra ancha xavfliroq qiladi..

## Server-side template injectionning ta'siri qanday ? <a href="#server-side-template-injection-tasiri-qanday" id="server-side-template-injection-tasiri-qanday"></a>

Server-side template injection zaifliklari template engine-ga qarab va sayt undan qanday foydalanishiga qarab veb-saytlarni turli xil hujumlarga duchor qilishi mumkin. Kamdan-kam hollarda, bu zaifliklar xavfsizlik uchun haqiqiy xavf tug'dirmaydi. Biroq juda ko'p hollarda Server-side template injection ta'siri juda yomon bo'ladi.

Juda bo'lmaganda Haker masofadan kodni bajarish imkoniyatini qo'lga kiritadi, to'liq server nazoratini qo'lga kiritadi va uni boshqa xujumlarni amalga oshirish uchun asos qilib olishi mumkin.

Masofaviy kodni toʻliq bajarish imkoni boʻlmagan hollarda ham Haker koʻpincha server-side template ni kiritishdan boshqa, koʻplab xujumlar uchun undan asos sifatida foydalanishi mumkin, bu esa serverdagi maxfiy maʼlumotlar va fayllarni oʻqish huquqini qoʻlga kiritishi mumkin.

## Server-side template injection zaifliklari qanday paydo bo'ladi ? <a href="#qanday-qilib-server-side-template-injection-zaifliklari-qanday-paydo-boladi" id="qanday-qilib-server-side-template-injection-zaifliklari-qanday-paydo-boladi"></a>

**Server side template**ni kiritishda zaifliklar foydalanuvchi kiritgan maʼlumotlar maʼlumot sifatida oʻtkazilganda emas, balki template larga birlashtirilganda paydo boʻladi.

Dinamik kontekst ichida placeholderlar mavjud bo'lgan static saytlar odatda server-side template injectionga zaif bo'lmaydi. Masalan, [Twig](https://twig.symfony.com/) templateda quyidagi misol kabi har bir foydalanuvchini nomi bilan salomlashadigan elektron pochta xabari:

```tt2
$output = $twig->render("Dear {first_name},", array("first_name" => $user.first_name) );
```

Bu server-side template injectionga zaif emas, chunki foydalanuvchi nomi templatega shunchaki ma'lumot sifatida qabul qilinadi.

Biroq, template-lar oddiy stringlar bo'lgani uchun, web dasturchilar ba'zan ma'lumotni ko'rsatishdan oldin foydalanuvchi ma'lumotlarini bevosita template larga birlashtirishadi. Keling, yuqoridagiga o'xshash misolni olaylik, ammo bu safar foydalanuvchilar elektron pochta xabarlarini yuborishdan oldin uning qismlarini sozlashlari mumkin. Masalan, ular ishlatiladigan nomni tanlashlari mumkin:

```tt2
$output = $twig->render("Dear " . $_GET['name']);
```

Bu misolda esa templatega statik qiymat berish o'rniga name parametrli GET bilan dinamik tarzda yaratilgan template ning bir qismiga qo'shiluvchi qiymat ishlatilgan. Bu esa Hakerga name parametriga o'zining payloadini qo'yib server-side template injection ni amalga oshiriga imkon beradi:

```
http://vulnerable-website.com/?name={{bad-stuff-here}}
```

Zaifliklar ba'zida xavfsizlik haqida yaxshi bilmaydigan odamlar tomonidan tuzilgan no'to'g'ri template dizayn sabab paydo bo'ladi. Yuqoridagi misolda bo'lgani kabi, siz turli xil komponentlarni ko'rishingiz mumkin, ularning ba'zilari foydalanuvchi tomonidan kiritilgan, birlashtirilgan va shablonga qo'shilgan.Qaysidir ma'noda, bu noto'g'ri qilingan statementlar yuzaga keladigan [SQL ineksiya](/sql-ineksiya) zaifliklariga o'xshaydi.

Biroq ba'zida bu narsa maxsus yaratilgan bo'lishi mumkin. Misol uchun, ba'zi web-saytlar  ma'lum imtiyozli foydalanuvchilarga, masalan, kontent muharrirlariga dizayn bo'yicha maxsus template larni tahrirlash yoki yuborishga ruxsat beradi. Agar haker bunday imtiyozlarga ega bo'lgan profilni buza olsa, bu aniq xavfsizlik uchun katta xavf tug'diradi.

## Server-side template injection xujumini tuzish <a href="#server-side-template-injection-xujumini-qurish" id="server-side-template-injection-xujumini-qurish"></a>

Odatda server-side template inejction zaifliklarini aniqlash va xujumni muvaffaqiyatli amalga oshirish quyidagi jarayonni o'z ichiga oladi.

![](../.gitbook/assets/image%20%285%29.png)

## Aniqlash (Detect) <a href="#aniqlash" id="aniqlash"></a>

SSTI zaifliklarini ko'pincha e'tiborga olinmagani ular murakkab bo'lganligi uchun emas, balki ular faqat SSTI zaifligini qidirayotgan odamgagina ko'rinadi. Agar zaiflikni aniqlay olsangiz, undan foydalanish juda oson bo'lishi mumkin.

Har qanday zaiflikda bo'lgani kabi, exploit qilish uchun birinchi qadam uni topishdir. Balki, birinchi tekshiruv `${{<%[%'"}}%\` kabi templatelarda tez-tez ishlatiladigan maxsus belgilar ketma-ketligini kiritish orqali templateni [fuzzing](https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FrI3bnq4ApxRcW4MU3hFQ%2Fuploads%2Fbro0vdXRxfsnfFp5BsSf%2Ffuzzing.png?alt=media\&token=e56b8c60-ab1d-416f-91b2-a91ccb04742b) qilishga harakat qilishdir. Agar nomuvofiqlik paydo bo'lsa, bu kiritilgan template sintaksisi server tomondan qandaydir tarzda talqin qilinayotganligini ko'rsatadi. Bu server side template injection zaifligi mavjudligining bir belgisidir.

Server side template inejction zaifliklari ikkita alohida vaziyatda paydo bo'ladi, ularning har biri o'ziga xos aniqlash usulini talab qiladi. Fuzzing urinishlaringiz natijalaridan qat'iy nazar, quyidagi kontekstga xos yondashuvlarni ham sinab ko'rish muhimdir. Agar fuzzing muvaffaqqiyatsiz bo'lsa, ushbu yondashuvlardan biri yordamida zaiflik hali ham yuzaga chiqishi mumkin. Hatto agar fuzzing template injection zaifligini taklif qilsa ham, uni exploit qilish uchun siz hali ham uning kontekstini aniqlashingiz kerak bo'ladi.

## Plaintext context <a href="#plaintext-context" id="plaintext-context"></a>

Ko'pgina template tillari  sizga to'g'ridan-to'g'ri HTML teglaridan foydalanib yoki HTTP response yuborilishidan avval backendda **HTML-da  ko'rinadigan templatening lokal sintaksisi**dan foydalanish orqali kontentni bemalol kiritish imkonini beradi. Masalan, Freemarkerda `render('Hello ' + username)` qatori Hello Carlos kabi biror ma'lumotni ko'rsatadi.

Bu ba'zan [XSS](../xss/) uchun exploit qilinishi mumkin va ko'pincha oddiy XSS zaifligini keltirib chiqaruvchi  xatoliklar qilinadi. Biroq, matematik operatorlarni parametr qiymat sifatida berish orqali biz bu server-side template injection hujumi uchun saytdagi zaif nuqta ekanligini tekshirishimiz mumkin.

Misol uchun, quyidagi zaif kodni o'z ichiga olgan templatega qarang:

```tt2
render('Hello ' + username)
```

Tekshiruv davomida biz URL manzilini so'rash orqali server side template injectionni sinab ko'rishimiz mumkin, masalan:

```url
http://vulnerable-website.com/?username=${7*7}
```

Agar natija `Hello 49` bo'lsa, bu matematik amal server tomonda bajarilayotganligini ko'rsatadi. Bu SSTI zaifligi uchun haqiqiy isbotdir.

Matematik amalni muvaffaqiyatli bajarish uchun zarur bo'lgan maxsus sintaksis qaysi template mexanizmini ishlatayotganiga qarab o'zgarishini unutmang. Buni Tekshirish bosqichida batafsil muhokama qilamiz.

## Code context <a href="#code-context" id="code-context"></a>

Boshqa holatkarda, zaiflik, avvalroq elektron pochta misolida ko'rganimizdek, template expression ichiga joylashtirilgan foydalanuvchi ma'lumotlari orqali aniqlanadi. Bu parametr ichiga joylashtirilgan foydalanuvchi tomonidan kiritiladigan oʻzgaruvchi nomi koʻrinishida boʻlishi mumkin, masalan:

```tt2
greeting = getQueryParameter('greeting')
engine.render("Hello {{"+greeting+"}}", data)
```

Web saytda URL manzil mana bunday holatda ko'rinadi:

```url
http://vulnerable-website.com/?greeting=data.username
```

Masalan bu Hello Carlos bo'lib chiqishi kerak.

Bu, **kontekstni ko'rib chiqish davomida** osongina o'tkazib yuboriladi, chunki u XSSga olib kelmaydi va bu deyarli oddiy xashmap lookupdan farq qilmaydi. Ushbu kontekstda server side template injectionni tekshirish usullaridan biri bu qiymatga o'zboshimchalik bilan HTMLni inject qilish orqali parametrda yo'naltirilgan XSS zaifligi yo'qligini aniqlash:

```url
http://vulnerable-website.com/?greeting=data.username<tag>
```

XSS bo'lmasa, bu odatda outputda bo'sh ma'lumot (username-siz `Hello`), encoded teglarga yoki xato xabariga olib keladi. Keyingi qadam, umumiy template sintaksisi yordamida statementdan chiqib ketish va undan keyin o'zboshimchalik bilan HTMLni inject harakat qilishdir:

```
http://vulnerable-website.com/?greeting=data.username}}<tag>
```

Agar bu yana xatolik yoki bo'sh outputga olib kelsa, siz noto'g'ri template tilidagi sintaksisdan foydalangansiz yoki template uslubidagi sintaksis to'g'ri kelmasa, SSTI-ni bajarish mumkin emas. Aksincha, agar output o'zboshimcha HTML bilan bir qatorda toʻgʻri renderlangan boʻlsa, bu SSTI zaifligi mavjudligining asosiy belgisidir:

```
Hello Carlos<tag>
```

## Aniqlash (Identify)

Template injectionni aniqlaganingizdan so'ng, keyingi qadam template mexanizmini aniqlashdir.

Turli xil template tillari mavjud bo'lsa-da, ularning ko'pchiligi HTML belgilari bilan to'qnash kelmaslik uchun maxsus tanlangan va juda o'xshash sintaksisdan foydalanadi. Natijada, qaysi template engine ishlatilayotganligini tekshirish uchun probing payloadlarini yaratish nisbatan oddiy bo'lishi mumkin.

Ko'pincha noto'g'ri sintaksisni yuborishning o'zi yetadi, chunki natijada paydo bo'lgan xato xabari sizga qaysi template mexanizmi ekanligini va hatto ba'zan qaysi versiyasi ishlatilayotganini ko'rsatadi. Masalan, `<%=foobar%>` noto‘g‘ri ifodasi Ruby-ga asoslangan ERB engine dan quyidagi javobni ishga tushiradi:

```tt2
(erb):1:in `<main>': undefined local variable or method `foobar' for main:Object (NameError)
from /usr/lib/ruby/2.5.0/erb.rb:876:in `eval'
from /usr/lib/ruby/2.5.0/erb.rb:876:in `result'
from -e:4:in `<main>'
```

Aks holda, siz turli xil tillarga xos bo'lgan payloadlarni qo'lda sinab ko'rishingiz va bu template mexanizmi tomonidan qanday amalga oshirilishini o'rganishingiz kerak bo'ladi. Qaysi sintaksis to'g'ri yoki noto'g'riligini aniqlash orqali o'ylayotgan variantlaringizni qisqarishingiz mumkin. Buni amalga oshirishning keng tarqalgan usuli - turli template engine larining sintaksisidan foydalangan holda o'zboshimchalik bilan matematik amallarni kiritish. Keyin ular muvaffaqiyatli bajarilgan yoki bajarilmaganligni ko'rishingiz mumkin. Siz quyidagiga o'xshash chizmadan foydalanishingiz mumkin:

![](../.gitbook/assets/image%20%2832%29.png)

Shuni yodda tutingki, bir payload ba'zan turli template tilida muvaffaqiyatli javob qaytarishi mumkin. Misol uchun,  \{{7\*'7'\}} payloadi Twig da 49 va Jinja2 da 7777777 ni qaytaradi. Shuning uchun, bitta muvaffaqiyatli natijaga asoslangan xulosalarga shoshilmaslik kerak.

## Exploit <a href="#exploit" id="exploit"></a>

Zaiflik mavjudligini va template mexanizmini muvaffaqiyatli aniqlaganingizdan so'ng, uni exploit qilish usullarini topishga harakat qilishingiz mumkin.

:::info **Ko'proq o'qish**
[SSTI zaifligini exploit qilish ☰](ssti-ni-exploit-qilish)
:::

## Qanday qilib SSTI zaifligini oldini olish mumkin ? <a href="#qanday-qilib-server-side-template-injection-ni-oldini-olish-mumkin" id="qanday-qilib-server-side-template-injection-ni-oldini-olish-mumkin"></a>

Server-side template injectionni oldini olishning eng yaxshi usuli bu hech qanday foydalanuvchiga template larni o'zgartirish yoki yangi templatelarni yuborishga ruxsat bermaslikdir. Biroq, biznes talablari tufayli buni amalga oshirish mushkul.

SSTI zaifliklaridan foydalanishni aylanib o'tishning eng oddiy usullaridan biri, agar zarurat bo'lmasa, har doim "logic-less" template mexanizmidan masalan, [Mustache](https://mustache.github.io/)-dan foydalanishdir. Logikani presentationdan iloji boricha ajratib qo'yish template ga asoslangan eng xavfli xujumlarga ta'sir qilishni sezilarli darajada kamaytiradi.

Yana bir chora - xavfli modullar va funksiyalar butunlay olib tashlangan, foydalanuvchi kodini faqat sandbox-da amalga oshirish. Afsuski,  ishonchsiz kodni sandboxlash qiyin va aylanib o'tishga moyil.

Va nihoyat, yana bir qo'shimcha usul - kodning o'zboshimchalik bilan bajarilishi muqarrar ekanligini qabul qilish va template muhitingizni qulflangan Docker konteyneriga joylashtirish orqali o'z sandboxingizni qo'llashdir.
