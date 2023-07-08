# Client-side JSON injection

Bugungi bo'limda DOMga asoslangan client-side JSON ineksiya nima ekanligi haqida, uning ta'siri qanday ekanligi va uni qanday oldini olish mumkinligi haqida gaplashamiz.

## DOMga asoslangan client-side JSON ineksiya nima ? <a href="#dom-ga-asoslangan-client-side-json-inektsiya-nima" id="dom-ga-asoslangan-client-side-json-inektsiya-nima"></a>

DOM-ga asoslangan JSON-injection zaifligi skript haker tomonidan boshqariladigan ma'lumotlarni JSON ma'lumotlar tuzilmasi sifatida tahlil qilinadigan va keyin web sayt tomonidan qayta ishlanadigan satrga kiritganida paydo bo'ladi. Haker bu zaiflikdan URL manzil yaratish uchun foydalanishi mumkin, agar boshqa foydalanuvchi unga kirsa, JSON ma'lumotlarini o'zboshimchalik bilan qayta ishlashga olib keladi.

## DOMga asoslangan client-side JSON ineksiyaning ta'siri qanday ? <a href="#dom-ga-asoslangan-client-side-json-inektsiya-tasiri-qanday" id="dom-ga-asoslangan-client-side-json-inektsiya-tasiri-qanday"></a>

Ushbu zaiflik ta'siri ma'lumotlardan foydalanish maqsadiga qarab, haker web-sayt logikasini buzishi yoki boshqa foydalanuvchi nomidan kutilmagan harakatlarni bajarishiga sabab bo'lishi mumkin.

## DOMga asoslangan JSON ineksiya zaifliklari kelib chiqishiga qaysi meotdlar sabab bo'ladi ? <a href="#dom-ga-asoslangan-json-inektsiya-zaifliklari-kelib-chiqishiga-qaysi-sink-lar-sabab-boladi" id="dom-ga-asoslangan-json-inektsiya-zaifliklari-kelib-chiqishiga-qaysi-sink-lar-sabab-boladi"></a>

```javascript
JSON.parse()
jQuery.parseJSON()
$.parseJSON()
```

## DOMga asoslangan JSON ineksiya zaifliklarini oldini qanday olish mumkin ? <a href="#dom-ga-asoslangan-json-inektsiya-zaifliklarini-oldini-qanday-olish-mumkin" id="dom-ga-asoslangan-json-inektsiya-zaifliklarini-oldini-qanday-olish-mumkin"></a>

[DOM-ga asoslangan zaifliklar](../../dom-based/dom-ga-asoslangan-zaifliklar/) mavzusida aytilgan umumiy choralarga qo'shimcha ravishda, har qanday ishonchsiz manbadan olingan ma'lumotlarni JSON o'z ichiga olishidan saqlang.
