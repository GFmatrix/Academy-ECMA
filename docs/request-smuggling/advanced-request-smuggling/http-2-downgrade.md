# HTTP/2 downgrade

HTTP/2 yangi protokol bo'lib uni ishlatadigan web serverlar ko'pincha eski HTTP/1 ni qabul qiluvchi back-end tizimlari bilan birga ishlatishga majburlar. Natijada Frontend har bir kiruvchi HTTP/2 so'rovlarni HTTP/1 sintaksisi asosida qayta yozib qabul qilishlari zarur. Ushbu "downgrade" qilingan so'rovlar Backendga yuboriladi.

![](../../.gitbook/assets/image%20%282%29.png)

HTTP/1-so'zlashuvchi back-end javobda muammo tug'dirsa, front-end serveri browserga qaytaradigan HTTP/2 javobini yaratish uchun bu jarayonni o'zgartiradi.

Bu ishlaydi, chunki protokolning har bir versiyasi asosan bir hil ma'lumotlarni taqdim etishning boshqacha usuli hisoblanadi. HTTP/1 xabaridagi har bir element HTTP/2 da ham tahminan shunday bo'ladi.

![](../../.gitbook/assets/image%20%2833%29.png)

Nijada, serverlar ushbu requestlar va responselarni ikkita protokol o'rtasida konvert qilishi nisbatan oson. Bunga yaqqol misol bu Burp HTTP/2 ni HTTP/1 sintaksisi asosida habar tahrirlovchisida ko'rsatishidir.

HTTP/2 versiyasini pasaytirish juda keng tarqalgan va hatto bir qator mashhur reverse proxy hizmatlari uchun default hisoblanadi. Ba'zi hollarda uni o'chirish imkoniyati ham yo'q.

## HTTP/2 dowgrading da qanday havflar mavjud ? <a href="#http2-pasaytirishda-qanday-tavakkalchiliklarni-qilish-kerak" id="http2-pasaytirishda-qanday-tavakkalchiliklarni-qilish-kerak"></a>

HTTP/2 versiyani pasaytirish bu web saytlarda Request Smuggling xujumlarini paydo qiladi, garchi HTTP/2 ning o'zi himoyalangan hisoblansa ham.

HTTP/2ning built-in length mexanizmi, HTTP downgrading amalga oshirilsa unda so'rov uzunligini belgilashning uch xil yo'li paydo bo'ladi va bu Request Smuggling uchun yo'l ochadi.

:::info Ko'proq o'qish

[HTTP/2 request smuggling ☰](./#http2-request-smuggling)
:::
