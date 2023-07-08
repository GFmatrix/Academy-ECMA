# JavaScript ineksiyasi

Bugungi bo'limda biz DOM ga asoslangan JavaScript ineksiya zaifliklari haqida, uning foydalanuvchiga qanday ta'sir qilishi haqida va ularni qanday qilib oldini olish mumkinligi haqida gaplashamiz.

## DOMga asoslangan JavaScript ineksiya nima ? <a href="#dom-ga-asoslangan-javascript-inektsiya-nima" id="dom-ga-asoslangan-javascript-inektsiya-nima"></a>

DOMga asoslangan JavaScript ineksiya bu boshqiraladigan ma'lumotning JavaScript holatida ishga tushishidir. Haker balki JavaScript inektsiyani ishga tushiruvchi URL tuzishi mumkin va ushbu URL foydalanuvchining brauzer sessiyasida ishga tushadi.

Foydalanuvchi Haker tomonidan tuzilgan o'sha URL ga kirsa bundanda ko'proq narsa yuzaga kelishi mumkin va bu zaifliklar asosan [reflected cross-site scripting](../../xss/reflected-xss) zaifliklari deb hisoblanadi. Ko'proq ma'lumot olish uchun [DOM-XSS](../../xss/domga-asoslanga-xss) ga o'ting

## DOMga asoslangan JavaScript ineksiya ta'siri <a href="#dom-ga-asoslangan-javascript-inektsiya-tasiri" id="dom-ga-asoslangan-javascript-inektsiya-tasiri"></a>

Haker ushbu xujum orqali bir qancha ishlarni qila oladi, masalan foydalanuvchi sessiya tokenini o'g'irlash yoki login ma'lumotlarini o'g'irlash va foydalanuvchi xohlamagan amallarni uni nomidan bajarish kabi.

## Qaysi metodlar DOMga asoslangan JavaScript ineksiyani keltirib chiqaradi ? <a href="#qaysi-sink-lar-dom-ga-asoslangan-javascript-inektsiyani-keltirib-chiqaradi" id="qaysi-sink-lar-dom-ga-asoslangan-javascript-inektsiyani-keltirib-chiqaradi"></a>

Quyida keltirilgan metodlar DOM ga asoslangan JavaScript ineksiyani keltirib chiqaradi:

```javascript
eval()
Function()
setTimeout()
setInterval()
setImmediate()
execCommand()
execScript()
msSetImmediate()
range.createContextualFragment()
crypto.generateCRMFRequest()
```

## DOMga asoslangan JavaScript ineksiyani qanday qilib oldini olish mumkin ? <a href="#qanday-qilib-dom-ga-asoslangan-javascript-inektsiyani-oldini-olish-mumkin" id="qanday-qilib-dom-ga-asoslangan-javascript-inektsiyani-oldini-olish-mumkin"></a>

Bu haqida ko'proq [DOM-ga asoslangan zaifliklar mavzusida](../../dom-based/dom-ga-asoslangan-zaifliklar/) aytganmiz siz har qanday ma'lumotni JavaScript holatida dinamik o'zgarmasligini ta'minlashingiz zarur.
