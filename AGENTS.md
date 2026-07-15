# AGENTS.md

# AI YouTube Video Dubber & Translator

Ezt a projektet egy modern, Next.js alapú webes alkalmazásként terveztük meg, amely képes YouTube-videók automatikus szinkronizálására és lefordítására mesterséges intelligencia segítségével. A folyamat során a rendszer kinyeri az eredeti videó hangsávját, Whisper segítségével leiratot készít belőle, az AI SDK-n (GPT-4o) keresztül lefordítja kontextushelyes, jól felolvasható magyar szöveggé, végül pedig az OpenAI TTS (Text-to-Speech) motorjával természetes hangzású magyar szinkront generál.

## Projektstruktúra

A `src/` mappa felépítése:

- `drizzle/` — DB kapcsolat, seed, migrációk, a feature mappákból importált sémák összegyűjtve
- `app/` — Next.js App Router
- `components/` — globális React komponensek
- `hooks/` — globális React hook-ok
- `lib/` — segédimplementációk (pl. DAL réteg implementáció, MUI téma/fontok)
- `utils/` — tiszta helper függvények (pl. dátumformázás)
- `types/` — globális típusok
- `providers/` — globális context providerek
- `features/` — minden feature (pl. `users`) a gyökérhez hasonló struktúrát követ, kiegészítve feature-specifikus rétegekkel — részletek: `src/features/AGENTS.md`

## Kódstílus

- Egy fájlban csak egy React komponens legyen.
- Minden form react-hook-form-al legyen kezelve és a végeredmény alertben a react-hot-toast-al.
- Minden mutáció hagyományos api route helyett a dal segédprogrammal legyen implementálva server-action-ben ami a src/lib/dal mappában van
- Összetartozó komponens-csoport (pl. navbar + al-komponensei) saját mappába kerül, a belépési pont `index.tsx` néven.
- Minden kódkomment **angolul** íródjon, függetlenül a kommunikáció nyelvétől.

## shadcn/ui használata

- Új UI komponenst **mindig** a shadcn CLI-vel adj hozzá, ne írj kézzel saját változatot:
  ```
  npx shadcn@latest add <komponens-nev>
  ```
- Mielőtt új komponenst hoznál létre, **ellenőrizd**, hogy létezik-e már hasonló a `components/ui` mappában – ne hozz létre duplikátumot.
- Meglévő shadcn komponenseket (`components/ui/*.tsx`) **ne módosíts közvetlenül** a generált forrásban, kivéve ha kifejezetten stílus- vagy viselkedésbeli testreszabás a cél. Ha módosítasz, kommentben jelezd, mi és miért változott az eredetihez képest.
- Kompozíció útján építs: a saját feature-komponensek a `components/ui` elemekre épüljenek (pl. `Card`, `Button`, `Dialog`), ne írj alternatív, natív HTML-elemekből álló UI-t ott, ahol van megfelelő shadcn komponens.
- A stílusozás Tailwind classokkal és a `cn()` util függvénnyel történjen (a shadcn konvenció szerint), ne inline style-lal.
- Ügyelj a `components.json` konfigurációra (alias-ok, stílus preset, ikonkönyvtár – pl. lucide-react) – új komponens hozzáadásakor ez alapján generálódik a kód, ne írd felül kézzel az elérési utakat.
- Ha egy komponensnek van variánsa (`cva` – class-variance-authority), új variánst a meglévő `variants` objektumhoz add hozzá, ne hozz létre párhuzamos komponenst csak egy stílusváltozat miatt.
- Új shadcn komponens hozzáadása után futtasd le a projekt lint/typecheck parancsát, hogy biztosan illeszkedjen a meglévő kódstílushoz.
- Ha egy komponens nem elérhető a shadcn regiszterben, jelezd ezt egyértelműen, és csak ezután írj egyedi megoldást, a shadcn design-tokenek (színek, spacing, radius) megtartásával.


## Határok — ne nyúlj hozzájuk

- `drizzle/migrations` — generált migrációs fájlok, kézi szerkesztésük adatbázis-inkonzisztenciát okozhat
- `.env` és minden `.env*` fájl — érzékeny környezeti változók és kulcsok

Ha egy feladat ezekhez nyúlna, jelezd a felhasználónak ahelyett, hogy magad módosítanád.

