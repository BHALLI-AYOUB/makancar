'use client'

import { Facebook, Instagram, MapPin, Phone } from 'lucide-react'
import { business } from '@/lib/business'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/15 bg-black py-10 text-white">
      <div className="section-shell">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-serif text-3xl">MAKAN</p>
            <p className="mt-2 text-sm text-slate-300">Luxury Motors</p>
          </div>

          <div className="space-y-2 text-sm text-slate-300">
            <a href="#home" className="block hover:text-white">
              Accueil
            </a>
            <a href="#stock" className="block hover:text-white">
              Stock
            </a>
            <a href="#order" className="block hover:text-white">
              Sur commande
            </a>
            <a href="#contact" className="block hover:text-white">
              Contact
            </a>
          </div>

          <div className="space-y-2 text-sm text-slate-300">
            <a href={`tel:${business.phone}`} className="flex items-center gap-2 hover:text-white">
              <Phone size={14} />
              {business.phone}
            </a>
            <a href={business.googleMapsLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white">
              <MapPin size={14} />
              {business.location}
            </a>
            <div className="flex gap-2 pt-2">
              <a href={business.instagram} target="_blank" rel="noopener noreferrer" className="rounded-md border border-white/25 p-2 hover:bg-white/10">
                <Instagram size={16} />
              </a>
              <a href={business.facebook} target="_blank" rel="noopener noreferrer" className="rounded-md border border-white/25 p-2 hover:bg-white/10">
                <Facebook size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/15 pt-4 text-xs text-slate-400">
          Copyright {currentYear} Makan Luxury Motors. Tous droits reserves.
        </div>
      </div>
    </footer>
  )
}
