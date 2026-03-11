import Link from 'next/link'
import { business } from '@/lib/business'

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-[#05070c]">
      <div className="section-shell grid gap-8 py-10 sm:py-12 md:grid-cols-3">
        <div>
          <p className="font-serif text-2xl text-white sm:text-3xl">MAKAN</p>
          <p className="mt-3 max-w-sm text-sm leading-7 text-slate-400">
            Plateforme professionnelle de vente et location de voitures. Reservation en ligne, gestion des stocks
            et espace admin complet.
          </p>
        </div>
        <div className="grid gap-2 text-sm text-slate-300">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <Link href="/vente" className="hover:text-white">
            Vente
          </Link>
          <Link href="/location" className="hover:text-white">
            Location
          </Link>
          <Link href="/auth/login" className="hover:text-white">
            Login
          </Link>
        </div>
        <div className="space-y-2 text-sm text-slate-300">
          <p>{business.phone}</p>
          <p>{business.email}</p>
          <p>{business.location}</p>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-500">
        Copyright {year} Makan Cars. Tous droits reserves.
      </div>
    </footer>
  )
}
