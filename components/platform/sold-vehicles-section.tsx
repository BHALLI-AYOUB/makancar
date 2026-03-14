'use client'

import { CheckCircle2 } from 'lucide-react'
import { useCurrentLocale } from '@/lib/i18n/client'

const copy = {
  fr: {
    eyebrow: 'Références',
    title: 'Véhicules vendus',
    description: 'Une structure premium prête à présenter prochainement nos dernières ventes et configurations livrées.',
    empty: 'Nos dernières ventes seront bientôt présentées ici.',
  },
  en: {
    eyebrow: 'References',
    title: 'Sold vehicles',
    description: 'A premium structure ready to showcase our latest completed sales and delivered configurations soon.',
    empty: 'Our latest sold vehicles will be presented here soon.',
  },
  ar: {
    eyebrow: 'مراجع',
    title: 'السيارات المباعة',
    description: 'هيكل فاخر جاهز لعرض أحدث عمليات البيع والتسليم قريبًا.',
    empty: 'سيتم عرض آخر السيارات المباعة هنا قريبًا.',
  },
} as const

export function SoldVehiclesSection() {
  const locale = useCurrentLocale()
  const section = copy[locale]

  return (
    <section className="section-shell py-16 sm:py-20">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.35em] text-[#e3c58e]">{section.eyebrow}</p>
        <h2 className="mt-3 font-serif text-4xl font-medium tracking-[-0.03em] text-white sm:text-6xl">{section.title}</h2>
        <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">{section.description}</p>
      </div>

      <div className="mt-10 rounded-[32px] border border-dashed border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))] p-8 text-center shadow-[0_24px_80px_-44px_rgba(0,0,0,0.95)] backdrop-blur-xl sm:p-12">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#c9a96d]/25 bg-[#0a0d14] text-[#e3c58e] shadow-[0_0_0_5px_rgba(201,169,109,0.05)]">
          <CheckCircle2 size={28} />
        </span>
        <p className="mt-6 font-serif text-3xl text-white sm:text-4xl">{section.empty}</p>
      </div>
    </section>
  )
}
