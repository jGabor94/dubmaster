# AGENTS.md — features/

Ez a fájl a `src/features/` alatti egyes feature-mappákra (pl. `users/`, `folders/`, `classes/` stb.) vonatkozó specifikus szabályokat írja le. Az általános projektinformációkért lásd a gyökér `AGENTS.md`-t.

## Feature mappa felépítése

Minden feature mappa (pl. `features/users/`) a gyökér `src/` struktúráját tükrözi — lehet benne saját `components/`, `hooks/`, `lib/`, `utils/`, `types.ts`, `providers/`, csak feature-specifikus tartalommal.

A gyökérhez képest a **különbség** két extra réteg:

```
features/
  <feature-name>/
    dal/
      queries.ts       # GET jellegű lekérdezések
      mutations.ts     # mutációs lekérdezések (create/update/delete)
    drizzle/
      schema.ts        # Drizzle séma definíció
      operations.ts    # nyers Drizzle adatbázis lekérdezések (pl. getUserById)
    zod/
      schema.ts        # feature-specifikus Zod sémák
    components/
    hooks/
    lib/
    utils/
    types.ts          # feature mappában minden típus gyűjtőhelye
    providers/
```

A `zod/` mappa a `drizzle/`-lal **egy szinten** van, nem az alatt.

## Rétegződési szabály

**komponens / route → `dal` → `drizzle/operations`**

- A `drizzle/operations.ts` nyers Drizzle lekérdezéseit a `dal` (`queries.ts` / `mutations.ts`) csomagolja be.
- UI kód vagy route handler **soha ne hívjon közvetlenül** `drizzle/operations`-t.
- Ne ugorj át réteget, és ne fordítsd meg a hívási irányt.

## Komponensek elhelyezése

- Ha egy komponens **csak egy adott feature-höz** kapcsolódik (pl. csak a `users` feature-ön belül használt lista/form/kártya komponens), az a `features/<feature-name>/components/` alá kerül — **nem** a gyökér `src/components/`-be.
- A gyökér `src/components/` kizárólag olyan komponenseknek van fenntartva, amelyeket **legalább két különböző feature** használ, vagy amelyek feature-független, generikus UI elemek (pl. layout, navbar, shadcn `ui/` komponensek).
- Ha bizonytalan vagy, hogy egy komponens globális-e: alapértelmezésben tedd a feature `components/` mappájába, és csak akkor emeld ki a gyökérbe, ha ténylegesen több feature igényli.

## Drizzle séma és típusok

Új Drizzle tábla létrehozásának pontos konvencióját (`withRLS`, névadás, kötelező mezők) és a hozzá tartozó `Insert`/`Select` típusok generálását a **`drizzle-schema` skill** írja le — új séma létrehozásakor/módosításakor mindig azt kövesd.
A gyökér `drizzle/` mappa a feature mappák `drizzle/schema.ts` fájljaiból importálja össze a globális Drizzle sémakészletet — új sémát mindig a feature `drizzle/schema.ts`-ébe adj hozzá, ne a gyökér `drizzle/` mappába.

## Zod sémák

A `zod/schema.ts` sémái feature-specifikusak. 