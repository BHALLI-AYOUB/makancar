'use client'

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
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
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0a1018]/80 shadow-[0_24px_60px_-36px_rgba(0,0,0,0.9)]"
    >
      <div className="relative h-56 overflow-hidden">
        <Image
          src={car.images[0]}
          alt={car.model}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06090f] via-transparent to-transparent" />
        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.18em] ${
            car.status === 'disponible' ? 'bg-emerald-500/85 text-white' : 'bg-slate-200/85 text-black'
          }`}
        >
          {car.status === 'disponible' ? 'Disponible' : 'Sur demande'}
        </span>
      </div>

      <div className="space-y-4 p-5">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate-300">{car.year}</p>
          <h3 className="mt-1 font-serif text-2xl text-white">{car.model}</h3>
          <p className="text-sm text-slate-300">{car.package}</p>
        </div>

        {car.price && <p className="text-xl font-semibold text-sky-100">{car.price}</p>}

        <div className="flex flex-wrap gap-2 pt-1">
          <button
            type="button"
            onClick={() => onInfoClick(car)}
            className="flex-1 rounded-full border border-slate-300/30 px-4 py-2 text-sm uppercase tracking-[0.12em] text-slate-100 transition hover:bg-white/10"
          >
            Plus d informations
          </button>
          <button
            type="button"
            onClick={handleWhatsApp}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-500/20 px-4 py-2 text-sm uppercase tracking-[0.12em] text-emerald-100 transition hover:bg-emerald-500/35"
          >
            <MessageCircle size={14} />
            Contact
          </button>
        </div>
      </div>
    </motion.article>
  )
}
