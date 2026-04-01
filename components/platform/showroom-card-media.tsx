'use client'

import { useEffect, useState } from 'react'
import { Search, ShieldCheck } from 'lucide-react'
import { ImageLightbox } from '@/components/platform/image-lightbox'

export function ShowroomCardMedia({ images, alt, sold = false }: { images: string[]; alt: string; sold?: boolean }) {
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
        <div className="relative aspect-[5/3] min-h-[270px] overflow-hidden bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_52%),linear-gradient(180deg,#131821_0%,#090c12_100%)] sm:min-h-[300px]">
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

          {sold ? (
            <div className="absolute left-4 top-4 z-20">
              <div className="relative overflow-hidden rounded-2xl border border-[#ffb4b4]/28 bg-[linear-gradient(135deg,rgba(162,20,20,0.96)_0%,rgba(226,43,43,0.92)_52%,rgba(120,8,8,0.96)_100%)] px-4 py-2.5 shadow-[0_18px_50px_-20px_rgba(185,28,28,0.95)] backdrop-blur-xl">
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0)_48%)]" />
                <div className="relative flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/12 text-white">
                    <ShieldCheck size={15} />
                  </span>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.28em] text-white/72">Reserve</p>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white">Vendu</p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

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
