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
    types.ts
    providers/
```

A `zod/` mappa a `drizzle/`-lal **egy szinten** van, nem az alatt.

## Rétegződési szabály

**komponens / route → `dal` → `drizzle/operations`**

- A `drizzle/operations.ts` nyers Drizzle lekérdezéseit a `dal` (`queries.ts` / `mutations.ts`) csomagolja be.
- UI kód vagy route handler **soha ne hívjon közvetlenül** `drizzle/operations`-t.
- Ne ugorj át réteget, és ne fordítsd meg a hívási irányt.

## Zod sémák

A `zod/schema.ts` sémái feature-specifikusak. A gyökér `drizzle/` mappa a feature mappák `drizzle/schema.ts` fájljaiból importálja össze a globális Drizzle sémakészletet — új sémát mindig a feature `drizzle/schema.ts`-ébe adj hozzá, ne a gyökér `drizzle/` mappába.