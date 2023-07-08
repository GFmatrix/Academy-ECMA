# WebSocket-URL poisoning

Biz ushbu bo'limda WebSocket-URL qanday qilib DOM orqali zararlanishi haqida, WebSocket-URL zararlanish qanday ta'sir qilishi haqida va ushbu xujumlarni qanday qilib oldini olish mumkinligi haqida gaplashamiz.

## DOM ga asoslangan WebSocket-URL zararlash nima ? <a href="#dom-ga-asoslangan-websocket-url-zararlash-nima" id="dom-ga-asoslangan-websocket-url-zararlash-nima"></a>

WebSocket-URL zararlash zaif;igi, script WebSocket ulanishda boshqariladigan ma'lumotlarni target URLi sifatida foydalanganida sodir bo'ladi.  Haker ushbu zaiflikdan foydalanib URL tuzishi mumkin va foydalanuvchi URLga kirganda, foydalanuvchi brauzeri WebSocket ulanishidagi hackerning nazorati ostida joylashgan URL ochiladi.

## DOM ga asoslangan WebSocket-URL zararlashni ta'siri qanday ? <a href="#dom-ga-asoslangan-websocket-url-zararlashni-tasiri-qanday" id="dom-ga-asoslangan-websocket-url-zararlashni-tasiri-qanday"></a>

Uning tasiri web saytning WebSocket dan qanday foydalanishiga bog'liq. Agar web-sayt maxfiy ma'lumotlarni foydalanuvchi brauzeridan WebSocket serveriga uzatsa, Haker bu ma'lumotlarni qo'lga kiritishi mumkin. Agar web-sayt WebSocket serveridagi ma'lumotlarni o'qisa va uni biror yo'l bilan qayta ishlasa, Haker sayt logikasini buzishi yoki foydalanuvchiga client-side hujumlarni uyushtirishi mumkin.

## DOMga asoslangan WebSocket-URL zararlash qaysi metod orqali paydo bo'ladi ? <a href="#dom-ga-asoslangan-websocket-url-zararlashni-qaysi-sink-hosil-qiladi" id="dom-ga-asoslangan-websocket-url-zararlashni-qaysi-sink-hosil-qiladi"></a>

`WebSocket` konstrutori ushbu zaiflikni keltirib chiqarishi mumkin.

## Qanday qilib DOMga asoslangan WebSocket-URL zararlashni oldini olish mumkin ? <a href="#dom-ga-asoslangan-websocket-url-zararlashni-qanday-qilib-oldini-olish-mumkin" id="dom-ga-asoslangan-websocket-url-zararlashni-qanday-qilib-oldini-olish-mumkin"></a>

Bu haqida ko'proq [DOM-ga asoslangan zaifliklar](../../dom-based/dom-ga-asoslangan-zaifliklar/) mazsusida aytganmiz, siz WebSocket qiymatlarini dinamik o'zgarmasligini ta'minlashingiz zarur.
