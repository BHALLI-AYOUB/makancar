'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
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
  const [mounted, setMounted] = useState(open)
  const [visible, setVisible] = useState(false)
  const [portalReady, setPortalReady] = useState(false)
  const [touchDelta, setTouchDelta] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const closeTimeout = useRef<number | null>(null)

  useEffect(() => {
    setPortalReady(true)
  }, [])

  useEffect(() => {
    if (open) {
      setMounted(true)
      requestAnimationFrame(() => setVisible(true))
      document.body.dataset.lightboxOpen = 'true'
      return
    }

    setVisible(false)
    delete document.body.dataset.lightboxOpen
    closeTimeout.current = window.setTimeout(() => setMounted(false), 220)

    return () => {
      if (closeTimeout.current) {
        window.clearTimeout(closeTimeout.current)
      }
    }
  }, [open])

  useEffect(() => {
    if (!mounted) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') onNext()
      if (event.key === 'ArrowLeft') onPrevious()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      delete document.body.dataset.lightboxOpen
    }
  }, [mounted, onClose, onNext, onPrevious])

  if (!mounted || !images.length || !portalReady) return null

  const current = images[activeIndex] ?? images[0]

  function handleTouchStart(event: React.TouchEvent<HTMLDivElement>) {
    touchStartX.current = event.touches[0]?.clientX ?? null
    setTouchDelta(0)
  }

  function handleTouchMove(event: React.TouchEvent<HTMLDivElement>) {
    if (touchStartX.current === null) return
    const currentX = event.touches[0]?.clientX ?? touchStartX.current
    setTouchDelta(currentX - touchStartX.current)
  }

  function handleTouchEnd() {
    if (touchStartX.current === null) return

    if (touchDelta <= -50) onNext()
    if (touchDelta >= 50) onPrevious()

    touchStartX.current = null
    setTouchDelta(0)
  }

  return createPortal(
    <div
      className={`fixed inset-0 z-[140] transition duration-200 ${visible ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
      role="dialog"
      aria-modal="true"
      aria-label={`Aperçu de ${alt}`}
    >
      <button
        type="button"
        aria-label="Fermer l’aperçu"
        className="absolute inset-0 h-full w-full bg-[rgba(3,5,8,0.86)] backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative flex h-[100dvh] w-full items-center justify-center p-3 sm:p-5">
        <div
          className={`relative flex h-full w-full max-w-6xl flex-col overflow-hidden rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(12,15,22,0.96),rgba(6,8,12,0.96))] shadow-[0_40px_120px_-35px_rgba(0,0,0,0.95)] transition duration-200 sm:rounded-[34px] ${visible ? 'translate-y-0 scale-100' : 'translate-y-3 scale-[0.985]'}`}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-center justify-between gap-3 border-b border-white/8 px-4 py-3 sm:px-5">
            <div className="min-w-0">
              <p className="truncate font-serif text-lg text-white sm:text-2xl">{alt}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.24em] text-slate-400">
                {activeIndex + 1} / {images.length}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/12 bg-black/35 text-white transition hover:border-[#c9a96d]/45 hover:text-[#e3c58e]"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex min-h-0 flex-1 flex-col">
            <div
              className="relative flex flex-1 items-center justify-center overflow-hidden px-3 py-3 sm:px-5 sm:py-4"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{ touchAction: 'pan-y pinch-zoom' }}
            >
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[22px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_55%),linear-gradient(180deg,#0b0f16_0%,#05070c_100%)] px-2 py-2 sm:rounded-[28px] sm:px-6 sm:py-6">
                <img
                  src={current}
                  alt={`${alt} ${activeIndex + 1}`}
                  className="max-h-full w-full select-none object-contain object-center transition-transform duration-200"
                  draggable={false}
                  style={{ transform: `translateX(${Math.max(Math.min(touchDelta, 48), -48)}px)` }}
                />

                {images.length > 1 ? (
                  <>
                    <button
                      type="button"
                      onClick={onPrevious}
                      aria-label="Image précédente"
                      className="absolute left-3 hidden h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-black/35 text-white transition hover:border-[#c9a96d]/45 hover:text-[#e3c58e] sm:inline-flex"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      type="button"
                      onClick={onNext}
                      aria-label="Image suivante"
                      className="absolute right-3 hidden h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-black/35 text-white transition hover:border-[#c9a96d]/45 hover:text-[#e3c58e] sm:inline-flex"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                ) : null}
              </div>
            </div>

            {images.length > 1 ? (
              <div className="border-t border-white/8 px-3 py-3 sm:px-5 sm:py-4">
                <div className="mb-3 flex items-center justify-center gap-3 sm:hidden">
                  <button
                    type="button"
                    onClick={onPrevious}
                    aria-label="Image précédente"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-black/35 text-white transition hover:border-[#c9a96d]/45 hover:text-[#e3c58e]"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={onNext}
                    aria-label="Image suivante"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-black/35 text-white transition hover:border-[#c9a96d]/45 hover:text-[#e3c58e]"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-1">
                  {images.map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() => onSelect?.(index)}
                      className={`shrink-0 overflow-hidden rounded-2xl border transition ${
                        index === activeIndex
                          ? 'border-[#c9a96d] ring-1 ring-[#c9a96d]/50'
                          : 'border-white/10 hover:border-white/25'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${alt} miniature ${index + 1}`}
                        className="h-16 w-24 object-cover sm:h-20 sm:w-28"
                      />
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
