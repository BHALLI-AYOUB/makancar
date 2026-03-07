'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Mail, MessageCircle, Phone, X } from 'lucide-react'
import type { Car } from '@/data/cars'
import { business } from '@/lib/business'

interface CarModalProps {
  car: Car | null
  isOpen: boolean
  onClose: () => void
}

export function CarModal({ car, isOpen, onClose }: CarModalProps) {
  if (!car) return null

  const message = `Bonjour, je souhaite recevoir une offre pour ${car.model} ${car.year} (${car.package}).`

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-3xl overflow-hidden rounded-3xl border border-white/15 bg-[#080d14]/95 shadow-[0_30px_80px_-32px_rgba(0,0,0,0.95)]"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-7">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-slate-300">{car.year}</p>
                  <h3 className="font-serif text-2xl text-white">{car.model}</h3>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full border border-white/20 p-2 text-slate-200 transition hover:bg-white/10"
                  aria-label="Fermer"
                >
                  <X size={17} />
                </button>
              </div>

              <div className="grid gap-6 p-5 sm:grid-cols-[1.1fr_0.9fr] sm:p-7">
                <div className="overflow-hidden rounded-2xl border border-white/10">
                  <img src={car.images[0]} alt={car.model} className="h-full w-full object-cover" />
                </div>
                <div className="space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-slate-300">Configuration</p>
                    <p className="mt-1 text-sm text-white">{car.package}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-slate-300">Disponibilite</p>
                    <p className="mt-1 text-sm text-white">
                      {car.status === 'disponible' ? 'En stock immediat' : 'Disponible sur commande'}
                    </p>
                  </div>
                  {car.price && (
                    <div className="rounded-2xl border border-sky-200/30 bg-sky-200/10 p-4">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-sky-100">Prix indicatif</p>
                      <p className="mt-1 text-xl font-semibold text-white">{car.price}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2 border-t border-white/10 p-5 sm:flex-row sm:p-7">
                <a
                  href={`https://wa.me/212641389898?text=${encodeURIComponent(message)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-emerald-300/35 bg-emerald-500/20 px-4 py-3 text-sm uppercase tracking-[0.15em] text-emerald-100 transition hover:bg-emerald-500/35"
                >
                  <MessageCircle size={15} />
                  WhatsApp
                </a>
                <a
                  href={business.emailLink}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-sky-200/35 bg-sky-400/20 px-4 py-3 text-sm uppercase tracking-[0.15em] text-sky-50 transition hover:bg-sky-400/35"
                >
                  <Mail size={15} />
                  Email
                </a>
                <a
                  href={`tel:${business.phone}`}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/30 px-4 py-3 text-sm uppercase tracking-[0.15em] text-white transition hover:bg-white/10"
                >
                  <Phone size={15} />
                  Appeler
                </a>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
