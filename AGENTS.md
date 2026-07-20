# AGENTS.md

# AI YouTube Video Dubber & Translator

Ezt a projektet egy modern, Next.js alapú webes alkalmazásként terveztük meg, amely képes YouTube-videók automatikus szinkronizálására és lefordítására mesterséges intelligencia segítségével. A folyamat során a rendszer kinyeri az eredeti videó hangsávját, Whisper segítségével leiratot készít belőle, az AI SDK-n (GPT-4o) keresztül lefordítja kontextushelyes, jól felolvasható magyar szöveggé, végül pedig az OpenAI TTS (Text-to-Speech) motorjával természetes hangzású magyar szinkront generál.

## Projektstruktúra

A `src/` mappa felépítése:

- `drizzle/` — DB kapcsolat, seed, migrációk, a feature mappákból importált sémák összegyűjtve
- `app/` — Next.js App Router
- `components/` — globális React komponensek, amelyeket **több feature is használ**, vagy amelyek nem köthetők egyetlen feature-höz sem (pl. layout elemek, generic UI wrapperek). Feature-specifikus komponens ide **soha ne** kerüljön — az a `features/<feature-name>/components/` alá tartozik.
- `hooks/` — globális React hook-ok
- `lib/` — segédimplementációk (pl. DAL réteg implementáció, MUI téma/fontok)
- `utils/` — tiszta helper függvények (pl. dátumformázás)
- `types/` — globális típusok
- `providers/` — globális context providerek
- `features/` — minden feature (pl. `users`) a gyökérhez hasonló struktúrát követ, kiegészítve feature-specifikus rétegekkel — részletek: `src/features/AGENTS.md`

## Kódstílus

- Egy fájlban csak egy React komponens legyen.
- Minden form react-hook-form + zod validációval készül, a pontos konvenciót (séma/típus helye, `useForm` beállítás, toast-visszajelzés) a **`form-creation` skill** írja le — új form létrehozásakor mindig azt kövesd.
- Minden mutáció hagyományos api route helyett a dal segédprogrammal legyen implementálva server-action-ben ami a src/lib/dal mappában van
- Összetartozó komponens-csoport (pl. navbar + al-komponensei) saját mappába kerül, a belépési pont `index.tsx` néven.
- Minden kódkomment **angolul** íródjon, függetlenül a kommunikáció nyelvétől.

## Egyedi lekérdezések típusai
 
Ha a `drizzle/operations.ts`-ben egy olyan függvény van (pl. join, aggregáció,
select mezők szűkítése), aminek a visszatérési típusa **eltér** a tábla nyers
`Select<Name>` típusától, akkor ahhoz is generálj típust a feature
`types.ts`-ébe, a függvény visszatérési típusából levezetve:
 
```typescript
export type UserWithAccounts = Awaited<ReturnType<typeof getUserWithAccounts>>;
```
 
- A típusnév a függvény nevéből képződik, PascalCase-ben, a `get`/`find`/stb.
  igei prefix nélkül (pl. `getUserWithAccounts` → `UserWithAccounts`).
- Ha a függvény tömböt ad vissza, és az elemek típusára külön is szükség van,
  vezesd le az elemtípust is:
```typescript
  export type UserWithAccountsList = Awaited<ReturnType<typeof getUserWithAccounts>>;
  export type UserWithAccountsItem = UserWithAccountsList[number];
```
- Ne írj kézzel duplikált interfészt egy `operations.ts` függvény
  visszatérési alakjához — mindig `Awaited<ReturnType<typeof ...>>`-tal
  vezesd le a `types.ts`-ben, hogy a séma módosulásakor a típus is frissüljön.
- Ez a szabály csak az **egyedi** (nem tiszta `Select`/`Insert`) lekérdezésekre
  vonatkozik — ha egy `operations.ts` függvény egyszerűen egy tábla sorát adja
  vissza, ahhoz nem kell külön típus, elég a séma `Select<Name>` típusa
  (lásd a `drizzle-schema` skill).


## Határok — ne nyúlj hozzájuk

- `drizzle/migrations` — generált migrációs fájlok, kézi szerkesztésük adatbázis-inkonzisztenciát okozhat
- `.env` és minden `.env*` fájl — érzékeny környezeti változók és kulcsok

Ha egy feladat ezekhez nyúlna, jelezd a felhasználónak ahelyett, hogy magad módosítanád.

## Branch-kezelés

Minden új szálhoz (feladathoz) az agent **köteles önálló Git branch-et létrehozni**, mielőtt bármilyen kódmódosítást végezne.

- Soha ne dolgozz közvetlenül a `main`/`master` branch-en.
- Commit és Pull Request létrehozása **nem** az agent feladata — ezt a felhasználó külön, kifejezetten fogja kérni.

<!-- NEXT-AGENTS-MD-START -->[Next.js Docs Index]|root: ./.next-docs|STOP. What you remember about Next.js is WRONG for this project. Always search docs and read before any task.|If docs missing, run this command first: npx @next/codemod agents-md --output AGENTS.md|01-app/01-getting-started:{01-installation.mdx,02-project-structure.mdx,03-layouts-and-pages.mdx,04-linking-and-navigating.mdx,05-server-and-client-components.mdx,06-partial-prerendering.mdx,07-fetching-data.mdx,08-updating-data.mdx,09-caching-and-revalidating.mdx,10-error-handling.mdx,11-css.mdx,12-images.mdx,13-fonts.mdx,14-metadata-and-og-images.mdx,15-route-handlers-and-middleware.mdx,16-deploying.mdx,17-upgrading.mdx}|01-app/02-guides:{analytics.mdx,authentication.mdx,backend-for-frontend.mdx,caching.mdx,ci-build-caching.mdx,content-security-policy.mdx,custom-server.mdx,css-in-js.mdx,data-security.mdx,debugging.mdx,draft-mode.mdx,environment-variables.mdx,forms.mdx,incremental-static-regeneration.mdx,instrumentation.mdx,internationalization.mdx,json-ld.mdx,lazy-loading.mdx,local-development.mdx,mdx.mdx,memory-usage.mdx,multi-tenant.mdx,multi-zones.mdx,open-telemetry.mdx,package-bundling.mdx,prefetching.mdx,production-checklist.mdx,progressive-web-apps.mdx,redirecting.mdx,sass.mdx,scripts.mdx,self-hosting.mdx,single-page-applications.mdx,static-exports.mdx,tailwind-v3-css.mdx,third-party-libraries.mdx,videos.mdx}|01-app/02-guides/migrating:{app-router-migration.mdx,from-create-react-app.mdx,from-vite.mdx}|01-app/02-guides/testing:{cypress.mdx,jest.mdx,playwright.mdx,vitest.mdx}|01-app/02-guides/upgrading:{codemods.mdx,version-14.mdx,version-15.mdx}|01-app/03-api-reference:{07-edge.mdx,08-turbopack.mdx}|01-app/03-api-reference/01-directives:{use-cache.mdx,use-client.mdx,use-server.mdx}|01-app/03-api-reference/02-components:{font.mdx,form.mdx,image.mdx,link.mdx,script.mdx}|01-app/03-api-reference/03-file-conventions/01-metadata:{app-icons.mdx,manifest.mdx,opengraph-image.mdx,robots.mdx,sitemap.mdx}|01-app/03-api-reference/03-file-conventions:{default.mdx,dynamic-routes.mdx,error.mdx,forbidden.mdx,instrumentation-client.mdx,instrumentation.mdx,intercepting-routes.mdx,layout.mdx,loading.mdx,mdx-components.mdx,middleware.mdx,not-found.mdx,page.mdx,parallel-routes.mdx,public-folder.mdx,route-groups.mdx,route-segment-config.mdx,route.mdx,src-folder.mdx,template.mdx,unauthorized.mdx}|01-app/03-api-reference/04-functions:{after.mdx,cacheLife.mdx,cacheTag.mdx,connection.mdx,cookies.mdx,draft-mode.mdx,fetch.mdx,forbidden.mdx,generate-image-metadata.mdx,generate-metadata.mdx,generate-sitemaps.mdx,generate-static-params.mdx,generate-viewport.mdx,headers.mdx,image-response.mdx,next-request.mdx,next-response.mdx,not-found.mdx,permanentRedirect.mdx,redirect.mdx,revalidatePath.mdx,revalidateTag.mdx,unauthorized.mdx,unstable_cache.mdx,unstable_noStore.mdx,unstable_rethrow.mdx,use-link-status.mdx,use-params.mdx,use-pathname.mdx,use-report-web-vitals.mdx,use-router.mdx,use-search-params.mdx,use-selected-layout-segment.mdx,use-selected-layout-segments.mdx,userAgent.mdx}|01-app/03-api-reference/05-config/01-next-config-js:{allowedDevOrigins.mdx,appDir.mdx,assetPrefix.mdx,authInterrupts.mdx,basePath.mdx,browserDebugInfoInTerminal.mdx,cacheComponents.mdx,cacheLife.mdx,compress.mdx,crossOrigin.mdx,cssChunking.mdx,devIndicators.mdx,distDir.mdx,env.mdx,eslint.mdx,expireTime.mdx,exportPathMap.mdx,generateBuildId.mdx,generateEtags.mdx,headers.mdx,htmlLimitedBots.mdx,httpAgentOptions.mdx,images.mdx,incrementalCacheHandlerPath.mdx,inlineCss.mdx,logging.mdx,mdxRs.mdx,middlewareClientMaxBodySize.mdx,onDemandEntries.mdx,optimizePackageImports.mdx,output.mdx,pageExtensions.mdx,poweredByHeader.mdx,ppr.mdx,productionBrowserSourceMaps.mdx,reactCompiler.mdx,reactMaxHeadersLength.mdx,reactStrictMode.mdx,redirects.mdx,rewrites.mdx,sassOptions.mdx,serverActions.mdx,serverComponentsHmrCache.mdx,serverExternalPackages.mdx,staleTimes.mdx,staticGeneration.mdx,taint.mdx,trailingSlash.mdx,transpilePackages.mdx,turbopack.mdx,turbopackPersistentCaching.mdx,typedRoutes.mdx,typescript.mdx,urlImports.mdx,useCache.mdx,useLightningcss.mdx,viewTransition.mdx,webVitalsAttribution.mdx,webpack.mdx}|01-app/03-api-reference/05-config:{02-typescript.mdx,03-eslint.mdx}|01-app/03-api-reference/06-cli:{create-next-app.mdx,next.mdx}|02-pages/01-getting-started:{01-installation.mdx,02-project-structure.mdx,04-images.mdx,05-fonts.mdx,06-css.mdx,11-deploying.mdx}|02-pages/02-guides:{amp.mdx,analytics.mdx,authentication.mdx,babel.mdx,ci-build-caching.mdx,content-security-policy.mdx,custom-server.mdx,css-in-js.mdx,debugging.mdx,draft-mode.mdx,environment-variables.mdx,forms.mdx,incremental-static-regeneration.mdx,instrumentation.mdx,internationalization.mdx,lazy-loading.mdx,mdx.mdx,multi-zones.mdx,open-telemetry.mdx,package-bundling.mdx,post-css.mdx,preview-mode.mdx,production-checklist.mdx,redirecting.mdx,sass.mdx,scripts.mdx,self-hosting.mdx,static-exports.mdx,tailwind-v3-css.mdx,third-party-libraries.mdx}|02-pages/02-guides/migrating:{app-router-migration.mdx,from-create-react-app.mdx,from-vite.mdx}|02-pages/02-guides/testing:{cypress.mdx,jest.mdx,playwright.mdx,vitest.mdx}|02-pages/02-guides/upgrading:{codemods.mdx,version-10.mdx,version-11.mdx,version-12.mdx,version-13.mdx,version-14.mdx,version-9.mdx}|02-pages/03-building-your-application/01-routing:{01-pages-and-layouts.mdx,02-dynamic-routes.mdx,03-linking-and-navigating.mdx,05-custom-app.mdx,06-custom-document.mdx,07-api-routes.mdx,08-custom-error.mdx}|02-pages/03-building-your-application/02-rendering:{01-server-side-rendering.mdx,02-static-site-generation.mdx,04-automatic-static-optimization.mdx,05-client-side-rendering.mdx}|02-pages/03-building-your-application/03-data-fetching:{01-get-static-props.mdx,02-get-static-paths.mdx,03-forms-and-mutations.mdx,03-get-server-side-props.mdx,05-client-side.mdx}|02-pages/03-building-your-application/06-configuring:{12-error-handling.mdx}|02-pages/04-api-reference:{06-edge.mdx,08-turbopack.mdx}|02-pages/04-api-reference/01-components:{font.mdx,form.mdx,head.mdx,image-legacy.mdx,image.mdx,link.mdx,script.mdx}|02-pages/04-api-reference/02-file-conventions:{instrumentation.mdx,middleware.mdx,public-folder.mdx,src-folder.mdx}|02-pages/04-api-reference/03-functions:{get-initial-props.mdx,get-server-side-props.mdx,get-static-paths.mdx,get-static-props.mdx,next-request.mdx,next-response.mdx,use-amp.mdx,use-report-web-vitals.mdx,use-router.mdx,userAgent.mdx}|02-pages/04-api-reference/04-config/01-next-config-js:{allowedDevOrigins.mdx,assetPrefix.mdx,basePath.mdx,bundlePagesRouterDependencies.mdx,compress.mdx,crossOrigin.mdx,devIndicators.mdx,distDir.mdx,env.mdx,eslint.mdx,exportPathMap.mdx,generateBuildId.mdx,generateEtags.mdx,headers.mdx,httpAgentOptions.mdx,images.mdx,middlewareClientMaxBodySize.mdx,onDemandEntries.mdx,optimizePackageImports.mdx,output.mdx,pageExtensions.mdx,poweredByHeader.mdx,productionBrowserSourceMaps.mdx,reactStrictMode.mdx,redirects.mdx,rewrites.mdx,runtime-configuration.mdx,serverExternalPackages.mdx,trailingSlash.mdx,transpilePackages.mdx,turbo.mdx,typescript.mdx,urlImports.mdx,useLightningcss.mdx,webVitalsAttribution.mdx,webpack.mdx}|02-pages/04-api-reference/04-config:{01-typescript.mdx,02-eslint.mdx}|02-pages/04-api-reference/05-cli:{create-next-app.mdx,next.mdx}|03-architecture:{accessibility.mdx,fast-refresh.mdx,nextjs-compiler.mdx,supported-browsers.mdx}|04-community:{01-contribution-guide.mdx,02-rspack.mdx}<!-- NEXT-AGENTS-MD-END -->
