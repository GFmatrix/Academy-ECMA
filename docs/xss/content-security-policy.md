# Content Security Policy

Ushbu bo'limda CSP nima ekanligi haqida va ko'p tarqalgan xujumlarning havfini qanday qilib kamaytirish mumkinlgi haqida gaplashamiz.

## CSP (Content Security Policy) nima? <a href="#csp-content-security-policy-nima" id="csp-content-security-policy-nima"></a>

CSP bu [XSS](./) va shunga o'xshash xujumlarni zararsizlantiruvchi mexanizm. U web sahifa yuklashi mumkin bo'lgan ma'lumotlar(skriptlar/rasmlar)ni  cheklash va sahifani boshqa sahifalar bilan framelashni cheklash orqali ishlaydi.

CSPni yoqish uchun bu siyosatni oʻz ichiga olgan `Content-Security-Policy` nomli HTTP  response headeri boʻlishi kerak. Siyosatning o'zi nuqta-vergul bilan ajratilgan bir yoki bir nechta ko'rsatmalardan iborat.

![](../.gitbook/assets/image%20%2824%29.png)

## XSS xujumlarini CSP orqali zararsizlash <a href="#xss-xujumlariga-csp-orqali-yumshatish" id="xss-xujumlariga-csp-orqali-yumshatish"></a>

Quyidagi usul faqatgina **same orign**dan olingan scriptlarni ishlatishga ruxsat beradi

```http
script-src 'self'
```

Quyidagi misol faqat ma'lum bir domendan skriptlarni yuklashga ruxsat beradi:

```http
script-src https://scripts.normal-website.com
```

Tashqi domenlardan skriptlarga ruxsat berayotganda extiyot bo'lish kerak. Agar tashqi domendan taqdim etilayotgan kontentni haker boshqarishining biron bir usuli bo'lsa, u hujumni amalga oshirishi mumkin. Masalan, `ajax.googleapis.com` kabi mijoz uchun URL manzillaridan foydalanmaydigan CDNlarga ishonmaslik kerak, chunki uchinchi tomonlar o‘z domenlariga ma'lumot yetkazishlari mumkin.

Muayyan domenlarni whitelistga kiritishdan tashqari, CSP havfsiz manbalarni ko'rsatishning yana ikkita usulini ham taqdim etadi, bular: `nonces` va `xeshlar`:

* CSP yo'naltiruvchisi `nonce` (tasodifiy qiymat)ni belgilashi mumkin va xuddi shu qiymat skriptni yuklaydigan tegda ishlatilishi kerak. Agar qiymatlar mos kelmasa, skript ishlamaydi. Boshqaruv samarali bo'lishi uchun har bir sahifa yuklanishida `nonce` xavfsiz tarzda yaratilishi va haker uni tahminan ham qilolmasligi kerak.
* CSP yo'naltiruvchisi havsiz skript tarkibining xeshini belgilashi mumkin. Agar haqiqiy skriptning xeshi yo'naltiruvchida ko'rsatilgan qiymatga mos kelmasa, u holda skript ishlamaydi. Agar skript har doim o'zgarib qolsa, siz, albatta, misolda ko'rsatilgan xesh qiymatini yangilashingiz kerak bo'ladi.

CSP ko'pincha scriptga o'xshash resurslarni bloklaydi. Biroq ko'pgina CSPlar rasmlarga ruxsat beradi. Bu shuni anglatadiki siz `img` elementlariga bemalol tashqi server dan so'rovlarni yaratishingiz mumkin, masalan bu orqali CSRF tokenlarni oshkor qilish mumkin.

Ba'zi brauzerlar, masalan Chrome, dangling markup tasirini kamaytirish xususiyatiga ega bo'lib, u ma'lum bir ( ',",$,&#x3C;> -  kabi) belgilar mavjud bo'lgan so'rovlarni bloklaydi.

Ba'zi siyosatlar yanada cheklovchi va tashqi so'rovlarning har qanday shakllarini oldini oladi. Biroq ba'zi foydalanuvchilarning huquqlarini ko'tarish orqali ushbu cheklovlardan o'tish mumkin. Ushbu siyosatni chetlab o'tish uchun siz HTML elementini kiritishingiz kerak, u bosilganda kiritilgan elementdagi hamma narsani saqlaydi va tashqi serverga yuboradi.

:::caution **Lab**
 [Juda qatiy CSP orqali himoyalangan dangling markup hujumida Reflected XSS ≫](https://portswigger.net/web-security/cross-site-scripting/content-security-policy/lab-very-strict-csp-with-dangling-markup-attack)
:::

## Dangling markupni CSP orqali zararsizlash <a href="#dangling-markup-ni-csp-orqali-yumshatish" id="dangling-markup-ni-csp-orqali-yumshatish"></a>

Quyidagi misolsa rasmlarni faqat sahifaning o'zi bilan bir xil manbadan yuklash imkonini beradi:

```
img-src 'self'
```

Quyidagi misolda faqat ma'lum bir domendan rasmlarni yuklashga ruxsat beradi:

```
img-src https://images.normal-website.com
```

Shuni esda tutingki, ushbu siyosatlar ba'zi **dangling markup** exploitlarini oldini oladi, chunki foydalanuvchi ma'lumotlarini olishning oson yo'li `img` tegidan foydalanishdir. Biroq, bu boshqa exploitlarni oldini olmaydi, masalan, `href` atributiga ega bo'lgan `a` tegini kiritadigan exploitlarni.

## Siyosat kiritish bilan CSPni bypass qilish <a href="#siyosat-kiritish-bilan-cspni-chetlab-otish" id="siyosat-kiritish-bilan-cspni-chetlab-otish"></a>

Siz web sayt inputini haqiqiy siyosatga kiritishi mumkinligini ko'rishingiz mumkin, masalan report uri usuliga ko'proq duch kelishingiz mumkin. Agar sayt siz boshqarishingiz mumkin bo'lgan parametrni aks ettirsa, o'zingizning CSP yo'nalitiruvchilaringizni qo'shish uchun nuqta-vergul qo'yishingiz mumkin. Odatda, bu `report-uri` yo'naltiruvchisi ro'yxatda oxirgisi hisoblanadi. Bu shuni anglatadiki ushbu zaiflikdan foydalanish va siyosatni aylanib o'tish uchun mavjud ko'rsatmalarni qayta yozishingiz kerak bo'ladi.

Odatda, `cript-src` yo'naltiruvchisini qayta yozish mumkin emas. Biroq, Chrome yaqinda `script-src-elem` ni qo'shdi, bu sizga skript elementlarini boshqarish imkonini beradi, lekin eventlarni emas. Eng muhimi, u `script-src` ni qayta yozishga imkon beradi. Bu bilimlardan foydalanib quyidagi laboratoriyani hal qila olishingiz kerak.

:::caution **Lab**
 [CSP ni aylanib o'tish orqali CSP himoyasiga Reflected XSS hujumi ≫](https://portswigger.net/web-security/cross-site-scripting/content-security-policy/lab-csp-bypass)
:::

## CSP orqali [Clickjacking](../clickjacking)dan himoyalanish <a href="#csp-orqali-clickjacking-dan-himoya" id="csp-orqali-clickjacking-dan-himoya"></a>

Quyidagi misol sahifani faqat **same orign**dagi boshqa sahifalar bilan framelash imkonini beradi:

```
frame-ancestors 'self'
```

Quyidagi misol frame yaratishni butunlay oldini oladi:

```
frame-ancestors 'none'
```

`X-Frame-Options` headerini ishlatishdan ko'ra, Clickjackingni oldini olish uchun CSP dan foydalanish ancha qulay, chunki siz bir nechta domenlarni belgilashingiz va wildcardlardan foydalanishingiz mumkin. Misol uchun:

```http
frame-ancestors 'self' https://normal-website.com https://*.robust-website.com
```

CSP, shuningdek, asosiy freym ierarxiyasidagi har bir freymni tasdiqlaydi, `X-Frame-Options` esa faqat yuqori darajadagi frameni tasdiqlaydi.

**Clickjacking** hujumlaridan himoya qilish uchun CSP dan foydalanish tavsiya etiladi. Internet Explorer kabi CSP-ni qo'llab-quvvatlamaydigan eski brauzerlarda himoyani ta'minlash uchun buni X-Frame-Options headeri bilan ham birlashtira olasiz.
