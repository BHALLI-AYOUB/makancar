'use client'

import { useState } from 'react'

export function ShowroomGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0)
  const current = images[active] ?? images[0]

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#070b12] sm:rounded-[30px]">
        <img
          key={current}
          src={current}
          alt={alt}
          className="h-[240px] w-full object-contain object-center px-3 py-3 transition duration-500 sm:h-[360px] sm:px-4 sm:py-4 lg:h-[560px]"
        />
      </div>

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 sm:gap-3 lg:grid-cols-6">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setActive(index)}
            className={`overflow-hidden rounded-2xl border transition ${index === active ? 'border-[#c9a96d] ring-1 ring-[#c9a96d]/50' : 'border-white/10 hover:border-white/25'}`}
          >
            <img src={image} alt={`${alt} ${index + 1}`} className="h-16 w-full object-cover sm:h-20" />
          </button>
        ))}
      </div>
    </div>
  )
}
