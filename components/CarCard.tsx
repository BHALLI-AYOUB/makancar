'use client'

import { motion } from 'framer-motion'
import { ChevronRight, MessageCircle } from 'lucide-react'
import Image from 'next/image'
import type { MouseEvent } from 'react'
import type { Car } from '@/data/cars'

interface CarCardProps {
  car: Car
  onInfoClick: (car: Car) => void
}

export function CarCard({ car, onInfoClick }: CarCardProps) {
  const handleWhatsApp = (event: MouseEvent) => {
    event.stopPropagation()
    const message = `Bonjour, je souhaite plus d infos sur ${car.model} ${car.year} (${car.package}).`
    window.open(`https://wa.me/212641389898?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="overflow-hidden rounded-xl border border-white/12 bg-black text-white"
    >
      <div className="relative h-56">
        <Image src={car.images[0]} alt={car.model} fill className="object-cover" unoptimized />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full border border-white/25 bg-black/70 px-3 py-1 text-[11px] uppercase tracking-[0.15em]">
          {car.status === 'disponible' ? 'Disponible' : 'Sur demande'}
        </span>
      </div>

      <div className="space-y-3 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-300">{car.year}</p>
        <h3 className="font-serif text-3xl leading-tight">{car.model}</h3>
        <p className="text-sm text-slate-300">{car.package}</p>
        {car.price && <p className="text-lg font-semibold text-white">{car.price}</p>}

        <div className="flex flex-wrap gap-2 pt-2">
          <button
            type="button"
            onClick={() => onInfoClick(car)}
            className="btn-blue flex-1 gap-2 rounded-md px-4 py-2.5 text-sm"
          >
            Configurer maintenant
            <ChevronRight size={15} />
          </button>
          <button
            type="button"
            onClick={handleWhatsApp}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-white/30 px-4 py-2.5 text-sm transition hover:bg-white/10"
          >
            <MessageCircle size={15} />
            En savoir plus
          </button>
        </div>
      </div>
    </motion.article>
  )
}
