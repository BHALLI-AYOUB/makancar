import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawn } from 'node:child_process';
const root=path.resolve(import.meta.dirname,'..'),port=Number(process.env.EDITOR_PORT || 4174);
const mime={'.html':'text/html; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.avif':'image/avif','.md':'text/plain; charset=utf-8'};
const securityHeaders={'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'same-origin','Content-Security-Policy':"default-src 'self'; img-src 'self' blob: data:; style-src 'self'; script-src 'self'; connect-src 'self'; form-action 'self'; frame-ancestors 'none'"};

// ---- Admin authentication -------------------------------------------------
// Default admin: makan@gmail.com. The password is stored only as a scrypt hash.
// Override with EDITOR_ADMIN_EMAIL and EDITOR_ADMIN_PASSWORD environment variables.
const adminEmail=(process.env.EDITOR_ADMIN_EMAIL||'makan@gmail.com').trim().toLowerCase();
const defaultPasswordHash='fc96d1ab09927206e56111ef3f13d132:a13b84eb799fa0a7c76a229d93204ed5f861334e5f88b0dc038d420092767508';
const hashPassword=(password,saltHex)=>crypto.scryptSync(password,Buffer.from(saltHex,'hex'),32);
const [salt,storedHash]=process.env.EDITOR_ADMIN_PASSWORD
  ?(()=>{const s=crypto.randomBytes(16).toString('hex');return [s,hashPassword(process.env.EDITOR_ADMIN_PASSWORD,s)];})()
  :[defaultPasswordHash.split(':')[0],Buffer.from(defaultPasswordHash.split(':')[1],'hex')];
const sessionCookie='makan_admin',sessionTtl=12*60*60*1000;
const sessions=new Map();
let failedAttempts=0,lockedUntil=0;

function checkCredentials(email,password){
  const emailOk=crypto.timingSafeEqual(crypto.createHash('sha256').update(String(email).trim().toLowerCase()).digest(),crypto.createHash('sha256').update(adminEmail).digest());
  const passwordOk=crypto.timingSafeEqual(hashPassword(String(password),salt),storedHash);
  return emailOk && passwordOk;
}
function readSession(req){
  const cookies=Object.fromEntries((req.headers.cookie||'').split(';').map(c=>c.trim().split('=')).filter(([k,v])=>k&&v));
  const token=cookies[sessionCookie];if(!token)return null;
  const expires=sessions.get(token);
  if(!expires||expires<Date.now()){sessions.delete(token);return null;}
  return token;
}
function readBody(req){
  return new Promise((resolve,reject)=>{let body='';req.setEncoding('utf8');
    req.on('data',chunk=>{body+=chunk;if(body.length>4096){reject(Error('Body too large'));req.destroy();}});
    req.on('end',()=>resolve(new URLSearchParams(body)));req.on('error',reject);});
}
function sameOrigin(req){
  const origin=req.headers.origin;if(!origin||origin==='null')return !origin;
  try{const u=new URL(origin);return ['127.0.0.1','localhost'].includes(u.hostname)&&u.host===req.headers.host;}catch{return false;}
}
function redirect(res,location,extra={}){res.writeHead(303,{...securityHeaders,Location:location,...extra});res.end();}
async function sendLogin(res,error=''){
  let html=await fs.readFile(path.join(root,'editor/login.html'),'utf8');
  html=html.replace('<!--ERROR-->',error?`<p class="login-error" role="alert">${error}</p>`:'');
  res.writeHead(error?401:200,{...securityHeaders,'Content-Type':mime['.html']});res.end(html);
}

const server=http.createServer(async(req,res)=>{
  try{
    if(!['127.0.0.1', 'localhost'].includes((req.headers.host||'').split(':')[0])){res.writeHead(403);res.end();return;}
    const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);

    if(pathname==='/login'){
      if(req.method==='POST'){
        if(!sameOrigin(req)){res.writeHead(403);res.end();return;}
        if(Date.now()<lockedUntil){await sendLogin(res,'Too many attempts. Please wait a minute and try again.');return;}
        const form=await readBody(req);
        if(checkCredentials(form.get('email')||'',form.get('password')||'')){
          failedAttempts=0;
          const token=crypto.randomBytes(32).toString('hex');sessions.set(token,Date.now()+sessionTtl);
          redirect(res,'/',{'Set-Cookie':`${sessionCookie}=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${sessionTtl/1000}`});return;
        }
        if(++failedAttempts>=5){failedAttempts=0;lockedUntil=Date.now()+60_000;}
        await new Promise(r=>setTimeout(r,600));
        await sendLogin(res,'Incorrect email or password.');return;
      }
      if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405);res.end();return;}
      if(readSession(req)){redirect(res,'/');return;}
      await sendLogin(res);return;
    }
    if(pathname==='/logout'&&req.method==='POST'){
      if(!sameOrigin(req)){res.writeHead(403);res.end();return;}
      const token=readSession(req);if(token)sessions.delete(token);
      redirect(res,'/login',{'Set-Cookie':`${sessionCookie}=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0`});return;
    }
    if(req.method!=='GET' && req.method!=='HEAD'){res.writeHead(405);res.end();return;}

    // Login page assets are public; everything else requires an admin session.
    const publicAssets=['/editor/login.css','/public/logo.png'];
    if(!publicAssets.includes(pathname)&&!readSession(req)){
      if(pathname==='/'||pathname.endsWith('.html')){redirect(res,'/login');return;}
      res.writeHead(401,securityHeaders);res.end('Unauthorized');return;
    }

    let relative=pathname==='/'?'editor/index.html':pathname==='/catalogue'?'content/catalogue.json':pathname==='/guide'?'docs/EDITOR.md':pathname.replace(/^\//,'');
    if(!['editor/','shared/','public/'].some(p=>relative.startsWith(p)) && !['content/catalogue.json','docs/EDITOR.md'].includes(relative))throw Error('Not found');
    const filename=path.resolve(root,relative);
    if(!filename.startsWith(root+path.sep)||relative.includes('..')||relative.includes('\\'))throw Error('Unsafe path');
    const data=await fs.readFile(filename);res.writeHead(200,{...securityHeaders,'Content-Type':mime[path.extname(filename)]||'application/octet-stream'});res.end(req.method==='HEAD'?undefined:data);
  }catch{if(!res.headersSent){res.writeHead(404);res.end('Not found');}}
});
server.listen(port,'127.0.0.1',()=>{
  const url=`http://127.0.0.1:${port}`;console.log(`Makan editor: ${url}\nSign in at ${url}/login with the admin account. Drafts stay in this browser. Export updates to publish. Press Ctrl+C to stop.`);
  if(!process.argv.includes('--no-open')){
    const command=process.platform==='win32'?['cmd.exe',['/c','start','',url]]:process.platform==='darwin'?['open',[url]]:['xdg-open',[url]];
    const child=spawn(command[0],command[1],{windowsHide:true,stdio:'ignore'});child.on('error',()=>console.log(`Open ${url} in your browser.`));child.unref();
  }
});
