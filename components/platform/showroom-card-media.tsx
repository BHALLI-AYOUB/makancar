'use client'

import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { ImageLightbox } from '@/components/platform/image-lightbox'

export function ShowroomCardMedia({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  useEffect(() => {
    if (images.length <= 1 || paused || lightboxOpen) return

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % images.length)
    }, 2600)

    return () => window.clearInterval(timer)
  }, [images.length, paused, lightboxOpen])

  useEffect(() => {
    if (!images.length) {
      setIndex(0)
      return
    }

    setIndex((current) => (current >= images.length ? 0 : current))
  }, [images])

  return (
    <>
      <button
        type="button"
        className="group relative block w-full cursor-zoom-in text-left"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onClick={() => images.length && setLightboxOpen(true)}
        aria-label={`Ouvrir l'image de ${alt} en grand`}
      >
        <div
          className="relative aspect-[5/3] min-h-[270px] overflow-hidden bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_52%),linear-gradient(180deg,#131821_0%,#090c12_100%)] sm:min-h-[300px]"
        >
          {images.map((image, imageIndex) => (
            <div
              key={image}
              className={`absolute inset-0 transition-opacity duration-700 ${imageIndex === index ? 'opacity-100' : 'opacity-0'}`}
            >
              <img
                src={image}
                alt={`${alt} ${imageIndex + 1}`}
                className="h-full w-full object-cover object-center"
              />
            </div>
          ))}
          {!images.length ? (
            <div className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(180deg,#0a0d14_0%,#05070c_100%)] px-6 text-center">
              <div>
                <p className="text-xs uppercase tracking-[0.34em] text-[#e3c58e]">Disponible tres bientot</p>
                <p className="mt-4 font-serif text-3xl text-white sm:text-4xl">{alt}</p>
                <p className="mt-3 text-sm leading-7 text-slate-300">Presentation premium et informations sur demande.</p>
              </div>
            </div>
          ) : null}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,5,7,0.08)_0%,rgba(4,5,7,0)_44%,rgba(4,5,7,0.58)_100%)]" />
          {images.length ? (
            <span className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/35 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-white opacity-0 transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 sm:bottom-4 sm:right-4">
              <Search size={14} />
              Agrandir
            </span>
          ) : null}
        </div>
      </button>

      <ImageLightbox
        images={images}
        alt={alt}
        activeIndex={index}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={() => images.length && setIndex((current) => (current + 1) % images.length)}
        onPrevious={() => images.length && setIndex((current) => (current - 1 + images.length) % images.length)}
        onSelect={setIndex}
      />
    </>
  )
}
