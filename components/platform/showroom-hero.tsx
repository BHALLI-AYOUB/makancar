import Link from 'next/link'
import type { ShowroomCar } from '@/types/showroom'
import { getWhatsAppHref } from '@/lib/data/showroom-stock'

export function ShowroomHero({ car }: { car: ShowroomCar }) {
  return (
    <section className="relative overflow-hidden bg-[#040507]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,169,109,0.12),transparent_28%),linear-gradient(180deg,rgba(4,5,7,0.76)_0%,rgba(4,5,7,0.9)_54%,rgba(4,5,7,1)_100%)]" />
      <div className="section-shell relative z-10 py-14 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.36em] text-[#e3c58e]">Showroom Makan Luxury Motors</p>
            <h1 className="mt-4 font-serif text-5xl font-medium leading-[0.92] tracking-[-0.04em] text-white sm:text-7xl">
              {car.name}
            </h1>
            {car.subtitle ? <p className="mt-5 text-sm uppercase tracking-[0.22em] text-slate-300">{car.subtitle}</p> : null}
            {car.price ? <p className="mt-6 text-3xl font-semibold text-[#e3c58e] sm:text-4xl">{car.price}</p> : null}
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-200 sm:text-lg">
              Stock reel, presentation premium, galeries detaillees et accompagnement personnalise pour chaque
              vehicule disponible chez Makan Luxury Motors.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/vente" className="inline-flex items-center justify-center rounded-full border border-white bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#ececec]">
                Voir tout le stock
              </Link>
              <a
                href={getWhatsAppHref(car.whatsapp, car.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-[#c9a96d]/35 bg-[#c9a96d] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#d8b97e]"
              >
                Contacter sur WhatsApp
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.015))] p-3 shadow-[0_35px_120px_-55px_rgba(0,0,0,0.95)]">
            <div className="flex min-h-[340px] items-center justify-center rounded-[28px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_55%),linear-gradient(180deg,#0a0d14_0%,#05070c_100%)] px-4 py-6 sm:min-h-[520px] sm:px-6 sm:py-8 lg:min-h-[580px] lg:px-8">
              <img
                src={car.gallery[0]}
                alt={car.name}
                className="h-full max-h-[290px] w-full rounded-[28px] object-contain object-center sm:max-h-[460px] lg:max-h-[520px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
