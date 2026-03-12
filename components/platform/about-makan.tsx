'use client'

import { Award, Clock3, ShieldCheck, Sparkles } from 'lucide-react'
import { useCurrentLocale, useTranslations } from '@/lib/i18n/client'

const pillarsByLocale = {
  fr: [
    'Sélection rigoureuse, vérification des véhicules et accompagnement transparent du premier contact jusqu’à la livraison.',
    'Une sélection premium de véhicules de prestige, SUV haut de gamme et configurations soigneusement choisies pour une clientèle exigeante.',
    'Stock disponible, import sur mesure et suivi administratif complet afin de réduire les délais et sécuriser chaque projet.',
    'Conseil personnalisé, sourcing international et présentation soignée afin de transformer une simple recherche en véritable expérience automobile.',
  ],
  en: [
    'Rigorous selection, vehicle verification and transparent guidance from first contact to final delivery.',
    'A premium selection of prestige vehicles, high-end SUVs and carefully chosen configurations for demanding clients.',
    'Available inventory, bespoke import and full administrative follow-up to reduce delays and secure each project.',
    'Personalized advice, international sourcing and curated presentation to transform a simple search into a true automotive experience.',
  ],
  ar: [
    'اختيار صارم، وفحص دقيق للسيارات، ومرافقة شفافة من أول تواصل إلى غاية التسليم.',
    'مجموعة راقية من السيارات الفاخرة وSUV عالية المستوى وتجهيزات مختارة بعناية لعملاء يبحثون عن التميز.',
    'مخزون متوفر، واستيراد حسب الطلب، ومتابعة إدارية كاملة من أجل تقليص الآجال وتأمين كل مشروع.',
    'استشارة شخصية، وبحث دولي، وعرض أنيق لتحويل البحث البسيط إلى تجربة سيارات حقيقية راقية.',
  ],
} as const

const titlesByLocale = {
  fr: ['Confiance', 'Excellence', 'Accompagnement', 'Expérience premium'],
  en: ['Trust', 'Excellence', 'Support', 'Premium experience'],
  ar: ['الثقة', 'التميّز', 'المرافقة', 'تجربة فاخرة'],
} as const

const gridHeadingByLocale = {
  fr: 'Excellence automobile',
  en: 'Automotive excellence',
  ar: 'التميّز في عالم السيارات',
} as const

const pillarsMeta = [
  { icon: ShieldCheck },
  { icon: Award },
  { icon: Clock3 },
  { icon: Sparkles },
]

const aboutBody = {
  fr: 'Makan Luxury Motors est spécialisé dans la sélection et la commercialisation de véhicules de prestige. Notre approche repose sur l’exigence, la transparence et la discrétion. Nous proposons à chaque client une expérience fiable, élégante et parfaitement maîtrisée, qu’il recherche un véhicule de luxe prêt à rouler ou une configuration personnalisée importée selon ses exigences.',
  en: 'Makan Luxury Motors specializes in the selection and marketing of prestige vehicles. Our approach is built on high standards, transparency and discretion. We offer every client a reliable, elegant and fully controlled experience, whether they seek a luxury vehicle ready to drive or a custom imported configuration tailored to their expectations.',
  ar: 'تتخصص Makan Luxury Motors في اختيار وتسويق السيارات الفاخرة. تقوم مقاربتنا على الصرامة والشفافية والخصوصية. نوفر لكل عميل تجربة موثوقة وأنيقة ومدروسة بالكامل، سواء كان يبحث عن سيارة فاخرة جاهزة أو عن مواصفات خاصة يتم استيرادها حسب طلبه.',
} as const

const missionBody = {
  fr: 'Offrir une expérience automobile premium fondée sur la confiance, la rapidité de traitement, la qualité des véhicules et un accompagnement complet, du sourcing jusqu’à la mise à disposition finale.',
  en: 'Deliver a premium automotive experience built on trust, responsiveness, vehicle quality and full support from sourcing to final handover.',
  ar: 'تقديم تجربة سيارات فاخرة قائمة على الثقة، وسرعة التنفيذ، وجودة السيارات، ومرافقة كاملة من البحث إلى التسليم النهائي.',
} as const

export function AboutMakan() {
  const locale = useCurrentLocale()
  const t = useTranslations()
  const titles = titlesByLocale[locale]
  const copies = pillarsByLocale[locale]

  return (
    <section className="relative overflow-hidden bg-[#05080e] py-16 sm:py-20">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:42px_42px] opacity-25" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_38%)]" />

      <div className="section-shell relative z-10">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.34em] text-slate-300">{t('home.about.eyebrow')}</p>
          <h2 className="mt-4 font-serif text-4xl font-medium text-white sm:text-6xl">{t('home.about.title')}</h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">{t('home.about.description')}</p>
        </div>

        <div className="mx-auto mt-10 max-w-5xl rounded-[32px] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 shadow-[0_0_90px_-45px_rgba(255,255,255,0.18)] backdrop-blur-xl sm:p-10">
          <p className="text-base leading-8 text-slate-200">{aboutBody[locale]}</p>

          <div className="mt-8 border-t border-white/10 pt-8">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/6 text-white">
                <Award size={22} />
              </span>
              <div>
                <p className="text-3xl font-semibold text-white">{t('home.about.missionTitle')}</p>
                <p className="mt-2 text-sm leading-7 text-slate-300 sm:text-base">{missionBody[locale]}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.3em] text-[#e3c58e]">{gridHeadingByLocale[locale]}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {pillarsMeta.map((pillar, index) => {
              const Icon = pillar.icon
              return (
                <article
                  key={titles[index]}
                  className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))] p-6 backdrop-blur-xl"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-[#090d14] text-white">
                      <Icon size={24} />
                    </span>
                    <span className="rounded-full bg-white/8 px-3 py-1 text-xs font-medium text-white">{index + 1}</span>
                  </div>
                  <h3 className="mt-6 text-3xl font-semibold text-white">{titles[index]}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{copies[index]}</p>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
