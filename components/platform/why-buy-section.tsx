'use client'

import { BadgeCheck, ClipboardCheck, FileCheck2, ShieldCheck, Truck } from 'lucide-react'
import { useCurrentLocale } from '@/lib/i18n/client'

const copy = {
  fr: {
    eyebrow: 'Pourquoi nous choisir',
    title: 'Pourquoi acheter chez Makan Luxury Motors',
    description:
      'Makan Luxury Motors vous accompagne avec exigence, transparence et professionnalisme à chaque étape de votre achat.',
    items: [
      { title: 'Véhicules vérifiés', text: 'Chaque véhicule présenté fait l’objet d’un contrôle rigoureux avant sa mise en ligne.' },
      { title: 'Historique transparent', text: 'Nous privilégions des dossiers clairs avec un suivi cohérent du véhicule et de son entretien.' },
      { title: 'Import sécurisé', text: 'Nous sécurisons les démarches d’importation avec un process fiable et documenté.' },
      { title: 'Accompagnement administratif', text: 'Notre équipe vous guide sur les formalités et les documents jusqu’à la finalisation.' },
      { title: 'Livraison Maroc / Europe', text: 'Nous coordonnons la remise du véhicule selon votre localisation et vos contraintes.' },
    ],
  },
  en: {
    eyebrow: 'Why choose us',
    title: 'Why buy from Makan Luxury Motors',
    description:
      'Makan Luxury Motors supports you with high standards, transparency and professionalism at every stage of your purchase.',
    items: [
      { title: 'Verified vehicles', text: 'Each vehicle is carefully checked before it is presented in our selection.' },
      { title: 'Transparent history', text: 'We prioritize clear files with consistent vehicle and maintenance history.' },
      { title: 'Secure import', text: 'We secure every import process with a reliable and fully documented workflow.' },
      { title: 'Administrative support', text: 'Our team guides you through formalities and documentation until completion.' },
      { title: 'Morocco / Europe delivery', text: 'We coordinate vehicle handover according to your location and constraints.' },
    ],
  },
  ar: {
    eyebrow: 'لماذا نحن',
    title: 'لماذا تشتري من Makan Luxury Motors',
    description:
      'ترافقكم Makan Luxury Motors بمعايير عالية وشفافية واحترافية في كل مرحلة من مراحل الشراء.',
    items: [
      { title: 'سيارات مفحوصة', text: 'كل سيارة يتم عرضها تمر عبر فحص دقيق قبل إدراجها ضمن مجموعتنا.' },
      { title: 'سجل شفاف', text: 'نختار الملفات الواضحة ذات التاريخ المتماسك للسيارة وصيانتها.' },
      { title: 'استيراد آمن', text: 'نؤمن جميع مراحل الاستيراد عبر مسار موثوق وموثق بالكامل.' },
      { title: 'مرافقة إدارية', text: 'يرافقكم فريقنا في الإجراءات والوثائق حتى إتمام العملية.' },
      { title: 'تسليم في المغرب / أوروبا', text: 'ننسق تسليم السيارة وفق موقعكم ومتطلباتكم الخاصة.' },
    ],
  },
} as const

const icons = [ShieldCheck, FileCheck2, ClipboardCheck, BadgeCheck, Truck]

export function WhyBuySection() {
  const locale = useCurrentLocale()
  const section = copy[locale]

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,rgba(201,169,109,0.08),transparent_28%),linear-gradient(180deg,#040507_0%,#070b12_100%)] py-16 sm:py-20">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:46px_46px] opacity-20" />
      <div className="section-shell relative z-10">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.35em] text-[#e3c58e]">{section.eyebrow}</p>
          <h2 className="mt-3 font-serif text-4xl font-medium tracking-[-0.03em] text-white sm:text-6xl">{section.title}</h2>
          <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">{section.description}</p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {section.items.map((item, index) => {
            const Icon = icons[index]

            return (
              <article
                key={item.title}
                className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 shadow-[0_24px_80px_-44px_rgba(0,0,0,0.95)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-[#c9a96d]/35"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#c9a96d]/25 bg-[#0a0d14] text-[#e3c58e] shadow-[0_0_0_4px_rgba(201,169,109,0.05)]">
                  <Icon size={24} />
                </span>
                <h3 className="mt-6 font-serif text-3xl text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">{item.text}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
