# Access control zaifliklari

Ushbu bo'limda Access Control xavfsizligi nima ekanligini muhokama qilamiz, privilege escalation (imtiyozni oshirish va access control bilan yuzaga kelishi mumkin bo'lgan zaifflik turlarini tushuntirib bermiz. Xulosa o'rnida ushbu zaifliklarni qanday qilib oldini olish kerakligini tushuntiramiz.

:::caution **Labaratoriyalar**
Agar siz access control zaifliklari haqida bilsangiz va haqiqiy web sayt kabi tuzilgan laboratoriyalarda amaliyot o'tkazishni hohlsangiz, ushbu mavzudagi barcha laboratoriyalarga quyidagi havola orqali o'tishingiz mumkin.

[Barcha access control labaratoriyalarini ko'rish ≫](https://portswigger.net/web-security/all-labs#access-control-vulnerabilities)
:::

## Access Control nima ? <a href="#access-control-nima" id="access-control-nima"></a>

Access Control (yoki avtorizatsiya) web saytda kim qanday amallarni bajarishi yoki qanday resurslarga kirishi mumkinligini ta'minlaydi. Web dasturlar konteksida access control bu avtorizatsiya va sessiya menejmentiga bog'liq:

* **Avtorizatsiya** foydalanuvchini aniqlaydi va ularni qanday chaqirish kerakligini belgilaydi
* **Sessiya menejmenti** bir xil foydalanuvchi tomonidan keyingi HTTP so'rovlarni bir xil foydalanuvchi jo'natayotganini tekshiradi
* **Access Control** foydalanuvchining qanday amallarni bajarishga ruxsat etilganini belgilaydi.

Buzilgan access control lar ko'pgina hollarda duch kelinadigan jiddiy zaifliklarni hosil qiladi. Acces controlni vositalarini loyihalash va boshqarish murakkab va dinamik muammo bo'lib, texnik amalga oshirish uchun biznes, tashkiliy va huquqiy cheklovlarni qo'llaydi.

Foydalanuvchi nuqtai nazaridan oladigan bo'lsak Access Control quyidagi kategoriyalarga bo'lingan:

* Vertikal access control lar
* Gorizontal access control lar
* Kontekstga asoslangan access control lar

## Vertikal access control lar <a href="#vertikal-access-control-lar" id="vertikal-access-control-lar"></a>

Vertikal access control lar bu boshqa foydalanuvchilarga cheklangan maxfiy funksialarga kirishni adminga ruxsat berish.

Vertikal access control lar sabab har xil foydalanuvchilar web saytda har xil amallarni bajarish huquqiga ega bo'lishadi. Masalan administrator foydalanuvchini o'zgartirishi yoki o'chirishi mumkin, oddiy foydalanuvchi bo'lsa bu ishlarni qila olmaydi. Vertikal access control majburiyatlarni ajratish va eng kam imtiyozlar kabi biznes siyosatlarini amalga oshirish uchun mo'ljallangan xavfsizlik modellarining yanada nozik tatbiq etilishi bo'lishi mumkinligini ta'minlaydi.

## Gorizontal Access control lar <a href="#gorizontal-access-control-lar" id="gorizontal-access-control-lar"></a>

Gorizontal access control lar bu boshqa foydalanuvchilarga cheklangan maxfiy resurslarga kirishni adminga ruxsat berish.

Gorizontal access control yordamida turli foydalanuvchilar bir xil turdagi resurslarning kichik to'plamiga kirish huquqiga ega. Masalan, bank web sayti foydalanuvchiga tranzaktsiyalarni ko'rish va to'lovlarni o'z hisoblari orqali amalga oshirish imkonini beradi, lekin boshqa foydalanuvchining hisoblari bilan emas.

## Kontekstga asoslangan access control lar <a href="#kontekstga-asoslangan-access-control-lar" id="kontekstga-asoslangan-access-control-lar"></a>

Kontekstga asoslangan access control lar web saytning holati yoki foydalanuvchining u bilan o'zaro munosabati asosida funksionallik va resurslarga kirishni cheklaydi.

Kontekstga asoslangan access control lar foydalanuvchining noto'g'ri tartibda harakatlarni bajarishiga yo'l qo'ymaydi. Masalan, savdo web-sayti foydalanuvchilarga to'lovni amalga oshirgandan so'ng o'z savatidagi tarkibini o'zgartirishga to'sqinlik qilishi mumkin.

## Buzilgan access control larga misollar <a href="#buzilgan-access-control-larga-misollar" id="buzilgan-access-control-larga-misollar"></a>

Buzilgan access control lar zaifliklari qachonki foydalanuvchi u uchun ruxsat etilmagan resursdan yoki funksialardan foydalanganda mavjud bo'ladi.

## Vertikal imtiyozni oshirish <a href="#vertikal-imtiyozni-oshirish" id="vertikal-imtiyozni-oshirish"></a>

Agar foydalanuvchi u uchun ruxsat etilmagan funksionallikdan foydalansa bu vertikal imityozni oshirish deb nomlanadi. Masalan administrator bo'lmagan foydalanuvchi admin sahifaga o'tishi va ba'zi hisob raqamlarni o'chirishi vertikal imtyozni oshirishga yaqqol misoldir.

## Himoyalanmagan funksionallik <a href="#himoyalanmagan-funksionallik" id="himoyalanmagan-funksionallik"></a>

Eng asosiysi, vertikal imtiyozlarning oshirish, web sayt nozik funksionallik ustidan hech qanday himoyani ta'minlamaganida yuzaga keladi. Masalan, administrativ funksiyalar administratorning xush kelibsiz sahifasidan bog'lanishi mumkin, lekin foydalanuvchining xush kelibsiz sahifasidan emas. Biroq, foydalanuvchi to'g'ridan-to'g'ri tegishli administrator URL manzilini ko'rib chiqish orqali administrativ funksiyalarga kirishi mumkin.

Masalan web sayt nozik funksiyanallikni quyidagi URL da saqlashi mumkin:

```
https://insecure-website.com/admin
```

Bunga faqat foydalanuvchi interfeysidagi funksiyaga havolasi bo'lgan admin foydalanuvchilargina emas, balki har qanday foydalanuvchi kirishi mumkin. Ba'zi hollarda, administrativ URL boshqa joylarda, masalan, robots.txt faylida oshkor etilishi mumkin:

```
https://insecure-website.com/robots.txt
```

URL manzili hech qayerda oshkor etilmagan boʻlsa ham, haker soʻz roʻyxatidan sezgir funksiyaning joylashuvini qoʻpol tarzda aniqlashi mumkin.

Ba'zi hollarda, nozik funksionallik mustahkam himoyalanmagan, lekin unga oldindan aytib bo'lmaydigan URL manzilini berish orqali yashiriladi: noaniqlik bilan xavfsizlik deb ataladi. Faqat nozik funksiyalarni yashirish samarali kirishni boshqarishni ta'minlamaydi, chunki foydalanuvchilar hali ham turli yo'llar bilan tushunarsiz URL manzilini topishlari mumkin.

Masalan quyidagi web saytda administrativ funksiyalarni quyidagi URL ga joylagan:

```
https://insecure-website.com/administrator-panel-yb556
```

Bu balki haker tomonidan to'g'ridan to'g'ri topilmasligi mumkin. Biroq web sayt URL ni foydalanuvchilarga ko'rsatib qo'yishi mumkin. Masalan quyida JavaScript kod asosida admin uchun yo'nalish berkitilgan:

```
<script>
var isAdmin = false;
if (isAdmin) {
    ...
    var adminPanelTag = document.createElement('a');
    adminPanelTag.setAttribute('https://insecure-website.com/administrator-panel-yb556');
    adminPanelTag.innerText = 'Admin panel';
    ...
}
</script>
```

Agarda foydalanuvchi admin bo'lsa unda script saytning UI ga admin panelga o'tish uchun link qoldiradi. Biroq ushbu skriptdagi URL har qanday foydalanuvchiga ko'rinadi ularning web saytdagi rolidan qat'i nazar ko'rinadi.

## Parameterga asoslangan access control usullari <a href="#parameterga-asoslangan-access-control-usullari" id="parameterga-asoslangan-access-control-usullari"></a>

Ba'zi web saytlar foydalanuvchining kirish huquqlarini login qilganidan so'ng qiymatlarini o'zgartirish mumkin bo'lga cookie, yopiq maydon yoki parametr query sida saqlaydi. Web sayt shu qiymatlarga qarab access control qarorlarini qabul qiladi. Masalan:

```
https://insecure-website.com/login/home.jsp?admin=true
https://insecure-website.com/login/home.jsp?role=1
```

Bu yondashuv xavfli hisoblanadi chunki foydalanuvchi uning qiymatini o'zgartira oladi va ularga ruxsat etilmagan ishlarni qila olishadi masalan Administrativ funksiyalardan foydalana oladi.

## Platformaning noto'g'ri konfiguratsiyasi natijasida paydo bo'lgan buzilgan access control <a href="#platformaning-notogri-konfiguratsiyasi-natijasida-paydo-bolgan-buzilgan-access-control" id="platformaning-notogri-konfiguratsiyasi-natijasida-paydo-bolgan-buzilgan-access-control"></a>

Ba'zi web saytlar foydalanuvchining roli asosida ma'lum URL manzillari va HTTP usullariga kirishni cheklash orqali platforma qatlamida access control ni amalga oshiradi. Masalan, web sayt quyidagi kabi qoidalarni sozlashi mumkin:

```
DENY: POST, /admin/deleteUser, managers
```

Bu qoida boshqaruvchilar guruhidagi foydalanuvchilar uchun /admin/deleteUser URL manzilidagi POST usuliga kirishni rad etadi. Bunday vaziyatda turli xil narsalar noto'g'ri ketishi mumkin, bu esa access control ni chetlab o'tishga olib keladi.

Ba'zi web sayt ramkalari X-Original-URL va X-Rewrite-URL kabi asl so'rovdagi URLni bekor qilish uchun ishlatilishi mumkin bo'lgan turli xil nostandart HTTP headerlarini qo'llab-quvvatlaydi. Agar web-sayt URL-ga asoslangan access control uchun qattiq front-end boshqaruv vositalaridan foydalansa, lekin web sayt URL-manzilni so'rov headeri orqali bekor qilishga imkon bersa, quyidagi so'rov yordamida access control elementlarini chetlab o'tish mumkin bo'lishi mumkin:

```
POST / HTTP/1.1
X-Original-URL: /admin/deleteUser
...
```

Alternativ xujum so'rovda ishlatiladigan HTTP usuli bilan bog'liq bo'lishi mumkin. Yuqoridagi oldingi access control elementlari URL va HTTP usuli asosida kirishni cheklaydi. Ba'zi web-saytlar amalni bajarishda alternativ HTTP so'rov usullariga toqat qiladilar. Agar Haker cheklangan URL manzilida amallarni bajarish uchun GET (yoki boshqa) usulidan foydalana olsa, ular platforma qatlamida amalga oshirilgan access control ni chetlab o'tishlari mumkin.

## **URL-mos kelishmovchiliklar natijasida buzilgan kirish boshqaruvi**

Kiruvchi so'rovlarni yo'naltirishda veb-saytlar yo'l belgilangan so'nggi nuqtaga qanchalik to'g'ri kelishi kerakligi bilan farqlanadi. Misol uchun, ular nomuvofiq kapitallashuvga toqat qilishi mumkin, shuning uchun so'rov `/ADMIN/DELETEUSER`hali ham bir xil so'nggi nuqtaga ko'rsatilishi mumkin `/admin/deleteUser`. Bu o'z-o'zidan muammo emas, lekin agar kirishni boshqarish mexanizmi kamroq bardoshli bo'lsa, u ularni ikkita alohida so'nggi nuqta sifatida ko'rib chiqishi va natijada tegishli cheklovlarni qo'llamasligi mumkin.

Agar Spring Framework-dan foydalanadigan ishlab chiquvchilar ushbu parametrni yoqgan bo'lsa, shunga o'xshash kelishmovchiliklar paydo bo'lishi mumkin `useSuffixPatternMatch`. Bu ixtiyoriy fayl kengaytmali yo'llarni fayl kengaytmasi bo'lmagan ekvivalent so'nggi nuqta bilan taqqoslash imkonini beradi. Boshqacha qilib aytganda, so'rov `/admin/deleteUser.anything`hali ham naqshga mos keladi `/admin/deleteUser`. Spring 5.3 dan oldin bu parametr sukut bo'yicha yoqilgan.

Boshqa tizimlarda siz alohida so'nggi nuqta sifatida ko'rib chiqiladimi `/admin/deleteUser`yoki yo'qmi, nomuvofiqliklarga duch kelishingiz mumkin. `/admin/deleteUser/`Bunday holda, siz yo'lga qiyshiq chiziq qo'shish orqali kirishni boshqarish vositalarini chetlab o'tishingiz mumkin.

## Gorizontal imtiyozni oshirish <a href="#gorizontal-imtiyozni-oshirish" id="gorizontal-imtiyozni-oshirish"></a>

Gorizontal imtiyozlarning oshishi foydalanuvchi o'z resurslari o'rniga boshqa foydalanuvchiga tegishli resurslarga kirish imkoniyatiga ega bo'lganda yuzaga keladi. Misol uchun, agar xodim faqat o'zining mehnat va ish haqi yozuvlariga kirish imkoniyatiga ega bo'lsa, lekin aslida boshqa xodimlarning yozuvlariga ham kirishi mumkin bo'lsa, bu gorizontal imtiyozlarni oshirishdir.

Gorizontal imtiyozlarni oshirish xujumlari vertikal imtiyozni oshirish uchun ekspluatatsiya usullarining o'xshash turlaridan foydalanishi mumkin. Misol uchun, foydalanuvchi odatda quyidagi kabi URL manzilidan foydalanib o'z hisob sahifasiga kirishi mumkin:

```
https://insecure-website.com/myaccount?id=123
```

Endi, agar haker id parametri qiymatini boshqa foydalanuvchinikiga oʻzgartirsa, haker boshqa foydalanuvchining tegishli maʼlumotlar va funksiyalari bilan hisob sahifasiga kirish huquqiga ega boʻlishi mumkin.

Ba'zi web saytlarda ekspluatatsiya qilinadigan parametr oldindan aytiladigan qiymatga ega emas. Masalan, qo'shimcha raqam o'rniga web sayt foydalanuvchilarni aniqlash uchun global noyob identifikatorlardan (GUID) foydalanishi mumkin. Bu yerda Haker boshqa foydalanuvchining identifikatorini taxmin qila olmasligi yoki bashorat qila olmasligi mumkin. Biroq, boshqa foydalanuvchilarga tegishli GUIDlar foydalanuvchi xabarlari yoki sharhlari kabi foydalanuvchilarga havola qilingan web saytlarning boshqa joylarida oshkor etilishi mumkin.

Ba'zi hollarda, web sayt foydalanuvchiga resursga kirishga ruxsat berilmaganligini aniqlaydi va kirish sahifasiga yo'naltirishni qaytaradi. Biroq, qayta yo'naltirishni o'z ichiga olgan javob hali ham nishondagi foydalanuvchiga tegishli ba'zi nozik ma'lumotlarni o'z ichiga olishi mumkin, shuning uchun xujum hali ham muvaffaqiyatli.

## Gorizontal imtiyoz oshirishni vertikalga aylantirish <a href="#gorizontal-imtiyoz-oshirishni-vertikalga-aylantirish" id="gorizontal-imtiyoz-oshirishni-vertikalga-aylantirish"></a>

Ko'pincha, gorizontal imtiyozlarni oshirish xujumi, imtiyozliroq foydalanuvchini xavf ostiga qo'yish orqali vertikal imtiyozlarning oshirishga aylantirilishi mumkin. Masalan, gorizontal eskalatsiya hakerga boshqa foydalanuvchiga tegishli parolni tiklash yoki qo'lga kiritish imkonini berishi mumkin. Agar haker administratorni nishonga olsa va uning hisobini buzsa, ular administrativ kirish huquqiga ega bo'lishi va vertikal imtiyozlarni oshirishi mumkin.

Masalan, Haker boshqa foydalanuvchining hisob sahifasiga kirish huquqini gorizontal oshirish uchun allaqachon tasvirlangan parametrlarni buzish texnikasidan foydalangan holda qo'lga kiritishi mumkin:

```
https://insecure-website.com/myaccount?id=456
```

Agar nishondagi foydalanuvchi web sayt administratori bo'lsa, haker administrativ hisob sahifasiga kirish huquqiga ega bo'ladi. Ushbu sahifa administrator parolini oshkor qilishi yoki uni o'zgartirish vositalarini taqdim etishi yoki imtiyozli funksiyalarga to'g'ridan-to'g'ri kirishni ta'minlashi mumkin.

## Insecure direct object references <a href="#insecure-direct-object-references" id="insecure-direct-object-references"></a>

Insecure direct object references (IDOR) access control zaifliklarining pastki toifasidir. IDOR web sayt ob'ektlarga to'g'ridan-to'g'ri kirish uchun foydalanuvchi tomonidan taqdim etilgan ma'lumotlardan foydalanganda paydo bo'ladi va Haker ruxsatsiz kirishni olish uchun kirishni o'zgartirishi mumkin. U OWASP 2007 birinchi o'ntaligida paydo bo'lishi bilan mashhur bo'ldi, garchi bu access controlni chetlab o'tishga olib keladigan ko'plab amalga oshirilgan ishlarning xatolarining bir misolidir.

## Access control zaifliklari ko'p bosqichli protsesslarda <a href="#access-control-zaifliklari-kop-bosqichli-protsesslarda" id="access-control-zaifliklari-kop-bosqichli-protsesslarda"></a>

Ko'plab web saytlar muhim funksiyalarni bir nechta seriyali bosqichlarni amalga oshirgan holda bajaradilar. Bu ko'pincha turli xil ma'lumotlar yoki variantlarni qo'lga kiritish kerak bo'lganda yoki foydalanuvchi harakatni amalga oshirishdan oldin tafsilotlarni ko'rib chiqishi va tasdiqlashi kerak bo'lganda amalga oshiriladi. Masalan, foydalanuvchi ma'lumotlarini yangilash uchun administrativ funksiya quyidagi bosqichlarni o'z ichiga olishi mumkin:

1. Muayyan foydalanuvchi uchun ma'lumotlarni o'z ichiga olgan shaklni yuklash
2. O'zgarishlarni yuborish
3. O'zgarishlarni ko'rib chiqish va tasdiqlash

Ba'zan web-sayt ushbu bosqichlarning ba'zilari uchun qattiq access control ni amalga oshiradi, lekin boshqalarga e'tibor bermaydi. Misol uchun, access control elementlari birinchi va ikkinchi bosqichlarga to'g'ri qo'llanilgan, lekin uchinchi bosqichga emas, deylik. Web-sayt foydalanuvchi to'g'ri boshqariladigan birinchi qadamlarni allaqachon bajargan bo'lsa, 3-bosqichga erishadi, deb hisoblaydi. Bu yerda Haker birinchi ikki bosqichni o‘tkazib yuborib, uchinchi bosqich uchun so‘rovni kerakli parametrlar bilan to‘g‘ridan-to‘g‘ri yuborish orqali funksiyaga ruxsatsiz kirish huquqiga ega bo‘lishi mumkin.

## Referer ga asoslangan access control <a href="#referer-ga-asoslangan-access-control" id="referer-ga-asoslangan-access-control"></a>

Ba'zi web saytlar Referrer headeriga asoslangan holda access control ni amalga oshirishadi. Referer headeri odatda so'rov boshlangan sahifani ko'rsatish uchun brauzerlar tomonidan so'rovlarga qo'shiladi.

Misol uchun, web sayt /admin manzilidagi asosiy administrativ sahifaga kirishni boshqarishni qat'iy ravishda ta'minlaydi deylik, lekin /admin/deleteUser kabi pastki sahifalar uchun faqat Referer headerini tekshiradi. Agar Referer sarlavhasi asosiy /admin URL manzilini o'z ichiga olsa, so'rovga ruxsat beriladi.

Bunday holatda, Referer sarlavhasi haker tomonidan to'liq nazorat qilinishi mumkinligi sababli, ular zarur bo'lgan Referer headerini taqdim qilib, nozik pastki sahifalarga to'g'ridan-to'g'ri so'rovlarni soxtalashtirishi va ruxsatsiz kirish huquqiga ega bo'lishi mumkin.

## joylashuvga asoslangan access control <a href="#joylashuvga-asoslangan-access-control" id="joylashuvga-asoslangan-access-control"></a>

Ba'zi web-saytlar foydalanuvchining geografik joylashuvidan kelib chiqqan holda resurslarga access control ni ta'minlaydi. Bu, masalan, davlat qonunchiligi yoki biznes cheklovlari qo'llaniladigan bank ilovalari yoki media xizmatlariga nisbatan qo'llanilishi mumkin. Ushbu access control vositalarini ko'pincha web-proksi-serverlar, VPN-lardan foydalanish yoki mijoz tomonidan geolokatsiya mexanizmlarini manipulyatsiya qilish orqali chetlab o'tish mumkin.

## Qanday qilib Access control zaifliklarini oldini olish mumkin? <a href="#qanday-qilib-access-control-zaifliklarini-oldini-olish-mumkin" id="qanday-qilib-access-control-zaifliklarini-oldini-olish-mumkin"></a>

Access control zaifliklarining oldini olish, odatda, chuqur mudofaa va quyidagi tamoyillarni qo'llash orqali mumkin:

* Access control uchun hech qachon yolg'iz chalkashlikka tayanmang.
* Resurs hamma uchun ochiq bo'lishi mo'ljallanmagan bo'lsa, sukut bo'yicha kirishni rad eting.
* Iloji bo'lsa, access control vositalarini joriy qilish uchun yagona dastur mexanizmidan foydalaning.
* Kod darajasida dasturchilar har bir resurs uchun ruxsat etilgan kirishni e'lon qilishni majburiy qilib qo'yishi va sukut bo'yicha kirishni rad etishi kerak.
* Access controlni sinchkovlik bilan tekshirib ko'ring va ularning mo'ljallanganidek ishlashiga ishonch hosil qiling.
