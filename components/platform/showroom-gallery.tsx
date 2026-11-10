'use client'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import { ImageLightbox } from './image-lightbox'
import { ShowroomImage } from './showroom-image'
import { useCurrentLocale } from '@/lib/i18n/client'
import type { ShowroomCar } from '@/types/showroom'
export function ShowroomGallery({images,photos,alt,illustrative=false}:{images:string[];photos?:ShowroomCar['photos'];alt:string;illustrative?:boolean}) {
  const [active,setActive]=useState(0),[open,setOpen]=useState(false),locale=useCurrentLocale()
  const c={fr:{open:'Agrandir la galerie',previous:'Photo précédente',next:'Photo suivante',photo:'Afficher la photo',illustrative:'Visuel d’illustration'},en:{open:'Enlarge gallery',previous:'Previous photo',next:'Next photo',photo:'View photo',illustrative:'Illustrative image'},ar:{open:'تكبير المعرض',previous:'الصورة السابقة',next:'الصورة التالية',photo:'عرض الصورة',illustrative:'صورة توضيحية'}}[locale]
  const next=()=>setActive((active+1)%images.length),previous=()=>setActive((active-1+images.length)%images.length)
  return <div className="gallery-block"><div className="gallery-main"><button type="button" className="gallery-enlarge" onClick={()=>setOpen(true)} aria-label={`${c.open} — ${alt}`} disabled={!images.length}>
    {images[active]&&<ShowroomImage key={images[active]} src={images[active]} alt={photos?.[active]?.alt[locale]??alt} fetchPriority="high" className="gallery-photo"/>}</button>
    {(photos?.[active]?.illustrative??illustrative)&&<span className="gallery-label">{c.illustrative}</span>}
    {images.length>1&&<div className="gallery-arrows" dir="ltr"><button type="button" aria-label={c.previous} onClick={previous}><ChevronLeft size={20}/></button><button type="button" aria-label={c.next} onClick={next}><ChevronRight size={20}/></button></div>}</div>
    <div className="gallery-counter"><span dir="ltr">{active+1} / {images.length}</span><span><Maximize2 size={14}/></span></div>
    <div className="gallery-thumbs" aria-label={c.open}>{images.map((image,n)=><button key={image} type="button" aria-label={`${c.photo} ${n+1}`} aria-pressed={active===n} onClick={()=>setActive(n)}><ShowroomImage src={image} alt="" width={160} height={120} sizes="88px" loading="lazy"/></button>)}</div>
    {open&&<ImageLightbox images={images} photos={photos} alt={alt} activeIndex={active} open={open} onClose={()=>setOpen(false)} onNext={next} onPrevious={previous} onSelect={setActive}/>}</div>
}
