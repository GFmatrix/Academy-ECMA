---
id: browser_powered_request_smuggling
---
# Browser-powered request smuggling

Ushbu bo'limda siz brauzerlar hech qachon yubormaydigan [malformed requestlar](https://www.google.com/search?q=what+is+%22malformed+request%22)ga tayanmasdan, qanday qilib yuqori darajadagi exploitlarni yaratishni o'rganasiz. Bu nafaqat veb-saytlarning butunlay yangi diapazonini server qismidagi request smuggling-ga olib keladi, balki foydalanuvchi brauzerini zaif veb-server bilan o'z ulanishini zaharlashga undash orqali ushbu hujumlarning browserdagi o'zgarishlarini amalga oshirish imkonini beradi.

:::tip Portswigger Reasearch
Bu bo'limdagi materiallar va labaratoriyalar Browser-Powered Desync Attacks ga asoslangan: PortSwigger Research tomonidan [HTTP requestlarini yashirin olib o'tishda yangi chegara.](https://portswigger.net/research/browser-powered-desync-attacks) Ushbu tadqiqot, shuningdek, ulanish holatidagi kamchiliklardan foydalangan holda Host headerlari filtrlari uchun aylanib o'tish texnikasini kashf etishga olib keldi.
:::

## CL.0 request smuggling

Back-end serverlarini ba'zan `Content-Length` headerlarini e'tiborsiz qoldirishiga ko'ndirish mumkin, ya'ni ular kiruvchi requestlarning asosiy qismini e'tiborsiz qoldiradilar. Bu [chunked transfer encoding](../http-request-smuggling/#qanday-qilib-http-request-smuggling-zaifliklari-vujudga-keladi)ga yoki [HTTP/2 versiyasini pasaytirishga](../advanced-request-smuggling/http-2-downgrade) tayanmaydigan requestni yashirin olib o'tish hujumlariga yo'l ochadi.

:::info **Batafsil o'qish:**
[O'quv materiallari ☰](cl.0)
:::

:::caution **Lab**
 [CL.0 request smuggling ≫](https://portswigger.net/web-security/request-smuggling/browser/cl-0/lab-cl-0-request-smuggling)
:::

## Client-side desync



Request smuggling an'anaviy ravishda server tomonidagi muammo hisoblanadi, chunki undan faqat Burp Repeater kabi maxsus vositalar yordamida foydalanish mumkin standart brauzerlar desinxronlashni boshlash uchun zarur bo'lgan so'rovlarni yubormaydi. Biroq, CL.0 hujumlaridan olingan saboqlarga asoslanib, ba'zida brauzerga to'liq mos keladigan HTTP/1 so'rovlari yordamida desinxronlashni keltirib chiqarishi mumkin.

Brauzer va zaif veb-server o‘rtasida browser tomonida desinxronlashni (CSD) ishga tushirish uchun ushbu brauzerga mos requestlardan foydalanishingiz mumkin, bu esa yashirin olib o'tish va intranet saytlariga kira olmaydigan yagona serverli saytlarga hujumlarni bevosita amalga oshirish imkonini beradi.

:::info **Batafsil o'qish**
[Client-side desynce ☰](client-side-desync)
:::

:::caution **Lab**
 [Client-side desync ≫](https://portswigger.net/web-security/request-smuggling/browser/client-side-desync/lab-client-side-desync)<br />
**Lab:** [Client-side desync orqali Browser cache poisoning ≫](https://portswigger.net/web-security/request-smuggling/browser/client-side-desync/lab-browser-cache-poisoning-via-client-side-desync)
:::

## Pause-based desync

Xavfsiz ko'rinadigan saytlar, requestning o'rtasida uni pauza qilganingizdagina aniqlanuvchi yashirin desync zaifliklarini o'z ichiga olgan bo'lishi mumkin. Headerlarni yuborish, bodyni va'da qilish va shunchaki kutish orqali ba'zan server tomonida ham, browser tomonidan ham exploitlar uchun ishlatilishi mumkin bo'lgan qo'shimcha desync zaifliklarini topishingiz mumkin.&#x20;

:::info **Batafsil o'qish**
[Pause-based desync ☰](pause-based-desync)
:::

:::caution **Lab**
[ Pause-based desync ≫](https://portswigger.net/web-security/request-smuggling/browser/pause-based-desync/lab-server-side-pause-based-request-smuggling)
:::
