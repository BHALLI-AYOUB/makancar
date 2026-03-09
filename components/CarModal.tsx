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
            className="fixed inset-0 z-40 bg-black/75 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="w-full max-w-3xl overflow-hidden rounded-xl border border-white/20 bg-black text-white"
            >
              <div className="flex items-center justify-between border-b border-white/15 px-5 py-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">{car.year}</p>
                  <h3 className="font-serif text-3xl">{car.model}</h3>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md border border-white/25 p-2 transition hover:bg-white/10"
                  aria-label="Fermer"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="grid gap-4 p-5 sm:grid-cols-[1.2fr_0.8fr]">
                <img src={car.images[0]} alt={car.model} className="h-72 w-full rounded-lg object-cover" />
                <div className="space-y-3">
                  <div className="rounded-lg border border-white/15 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Pack</p>
                    <p className="mt-1 text-sm">{car.package}</p>
                  </div>
                  <div className="rounded-lg border border-white/15 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Disponibilite</p>
                    <p className="mt-1 text-sm">{car.status === 'disponible' ? 'En stock immediat' : 'Sur commande'}</p>
                  </div>
                  {car.price && (
                    <div className="rounded-lg border border-blue-500/60 bg-blue-600/20 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-blue-100">Prix indicatif</p>
                      <p className="mt-1 text-xl font-semibold">{car.price}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2 border-t border-white/15 p-5 sm:flex-row">
                <a
                  href={`https://wa.me/212641389898?text=${encodeURIComponent(message)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-blue flex-1 gap-2 rounded-md px-4 py-3 text-sm"
                >
                  <MessageCircle size={15} />
                  WhatsApp
                </a>
                <a
                  href={business.emailLink}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-white/25 px-4 py-3 text-sm transition hover:bg-white/10"
                >
                  <Mail size={15} />
                  Email
                </a>
                <a
                  href={`tel:${business.phone}`}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-white/25 px-4 py-3 text-sm transition hover:bg-white/10"
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
