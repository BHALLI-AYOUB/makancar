import Link from 'next/link'
import { Gauge, MapPin, MessageCircleMore, ShieldCheck } from 'lucide-react'
import type { ShowroomCar } from '@/types/showroom'
import { getWhatsAppHref } from '@/lib/data/showroom-stock'
import { ShowroomCardMedia } from '@/components/platform/showroom-card-media'

export function ShowroomCard({ car }: { car: ShowroomCar }) {
  const mileage = car.summary.find((item) => item.label.toLowerCase().includes('kilometrage'))?.value
  const location = car.summary.find((item) => item.label.toLowerCase().includes('localisation'))?.value
  const status = car.availabilityLabel ?? car.badges[0]

  return (
    <article className="group overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))] shadow-[0_28px_110px_-60px_rgba(0,0,0,0.95)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-[#c9a96d]/35">
      <div className="relative overflow-hidden">
        <ShowroomCardMedia images={car.gallery} alt={car.name} />
        <span className="absolute left-5 top-5 rounded-full border border-[#c9a96d]/35 bg-[#0a0d14]/85 px-3 py-1 text-xs uppercase tracking-[0.28em] text-[#e3c58e]">
          Stock reel
        </span>
      </div>

      <div className="space-y-5 p-6">
        <div className="flex flex-wrap gap-2">
          {car.badges.slice(0, 3).map((badge) => (
            <span key={badge} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
              {badge}
            </span>
          ))}
        </div>

        <div>
          <h3 className="font-serif text-4xl font-medium tracking-[-0.03em] text-white">{car.name}</h3>
          {car.subtitle ? <p className="mt-2 text-sm uppercase tracking-[0.18em] text-slate-400">{car.subtitle}</p> : null}
          {car.price ? <p className="mt-4 text-2xl font-semibold text-[#e3c58e]">{car.price}</p> : null}
        </div>

        <div className="grid gap-3 text-sm text-slate-300 sm:grid-cols-3">
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-[#080b12] px-4 py-3">
            <Gauge size={16} className="text-[#e3c58e]" />
            <span>{mileage ?? 'Sur demande'}</span>
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-[#080b12] px-4 py-3">
            <MapPin size={16} className="text-[#e3c58e]" />
            <span>{location ?? status}</span>
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-[#080b12] px-4 py-3">
            <ShieldCheck size={16} className="text-[#e3c58e]" />
            <span>{car.summary[0]?.value ?? 'Stock premium'}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href={`/cars/${car.id}`} className="inline-flex flex-1 items-center justify-center rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/8">
            Voir les details
          </Link>
          <a
            href={getWhatsAppHref(car.whatsapp, car.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#c9a96d] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#d8b97e]"
          >
            <MessageCircleMore size={16} />
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  )
}
