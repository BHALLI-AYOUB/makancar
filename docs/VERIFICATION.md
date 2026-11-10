# Makan implementation and verification — 10 November 2026

The replacement is implemented and verified locally. The final production website contains the original **eight vehicles, 47 ordered photos, two sold listings and three featured vehicles**. The editor is separate from the public Next.js bundle. No changes have been pushed or deployed to the live domain.

## Checks completed

| Check | Result | Evidence |
| --- | --- | --- |
| Catalogue schema, files and migration preservation | Pass | [10 regression tests and checks](verification/check-final.log) |
| ESLint | Pass, zero warnings | Same check log |
| TypeScript | Pass | Same check log; production build also checks types |
| Production build | Pass, Next.js 16.1.6 | [Build output](verification/build-final.log) |
| npm lockfile / normal `npm ci` resolution | Pass in dry run | No legacy peer flag is now needed |
| Editor workflow | Pass | [Machine-readable editor results](verification/editor-results.json) |
| Applied sample export, production catalogue/detail/hero | Pass | [Sample build results](verification/sample-build-results.json) |
| Final public website and original URLs | Pass | [Public browser results](verification/public-results.json) |
| Public/editor bundle separation | Pass | Public static chunks contain neither the editor workspace/storage code nor the retired Supabase client |
| Contact links and language URL continuity | Pass | [Contact checks](verification/contact-results.json) |
| Source whitespace | Pass | `git diff --check` |

The existing lint command initially could not run because ESLint was missing. A Next.js lint configuration and dev dependencies were added. The obsolete admin/Supabase and Framer Motion type errors disappeared with retirement of their unused screens and code. The build no longer ignores TypeScript errors. npm is the sole package manager/lockfile; Next.js build/start and the documented GitHub → Vercel deployment remain.

## Actual export-to-build exercise

The browser test created a sample vehicle, entered FR/EN/AR names, edited its price from **444,000 to 449,000 MAD**, uploaded two WebP photos, changed their order/cover and marked the cover illustrative. The live preview reflected the amount and marker. It saved a draft, refreshed the browser and confirmed both image blobs and form values survived.

The test exercised sold and hidden independently and confirmed ineligible vehicles were removed from the featured selection. It searched/filtered inventory, exported the ZIP, imported that ZIP and verified the gallery survived the round trip. The exact archive is retained as [sample-update.zip](verification/sample-update.zip).

That archive was applied with the real `catalogue:apply` command, creating revision 2 and writing its two images at the manifest's target paths. A production build was then run and served on port 3200. Browser checks confirmed the sample's **449,000 MAD** price and illustrative cover on its catalogue and detail page, and its selection in the homepage hero. A deliberately hidden original T-Roc returned 404 in all three languages and was absent from the sitemap; the two sold originals remained accessible. The sample detail is captured [here](verification/sample-production-detail.png).

After that exercise, the real revision-1 inventory was restored and built again. The final website has no sample vehicle or hidden original listing. The test images/archive remain under `docs/verification/`, not in the public inventory. **The sample ZIP is a verification fixture, not a business inventory update to publish.**

## Public acceptance

Chromium checked all **24 original vehicle URLs** (eight IDs × FR/EN/AR), the catalogue and home, and both service routes in all locales. Direct visits set the expected `html lang` and Arabic `dir="rtl"`, independent of a previous locale cookie. Language switching retained the vehicle path; an additional check retained its query and fragment.

The catalogue's sold filter and localized badges, price-on-request, vehicle enquiry links, canonical/alternate metadata and Car JSON-LD were checked. The sitemap includes all visible originals and excludes the hidden sample-build listing. `robots.txt` is available. Old admin/auth/client/API URLs and attempted editor/content-file URLs return 404 on the public server.

Gallery checks covered selected-thumbnail `aria-pressed`, next/previous controls, arrow keys, Escape, the native modal focus boundary and focus restoration to the opener. Illustrative labels remain visible on the active image. Reduced-motion mode keeps the hero visible. Desktop **1440 × 1000** and mobile **390 × 844** screenshots have no horizontal overflow or broken loaded images. There were no uncaught browser page errors. Contact destinations were inspected without sending a message or submitting a request to a third party.

## Mobile performance comparison

Three local development samples were taken before and after under the same Chromium profile: **390 × 844**, browser cache disabled, **4× CPU slowdown**, **150 ms network latency**, approximately **1.6 Mbps download**. Compilation was warm and the same `/en` homepage was used. Values below are medians.

| Metric | Before | After |
| --- | ---: | ---: |
| Largest contentful paint | 7.220 s | 2.912 s |
| First contentful paint | 2.524 s | 2.096 s |
| Cumulative layout shift | 0 | 0 |
| Resource transfer | 1,611,055 B | 1,089,105 B |
| Encoded JavaScript | 1,112,586 B | 850,151 B |
| Time to first byte | 565 ms | 655 ms |

LCP decreased about **60%**, transferred resources about **32%**, and encoded JavaScript about **24%** in this local test. TTFB was noisier and slightly slower in the after median. These are development measurements on this machine, **not** production field Core Web Vitals or a mobile-device/Lighthouse score. The final production build was separately exercised for functionality and responsive layout.

Raw samples: [before](verification/performance-before.json) and [comparison](verification/performance-comparison.json).

## Screenshots

| Page | Desktop | Mobile |
| --- | --- | --- |
| Homepage | [Desktop](verification/home-desktop.png) | [Mobile](verification/home-mobile.png) |
| Catalogue | [Desktop](verification/catalogue-desktop.png) | [Mobile](verification/catalogue-mobile.png) |
| Vehicle detail | [Desktop](verification/detail-desktop.png) | [Mobile](verification/detail-mobile.png) |
| Arabic catalogue | [Desktop RTL](verification/arabic-catalogue-desktop.png) | [Mobile RTL](verification/arabic-catalogue-mobile.png) |
| Editor inventory | [Desktop](verification/editor-desktop.png) | [Mobile cards](verification/editor-mobile.png) |
| Editor photos | [Desktop](verification/editor-photos-desktop.png) | [Mobile](verification/editor-photos-mobile.png) |
| Editor form | [Sample workflow](verification/editor-vehicle-desktop.png) | [Mobile form](verification/editor-form-mobile.png) |

## Migration and verification limits

The authoritative code catalogue was exported before replacement, including the old admin's derived fields, with checksums for every original photo. See [migration evidence](migration/README.md). The separately configured legacy Supabase service was unreachable, so a database-table export could not be retrieved; its recorded failure is retained. No users or bookings were exported or altered. The live showroom's eight listings matched the original local catalogue.

No AB Fast Car source project was found in the checked local project folders. Available marketing reference images informed the visual direction; the new vehicle list, form sections, gallery and reorder controls follow the requested UX. Original French vehicle prose was preserved where the old EN/AR source had no translated equivalent; the editor exposes independent text fields for all three languages. Public UI labels, status badges, price-on-request, gallery controls and primary specifications are localized.

See [EDITOR.md](EDITOR.md) for the exact open/edit/export/apply/build/publish sequence and the initial code rollout. Publishing to the existing live deployment remains a repository push/deployment step; local export alone does not publish.
