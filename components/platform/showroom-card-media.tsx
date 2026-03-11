'use client'

import { useEffect, useState } from 'react'

export function ShowroomCardMedia({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (images.length <= 1 || paused) return

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % images.length)
    }, 2600)

    return () => window.clearInterval(timer)
  }, [images.length, paused])

  useEffect(() => {
    if (!images.length) {
      setIndex(0)
      return
    }

    setIndex((current) => (current >= images.length ? 0 : current))
  }, [images])

  return (
    <div
      className="relative aspect-[5/3] min-h-[270px] overflow-hidden bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_52%),linear-gradient(180deg,#131821_0%,#090c12_100%)] sm:min-h-[300px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {images.map((image, imageIndex) => (
        <img
          key={image}
          src={image}
          alt={`${alt} ${imageIndex + 1}`}
          className={`absolute inset-0 h-full w-full object-contain object-center px-3 py-4 transition-opacity duration-700 sm:px-4 sm:py-5 ${imageIndex === index ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      {!images.length ? <div className="absolute inset-0 bg-[linear-gradient(180deg,#0a0d14_0%,#05070c_100%)]" /> : null}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,5,7,0.08)_0%,rgba(4,5,7,0)_44%,rgba(4,5,7,0.58)_100%)]" />
    </div>
  )
}
