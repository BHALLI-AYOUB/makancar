import fs from 'node:fs';
import path from 'node:path';
import { validateCatalogue } from '../shared/catalogue.mjs';
const filename=process.argv[2] || 'content/catalogue.json';
const catalogue=JSON.parse(fs.readFileSync(filename,'utf8'));
const errors=validateCatalogue(catalogue);
for(const v of catalogue.vehicles || [])for(const photo of v.photos || [])if(!fs.existsSync(path.join('public',photo.path)))errors.push(`${v.id}: missing image public${photo.path}`);
if(errors.length){console.error(errors.join('\n'));process.exit(1);}
console.log(`Catalogue v${catalogue.schemaVersion}, revision ${catalogue.revision}: ${catalogue.vehicles.length} vehicles validated, all photo files present.`);
