import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { validateCatalogue, safeImagePath, money } from '../shared/catalogue.mjs';
import { makeZip, readZip } from '../shared/zip.mjs';
import { applyUpdates } from '../scripts/apply-updates.mjs';
const published=JSON.parse(fs.readFileSync(new URL('../content/catalogue.json',import.meta.url),'utf8'));
// Migration assertions use a frozen fixture; ordinary future price/stock edits must keep passing checks.
const current=JSON.parse(fs.readFileSync(new URL('../docs/migration/catalogue-v1.json',import.meta.url),'utf8'));
const original=JSON.parse(fs.readFileSync(new URL('../docs/migration/original-inventory.json',import.meta.url),'utf8'));
const clone=()=>structuredClone(current);
test('catalogue validates, with no missing image files',()=>{
  assert.deepEqual(validateCatalogue(published),[]);
  for(const v of published.vehicles)for(const photo of v.photos)assert.ok(fs.existsSync(new URL('../public'+photo.path,import.meta.url)),photo.path);
});
test('migration preserves all IDs, slugs, prices, French source fields and exact gallery order',()=>{
  for(const old of original.showroom){
    const v=current.vehicles.find(v=>v.id===old.id);assert.ok(v);assert.equal(v.slug,old.id);
    assert.equal(v.priceMAD,/\d/.test(old.price)?Number(old.price.replace(/[^0-9]/g,'')):null);
    assert.deepEqual(v.photos.map(p=>p.path),old.gallery);
    assert.ok(v.photos.every(p=>p.illustrative===!!old.illustrativeImages));
    for(const key of ['name','subtitle','description','availabilityNote','badges','summary','featureGroups','sellingPoints','presentation','heroTitle','heroSubtitle','heroDescription'])if(old[key]!==undefined)assert.deepEqual(v.text.fr[key],old[key],`${v.id} ${key}`);
  }
  assert.equal(current.vehicles.filter(v=>v.status==='sold').length,2);
  assert.equal(current.featuredIds.length,3);
});
test('migration photo checksums match original files',()=>{
  const manifest=JSON.parse(fs.readFileSync(new URL('../docs/migration/inventory-manifest.json',import.meta.url),'utf8'));
  for(const v of manifest)for(const p of v.gallery)assert.equal(crypto.createHash('sha256').update(fs.readFileSync(new URL('../public'+p.path,import.meta.url))).digest('hex'),p.sha256);
});
test('future versions, duplicate IDs, duplicate slugs and invalid numbers fail',()=>{
  for(const mutate of [c=>c.schemaVersion=2,c=>c.vehicles[1].id=c.vehicles[0].id,c=>c.vehicles[1].slug=c.vehicles[0].slug,c=>c.vehicles[0].priceMAD=-1,c=>c.vehicles[0].mileageKm=1.5]){const c=clone();mutate(c);assert.ok(validateCatalogue(c).length);}
});
test('malformed imports report errors instead of crashing',()=>{
  for(const value of [null,[],{}, {...clone(),vehicles:[null]}, {...clone(),showroom:{hero:{fr:{}}}}])assert.ok(validateCatalogue(value).length);
});
test('hidden and sold are distinct, featured cars must be public and eligible',()=>{
  const c=clone(),v=c.vehicles.find(v=>v.status==='sold');v.visibility='hidden';assert.deepEqual(validateCatalogue(c),[]);
  c.vehicles[0].visibility='hidden';assert.ok(validateCatalogue(c).some(e=>e.includes('featuredIds')));
});
test('price on request and zero mileage are preserved',()=>{
  const c=clone();c.vehicles[0].priceMAD=null;c.vehicles[0].mileageKm=0;assert.deepEqual(validateCatalogue(c),[]);
  assert.equal(money(null,'en'),'Price on request');assert.equal(money(null,'ar'),'السعر عند الطلب');
});
test('paths reject traversal, URLs, executable extensions and duplicate photos',()=>{
  for(const p of ['/../secret.png','//evil.test/a.jpg','https://evil.test/a.png','/photo.svg','/a\\b.png','/a.png?x=1'])assert.equal(safeImagePath(p),false,p);
  const c=clone();c.vehicles[0].photos.push(c.vehicles[0].photos[0]);assert.ok(validateCatalogue(c).some(e=>e.includes('duplicate gallery')));
});
test('ZIP round trip preserves Unicode content and binary image bytes; tampering fails',()=>{
  const entries=[{path:'content/catalogue.json',data:'{"ar":"سيارة","fr":"Élégance"}'},{path:'public/vehicles/uploads/test/a.png',data:new Uint8Array([137,80,78,71])}];
  const zip=makeZip(entries),decoded=readZip(zip);assert.equal(new TextDecoder().decode(decoded.get(entries[0].path)),entries[0].data);assert.deepEqual(decoded.get(entries[1].path),entries[1].data);
  const corrupt=zip.slice();corrupt[60]^=1;assert.throws(()=>readZip(corrupt));
});
test('apply command checks the base hash, writes valid updates, preserves a backup and rejects stale replay',()=>{
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'makan-catalogue-test-'));
  try{
    fs.mkdirSync(path.join(root,'content'));fs.writeFileSync(path.join(root,'content/catalogue.json'),JSON.stringify(current));
    // Supply all existing images in the fixture without making a duplicate repository.
    for(const v of current.vehicles)for(const p of v.photos){const dest=path.join(root,'public',p.path);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.copyFileSync(new URL('../public'+p.path,import.meta.url),dest);}
    const update=clone();update.revision++;update.vehicles[0].priceMAD=399000;
    const manifest={format:'makan-update-v1',baseRevision:current.revision,baseHash:crypto.createHash('sha256').update(JSON.stringify(current)).digest('hex'),revision:update.revision,files:[]};
    const filename=path.join(root,'update.zip');fs.writeFileSync(filename,makeZip([{path:'content/catalogue.json',data:JSON.stringify(update)},{path:'manifest.json',data:JSON.stringify(manifest)}]));
    const result=applyUpdates(filename,root);assert.equal(result.revision,current.revision+1);assert.ok(fs.existsSync(result.backup));assert.equal(JSON.parse(fs.readFileSync(path.join(root,'content/catalogue.json'))).vehicles[0].priceMAD,399000);
    assert.throws(()=>applyUpdates(filename,root),/Stale update/);
  }finally{
    const resolved=path.resolve(root);assert.ok(resolved.startsWith(path.resolve(os.tmpdir())+path.sep+'makan-catalogue-test-'));fs.rmSync(resolved,{recursive:true,force:true});
  }
});
