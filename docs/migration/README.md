# Inventory migration

The authoritative live showroom was `lib/data/showroom-stock.ts` at commit `f8ab3dd`. The homepage used six available/coming-soon vehicles and displayed two sold vehicles separately. Its three hero vehicles were the Tiguan Élégance, Tiguan R-Line Exclusive and Mercedes A200.

`original-inventory.json` exports the complete original showroom records and the old admin's derived fields **before** replacing the source. `inventory-manifest.json` preserves all eight IDs/slugs, original display prices, exact gallery order and SHA-256 hashes of all 47 original photos. The historical migration script is retained as an audit artifact.

Every original ID remains its original slug. Original numeric sale prices are stored as whole MAD values; the T-Roc's price-on-request is null, not zero. Mileage is stored separately as kilometres; unknown mileage remains null. Original specification rows, equipment groups, availability notes, descriptive text, highlights and photo order remain available in the FR/EN/AR text fields. The R-Line gallery's illustrative markers are per image. Sold is an availability state; hidden is a separate visibility state. Initially no original vehicles are hidden.

The older database-backed admin APIs coexisted with the static showroom and did not supply this public inventory. A read-only export of its configured Supabase cars table was attempted. The service was unreachable (`fetch failed`); `legacy-database-export.json` records that outcome. No private users, profiles, credentials or bookings were exported. The live site's eight listings were compared with the local source at https://www.makanluxurymotors.com/en before migration.

The old admin/client account screens, authentication middleware, booking/sales/stock mutation APIs, unused legacy stock components and Supabase SDKs have been retired. Their original code remains recoverable from Git history. The public site now uses enquiries without accounts, and `/admin`, `/auth`, `/client`, `/api` and their localized equivalents return 404. The editor is a separate local process, not a deployed admin replacement route.

No checked-in CI workflow or linked Vercel project configuration existed. The documented npm/Next.js → GitHub → Vercel deployment path remains; `npm run build` now validates the catalogue before building. npm's lockfile is the canonical lockfile, so the obsolete pnpm lockfile was removed.
