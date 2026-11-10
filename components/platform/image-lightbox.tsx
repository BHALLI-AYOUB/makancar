'use client'
import { useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { ShowroomImage } from './showroom-image'
import { useCurrentLocale } from '@/lib/i18n/client'
import type { ShowroomCar } from '@/types/showroom'
type Props={images:string[];photos?:ShowroomCar['photos'];alt:string;activeIndex:number;open:boolean;onClose:()=>void;onNext:()=>void;onPrevious:()=>void;onSelect?:(n:number)=>void}
export function ImageLightbox({images,photos,alt,activeIndex,open,onClose,onNext,onPrevious,onSelect}:Props) {
  const ref=useRef<HTMLDialogElement>(null),touch=useRef<number|null>(null),locale=useCurrentLocale()
  const c={fr:{close:'Fermer la galerie',previous:'Photo précédente',next:'Photo suivante',photo:'Afficher la photo',illustrative:'Visuel d’illustration'},en:{close:'Close gallery',previous:'Previous photo',next:'Next photo',photo:'View photo',illustrative:'Illustrative image'},ar:{close:'إغلاق المعرض',previous:'الصورة السابقة',next:'الصورة التالية',photo:'عرض الصورة',illustrative:'صورة توضيحية'}}[locale]
  useEffect(()=>{const d=ref.current,opener=document.activeElement as HTMLElement|null;if(open&&!d?.open)d?.showModal();if(!open&&d?.open)d.close();const before=document.body.style.overflow;if(open)document.body.style.overflow='hidden';return()=>{if(d?.open)d.close();document.body.style.overflow=before;if(open)opener?.focus()}},[open])
  return <dialog ref={ref} className="gallery-dialog" aria-label={alt} onCancel={e=>{e.preventDefault();onClose()}} onKeyDown={e=>{if(e.key==='ArrowRight'){e.preventDefault();onNext()}if(e.key==='ArrowLeft'){e.preventDefault();onPrevious()}}}>
    <div className="lightbox-header"><span>{alt} · <b dir="ltr">{activeIndex+1} / {images.length}</b></span><button type="button" onClick={onClose} aria-label={c.close}><X size={20}/></button></div>
    <div className="lightbox-image-wrap" onTouchStart={e=>{touch.current=e.touches[0].clientX}} onTouchEnd={e=>{if(touch.current!==null){const delta=e.changedTouches[0].clientX-touch.current;if(delta>50)onPrevious();if(delta< -50)onNext();touch.current=null}}}>
      <ShowroomImage key={images[activeIndex]} src={images[activeIndex]} alt={photos?.[activeIndex]?.alt[locale]??alt} width={1600} height={1200} sizes="95vw"/>
      {photos?.[activeIndex]?.illustrative&&<span className="gallery-label">{c.illustrative}</span>}
      {images.length>1&&<div className="gallery-arrows" dir="ltr"><button type="button" onClick={onPrevious} aria-label={c.previous}><ChevronLeft/></button><button type="button" onClick={onNext} aria-label={c.next}><ChevronRight/></button></div>}</div>
    <div className="lightbox-footer"><div className="gallery-thumbs">{images.map((image,n)=><button type="button" key={image} aria-label={`${c.photo} ${n+1}`} aria-pressed={activeIndex===n} onClick={()=>onSelect?.(n)}><ShowroomImage src={image} alt="" width={160} height={120} sizes="88px" loading="lazy"/></button>)}</div></div>
  </dialog>
}
