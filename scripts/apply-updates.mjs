import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { readZip } from '../shared/zip.mjs';
import { validateCatalogue } from '../shared/catalogue.mjs';
export function applyUpdates(filename, root=process.cwd()){return applyUpdateBuffer(fs.readFileSync(filename),root);}
export function applyUpdateBuffer(zip, root=process.cwd()){
  const absoluteRoot=path.resolve(root),contentPath=path.join(absoluteRoot,'content/catalogue.json');
  if(zip.length>250*1024*1024)throw Error('Maximum update size is 250 MB');
  const entries=readZip(zip),decode=p=>{if(!entries.has(p))throw Error(`Missing ${p}`);return JSON.parse(new TextDecoder().decode(entries.get(p)));};
  const catalogue=decode('content/catalogue.json'),manifest=decode('manifest.json'),current=JSON.parse(fs.readFileSync(contentPath,'utf8'));
  const digest=crypto.createHash('sha256').update(JSON.stringify(current)).digest('hex');
  if(manifest.format!=='makan-update-v1'||manifest.baseRevision!==current.revision||manifest.baseHash!==digest)throw Error('Stale update: this export was not based on the current catalogue. Import the latest catalogue, merge your changes, and export again.');
  if(catalogue.revision!==current.revision+1||manifest.revision!==catalogue.revision)throw Error('Invalid revision sequence');
  const errors=validateCatalogue(catalogue);if(errors.length)throw Error(errors.join('\n'));
  const referenced=new Set(catalogue.vehicles.flatMap(v=>v.photos.map(p=>`public${p.path}`))),writes=[];
  for(const [name,data] of entries){
    if(['content/catalogue.json','manifest.json','README.txt'].includes(name))continue;
    if(!referenced.has(name)||!/^public\/vehicles\/uploads\/[a-z0-9-]+\/[a-zA-Z0-9-]+\.(png|jpe?g|webp|avif)$/i.test(name))throw Error(`Unexpected update file: ${name}`);
    const ext=path.extname(name).toLowerCase(),signature=Buffer.from(data);
    const valid=ext==='.png'?signature.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])):/\.jpe?g/.test(ext)?signature[0]===255&&signature[1]===216:ext==='.webp'?signature.toString('ascii',0,4)==='RIFF'&&signature.toString('ascii',8,12)==='WEBP':signature.toString('ascii',4,8)==='ftyp';
    if(!valid)throw Error(`Invalid image bytes: ${name}`);
    const dest=path.resolve(absoluteRoot,name);if(!dest.startsWith(path.join(absoluteRoot,'public','vehicles','uploads')+path.sep))throw Error('Unsafe output path');
    if(fs.existsSync(dest)&&!fs.readFileSync(dest).equals(signature))throw Error(`Refusing to overwrite a different image: ${name}`);
    writes.push({name,dest,data});
  }
  for(const name of referenced)if(!entries.has(name)&&!fs.existsSync(path.resolve(absoluteRoot,name)))throw Error(`Missing image: ${name}`);
  if(!Array.isArray(manifest.files)||manifest.files.length!==writes.length||manifest.files.some(f=>!writes.some(w=>w.name===f.path&&w.data.length===f.bytes)))throw Error('Image manifest does not match the update');
  const backupDir=path.join(absoluteRoot,'.catalogue-backups');fs.mkdirSync(backupDir,{recursive:true});
  const backup=path.join(backupDir,`catalogue-r${current.revision}-${Date.now()}.json`);fs.copyFileSync(contentPath,backup);
  for(const {dest,data} of writes){fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,data);}
  const temp=contentPath+'.tmp';fs.writeFileSync(temp,JSON.stringify(catalogue,null,2)+'\n');fs.renameSync(temp,contentPath);
  return {revision:catalogue.revision,newImages:writes.length,backup};
}
if(import.meta.filename && process.argv[1] && path.resolve(process.argv[1])===path.resolve(import.meta.filename)){
  try{if(!process.argv[2])throw Error('Usage: npm run catalogue:apply -- path/to/makan-update.zip');console.log(applyUpdates(process.argv[2]));console.log('Update applied. Run npm run check && npm run build, then commit and deploy with the existing workflow.');}catch(error){console.error(error.message);process.exit(1);}
}
