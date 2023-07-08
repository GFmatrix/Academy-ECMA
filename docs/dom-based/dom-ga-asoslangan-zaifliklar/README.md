---
id: dom_ga_asoslangan_zaifliklar
---
# DOM ga asoslangan zaifliklar

Biz ushbu bo'limda DOM nima ekanligini, undagi zaifliklar qandayligini va ushbu zaifliklarni qanday qilib oldini olish mumkinligi haqida o'rganamiz.

:::caution **Labaratoriyalar**

Agar siz DOM ga asoslangan zaifliklar haqida bilsangiz pastdagi link orqali, haqiqiy web sayt kabi tuzilgan laboratoriyalarni yechishingiz mumkin.

[Labratoriyalarga o'tish ≫](https://portswigger.net/web-security/all-labs#dom-based-vulnerabilities)
:::

## DOM nima ? <a href="#dom-nima" id="dom-nima"></a>

DOM (Document Object Model) web sahifadagi elementlarning ierarhiyasi. Veb-saytlar  nodelar va DOM obyektlarini, shuningdek ularning xususiyatlarini boshqarish uchun JavaScript-dan foydalanishlari mumkin. DOMni boshqarishning o'zi muammo emas. Aslida, bu zamonaviy veb-saytlar qanday ishlashining ajralmas qismidir.Biroq  Xavfsiz ma'lumotlarni oladigan JavaScript turli xil hujumlarni yoqishi mumkin. Qachonki web sayt hacker boshqaruvidagi ma'lumotni source kod deb bilganida va havfli funksiyalarni method deb qabul qilganida DOMga asoslangan zailiklar yuzaga keladi.

![](../../.gitbook/assets/image%20%2825%29.png)
<p>Qachonki sayt yuklanganida browser sahifaning <strong>D</strong>ocument <strong>O</strong>bject <strong>M</strong>odel ini yaratadi</p>

## Taint-Flow zaifliklar <a href="#taint-flow-zaifliklar" id="taint-flow-zaifliklar"></a>

DOM-ga asoslangan ko'plab zaifliklarni mijoz tomonidagi kod xakerlar tomonidan boshqariladigan ma'lumotlarni manipulyatsiya qilish bilan bog'liq muammolardan kelib chiqishi mumkin.

## Taint flow o'zi nima? <a href="#taint-flow-ozi-nima" id="taint-flow-ozi-nima"></a>

Ushbu zaifliklarni oldini olish yoki buzib kirish uchun, oldin Taint-flow dagi Sink lar va Source lar aslida nima ekanligi bilan tanishib chiqish zarur.

:::info **Sourcelar**
Source bu JavaScript xususiyati bo'lib u Haker ga ma'lumotni nazorat qilish uchun yo'l ochib beradi. Source ga misol uchun `location.search` ni keltirishimiz mumkin, chunki u query stiringidan inputlarni o'qydi, bu esa Haker ga ma'lumotni osonlik bilan nazorat qilishiga yo'l ochadi. O'zi umuman olganda har qanday xususiyat Hakerga nazorat qilish imkonini taqdim etadi. Bular havola qilish linkini (`document.referrer` orqali aniqlangan), foydalanuvchining Cookielarini (`document.cookie`) va web xabarlarni o'z ichiga oladi.
:::

:::info **Metodlar**

Metod DOM obektini o'zi xohlamagan amallarni bajarishiga majburlashi mumkin. Masalan, `eval()` funksiyasi metod hisoblanadi, chunki u JavaScript sifatida unga uzatiladigan argumentni qayta ishlaydi. HTML da bo'lsa `document.body.innerHTML` shunday metod hisoblanadi, chunki unga HTML kod yozib jo'natib ishga tushirish mumkin.
:::

Asosan, DOM-ga based zaifliklar web-sayt ma'lumotlarini sourcedan metodga uzatilganda paydo bo'ladi, keyin esa client session kontekstida ma'lumotlarni xavfli tarzda qayta ishlaydi.

Eng ko'p duch kelinadigan zaifliklarni hosil qiluvchi source va metod bu `location` obyekti. Chunki bu xususiyat bilan haker foydalanuvchiga o'zining payloadi yuklangan web sahifasinimg linkini jo'natishi mumkin. Quyida shunday zaiflikni keltirib chiqaruvchi kodni ko'rishingiz mumkin:

```javascript
goto = location.hash.slice(1)
if (goto.startsWith('https:')) {
  location = goto;
}
```

Bu kod **DOM ga asoslangan open redirection** zaifligini keltirib chiqaradi, chunki `location.hash`xavfsiz bo'lmagan usulda ishlatilmoqda. Agar URL, hash fragmenti hisoblangan `https:` bilan boshlansa u yangi oynani ochadi va web saytga redirect qilib yuboradi. Quyida misolda kabi:

```url
https://www.innocent-website.com/example#https://www.evil-user.net
```

Qachonki ushbu linkka foydalanuvchi kirsa location obekti uni [https://www.evil-user.net](https://www.evil-user.net) ga yo'naltiradi, ya'ni zararli saytni foydalanuvchiga avtomatik tarzda yuboradi. Misol uchun bu holat Phishing xujumini amalga oshirish uchun qulay sharoit yaratadi.

## Umumiy sourcelar <a href="#umumiy-manbalar" id="umumiy-manbalar"></a>

Quyida keltiriladigan sourcelar xilma xil taint-flow zaifliklar uchun qulay hisoblanadi:

```javascript
document.URL
document.documentURI
document.URLUnencoded
document.baseURI
location
document.cookie
document.referrer
window.name
history.pushState
history.replaceState
localStorage
sessionStorage
IndexedDB (mozIndexedDB, webkitIndexedDB, msIndexedDB)
Database
```

Quyida keltiradigan ma'lumotlarimiz ham taint-flow zaifligiga oid hisoblanadi:

* [Reflected ma'lumot ](../../xss/domga-asoslanga-xss#stored-va-reflected-malumotlar-bilan-biriktirilgan-dom-xss) Lab&#x20;
* [Stored ma'lumot](../../xss/domga-asoslanga-xss#stored-va-reflected-malumotlar-bilan-biriktirilgan-dom-xss) Lab&#x20;
* Web xabarlar Lab&#x20;

## Qaysi metodlar DOM based zaifliklariga sabab bo'la oladi ?

Quyidagi ro'yxat keng tarqalgan DOM based zaifliklarning qisqacha ko'rinishini va har bir sabab bo'lishi mumkin bo'lgan metodlarni taqdim etadi. Tegishli metodlarning ko'proq ro'yxati uchun quyidagi havolalarni bosish orqali zaiflikka oid sahifalarga kiring.

| DOM ga asoslangan zaifliklar                                                                                                                                                       | Metodlar                 |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| [DOM XSS](../../xss/cross-site-scripting#dom-based-xss) Lab  | document.write           |
| Open Redirection Lab                                                                               | window.location          |
| Cookie manipulation Lab                                                                            | document.cookie          |
| JavaScript Injection                                                                                                                            | eval()                   |
| Document-domain manipulation                                                                                                                    | document.domain          |
| WebSocket-URL Poisoning                                                                                                                         | WebSocket()              |
| Link manipulation                                                                                                                               | element.src              |
| WebMessage Manipulation                                                                                                                         | postMessage()            |
| Ajax request-header manipulation                                                                                                                | setRequestHeader()       |
| Local file-path manipulation                                                                                                                    | FileReader.readAsText()  |
| Client-side SQL injection                                                                                                                       | ExecuteSql()             |
| HTML5-storage manipulation                                                                                                                      | sessionStorage.setItem() |
| Client-side XPath injection                                                                                                                     | document.evaluate()      |
| Client-side JSON injection                                                                                                                      | JSON.parse()             |
| DOM-data manipulation                                                                                                                           | element.setAttribute()   |
| Denial of service                                                                                                                               | RegExp()                 |

## Qanday qilib DOMga asoslangan taint-flow zaifliklarni oldini olish mumkin <a href="#qanday-qilib-dom-ga-asoslangan-taint-flow-zaifliklarni-oldini-olish-mumkin" id="qanday-qilib-dom-ga-asoslangan-taint-flow-zaifliklarni-oldini-olish-mumkin"></a>

DOM-ga asoslangan hujumlar tahdidini butunlay yo'q qilish uchun siz qila oladigan yagona harakat mavjud emas. Biroq, umuman olganda, DOM-ga asoslangan zaifliklarni oldini olishning eng samarali usuli har qanday ishonchsiz source dan olingan ma'lumotlarning har qanday metodga uzatiladigan qiymatni dinamik ravishda o'zgartirishiga yo'l qo'ymaslikdir.

Agar saytning funksionalligi bu xatti-harakatning muqarrarligini anglatsa, u holda, ximoya client kodida amalga oshirilishi kerak. Ko'pgina hollarda, tegishli ma'lumotlar whitelist asosida tasdiqlanishi mumkin, faqat xavfsiz ekanligi ma'lum bo'lgan tarkibga ruxsat beriladi. Boshqa hollarda, ma'lumotlarni o'chirib tashlash yoki kodlash kerak bo'ladi. Bu murakkab vazifa bo'lishi mumkin va ma'lumotlar kiritilishi kerak bo'lgan kontekstga qarab, tegishli ketma-ketlikda, **JavaScript-dan qochish**, **HTML kodlash** va **URL kodlash** kombinatsiyasini o'z ichiga olishi mumkin.

Muayyan zaifliklarning oldini olishda kerakli chora-tadbirlar uchun yuqoridagi jadvalda ko'rsatilgan zaifliklar sahifalarini ko'ring.

## DOM Clobbering <a href="#dom-clobbering" id="dom-clobbering"></a>

**DOM clobbering** - bu DOMni manipulyatsiya qilish va natijada web-saytdagi JavaScript xatti-harakatlarini o'zgartirish uchun sahifaga HTML kiritadigan ilg'or usuldir. DOM blokirovkasining eng keng tarqalgan shakli global o'zgaruvchining ustiga yozish uchun elementdan foydalanish, keyinchalik u web sayt tomonidan dinamik skript URL-manzilini yaratish kabi xavfli tarzda ishlatiladi.

:::info **Ko'proq o'qish**
[Dom clobbering ☰](./#dom-clobbering)
:::