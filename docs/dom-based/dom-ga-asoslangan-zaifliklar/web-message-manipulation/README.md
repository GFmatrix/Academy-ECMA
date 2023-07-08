---
id: web_message_manipulation
---
# Web message manipulation

Biz ushbu bo'limda web xabar ni boshqarish nimaligini va ushbu zaifliklarni qanday oldini olish mumkinligi haqida gaplashamiz.

## DOMga asoslangan web habarni boshqarish nima ? <a href="#dom-ga-asoslangan-web-xabar-manipulation-nima" id="dom-ga-asoslangan-web-xabar-manipulation-nima"></a>

Web-message zaifligi skript, haker tomonidan boshqariladigan ma'lumotlarni web-xabar sifatida brauzer ichidagi boshqa documentga yuborganda paydo bo'ladi. Haker web-message ma'lumotlaridan web-sahifani yaratish orqali source sifatida foydalanishi mumkin, agar foydalanuvchi unga kirsa, foydalanuvchi brauzeri haker nazorati ostida bo'lgan ma'lumotlarni o'z ichiga olgan web-xabar yuborishga olib keladi. Web-xabarlardan manba sifatida foydalanish haqida ko'proq ma'lumot olish uchun [web-message sourceni boshqarish](web-message-sourceni-boshqarish) sahifasiga o'ting.

## Qaysi metodlar DOMga asoslangan web-xabarni boshqarish zaifligi paydo bo'lishiga sabab bo'ladi ? <a href="#qaysi-sink-lar-dom-ga-asoslangan-web-xabar-manipulation-zaifliklari-hosil-bolishiga-sabab-boladi" id="qaysi-sink-lar-dom-ga-asoslangan-web-xabar-manipulation-zaifliklari-hosil-bolishiga-sabab-boladi"></a>

Veb-xabarlarni yuborish uchun `postMessage()` metodi, xabarlarni qabul qilish uchun event listener kiruvchi ma'lumotlarni himoyasiz tarzda qabul qilsa, zaifliklarga olib kelishi mumkin.

## DOMga asoslangan Web xabarni boshqarishni qanday qilib oldi olinadi ? <a href="#qanday-qilib-dom-ga-asoslangan-web-xabar-manipulation-ni-oldini-olish-mumkin" id="qanday-qilib-dom-ga-asoslangan-web-xabar-manipulation-ni-oldini-olish-mumkin"></a>

[Domga asoslangan zaifliklar](../../../dom-based/dom-ga-asoslangan-zaifliklar/) sahifasida tavsiflangan umumiy choralarga qo'shimcha ravishda, har qanday ishonchsiz manbadan olingan ma'lumotlarni o'z ichiga olgan web-xabarlarni yuborishdan saqlaning. Eng muhimi, har qanday kiruvchi xabarlarning kelgan mazilini tekshirish uchun qat'iy choralarni ko'ring.
