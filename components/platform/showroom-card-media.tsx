'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, Camera } from 'lucide-react'
import { ImageLightbox } from '@/components/platform/image-lightbox'
import { ShowroomImage } from '@/components/platform/showroom-image'
import { useCurrentLocale } from '@/lib/i18n/client'

export function ShowroomCardMedia({ images, alt, sold = false, illustrative = false }: { images: string[]; alt: string; sold?: boolean; illustrative?: boolean }) {
  const [index, setIndex] = useState(0)
  const [open, setOpen] = useState(false)
  const locale = useCurrentLocale()
  const c = {
    fr: { open: 'Agrandir', previous: 'Photo précédente', next: 'Photo suivante', pending: 'Photos à venir', sold: 'Vendu', illustrative: 'Visuel d’illustration' },
    en: { open: 'Enlarge', previous: 'Previous photo', next: 'Next photo', pending: 'Photos coming soon', sold: 'Sold', illustrative: 'Illustrative image' },
    ar: { open: 'تكبير', previous: 'الصورة السابقة', next: 'الصورة التالية', pending: 'الصور قريباً', sold: 'مباعة', illustrative: 'صورة توضيحية' },
  }[locale]
  const active = index < images.length ? index : 0
  const previous = () => setIndex((active - 1 + images.length) % images.length)
  const next = () => setIndex((active + 1) % images.length)

  return <>
    <div className="vehicle-media">
      <button type="button" className="vehicle-zoom" onClick={() => images.length && setOpen(true)} disabled={!images.length} aria-label={`${c.open} — ${alt}`}>
        {images.length ? <>
          <img src={images[active]} alt="" aria-hidden="true" loading="lazy" className="vehicle-image-backdrop" />
          <ShowroomImage key={images[active]} src={images[active]} alt={`${alt} — ${active + 1}`} loading="lazy" className="vehicle-image" />
          <span className="vehicle-enlarge"><Maximize2 size={15} /></span>
        </> : <span className="vehicle-empty"><Camera size={32} strokeWidth={1} /><span>{c.pending}</span></span>}
      </button>
      {sold && <span className="vehicle-sold">{c.sold}</span>}
      {illustrative && <span className="vehicle-illustration-label">{c.illustrative}</span>}
      {images.length > 1 && <div className="vehicle-gallery-controls" dir="ltr"><button type="button" onClick={previous} aria-label={`${c.previous} — ${alt}`}><ChevronLeft size={16} /></button><span>{active + 1} / {images.length}</span><button type="button" onClick={next} aria-label={`${c.next} — ${alt}`}><ChevronRight size={16} /></button></div>}
    </div>
    <ImageLightbox images={images} alt={alt} activeIndex={active} open={open} onClose={() => setOpen(false)} onNext={next} onPrevious={previous} onSelect={setIndex} />
  </>
}
