# IDOR

Ushbu bo'limda Insecure direct object reference (IDOR) nima ekanligi haqida gaplashamiz va undagi keng tarqalgan zaifliklar haqida to'xtalib o'tamiz

## Insecure direct object references (IDOR) nima? <a href="#insecure-direct-object-references-idor-nima" id="insecure-direct-object-references-idor-nima"></a>

Insecure direct object references (IDOR) bu access control zaifligi bo'lib qachonki web sayt ob'ektlarga to'g'ridan-to'g'ri kirish uchun foydalanuvchi tomonidan taqdim etilgan ma'lumotlardan foydalanganda paydo bo'ladi. IDOR atamasi 2007 da top 10 ga kirgandan so'ng mashxurlashib ketdi. Biroq, bu access control vositalarini chetlab o'tishga olib kelishi mumkin bo'lgan ko'plab access controlni amalga oshirish xatolarining bir misolidir. IDOR zaifliklari ko'pincha imtiyozlarning gorizontal ko'tarilishi bilan bog'liq, ammo ular vertikal imtiyozlarning oshishi bilan bog'liq holda ham paydo bo'lishi mumkin.

## IDOR misollari <a href="#idor-misollari" id="idor-misollari"></a>

Foydalanuvchi tomonidan boshqariladigan parametr qiymatlari manbalar yoki funksiyalarga to'g'ridan-to'g'ri kirish uchun foydalaniladigan access control zaifliklarining ko'plab misollari mavjud.

## Ma'lumotlar bazasi ob'ektlariga to'g'ridan-to'g'ri murojaat qilish bilan IDOR zaifligi <a href="#malumotlar-bazasi-obektlariga-togridan-togri-murojaat-qilish-bilan-idor-zaifligi" id="malumotlar-bazasi-obektlariga-togridan-togri-murojaat-qilish-bilan-idor-zaifligi"></a>

Back-end ma'lumotlar bazasidan ma'lumot olish orqali mijoz hisobi sahifasiga kirish uchun quyidagi URL manzilidan foydalanadigan web-saytni ko'rib chiqamiz:

```
https://insecure-website.com/customer_account?customer_number=132355
```

Bu yerda mijoz raqami to'g'ridan-to'g'ri ma'lumotlar bazasida bajariladigan so'rovlarda rekord ko'rsatkich sifatida ishlatiladi. Agar boshqa boshqaruv elementlari mavjud bo'lmasa, Haker boshqa mijozlarning yozuvlarini ko'rish uchun kirish chetlab o'tib, customer\_number qiymatini o'zgartirishi mumkin. Bu imtiyozlarning gorizontal ravishda oshishiga olib keladigan IDOR zaifligiga misoldir.

Haker access controlni chetlab o'tib, foydalanuvchini qo'shimcha imtiyozlarga ega bo'lgan boshqasiga o'zgartirish orqali gorizontal va vertikal imtiyozlarni oshirishi mumkin.

## Statik fayllarga bevosita havola qilish bilan IDOR zaifligi <a href="#statik-fayllarga-bevosita-havola-qilish-bilan-idor-zaifligi" id="statik-fayllarga-bevosita-havola-qilish-bilan-idor-zaifligi"></a>

IDOR zaifliklari ko'pincha maxfiy resurslar server tomonidagi fayl tizimidagi statik fayllarda joylashganida paydo bo'ladi. Masalan, web-sayt chat xabari transkriptlarini diskda o'sib boruvchi fayl nomidan foydalanib saqlashi mumkin va foydalanuvchilarga quyidagi kabi URL manziliga tashrif buyurib, ularni olish imkonini beradi:

```
https://insecure-website.com/static/12144.txt
```

Bu holatda haker oddiy fayl nomini o'zgartirib boshqa foydalanuvchi tomonidan yaratilgan transkriptlarni qo'lga kiritishi mumkin yoki hatto foydalanuvchi haqidagi ma'lumotlarni ham qo'lga kiritishi mumkin.
