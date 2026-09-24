'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { ImageLightbox } from '@/components/platform/image-lightbox'
import { ShowroomImage } from '@/components/platform/showroom-image'
import { useCurrentLocale } from '@/lib/i18n/client'

export function ShowroomGallery({ images, alt, illustrative = false }: { images: string[]; alt: string; illustrative?: boolean }) {
  const locale = useCurrentLocale()
  const [active, setActive] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const current = images[active] ?? images[0]

  return (
    <>
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => current && setLightboxOpen(true)}
          className="group relative block w-full cursor-zoom-in overflow-hidden rounded-[24px] border border-white/10 bg-[#070b12] text-left transition hover:border-[#c9a96d]/35 sm:rounded-[30px]"
          aria-label={`Ouvrir les images de ${alt} en grand`}
        >
        <div className="relative aspect-[4/5] min-h-[240px] sm:aspect-[5/3] sm:min-h-[360px] lg:min-h-[560px]">
        {current ? (
          <ShowroomImage
            key={current}
            src={current}
            alt={alt}
            className="absolute inset-0 h-full w-full object-contain object-center p-3 transition duration-500"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center px-6 text-center">
            <div>
              <p className="text-xs uppercase tracking-[0.34em] text-[#e3c58e]">Photos à venir</p>
              <p className="mt-4 font-serif text-3xl text-white sm:text-5xl">{alt}</p>
              <p className="mt-3 max-w-md text-sm leading-7 text-slate-300 sm:text-base">
                Plus d&apos;informations et présentation détaillée disponibles sur demande.
              </p>
            </div>
          </div>
        )}
          {current ? (
            <span className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/35 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-white opacity-0 transition duration-300 group-hover:opacity-100 sm:bottom-5 sm:right-5">
              <Search size={14} />
              Agrandir
            </span>
          ) : null}
        </div>
        </button>
        {illustrative && <p className="text-xs text-[#e3c58e]">{{ fr: 'Visuels d’illustration. Les photos du véhicule en vente seront ajoutées prochainement.', en: 'Illustrative images. Photos of the actual vehicle will be added soon.', ar: 'صور توضيحية. ستُضاف صور السيارة المعروضة للبيع قريباً.' }[locale]}</p>}

        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 sm:gap-3 lg:grid-cols-6">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActive(index)}
              className={`overflow-hidden rounded-2xl border transition ${
                index === active ? 'border-[#c9a96d] ring-1 ring-[#c9a96d]/50' : 'border-white/10 hover:border-white/25'
              }`}
            >
              <ShowroomImage src={image} alt={`${alt} ${index + 1}`} loading="lazy" className="h-16 w-full object-cover sm:h-20" />
            </button>
          ))}
        </div>
      </div>

      <ImageLightbox
        images={images}
        alt={alt}
        activeIndex={active}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={() => images.length && setActive((currentIndex) => (currentIndex + 1) % images.length)}
        onPrevious={() => images.length && setActive((currentIndex) => (currentIndex - 1 + images.length) % images.length)}
        onSelect={setActive}
      />
    </>
  )
}
