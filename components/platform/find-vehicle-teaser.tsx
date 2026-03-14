'use client'

import Link from 'next/link'
import { ArrowUpRight, SearchCheck } from 'lucide-react'
import { useCurrentLocale } from '@/lib/i18n/client'
import { withLocalePath } from '@/lib/i18n/config'

const copy = {
  fr: {
    eyebrow: 'Recherche personnalisée',
    title: 'Trouver mon véhicule',
    description:
      'Vous ne trouvez pas le véhicule que vous recherchez dans notre stock ? Makan Luxury Motors peut le trouver pour vous parmi plusieurs pays européens selon vos critères.',
    cta: 'Trouver mon véhicule',
  },
  en: {
    eyebrow: 'Tailored search',
    title: 'Find my vehicle',
    description:
      'Can’t find the vehicle you are looking for in our inventory? Makan Luxury Motors can source it for you across several European countries according to your criteria.',
    cta: 'Find my vehicle',
  },
  ar: {
    eyebrow: 'بحث مخصص',
    title: 'اعثر على سيارتي',
    description:
      'هل لم تجد السيارة التي تبحث عنها ضمن مخزوننا؟ يمكن لـ Makan Luxury Motors العثور عليها لكم من عدة دول أوروبية وفق معاييركم.',
    cta: 'اعثر على سيارتي',
  },
} as const

export function FindVehicleTeaser() {
  const locale = useCurrentLocale()
  const section = copy[locale]

  return (
    <section className="section-shell py-10 sm:py-14">
      <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,rgba(201,169,109,0.14),rgba(255,255,255,0.04)_24%,rgba(255,255,255,0.02)_100%)] p-6 shadow-[0_28px_100px_-60px_rgba(0,0,0,0.95)] backdrop-blur-xl sm:p-8 lg:p-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.35em] text-[#e3c58e]">{section.eyebrow}</p>
            <div className="mt-4 flex items-start gap-4">
              <span className="mt-1 hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#c9a96d]/25 bg-[#0a0d14] text-[#e3c58e] sm:flex">
                <SearchCheck size={24} />
              </span>
              <div>
                <h2 className="font-serif text-4xl font-medium tracking-[-0.03em] text-white sm:text-5xl">{section.title}</h2>
                <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">{section.description}</p>
              </div>
            </div>
          </div>

          <Link
            href={withLocalePath('/recherche-personnalisee', locale)}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#c9a96d] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#d8b97e] sm:px-7"
          >
            {section.cta}
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}
