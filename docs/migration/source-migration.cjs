// Historical migration, executed against source commit f8ab3dd before retiring the old modules.
// Audit artifact only: use the exported JSON snapshots, not this script, on the new checkout.
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const crypto = require('node:crypto');
function load(file, extra = '', imports = {}) {
  const source = fs.readFileSync(file, 'utf8');
  const compiled = ts.transpileModule(source + extra, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  const module = { exports: {} };
  vm.runInNewContext(compiled, { exports: module.exports, module, require: n => imports[n] || {}, Map, Date, encodeURIComponent });
  return module.exports;
}
if (fs.existsSync('content/catalogue.json')) throw new Error('Migration already applied; refusing to overwrite content.');
fs.mkdirSync('docs/migration', { recursive: true });
fs.mkdirSync('content', { recursive: true });
const original = load('lib/data/showroom-stock.ts').showroomCars;
const { getLocalizedCar } = load('lib/showroom-i18n.ts');
const inventory = load('lib/data/admin-inventory.ts', '', { '@/lib/data/showroom-stock': { getShowroomCars: () => original } }).getAdminInventoryCars();
fs.writeFileSync('docs/migration/original-inventory.json', JSON.stringify({ sourceCommit: 'f8ab3dd', showroom: original, adminInventory: inventory }, null, 2) + '\n');
const copy = (file, key = 'copy') => load(file, `\nexport { ${key} };`)[key];
const normalize = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const find = (c, pattern) => c.summary.find(s => pattern.test(normalize(s.label)))?.value || '';
const textFields = ['name', 'version', 'subtitle', 'description', 'availabilityNote', 'badges', 'summary', 'featureGroups', 'sellingPoints', 'presentation', 'heroTitle', 'heroSubtitle', 'heroDescription'];
const featuredIds = [original[0].id, original[1].id, original[7].id];
const catalogue = {
  schemaVersion: 1, revision: 1, updatedAt: new Date().toISOString(),
  contact: { name: 'Makan Luxury Motors', phone: '+212 641-389898', whatsapp: '212641389898', email: 'Maka.benioukil@gmail.com', location: { fr: 'Oujda, Maroc', en: 'Oujda, Morocco', ar: 'وجدة، المغرب' }, instagram: 'https://instagram.com/makan_luxury_motors', facebook: 'https://facebook.com', mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Oujda%2C%20Morocco' },
  featuredIds,
  showroom: {
    hero: copy('components/platform/showroom-hero.tsx'), collection: copy('components/platform/home-collection.tsx'),
    experience: copy('components/platform/home-experience.tsx'), reviews: copy('components/platform/home-reviews.tsx'),
    contact: copy('components/ContactSection.tsx', 'contactCopy'),
    footer: { fr: 'Une sélection automobile de caractère. Un accompagnement personnel, à Oujda et au-delà.', en: 'Exceptional cars, carefully selected. Personal service in Oujda and beyond.', ar: 'سيارات مميزة مختارة بعناية، ومرافقة شخصية في وجدة وخارجها.' },
  },
  vehicles: original.map(c => {
    const yearValue = find(c, /annee|date modele|modele|date d.immatriculation/);
    const mileage = find(c, /kilometr/);
    const statusText = normalize(c.availabilityLabel || c.badges.join(' '));
    return {
      id: c.id, slug: c.id, brand: c.brand || '', model: c.model || '', trim: c.version || '',
      year: Number(yearValue.match(/20\d{2}/)?.[0]) || null, registrationDate: yearValue,
      mileageKm: mileage ? Number(mileage.replace(/[^0-9]/g, '')) : null,
      mileageNote: mileage, priceMAD: /\d/.test(c.price || '') ? Number(c.price.replace(/[^0-9]/g, '')) : null,
      status: /vendu/.test(statusText) ? 'sold' : /bientot|prochain/.test(statusText) ? 'coming-soon' : 'available', visibility: 'public', featured: featuredIds.includes(c.id),
      photos: c.gallery.map((path, i) => ({ path, illustrative: !!c.illustrativeImages, alt: { fr: `${c.name} — ${i + 1}`, en: `${c.name} — ${i + 1}`, ar: `${c.name} — ${i + 1}` } })),
      text: Object.fromEntries(['fr','en','ar'].map(locale => {
        const localized = getLocalizedCar(c, locale);
        return [locale, Object.fromEntries(textFields.map(k => [k, localized[k] ?? (['badges','summary','featureGroups','sellingPoints','presentation'].includes(k) ? [] : '')]))];
      })),
    };
  }),
};
fs.writeFileSync('content/catalogue.json', JSON.stringify(catalogue, null, 2) + '\n');
const manifest = original.map(c => ({ id: c.id, slug: c.id, price: c.price, gallery: c.gallery.map(p => ({ path: p, sha256: crypto.createHash('sha256').update(fs.readFileSync('public' + p)).digest('hex') })) }));
fs.writeFileSync('docs/migration/inventory-manifest.json', JSON.stringify(manifest, null, 2) + '\n');
console.log(`Exported and migrated ${catalogue.vehicles.length} vehicles, ${manifest.flatMap(c => c.gallery).length} ordered photos.`);
