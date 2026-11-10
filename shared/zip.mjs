// Dependency-free, standards-compliant stored ZIP archives. Shared by the editor and CLI.
const encoder=new TextEncoder();
const table=Uint32Array.from({length:256},(_,n)=>{for(let i=0;i<8;i++)n=n&1?0xedb88320^(n>>>1):n>>>1;return n>>>0;});
export function crc32(bytes){let n=0xffffffff;for(const b of bytes)n=table[(n^b)&255]^(n>>>8);return(n^0xffffffff)>>>0;}
export function makeZip(entries){
  const local=[],central=[];let offset=0;
  for(const {path,data} of entries){
    const name=encoder.encode(path),bytes=typeof data==='string'?encoder.encode(data):data,crc=crc32(bytes);
    const h=new Uint8Array(30+name.length),v=new DataView(h.buffer);v.setUint32(0,0x04034b50,true);v.setUint16(4,20,true);v.setUint16(6,0x800,true);v.setUint32(14,crc,true);v.setUint32(18,bytes.length,true);v.setUint32(22,bytes.length,true);v.setUint16(26,name.length,true);h.set(name,30);
    const c=new Uint8Array(46+name.length),w=new DataView(c.buffer);w.setUint32(0,0x02014b50,true);w.setUint16(4,20,true);w.setUint16(6,20,true);w.setUint16(8,0x800,true);w.setUint32(16,crc,true);w.setUint32(20,bytes.length,true);w.setUint32(24,bytes.length,true);w.setUint16(28,name.length,true);w.setUint32(42,offset,true);c.set(name,46);
    local.push(h,bytes);central.push(c);offset+=h.length+bytes.length;
  }
  const size=central.reduce((s,c)=>s+c.length,0),end=new Uint8Array(22),e=new DataView(end.buffer);e.setUint32(0,0x06054b50,true);e.setUint16(8,entries.length,true);e.setUint16(10,entries.length,true);e.setUint32(12,size,true);e.setUint32(16,offset,true);
  const result=new Uint8Array(offset+size+22);let pos=0;for(const part of [...local,...central,end]){result.set(part,pos);pos+=part.length;}return result;
}
export function readZip(bytes){
  const v=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength),entries=new Map();let pos=0;
  while(pos+4<=bytes.length && v.getUint32(pos,true)===0x04034b50){
    if(pos+30>bytes.length)throw Error('Truncated ZIP header');
    const flags=v.getUint16(pos+6,true),method=v.getUint16(pos+8,true),size=v.getUint32(pos+18,true),nameSize=v.getUint16(pos+26,true),extra=v.getUint16(pos+28,true);
    if(method!==0 || (flags&9))throw Error('Import a ZIP exported by this editor (stored, unencrypted files).');
    const path=new TextDecoder().decode(bytes.slice(pos+30,pos+30+nameSize)),start=pos+30+nameSize+extra,end=start+size;
    if(end>bytes.length || size>50*1024*1024 || entries.has(path))throw Error('Invalid, duplicate or oversized ZIP entry');
    if(!/^[a-zA-Z0-9_./-]+$/.test(path)||path.includes('..')||path.startsWith('/'))throw Error('Unsafe ZIP path');
    const data=bytes.slice(start,end);if(crc32(data)!==v.getUint32(pos+14,true))throw Error('ZIP checksum mismatch');entries.set(path,data);pos=end;
  }
  if(!entries.size || pos+4>bytes.length || v.getUint32(pos,true)!==0x02014b50)throw Error('Invalid ZIP archive');return entries;
}
