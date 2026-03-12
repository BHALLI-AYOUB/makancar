'use client'

import { useEffect } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

type ImageLightboxProps = {
  images: string[]
  alt: string
  activeIndex: number
  open: boolean
  onClose: () => void
  onNext: () => void
  onPrevious: () => void
  onSelect?: (index: number) => void
}

export function ImageLightbox({
  images,
  alt,
  activeIndex,
  open,
  onClose,
  onNext,
  onPrevious,
  onSelect,
}: ImageLightboxProps) {
  useEffect(() => {
    if (!open) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') onNext()
      if (event.key === 'ArrowLeft') onPrevious()
    }

    window.addEventListener('keydown', handleKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open, onClose, onNext, onPrevious])

  if (!open || !images.length) return null

  const current = images[activeIndex] ?? images[0]

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 px-3 py-6 backdrop-blur-xl sm:px-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Aperçu de ${alt}`}
    >
      <div
        className="relative w-full max-w-6xl rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(12,15,22,0.96),rgba(6,8,12,0.96))] p-3 shadow-[0_40px_120px_-35px_rgba(0,0,0,0.95)] sm:rounded-[34px] sm:p-5"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="absolute right-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-black/45 text-white transition hover:border-[#c9a96d]/45 hover:text-[#e3c58e] sm:right-5 sm:top-5"
        >
          <X size={18} />
        </button>

        <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden rounded-[22px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_55%),linear-gradient(180deg,#0b0f16_0%,#05070c_100%)] px-4 py-8 sm:min-h-[560px] sm:rounded-[28px] sm:px-10">
          <img
            src={current}
            alt={`${alt} ${activeIndex + 1}`}
            className="max-h-[72vh] w-full object-contain object-center"
          />

          {images.length > 1 ? (
            <>
              <button
                type="button"
                onClick={onPrevious}
                aria-label="Image précédente"
                className="absolute left-3 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-black/45 text-white transition hover:border-[#c9a96d]/45 hover:text-[#e3c58e] sm:left-5 sm:h-12 sm:w-12"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={onNext}
                aria-label="Image suivante"
                className="absolute right-3 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-black/45 text-white transition hover:border-[#c9a96d]/45 hover:text-[#e3c58e] sm:right-5 sm:h-12 sm:w-12"
              >
                <ChevronRight size={20} />
              </button>
            </>
          ) : null}
        </div>

        {images.length > 1 ? (
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => onSelect?.(index)}
                className={`overflow-hidden rounded-2xl border transition ${
                  index === activeIndex
                    ? 'border-[#c9a96d] ring-1 ring-[#c9a96d]/50'
                    : 'border-white/10 hover:border-white/25'
                }`}
              >
                <img src={image} alt={`${alt} miniature ${index + 1}`} className="h-16 w-24 object-cover" />
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}
