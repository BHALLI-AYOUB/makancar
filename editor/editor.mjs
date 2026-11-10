import { validateCatalogue, money, LOCALES, STATUSES } from '../shared/catalogue.mjs';
import { makeZip, readZip } from '../shared/zip.mjs';
const $=s=>document.querySelector(s),clone=v=>structuredClone(v),esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let catalogue,disk,baseHash,baseRevision,originalIds=new Set(),assets=new Map(),urls=new Map(),section='vehicles',selected=null,locale='fr',dirty=false,savedAt=null,search='',filter='all',brandFilter='all',toastTimer,stale=false;
const hash=async v=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(JSON.stringify(v))))).map(b=>b.toString(16).padStart(2,'0')).join('');
const src=path=>urls.get(path)||`public${path}`;
function notify(message){$('#toast').textContent=message;$('#toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),6000);}
function changed(){dirty=true;status();preview();}
function getPath(path){return path.split('.').reduce((v,k)=>v?.[k],catalogue);}
function put(path,value){const keys=path.split('.');if(keys.some(k=>['__proto__','constructor','prototype'].includes(k)))throw Error('Invalid field');const last=keys.pop();keys.reduce((o,k)=>o[k],catalogue)[last]=value;}
const current=()=>catalogue.vehicles.find(v=>v.id===selected);
function syncFeatured(){
  for(const v of catalogue.vehicles)if(v.visibility!=='public'||['sold','unavailable'].includes(v.status))v.featured=false;
  catalogue.featuredIds=catalogue.featuredIds.filter(id=>catalogue.vehicles.some(v=>v.id===id&&v.featured));
  for(const v of catalogue.vehicles)if(v.featured&&!catalogue.featuredIds.includes(v.id))catalogue.featuredIds.push(v.id);
}
function status(){
  const errors=validateCatalogue(catalogue);
  $('#draft-dot').classList.toggle('dirty',dirty);
  $('#draft-status').textContent=dirty?'Unsaved changes · click Save to site to publish':savedAt?`Draft saved · ${new Date(savedAt).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}`:'Saved · the site shows this catalogue';
  $('#validation-summary').textContent=stale?'The published catalogue changed. Import the latest catalogue before exporting.':errors.length?`${errors.length} validation ${errors.length===1?'issue':'issues'} · review before export`:'All fields valid · export is ready';
  $('#revision').textContent=`Catalogue v1 · revision ${baseRevision}`;
  $('#stock-count').textContent=catalogue.vehicles.length;
  $('#export-button').disabled=stale;$('#publish-button').disabled=stale;
  const panel=$('#validation-panel');if(panel){panel.hidden=!errors.length;panel.innerHTML=`<strong>Review before export</strong><ul>${errors.slice(0,12).map(e=>`<li>${esc(e)}</li>`).join('')}</ul>`;}
}
function openDB(){return new Promise((resolve,reject)=>{const request=indexedDB.open('makan-static-editor-v1',1);request.onupgradeneeded=()=>request.result.createObjectStore('workspace');request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error);});}
async function readDraft(){const db=await openDB();try{return await new Promise((resolve,reject)=>{const r=db.transaction('workspace').objectStore('workspace').get('draft');r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});}finally{db.close();}}
async function saveDraft(){
  try{
    const db=await openDB(),time=new Date().toISOString();
    await new Promise((resolve,reject)=>{const tx=db.transaction('workspace','readwrite');tx.objectStore('workspace').put({catalogue,baseHash,baseRevision,originalIds:[...originalIds],assets:[...assets],savedAt:time},'draft');tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error);});
    db.close();dirty=false;savedAt=time;status();notify('Draft and new photos saved in this browser.');return true;
  }catch(error){notify(`Draft was not saved: ${error.message}. Export a backup before closing.`);return false;}
}
function setAssets(entries){for(const url of urls.values())URL.revokeObjectURL(url);assets=new Map(entries);urls=new Map([...assets].map(([path,blob])=>[path,URL.createObjectURL(blob)]));}
function field(label,path,{type='text',wide=false,readonly=false,rows=3,value,format}={}){
  const currentValue=value??getPath(path)??'';
  return `<label class="field ${wide?'wide':''}">${esc(label)}${type==='textarea'?`<textarea data-path="${esc(path)}" ${format?`data-format="${format}"`:''} rows="${rows}" ${locale==='ar'&&path.includes('.text.')?'dir="rtl"':''}>${esc(currentValue)}</textarea>`:`<input type="${type}" data-path="${esc(path)}" value="${esc(currentValue)}" ${readonly?'readonly':''} ${type==='number'?'min="0" step="1"':''}>`}</label>`;
}
function selectField(label,path,choices){return `<label class="field">${label}<select aria-label="${esc(label)}" data-path="${path}">${choices.map(([v,label])=>`<option value="${v}" ${getPath(path)===v?'selected':''}>${esc(label)}</option>`).join('')}</select></label>`;}
const check=(label,path)=>`<label class="check-field"><input type="checkbox" data-path="${path}" ${getPath(path)?'checked':''}>${esc(label)}</label>`;
const tabs=()=>`<div class="locale-tabs" role="group" aria-label="Content language">${LOCALES.map(l=>`<button data-locale="${l}" aria-pressed="${l===locale}">${l.toUpperCase()} ${l==='fr'?'· Français':l==='en'?'· English':'· العربية'}</button>`).join('')}</div>`;
function pageHeading(title,description,action=''){return `<div class="page-heading"><div><p class="eyebrow">YOUR SHOWROOM, CURATED</p><h1>${title}</h1><p>${description}</p></div>${action}</div>`;}
function inventory(){
  const vehicles=catalogue.vehicles.filter(v=>(!search||[v.brand,v.model,v.trim,v.text.fr.name,v.id].join(' ').toLowerCase().includes(search.toLowerCase()))&&(filter==='all'||(filter==='featured'?v.featured:filter==='hidden'?v.visibility==='hidden':v.status===filter))&&(brandFilter==='all'||v.brand===brandFilter));
  const stats=[['Total vehicles',catalogue.vehicles.length],['Available',catalogue.vehicles.filter(v=>v.status==='available'&&v.visibility==='public').length],['Sold',catalogue.vehicles.filter(v=>v.status==='sold').length],['Hidden',catalogue.vehicles.filter(v=>v.visibility==='hidden').length]];
  return pageHeading('The <em>inventory.</em>','A considered collection. Every detail in your hands.','<button class="button dark" data-action="add">＋ Add vehicle</button>')+`<div class="summary-grid">${stats.map(([label,value])=>`<div class="summary-card"><span>${label}</span><strong>${String(value).padStart(2,'0')}</strong></div>`).join('')}</div><div class="panel"><div class="panel-toolbar"><input type="search" id="inventory-search" aria-label="Search inventory" placeholder="Search make, model or vehicle…" value="${esc(search)}"><select id="inventory-filter" aria-label="Filter availability"><option value="all">All vehicles</option>${[...STATUSES,'hidden','featured'].map(s=>`<option value="${s}" ${filter===s?'selected':''}>${s==='coming-soon'?'Coming soon':s[0].toUpperCase()+s.slice(1)}</option>`).join('')}</select><select id="brand-filter" aria-label="Filter brand"><option value="all">All brands</option>${[...new Set(catalogue.vehicles.map(v=>v.brand))].sort().map(b=>`<option ${brandFilter===b?'selected':''}>${esc(b)}</option>`).join('')}</select></div><div class="table-scroll"><table><thead><tr><th>VEHICLE</th><th>PRICE / MAD</th><th>AVAILABILITY</th><th>MILEAGE</th><th>VISIBILITY</th><th>ORDER / EDIT</th></tr></thead><tbody>${vehicles.map(v=>`<tr data-vehicle-id="${v.id}"><td><div class="vehicle-cell">${v.photos[0]?`<img src="${esc(src(v.photos[0].path))}" alt="">`:'<span>▧</span>'}<div><strong>${esc(v.text.fr.name)} ${v.featured?'<span class="star" aria-label="Featured">✦</span>':''}</strong><small>${esc(v.trim)} · ${v.year??'—'}</small></div></div></td><td><strong>${esc(money(v.priceMAD,'fr'))}</strong></td><td><span class="pill ${v.status}">${{'available':'Available','coming-soon':'Coming soon',sold:'Sold',unavailable:'Unavailable'}[v.status]}</span></td><td>${v.mileageKm===null?'—':v.mileageKm.toLocaleString()+' km'}</td><td><span class="${v.visibility==='hidden'?'pill hidden':''}">${v.visibility==='hidden'?'Hidden':'Public'}</span></td><td><div class="row-actions"><button class="icon-button" data-action="up" data-id="${v.id}" aria-label="Move ${esc(v.text.fr.name)} up" ${catalogue.vehicles.indexOf(v)===0?'disabled':''}>↑</button><button class="icon-button" data-action="down" data-id="${v.id}" aria-label="Move ${esc(v.text.fr.name)} down" ${catalogue.vehicles.indexOf(v)===catalogue.vehicles.length-1?'disabled':''}>↓</button><button class="button secondary" data-action="edit" data-id="${v.id}">Edit ↗</button></div></td></tr>`).join('')}</tbody></table>${!vehicles.length?'<div class="empty">No vehicles match these filters.</div>':''}</div><div class="panel-foot">${vehicles.length} vehicles · Order matches the public catalogue. Sold vehicles remain visible; hidden vehicles are excluded.</div></div>`;
}
function editVehicle(){
  const v=current();if(!v)return inventory();const i=catalogue.vehicles.indexOf(v),p=`vehicles.${i}`,t=`${p}.text.${locale}`;
  const spec=v.text[locale].summary.map(s=>`${s.label} | ${s.value}`).join('\n'),equipment=v.text[locale].featureGroups.map(g=>`# ${g.title}\n${g.items.join('\n')}`).join('\n\n');
  return `<button class="back-button" data-action="back">← Back to inventory</button>`+pageHeading('Every <em>detail.</em>',`Editing ${esc(v.text.fr.name)}`)+`<div class="edit-layout"><div class="edit-form"><section class="form-section"><h2>01 / Vehicle essentials</h2><div class="form-grid">${field('Vehicle ID · permanent',`${p}.id`,{readonly:true})}${field('URL slug · preserve existing links',`${p}.slug`,{readonly:originalIds.has(v.id)})}${field('Brand',`${p}.brand`)}${field('Model',`${p}.model`)}${field('Trim / version',`${p}.trim`)}${field('Year',`${p}.year`,{type:'number'})}${field('Registration date · keep the original format',`${p}.registrationDate`)}${field('Mileage · km',`${p}.mileageKm`,{type:'number'})}${field('Original mileage note',`${p}.mileageNote`)}${field('Sale price · MAD',`${p}.priceMAD`,{type:'number'})}<label class="check-field"><input type="checkbox" id="price-on-request" ${v.priceMAD===null?'checked':''}>Price on request</label></div></section><section class="form-section"><h2>02 / Availability & presentation</h2><div class="form-grid">${selectField('Availability',`${p}.status`,[['available','Available'],['coming-soon','Coming soon'],['sold','Sold'],['unavailable','Unavailable']])}${selectField('Visibility',`${p}.visibility`,[['public','Public · visible to visitors'],['hidden','Hidden · excluded from the website']])}</div>${check('Featured in the homepage hero',`${p}.featured`)}<p class="hint availability-hint">Sold and hidden are different. Featuring requires a public, available or coming-soon vehicle.</p></section><section class="form-section"><h2>03 / Localized presentation</h2>${tabs()}<div class="form-grid">${field('Display name',`${t}.name`,{wide:true})}${field('Subtitle',`${t}.subtitle`,{wide:true})}${field('Description',`${t}.description`,{type:'textarea',wide:true,rows:5})}${field('Availability note',`${t}.availabilityNote`,{type:'textarea',wide:true})}${field('Highlights · one per line',`${t}.sellingPoints`,{type:'textarea',wide:true,value:v.text[locale].sellingPoints.join('\n'),format:'lines'})}${field('Badges · one per line',`${t}.badges`,{type:'textarea',wide:true,value:v.text[locale].badges.join('\n'),format:'lines'})}${field('Specifications · label | value, one per line',`${t}.summary`,{type:'textarea',wide:true,rows:7,value:spec,format:'specs'})}${field('Equipment · # Group title, then one item per line',`${t}.featureGroups`,{type:'textarea',wide:true,rows:9,value:equipment,format:'equipment'})}${field('Additional presentation · one paragraph per line',`${t}.presentation`,{type:'textarea',wide:true,value:v.text[locale].presentation.join('\n'),format:'lines'})}${field('Legacy hero title',`${t}.heroTitle`)}${field('Legacy hero subtitle',`${t}.heroSubtitle`)}${field('Legacy hero description',`${t}.heroDescription`,{type:'textarea',wide:true})}</div></section><button class="button dark" data-action="open-photos">Manage gallery →</button></div><aside class="preview-column"><p class="preview-kicker">LIVE VEHICLE CARD · ${locale.toUpperCase()}</p><div id="live-preview"></div><p class="preview-note">The first gallery photo is the cover. Price and availability are shared with the public catalogue and detail page.</p><div id="validation-panel" class="validation-panel" hidden></div></aside></div>`;
}
function preview(){
  const target=$('#live-preview'),v=current();if(!target||!v)return;const t=v.text[locale],photo=v.photos[0];
  const labels={fr:{sold:'Vendu',available:'Disponible','coming-soon':'Bientôt disponible',unavailable:'Indisponible',illustrative:'Visuel d’illustration',details:'Voir le véhicule'},en:{sold:'Sold',available:'Available','coming-soon':'Coming soon',unavailable:'Unavailable',illustrative:'Illustrative image',details:'View details'},ar:{sold:'مباعة',available:'متوفرة','coming-soon':'قريباً',unavailable:'غير متوفرة',illustrative:'صورة توضيحية',details:'التفاصيل'}}[locale];
  target.innerHTML=`<article class="preview-card" dir="${locale==='ar'?'rtl':'ltr'}"><div class="preview-photo">${photo?`<img src="${esc(src(photo.path))}" alt="${esc(photo.alt[locale])}">`:''}${photo?.illustrative?`<span class="illustration">${labels.illustrative}</span>`:''}</div><div class="preview-body"><small>${esc(v.brand)} / ${labels[v.status]}${v.visibility==='hidden'?' · Hidden':''}</small><h3>${esc(t.name)}</h3><p class="trim">${esc(v.trim)}</p><div class="preview-specs"><span>${v.year??'—'}</span><span>${v.mileageKm===null?'—':v.mileageKm.toLocaleString()+' km'}</span></div><div class="preview-price"><strong>${esc(money(v.priceMAD,locale))}</strong><span>${labels.details} ↗</span></div></div></article>`;
}
function photoPage(){
  if(!current())selected=catalogue.vehicles[0]?.id;const v=current();
  return pageHeading('The <em>gallery.</em>','The right perspective. In the right order.')+`<div class="panel-toolbar photo-select"><select id="photo-vehicle" aria-label="Select vehicle">${catalogue.vehicles.map(v=>`<option value="${v.id}" ${selected===v.id?'selected':''}>${esc(v.text.fr.name)}</option>`).join('')}</select></div>`+(!v?'<p class="empty">Add a vehicle first.</p>':`<div class="edit-layout"><section><div class="photo-upload"><label for="photo-files">Add to the story.</label><p>JPG, PNG, WebP or AVIF · up to 20 MB each. New files are included in your export.</p><input id="photo-files" type="file" multiple accept="image/jpeg,image/png,image/webp,image/avif"></div>${tabs()}<div class="photo-grid">${v.photos.map((photo,n)=>{const i=catalogue.vehicles.indexOf(v),path=`vehicles.${i}.photos.${n}`;return `<article class="photo-tile"><img src="${esc(src(photo.path))}" alt="${esc(photo.alt[locale])}"><div class="row-actions"><span class="cover-tag">${n===0?'✦ COVER':`PHOTO ${n+1}`}</span><div><button class="icon-button" data-action="photo-cover" data-index="${n}" aria-label="Set photo ${n+1} as cover" ${n===0?'disabled':''}>✦</button> <button class="icon-button" data-action="photo-up" data-index="${n}" aria-label="Move photo ${n+1} up" ${n===0?'disabled':''}>↑</button> <button class="icon-button" data-action="photo-down" data-index="${n}" aria-label="Move photo ${n+1} down" ${n===v.photos.length-1?'disabled':''}>↓</button> <button class="icon-button" data-action="photo-remove" data-index="${n}" aria-label="Remove photo ${n+1}">×</button></div></div>${field(`Alternative text · ${locale.toUpperCase()}`,`${path}.alt.${locale}`)}${check('Illustrative image · show a public label',`${path}.illustrative`)}<p class="path-note">public${esc(photo.path)}</p></article>`;}).join('')}</div></section><aside class="preview-column"><p class="preview-kicker">LIVE COVER PREVIEW</p><div id="live-preview"></div><div id="validation-panel" class="validation-panel" hidden></div></aside></div>`);
}
function treeFields(value,path,label){
  if(typeof value==='string')return field(label,path,{type:value.length>85?'textarea':'text',wide:true});
  if(Array.isArray(value)&&value.every(x=>typeof x==='string'))return field(label+' · one item per line',path,{type:'textarea',wide:true,value:value.join('\n'),format:'lines'});
  return Object.entries(value).map(([key,v])=>treeFields(v,`${path}.${key}`,`${label} / ${key}`)).join('');
}
function showroomPage(){
  return pageHeading('The <em>Makan story.</em>','Your words, your selection, your way of welcoming visitors.')+tabs()+`<div class="edit-layout"><div class="content-sections"><section class="form-section"><h2>Featured selection</h2><p class="hint">Use the vehicle form to feature a car. Reorder the hero selection here.</p>${catalogue.featuredIds.map((id,n)=>`<div class="featured-row"><span>${n+1}. ${esc(catalogue.vehicles.find(v=>v.id===id)?.text[locale].name)}</span><button class="icon-button" data-action="featured-up" data-index="${n}" aria-label="Move featured vehicle ${n+1} up" ${n===0?'disabled':''}>↑</button><button class="icon-button" data-action="featured-down" data-index="${n}" aria-label="Move featured vehicle ${n+1} down" ${n===catalogue.featuredIds.length-1?'disabled':''}>↓</button></div>`).join('')}</section><details open><summary>Contact details</summary><div class="form-grid">${['name','phone','whatsapp','email','instagram','facebook','mapsUrl'].map(k=>field(k,`contact.${k}`,{wide:true})).join('')}${field(`Showroom location · ${locale.toUpperCase()}`,`contact.location.${locale}`,{wide:true})}</div></details>${Object.entries(catalogue.showroom).map(([key,value])=>`<details><summary>${key[0].toUpperCase()+key.slice(1)} · ${locale.toUpperCase()}</summary><div class="form-grid">${treeFields(value[locale],`showroom.${key}.${locale}`,key)}</div></details>`).join('')}</div><aside class="preview-column"><p class="preview-kicker">THE PUBLISHING ROUTINE</p><section class="form-section"><h2>From draft to showroom.</h2><p class="preview-note">01 — Edit and preview your changes.<br>02 — Save a draft in this browser.<br>03 — Export the validated update ZIP.<br>04 — Apply it in your project and deploy.</p><a class="button secondary" href="guide" target="_blank">Read publishing guide ↗</a></section><div id="validation-panel" class="validation-panel" hidden></div></aside></div>`;
}
function render(){
  $('#app').innerHTML=(stale?'<p class="stale-banner">A newer catalogue is on disk. Your draft is preserved. Import the latest catalogue before exporting an update.</p>':'')+(section==='showroom'?showroomPage():section==='photos'?photoPage():selected?editVehicle():inventory());
  $('#app').setAttribute('aria-busy','false');$('#section-label').textContent=section==='showroom'?'Showroom content':section==='photos'?'Photos':'Vehicles';
  document.querySelectorAll('[data-section]').forEach(b=>{if(b.dataset.section===section)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');});status();preview();
}
function addVehicle(){
  const id=`vehicle-${Date.now()}`;
  const text=Object.fromEntries(LOCALES.map(l=>[l,{name:{fr:'Nouveau véhicule',en:'New vehicle',ar:'سيارة جديدة'}[l],version:'',subtitle:'',description:'',availabilityNote:'',badges:[],summary:[],featureGroups:[],sellingPoints:[],presentation:[],heroTitle:'',heroSubtitle:'',heroDescription:''}]));
  catalogue.vehicles.push({id,slug:id,brand:'',model:'',trim:'',year:null,registrationDate:'',mileageKm:null,mileageNote:'',priceMAD:null,status:'available',visibility:'hidden',featured:false,photos:[],text});selected=id;dirty=true;render();window.scrollTo({top:0});
}
async function addPhotos(files){
  const v=current();if(!v)return;
  try{
    if(v.photos.length+files.length>100)throw Error('Maximum 100 gallery photos.');
    const pending=[];
    for(const file of files){
      if(file.size>20*1024*1024)throw Error(`${file.name}: maximum file size is 20 MB`);
      const ext=file.name.split('.').pop().toLowerCase();if(!['jpg','jpeg','png','webp','avif'].includes(ext))throw Error(`${file.name}: unsupported image type`);
      const bitmap=await createImageBitmap(file);bitmap.close();
      const path=`/vehicles/uploads/${v.id}/${crypto.randomUUID()}.${ext}`;
      pending.push({path,file,photo:{path,illustrative:false,alt:Object.fromEntries(LOCALES.map(l=>[l,`${v.text[l].name} — ${v.photos.length+pending.length+1}`]))}});
    }
    for(const {path,file,photo} of pending){assets.set(path,file);urls.set(path,URL.createObjectURL(file));v.photos.push(photo);}
    changed();render();notify(`${pending.length} photo${pending.length===1?'':'s'} added. Save your draft to keep them after closing.`);
  }catch(error){notify(`Photos were not added: ${error.message}`);}
}
async function buildUpdate(){
  if(stale)throw Error('Import the latest published catalogue first.');
  const out=clone(catalogue);out.revision=baseRevision+1;out.updatedAt=new Date().toISOString();
  const errors=validateCatalogue(out);if(errors.length){status();throw Error(errors[0]);}
  const referenced=new Set(out.vehicles.flatMap(v=>v.photos.map(p=>p.path))),entries=[],files=[];
  for(const path of referenced){
    if(assets.has(path)){const data=new Uint8Array(await assets.get(path).arrayBuffer());entries.push({path:`public${path}`,data});files.push({path:`public${path}`,bytes:data.length});}
    else if(!(await fetch(`public${path}`,{method:'HEAD'})).ok)throw Error(`Missing photo: public${path}. Add the image before exporting.`);
  }
  entries.unshift({path:'content/catalogue.json',data:JSON.stringify(out,null,2)+'\n'});
  entries.push({path:'manifest.json',data:JSON.stringify({format:'makan-update-v1',baseRevision,baseHash,revision:out.revision,files},null,2)});
  entries.push({path:'README.txt',data:'Makan showroom update\n\nRun: npm run catalogue:apply -- path/to/this.zip\nThen: npm run check && npm run build\nCommit content/catalogue.json and any new public/vehicles files. Deploy with the existing Git/Vercel workflow.\nThis ZIP is an export, not a deployment.\n'});
  return {out,files,zip:makeZip(entries)};
}
async function exportUpdates(){
  try{
    const {out,files,zip}=await buildUpdate();
    const blob=new Blob([zip],{type:'application/zip'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`makan-update-r${out.revision}.zip`;a.click();setTimeout(()=>URL.revokeObjectURL(url),30000);
    await saveDraft();notify(`Revision ${out.revision} exported with ${files.length} new image files. Apply the ZIP and deploy to publish.`);
  }catch(error){notify(`Export blocked: ${error.message}`);}
}
async function clearDraft(){const db=await openDB();try{await new Promise((resolve,reject)=>{const tx=db.transaction('workspace','readwrite');tx.objectStore('workspace').delete('draft');tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);});}finally{db.close();}}
async function publishUpdates(){
  const button=$('#publish-button');button.disabled=true;
  try{
    const {zip}=await buildUpdate();
    const response=await fetch('save',{method:'POST',headers:{'Content-Type':'application/zip'},body:new Blob([zip],{type:'application/zip'})});
    const result=await response.json().catch(()=>({error:`saving is not available here (HTTP ${response.status}). Open localhost:3100/admin.`}));
    if(!response.ok)throw Error(result.error||`HTTP ${response.status}`);
    disk=await(await fetch('catalogue',{cache:'no-store'})).json();
    catalogue=clone(disk);baseRevision=disk.revision;baseHash=await hash(disk);originalIds=new Set(disk.vehicles.map(v=>v.id));setAssets([]);
    dirty=false;savedAt=null;stale=false;try{await clearDraft();}catch{}render();
    notify(`Saved to the site · revision ${result.revision} is live${result.newImages?` with ${result.newImages} new photo(s)`:''}.`);
  }catch(error){notify(`Not saved: ${error.message}`);}
  finally{button.disabled=stale;}
}
async function importCatalogue(file){
  if(!file)return;
  try{
    if(dirty&&!confirm('Replace unsaved changes with this import? Save or export first if you need a backup.'))return;
    if(file.size>250*1024*1024)throw Error('Maximum import size is 250 MB.');
    let imported,importedAssets=[],manifest;
    if(file.name.toLowerCase().endsWith('.zip')){
      const entries=readZip(new Uint8Array(await file.arrayBuffer()));
      if(!entries.has('content/catalogue.json'))throw Error('The ZIP has no content/catalogue.json');
      imported=JSON.parse(new TextDecoder().decode(entries.get('content/catalogue.json')));
      if(entries.has('manifest.json'))manifest=JSON.parse(new TextDecoder().decode(entries.get('manifest.json')));
      for(const v of imported.vehicles||[])for(const photo of v.photos||[])if(entries.has(`public${photo.path}`))importedAssets.push([photo.path,new Blob([entries.get(`public${photo.path}`)])]);
    }else imported=JSON.parse(await file.text());
    const errors=validateCatalogue(imported);if(errors.length)throw Error(errors[0]);
    catalogue=imported;baseRevision=manifest?.baseRevision??imported.revision;baseHash=manifest?.baseHash??await hash(imported);originalIds=new Set(imported.vehicles.map(v=>v.id));setAssets(importedAssets);selected=null;dirty=true;savedAt=null;stale=baseRevision!==disk.revision||baseHash!==await hash(disk);render();notify('Catalogue imported. Review your changes, then save a draft.');
  }catch(error){notify(`Import failed; current draft kept: ${error.message}`);}
}
document.addEventListener('click',event=>{
  const button=event.target.closest('button');if(!button)return;
  if(button.dataset.section){section=button.dataset.section;selected=section==='photos'?selected:null;render();return;}
  if(button.dataset.locale){locale=button.dataset.locale;render();return;}
  const action=button.dataset.action;if(!action)return;const n=Number(button.dataset.index),v=current();
  if(action==='add')return addVehicle();
  if(action==='back'){selected=null;section='vehicles';render();return;}
  if(action==='edit'){selected=button.dataset.id;section='vehicles';render();window.scrollTo({top:0});return;}
  if(action==='open-photos'){section='photos';render();window.scrollTo({top:0});return;}
  if(action==='up'||action==='down'){const i=catalogue.vehicles.findIndex(c=>c.id===button.dataset.id),j=i+(action==='up'?-1:1);if(j>=0&&j<catalogue.vehicles.length)[catalogue.vehicles[i],catalogue.vehicles[j]]=[catalogue.vehicles[j],catalogue.vehicles[i]];}
  if(action.startsWith('photo-')&&v){
    if(action==='photo-remove')v.photos.splice(n,1);
    if(action==='photo-cover')v.photos.unshift(...v.photos.splice(n,1));
    if(action==='photo-up'&&n>0)[v.photos[n-1],v.photos[n]]=[v.photos[n],v.photos[n-1]];
    if(action==='photo-down'&&n<v.photos.length-1)[v.photos[n+1],v.photos[n]]=[v.photos[n],v.photos[n+1]];
  }
  if(action.startsWith('featured-')){const j=n+(action==='featured-up'?-1:1);if(j>=0&&j<catalogue.featuredIds.length)[catalogue.featuredIds[n],catalogue.featuredIds[j]]=[catalogue.featuredIds[j],catalogue.featuredIds[n]];}
  changed();render();
});
document.addEventListener('input',event=>{
  const el=event.target,path=el.dataset.path;if(!path||el.readOnly)return;
  let value=el.type==='checkbox'?el.checked:el.type==='number'?(el.value===''?null:Number(el.value)):el.value;
  if(el.dataset.format==='lines')value=el.value.split('\n').map(s=>s.trim()).filter(Boolean);
  if(el.dataset.format==='specs')value=el.value.split('\n').filter(s=>s.trim()).map(s=>{const i=s.indexOf('|');return{label:(i<0?s:s.slice(0,i)).trim(),value:(i<0?'':s.slice(i+1)).trim()};});
  if(el.dataset.format==='equipment'){
    value=[];for(const line of el.value.split('\n').map(s=>s.trim()).filter(Boolean)){if(line.startsWith('#'))value.push({title:line.replace(/^#+\s*/,''),items:[]});else{if(!value.length)value.push({title:'Equipment',items:[]});value.at(-1).items.push(line);}}
  }
  put(path,value);if(path.endsWith('.priceMAD')&&$('#price-on-request'))$('#price-on-request').checked=value===null;syncFeatured();changed();
});
document.addEventListener('change',event=>{
  const el=event.target;
  if(el.id==='inventory-filter'){filter=el.value;render();}
  if(el.id==='brand-filter'){brandFilter=el.value;render();}
  if(el.id==='photo-vehicle'){selected=el.value;render();}
  if(el.id==='photo-files')addPhotos([...el.files]);
  if(el.id==='import-file'){importCatalogue(el.files[0]);el.value='';}
  if(el.id==='price-on-request'){const v=current();v.priceMAD=el.checked?null:0;changed();render();}
  if(el.dataset.path&&(el.type==='checkbox'||el.tagName==='SELECT'))render();
});
document.addEventListener('input',event=>{if(event.target.id==='inventory-search'){search=event.target.value;const start=event.target.selectionStart;render();$('#inventory-search').focus();$('#inventory-search').setSelectionRange(start,start);}});
$('#import-button').onclick=()=>$('#import-file').click();$('#save-button').onclick=saveDraft;$('#export-button').onclick=exportUpdates;$('#publish-button').onclick=publishUpdates;
window.addEventListener('beforeunload',event=>{if(dirty){event.preventDefault();event.returnValue='';}});
try{
  disk=await(await fetch('catalogue')).json();const errors=validateCatalogue(disk);if(errors.length)throw Error(errors[0]);
  catalogue=clone(disk);baseRevision=disk.revision;baseHash=await hash(disk);originalIds=new Set(disk.vehicles.map(v=>v.id));
  try{const saved=await readDraft();if(saved){catalogue=saved.catalogue;baseRevision=saved.baseRevision;baseHash=saved.baseHash;originalIds=new Set(saved.originalIds);savedAt=saved.savedAt;setAssets(saved.assets);stale=baseRevision!==disk.revision||baseHash!==await hash(disk);notify('Your saved draft and photos have been restored.');}}catch(error){notify(`Browser storage unavailable: ${error.message}. Export before closing.`);}
  render();
}catch(error){$('#app').textContent=`Unable to open the catalogue: ${error.message}`;$('#export-button').disabled=true;$('#save-button').disabled=true;$('#publish-button').disabled=true;}
