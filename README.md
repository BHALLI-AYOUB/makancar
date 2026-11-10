# Makan Luxury Motors

A multilingual automotive showroom built with Next.js 16, React 19 and Tailwind CSS. FR, EN and AR routes share one validated, versioned catalogue at `content/catalogue.json`.

```powershell
npm ci
npm run dev -- --port 3100
```

Open http://localhost:3100. Node.js 22+ is required.

The separate local editor opens with **`npm run editor`** at http://127.0.0.1:4174. It provides vehicle and gallery editing, localized homepage content, live previews, browser drafts and validated ZIP exports. It is not part of the public bundle.

To publish an exported update:

```powershell
npm run catalogue:apply -- "path/to/makan-update-r2.zip"
npm run check
npm run build
```

Commit the catalogue and new images, then push through the existing GitHub/Vercel deployment. No database or login configuration is required.

- [Editing and publishing instructions](docs/EDITOR.md)
- [Migration exports and photo checksums](docs/migration/README.md)
- [Verification, screenshots and performance comparison](docs/VERIFICATION.md)

`npm run check` runs catalogue/image validation, ESLint, TypeScript and regression tests. `npm start -- --port 3100` serves the production build. Configure `NEXT_PUBLIC_SITE_URL` only if the canonical domain differs from https://www.makanluxurymotors.com.