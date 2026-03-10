import Link from 'next/link'
import { BadgeEuro, CalendarDays } from 'lucide-react'
import type { Car } from '@/types/database'

export function PlatformCarCard({ car }: { car: Car }) {
  const icon = car.type === 'vente' ? <BadgeEuro size={16} /> : <CalendarDays size={16} />

  return (
    <article className="overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] shadow-[0_24px_80px_-32px_rgba(0,0,0,0.9)] backdrop-blur-xl">
      <div className="relative h-64 overflow-hidden">
        <img
          src={car.image_url ?? 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80'}
          alt={car.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06090f] via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-[#03050a]/80 px-3 py-1 text-xs uppercase tracking-[0.24em] text-white">
          {car.type}
        </span>
      </div>

      <div className="space-y-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">{car.brand}</p>
            <h3 className="mt-2 font-serif text-3xl text-white">{car.title}</h3>
            <p className="mt-2 text-sm text-slate-400">{car.model}</p>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs ${car.available ? 'bg-emerald-500/20 text-emerald-200' : 'bg-rose-500/20 text-rose-200'}`}>
            {car.available ? 'Disponible' : 'Indisponible'}
          </span>
        </div>

        <p className="line-clamp-3 text-sm leading-6 text-slate-300">{car.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-lg font-semibold text-white">
            {icon}
            {Intl.NumberFormat('fr-FR', {
              style: 'currency',
              currency: 'EUR',
              maximumFractionDigits: 0,
            }).format(car.price)}
          </div>
          <Link href={`/cars/${car.id}`} className="rounded-full border border-white/15 px-4 py-2 text-sm text-white transition hover:bg-white/10">
            Voir details
          </Link>
        </div>
      </div>
    </article>
  )
}
