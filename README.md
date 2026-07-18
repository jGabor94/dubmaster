# dubmaster

A dubmaster egy AI-alapú webalkalmazás YouTube-videók magyar nyelvű szinkronizálásához. A projekt célja, hogy egyetlen videólinkből természetes hangzású, magyar nyelvű hangsáv készüljön anélkül, hogy a felhasználónak manuálisan kellene elvégeznie a teljes fordítási és hangfeldolgozási folyamatot.

## A projekt célja

A dubmaster a YouTube-on elérhető tartalmakat teszi könnyebben hozzáférhetővé magyar nyelven. Elsősorban olyan videókhoz készült, amelyekhez nem érhető el magyar szinkron, de a tartalom magyarul is hasznos vagy érdekes lehet.

Az alkalmazás a felhasználó által megadott videó alapján:

1. feldolgozási feladatot hoz létre a videóhoz;
2. kinyeri és feldolgozza az eredeti beszédet;
3. leiratot készít a hanganyagból;
4. a szöveget kontextushelyes, felolvasható magyar szöveggé fordítja;
5. AI-alapú magyar narrációt generál;
6. a kész hangsávot lejátszhatóvá és később is elérhetővé teszi.

## Felhasználói folyamat

A bejelentkezett felhasználó egy YouTube-videó linkjét illeszti be a kezdőképernyőn. A dubmaster ellenőrzi a linket, létrehozza a szinkronizálási feladatot, majd a feldolgozás állapotát automatikusan frissíti.

A feldolgozás végén a magyar hangsáv közvetlenül lejátszható az alkalmazásban. A korábbi feladatok a felhasználó saját előzményei között jelennek meg, így a már elkészült szinkronok később is visszakereshetők.

## Fő funkciók

- YouTube-videók linkjének ellenőrzése és feldolgozásba küldése
- Automatikus beszédfelismerés és leiratkészítés
- Kontextushelyes magyar fordítás
- AI-generált magyar hang és narráció
- Feldolgozási állapotok követése a várólistától a befejezésig
- Elkészült hangsávok böngészőből történő lejátszása
- Személyes szinkronizálási előzmények
- Bejelentkezéshez kötött, felhasználónként elkülönített tartalmak
- Hibajelzés sikertelen feldolgozás esetén

## Technológiai felépítés

A felület Next.js és React alapokra épül, az App Router használatával. A funkciók feature-alapú szervezésben kapnak helyet, így a felhasználókezelés, jogosultságkezelés, hitelesítés, feliratkészítés és szinkronizálás különálló, jól bővíthető modulokat alkot.

Az alkalmazás főbb építőelemei:

- Next.js és React a webes felülethez
- Server Action alapú adat- és műveleti réteg
- Drizzle ORM a perzisztens adatok kezeléséhez
- PostgreSQL-alapú adatmodell a felhasználók és szinkronizálási feladatok számára
- Supabase a kapcsolódó háttérszolgáltatásokhoz és fájlokhoz
- NextAuth a hitelesítéshez
- OpenAI-alapú beszédfelismerés, fordítási és szövegfelolvasási folyamat
- shadcn/ui és Tailwind CSS a kezelőfelülethez

## A rendszer állapotkezelése

Minden szinkronizálás önálló feladatként jelenik meg. A feladat a várólistába kerül, majd a feldolgozás során állapotot és előrehaladást tárol. A felhasználói felület ezeket az adatokat frissítve jeleníti meg, így a felhasználó követheti, hogy a videó feldolgozás alatt van, elkészült vagy hibára futott.

## Projektirány

A dubmaster egy olyan egyszerű, automatizált szinkronizálási munkafolyamatot épít, amely a technikai feldolgozás összetettségét elrejti a felhasználó elől. A projekt hosszabb távú fókusza a természetesebb magyar hangzás, a jobb fordítási minőség, a megbízható feldolgozás és a személyes videókönyvtár továbbfejlesztése.
