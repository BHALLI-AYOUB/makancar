export const LOCALES = ['fr', 'en', 'ar'];
export const STATUSES = ['available', 'coming-soon', 'sold', 'unavailable'];
export const STATUS_LABELS = {
  fr: { available: 'Disponible', 'coming-soon': 'Bientôt disponible', sold: 'Vendu', unavailable: 'Indisponible' },
  en: { available: 'Available', 'coming-soon': 'Coming soon', sold: 'Sold', unavailable: 'Unavailable' },
  ar: { available: 'متوفرة', 'coming-soon': 'قريباً', sold: 'مباعة', unavailable: 'غير متوفرة' },
};
export const money = (value, locale = 'fr') => value === null
  ? ({ fr: 'Prix sur demande', en: 'Price on request', ar: 'السعر عند الطلب' }[locale])
  : new Intl.NumberFormat(locale === 'ar' ? 'ar-MA' : `${locale}-MA`, { style: 'currency', currency: 'MAD', maximumFractionDigits: 0 }).format(value);
export const safeImagePath = value => typeof value === 'string' && /^\/(?!\/)[a-zA-Z0-9_./-]+\.(?:webp|avif|png|jpe?g)$/i.test(value) && !value.includes('..');
const textShape=keys=>Object.fromEntries(keys.split(' ').map(k=>[k,'']));
const SHOWROOM_SHAPES={
  hero:textShape('place eyebrow title second accent text stock contact trust selection details previous next scroll signature illustrative'),
  collection:textShape('eyebrow title accent description all available catalog'),
  experience:{...textShape('eyebrow title accent text visit detail sourcing sourcingTitle sourcingAccent sourcingText sourcingCta sold soldLabel soldTag'),pillars:['']},
  reviews:{...textShape('eyebrow title accent intro note cta'),reviews:[textShape('name city quote image')]},
  contact:{...textShape('eyebrow title greeting'),placeholders:textShape('name email phone message'),errors:textShape('required prepared'),actions:textShape('sending send'),labels:textShape('whatsapp email phone location'),fieldLabels:textShape('name email phone message')},
  footer:'',
};
export function validateCatalogue(data) {
  const errors = [];
  const fail = (path, message) => { if (errors.length < 200) errors.push(`${path}: ${message}`); };
  const object = v => !!v && typeof v === 'object' && !Array.isArray(v);
  const string = (v, p, required = false) => { if (typeof v !== 'string' || (required && !v.trim()) || (typeof v === 'string' && v.length > 30000)) fail(p, required ? 'a non-empty text value is required' : 'must be text (maximum 30,000 characters)'); };
  const strings = (v, p) => { if (!Array.isArray(v) || v.length > 200) return fail(p, 'must be a list of at most 200 text values'); v.forEach((s,i) => string(s,`${p}[${i}]`)); };
  const integer = (v, p, max) => { if (v !== null && (!Number.isInteger(v) || v < 0 || v > max)) fail(p, `must be a whole number between 0 and ${max}, or null`); };
  if (!object(data)) return ['Catalogue must be a JSON object.'];
  if (data.schemaVersion !== 1) fail('schemaVersion', 'unsupported version; expected 1');
  if (!Number.isSafeInteger(data.revision) || data.revision < 1) fail('revision', 'must be a positive integer');
  if (typeof data.updatedAt !== 'string' || !Number.isFinite(Date.parse(data.updatedAt))) fail('updatedAt', 'must be an ISO timestamp');
  if (!object(data.contact)) fail('contact', 'is required');
  else {
    for (const key of ['name','phone','whatsapp','email','instagram','facebook','mapsUrl']) string(data.contact[key], `contact.${key}`, true);
    if (!/^\d{8,15}$/.test(data.contact.whatsapp)) fail('contact.whatsapp', 'use international digits only');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.contact.email)) fail('contact.email', 'invalid email address');
    for (const key of ['instagram','facebook','mapsUrl']) { try { if (new URL(data.contact[key]).protocol !== 'https:') throw 0; } catch { fail(`contact.${key}`, 'must be an HTTPS URL'); } }
    for (const locale of LOCALES) string(data.contact.location?.[locale], `contact.location.${locale}`, true);
  }
  const textTree = (v,p) => {
    if (typeof v === 'string') string(v,p);
    else if (Array.isArray(v)) { if(v.length>200) fail(p,'too many entries'); v.forEach((x,i)=>textTree(x,`${p}[${i}]`)); }
    else if(object(v)) { for(const [k,x] of Object.entries(v)) { if(['__proto__','constructor','prototype'].includes(k)) fail(p,'invalid key'); else textTree(x,`${p}.${k}`); } }
    else fail(p,'content must contain only text, lists, and objects');
  };
  const shape=(value,expected,p)=>{
    if(typeof expected==='string'){string(value,p,true);return;}
    if(Array.isArray(expected)){if(!Array.isArray(value))return fail(p,'must be a list');value.forEach((v,i)=>shape(v,expected[0],`${p}[${i}]`));return;}
    if(!object(value))return fail(p,'must be an object');
    for(const [key,child] of Object.entries(expected))shape(value[key],child,`${p}.${key}`);
  };
  if (!object(data.showroom)) fail('showroom','is required');
  else for (const section of ['hero','collection','experience','reviews','contact','footer']) {
    for (const locale of LOCALES) {
      const value = data.showroom[section]?.[locale];
      if(value === undefined) fail(`showroom.${section}.${locale}`,'is required'); else { textTree(value,`showroom.${section}.${locale}`);shape(value,SHOWROOM_SHAPES[section],`showroom.${section}.${locale}`); }
    }
  }
  if (!Array.isArray(data.vehicles) || data.vehicles.length > 2000) return [...errors, 'vehicles: expected a list of at most 2,000 vehicles'];
  const ids = new Set(), slugs = new Set();
  for (const [i,v] of data.vehicles.entries()) {
    const p = `vehicles[${i}]`;
    if (!object(v)) { fail(p,'must be an object'); continue; }
    for (const key of ['id','slug']) {
      if (typeof v[key] !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v[key]) || v[key].length>150) fail(`${p}.${key}`,'use lowercase letters, digits and single hyphens');
      const set = key === 'id' ? ids : slugs;
      if (set.has(v[key])) fail(`${p}.${key}`,'must be unique'); set.add(v[key]);
    }
    string(v.brand,`${p}.brand`,true); string(v.model,`${p}.model`,true);
    for(const key of ['trim','registrationDate','mileageNote']) string(v[key],`${p}.${key}`);
    integer(v.year,`${p}.year`,2100); if(v.year!==null && v.year<1900) fail(`${p}.year`,'must be 1900 or later');
    integer(v.mileageKm,`${p}.mileageKm`,10000000); integer(v.priceMAD,`${p}.priceMAD`,1000000000);
    if(!STATUSES.includes(v.status)) fail(`${p}.status`,'invalid availability');
    if(!['public','hidden'].includes(v.visibility)) fail(`${p}.visibility`,'must be public or hidden');
    if(typeof v.featured!=='boolean') fail(`${p}.featured`,'must be true or false');
    if(!Array.isArray(v.photos) || v.photos.length>100) fail(`${p}.photos`,'expected a gallery of at most 100 images');
    else {
      if(v.visibility==='public' && !v.photos.length) fail(`${p}.photos`,'a public vehicle needs at least one photo');
      const paths=new Set();
      v.photos.forEach((photo,n)=>{
        if(!object(photo)){fail(`${p}.photos[${n}]`,'invalid photo');return;}
        if(!safeImagePath(photo.path)) fail(`${p}.photos[${n}].path`,'invalid local image path');
        if(paths.has(photo.path)) fail(`${p}.photos[${n}].path`,'duplicate gallery image'); paths.add(photo.path);
        if(typeof photo.illustrative!=='boolean') fail(`${p}.photos[${n}].illustrative`,'must be true or false');
        for(const l of LOCALES) string(photo.alt?.[l],`${p}.photos[${n}].alt.${l}`,true);
      });
    }
    for(const l of LOCALES) {
      const t=v.text?.[l], q=`${p}.text.${l}`;
      if(!object(t)){fail(q,'localized fields are required');continue;}
      string(t.name,`${q}.name`,true);
      for(const k of ['version','subtitle','description','availabilityNote','heroTitle','heroSubtitle','heroDescription']) string(t[k],`${q}.${k}`);
      for(const k of ['badges','sellingPoints','presentation']) strings(t[k],`${q}.${k}`);
      if(!Array.isArray(t.summary)) fail(`${q}.summary`,'must be a specification list');
      else t.summary.forEach((s,n)=>{string(s?.label,`${q}.summary[${n}].label`,true);string(s?.value,`${q}.summary[${n}].value`,true);});
      if(!Array.isArray(t.featureGroups)) fail(`${q}.featureGroups`,'must be an equipment list');
      else t.featureGroups.forEach((g,n)=>{string(g?.title,`${q}.featureGroups[${n}].title`,true);strings(g?.items,`${q}.featureGroups[${n}].items`);});
    }
  }
  if(!Array.isArray(data.featuredIds) || new Set(data.featuredIds).size!==data.featuredIds.length) fail('featuredIds','must be an ordered list of unique vehicle IDs');
  else {
    for(const id of data.featuredIds) {
      const v=data.vehicles.find(c=>c?.id===id);
      if(!v || !v.featured || v.visibility!=='public' || ['sold','unavailable'].includes(v.status)) fail('featuredIds',`${id} must be a public, available/coming-soon featured vehicle`);
    }
    for(const v of data.vehicles) if(v?.featured && !data.featuredIds.includes(v.id)) fail('featuredIds',`${v.id} is missing from featured selection`);
  }
  return errors;
}
