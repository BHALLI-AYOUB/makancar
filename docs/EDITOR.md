# Makan showroom editor

The public website still uses Next.js 16 and the existing `npm run build` / Git-to-Vercel deployment workflow. It reads **`content/catalogue.json`**, never browser drafts or a database. The editor is a separate, local-only HTML/JavaScript application outside `app/` and `public/`; it is not a route or a public website bundle.

## Admin space on the website (/admin)

With the website running locally (`npm run build` then `npm start -- --port 3100`), open **http://localhost:3100/admin** (footer link **Espace admin**) and sign in with the admin account. Edit, then click **Save to site**: the catalogue and new photos are written to `content/catalogue.json` and `public/vehicles/uploads/` on this computer and the site shows the change immediately, without a rebuild. A backup of the previous catalogue is kept in `.catalogue-backups/`. To publish online, commit and push those files as described below. Vercel cannot save files, so always save from the local admin. The session key is `ADMIN_SESSION_SECRET` in `.env.local`.

## Open the editor

Use Node.js 22 or newer. From the project folder:

```powershell
npm ci
npm run editor
```

`npm run editor` opens **http://127.0.0.1:4174** in your default browser. Keep the terminal running. To start without opening a window: `npm run editor -- --no-open`. `EDITOR_PORT` can select a different port. The server accepts local requests only and has no write or publishing endpoint.

## Edit a vehicle

1. Open **Vehicles**, search or filter the inventory, and choose **Edit**. Use the arrow buttons to change catalogue order. Existing IDs and slugs are protected to preserve vehicle URLs. New vehicles receive a permanent ID and an editable new slug.
2. Edit the brand, model, trim, registration/year, mileage in kilometres and sale price in **MAD**. A blank price or **Price on request** means no published amount; zero is a valid numeric price. An unknown mileage remains blank, rather than being fabricated.
3. **Availability** is available, coming soon, sold or unavailable. **Visibility** is public or hidden. Sold vehicles retain their detail pages and can be found with the sold filter. Hidden vehicles are omitted from the catalogue, homepage, sitemap and detail routes; their URLs return 404. Hiding does not delete their data or photos.
4. Mark eligible public vehicles as featured. Sold/unavailable/hidden vehicles are automatically removed from the hero selection. Reorder the selected hero vehicles under **Showroom content**. With no featured selection, the public hero falls back to the first public available vehicle.
5. Edit FR, EN and AR text using the language tabs. Existing equipment groups, specifications, highlights and original notes were migrated. Specifications use `Label | Value` per line. Equipment groups use a `# Group title` line followed by one equipment item per line. The legacy notes remain editable; review descriptive text when changing an amount that was also written into a description.
6. Check the live card. Validation errors appear beside the form and in the fixed status bar. The full catalogue must validate before export.

## Manage photos

Select a vehicle in **Photos**, choose JPG, PNG, WebP or AVIF files (maximum 20 MB per file), and preview them. The first image is the cover. Use the star or arrow buttons to choose a cover and change order. Remove detaches a photo from that vehicle; it never deletes an original repository image. Toggle **Illustrative image** per photo and edit its FR/EN/AR alternative text. The public hero, card and detail gallery label the active illustrative photo.

New files receive unique paths below `public/vehicles/uploads/<vehicle-id>/`. Their names, bytes, gallery order and illustrative markers travel with the export. Existing photo paths are retained. If an existing photo is missing on disk, export and build validation report it.

## Drafts and import

**Save draft** stores the catalogue and new image blobs in IndexedDB in the current browser at this editor address. The status bar distinguishes unsaved changes from a saved draft. Saved drafts restore after refresh. Drafts are local to this browser/profile/address; clearing browser data removes them. Export a ZIP as a portable backup.

**Import catalogue** accepts a version-1 catalogue JSON or a ZIP exported by this editor. Invalid imports leave the current draft in place. ZIP imports restore new photos too. A draft based on an older disk catalogue is preserved but cannot be exported until you import and merge the latest catalogue. Do not overwrite somebody else's newer catalogue with an old export.

## Publish an update

For the first rollout of this replacement, review and commit the implementation itself (`git add -A`, `git commit`, then `git push origin main`). The content-only steps below apply after that initial code deployment. The editor and test artifacts are repository files; Next.js does not expose them as public routes.

1. Choose **Export updates**. Resolve any validation errors. The downloaded `makan-update-rN.zip` contains:
   - `content/catalogue.json` — the complete next revision;
   - `public/vehicles/uploads/...` — referenced new image files;
   - `manifest.json` — base revision/hash and exact image target paths;
   - `README.txt` — applying instructions.
2. In the project terminal, apply that ZIP (substitute the actual download path):

```powershell
npm run catalogue:apply -- "C:\Users\HP\Downloads\makan-update-r2.zip"
npm run check
npm run build
```

The apply command checks the base revision **and** content hash, schema, archive checksums, image signatures, target paths and file references before replacing the catalogue. It backs up the previous catalogue under `.catalogue-backups/`, writes image files first, then atomically replaces the JSON. It refuses a stale export and refuses to overwrite a different existing image. Keep the ZIP intact and use this command; copying only the JSON would omit new photos and bypass the conflict check.

3. Preview the production build with `npm start -- --port 3100`. Check the edited listing, detail page, languages and gallery.
4. Commit the validated update and push to the same deployment branch used by this repository:

```powershell
git add content/catalogue.json public/vehicles/
git commit -m "Update Makan showroom catalogue"
git push origin main
```

The existing repository documentation describes GitHub → Vercel. There is no checked-in custom CI, Vercel project link or deployment secret. The existing Vercel integration must still be connected to the repository/branch. Its build remains `npm run build`; Node must be 22+. No Supabase settings are needed. `NEXT_PUBLIC_SITE_URL` optionally sets the canonical site origin and otherwise defaults to `https://www.makanluxurymotors.com`.

Export alone saves files; applying changes locally and completing the existing deployment publishes them for visitors. After publishing, import the now-current `content/catalogue.json` into the editor before starting the next update. To roll back, restore a catalogue backup and its still-retained photos, run checks/build, and deploy that restoration.

## Verification and migration evidence

`npm run check` runs catalogue/image validation, ESLint, TypeScript and the Node regression tests. `npm run build` independently validates content before the production build. Browser acceptance tests live in `scripts/verify-browser.py`; they require Python Playwright (`python -m pip install playwright`, then `python -m playwright install chromium`) or `PLAYWRIGHT_CHROMIUM_EXECUTABLE` pointing to an installed Chromium. Start the editor and a production website, then run `python scripts/verify-browser.py public --base http://localhost:3200`. The editor test exports a sample ZIP and restores the real draft afterwards: `python scripts/verify-browser.py editor`.

Migration exports and checksums are in `docs/migration/`. Screenshots, the actual sample export and machine-readable test/performance results are in `docs/verification/`. See `docs/VERIFICATION.md` for the completed acceptance run.
