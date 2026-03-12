'use client'

import { ShieldCheck, FileCheck2, ConciergeBell, SearchCheck } from 'lucide-react'
import { useCurrentLocale, useTranslations } from '@/lib/i18n/client'

const reassuranceCopy = {
  fr: [
    { title: 'Véhicules sélectionnés et vérifiés', copy: "Chaque véhicule fait l'objet d'une sélection rigoureuse." },
    { title: 'Historique et transparence', copy: "Informations claires sur l'état, le kilométrage et l'entretien." },
    { title: 'Accompagnement personnalisé', copy: "Un suivi complet du premier contact jusqu'à la livraison." },
    { title: 'Recherche sur mesure', copy: 'Nous trouvons le véhicule correspondant exactement à vos critères.' },
  ],
  en: [
    { title: 'Selected and verified vehicles', copy: 'Each vehicle is chosen through a rigorous selection process.' },
    { title: 'History and transparency', copy: 'Clear information on condition, mileage and maintenance history.' },
    { title: 'Personalized support', copy: 'Complete assistance from first contact through final delivery.' },
    { title: 'Tailored search', copy: 'We find the vehicle that precisely matches your criteria.' },
  ],
  ar: [
    { title: 'سيارات مختارة ومفحوصة', copy: 'كل سيارة تخضع لعملية اختيار دقيقة ومراجعة صارمة.' },
    { title: 'الشفافية والسجل', copy: 'معلومات واضحة حول الحالة، وعدد الكيلومترات، وسجل الصيانة.' },
    { title: 'مرافقة شخصية', copy: 'متابعة كاملة من أول تواصل إلى غاية التسليم.' },
    { title: 'بحث حسب الطلب', copy: 'نعثر على السيارة المطابقة تمامًا لمعاييركم.' },
  ],
} as const

const icons = [ShieldCheck, FileCheck2, ConciergeBell, SearchCheck]

export function ReassuranceSection() {
  const locale = useCurrentLocale()
  const t = useTranslations()
  const items = reassuranceCopy[locale]

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,rgba(201,169,109,0.08),transparent_28%),linear-gradient(180deg,#040507_0%,#070b12_100%)] py-16 sm:py-20">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] opacity-20" />
      <div className="section-shell relative z-10">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.35em] text-[#e3c58e]">{t('home.reassurance.eyebrow')}</p>
          <h2 className="mt-3 font-serif text-4xl font-medium tracking-[-0.03em] text-white sm:text-6xl">{t('home.reassurance.title')}</h2>
          <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">{t('home.reassurance.description')}</p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item, index) => {
            const Icon = icons[index]

            return (
              <article
                key={item.title}
                className="group rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 shadow-[0_24px_80px_-44px_rgba(0,0,0,0.95)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-[#c9a96d]/35"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#c9a96d]/25 bg-[#0a0d14] text-[#e3c58e] shadow-[0_0_0_4px_rgba(201,169,109,0.05)]">
                  <Icon size={24} />
                </span>
                <h3 className="mt-6 font-serif text-3xl text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">{item.copy}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
