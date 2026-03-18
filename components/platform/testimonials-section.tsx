'use client'

import { useEffect, useRef, useState } from 'react'
import { Quote, Star } from 'lucide-react'
import { useCurrentLocale, useTranslations } from '@/lib/i18n/client'

const testimonialsByLocale = {
  fr: [
    ['Yassine B.', 'Oujda', 'Très satisfait de mon achat. Véhicule conforme, service sérieux et accompagnement professionnel du début à la fin.'],
    ['Mehdi A.', 'Berkane', 'Accueil premium, voiture impeccable et transaction très fluide. Je recommande vivement Makan Luxury Motors.'],
    ['Sara L.', 'Casablanca', 'Présentation soignée, stock réel et équipe à l’écoute. Une très belle expérience d’achat.'],
    ['Imad K.', 'Rabat', 'Véhicule en parfait état, dossier clair et excellent suivi. Merci pour le professionnalisme.'],
    ['Hamza R.', 'Nador', 'Service très professionnel, véhicule irréprochable et accompagnement sérieux. Une adresse de confiance pour un achat premium.'],
    ['Salma E.', 'Fès', 'Très belle expérience chez Makan Luxury Motors. L’équipe est réactive, transparente et le véhicule était exactement comme présenté.'],
    ['Anas M.', 'Tanger', 'Transaction rapide, véhicule propre et excellent suivi après prise de contact. Je recommande fortement.'],
    ['Lina T.', 'Marrakech', 'Showroom élégant, présentation soignée et service haut de gamme. Je suis très satisfaite de mon achat.'],
  ],
  en: [
    ['Yassine B.', 'Oujda', 'Very satisfied with my purchase. The vehicle matched the description, the service was serious and the support was professional from start to finish.'],
    ['Mehdi A.', 'Berkane', 'Premium welcome, impeccable car and a very smooth transaction. I highly recommend Makan Luxury Motors.'],
    ['Sara L.', 'Casablanca', 'Careful presentation, real inventory and a team that truly listens. A very pleasant buying experience.'],
    ['Imad K.', 'Rabat', 'Vehicle in perfect condition, clear file and excellent follow-up. Thank you for the professionalism.'],
    ['Hamza R.', 'Nador', 'Very professional service, flawless vehicle and serious support. A trusted address for a premium purchase.'],
    ['Salma E.', 'Fes', 'A very nice experience with Makan Luxury Motors. The team is responsive, transparent and the vehicle was exactly as presented.'],
    ['Anas M.', 'Tangier', 'Fast transaction, clean vehicle and excellent follow-up after the first contact. I strongly recommend them.'],
    ['Lina T.', 'Marrakech', 'Elegant showroom, refined presentation and high-end service. I am very satisfied with my purchase.'],
  ],
  ar: [
    ['Yassine B.', 'وجدة', 'راضٍ جدًا عن عملية الشراء. السيارة مطابقة، والخدمة جادة، والمرافقة مهنية من البداية إلى النهاية.'],
    ['Mehdi A.', 'بركان', 'استقبال راقٍ، سيارة ممتازة، ومعاملة سلسة جدًا. أوصي بشدة بـ Makan Luxury Motors.'],
    ['Sara L.', 'الدار البيضاء', 'عرض أنيق، مخزون حقيقي، وفريق منصت. كانت تجربة شراء مميزة جدًا.'],
    ['Imad K.', 'الرباط', 'السيارة في حالة ممتازة، والملف واضح، والمتابعة رائعة. شكرًا على الاحترافية.'],
    ['Hamza R.', 'الناظور', 'خدمة احترافية جدًا، سيارة ممتازة، ومرافقة جدية. عنوان موثوق لاقتناء سيارة فاخرة.'],
    ['Salma E.', 'فاس', 'تجربة جميلة جدًا مع Makan Luxury Motors. الفريق سريع، شفاف، والسيارة كانت تمامًا كما تم تقديمها.'],
    ['Anas M.', 'طنجة', 'معاملة سريعة، سيارة نظيفة، ومتابعة ممتازة بعد أول تواصل. أوصي بهم بشدة.'],
    ['Lina T.', 'مراكش', 'معرض أنيق، تقديم راقٍ، وخدمة عالية المستوى. أنا راضية جدًا عن عملية الشراء.'],
  ],
} as const

const avatarsByName: Record<string, string> = {
  'Yassine B.': 'https://randomuser.me/api/portraits/men/32.jpg',
  'Mehdi A.': 'https://randomuser.me/api/portraits/men/45.jpg',
  'Sara L.': 'https://randomuser.me/api/portraits/women/44.jpg',
  'Imad K.': 'https://randomuser.me/api/portraits/men/41.jpg',
  'Hamza R.': 'https://randomuser.me/api/portraits/men/53.jpg',
  'Salma E.': 'https://randomuser.me/api/portraits/women/52.jpg',
  'Anas M.': 'https://randomuser.me/api/portraits/men/36.jpg',
  'Lina T.': 'https://randomuser.me/api/portraits/women/63.jpg',
}

export function TestimonialsSection() {
  const locale = useCurrentLocale()
  const t = useTranslations()
  const testimonials = testimonialsByLocale[locale]
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!ref.current || visible) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setVisible(true)
      observer.disconnect()
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [visible])

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[radial-gradient(circle_at_top,rgba(201,169,109,0.08),transparent_30%),linear-gradient(180deg,#040507_0%,#070b12_100%)] py-16 sm:py-20"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] opacity-20" />
      <div className="section-shell relative z-10">
        <div className={`max-w-3xl transition duration-700 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <p className="text-xs uppercase tracking-[0.35em] text-[#e3c58e]">{t('home.testimonials.eyebrow')}</p>
          <h2 className="mt-3 font-serif text-4xl font-medium tracking-[-0.03em] text-white sm:text-6xl">{t('home.testimonials.title')}</h2>
          <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">{t('home.testimonials.description')}</p>
        </div>

        <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 md:mt-10 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:pb-0 xl:grid-cols-4">
          {testimonials.map(([name, city, review], index) => (
            <article
              key={`${name}-${city}`}
              className={`min-w-[84vw] snap-start rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))] p-5 shadow-[0_24px_80px_-44px_rgba(0,0,0,0.95)] backdrop-blur-xl transition duration-700 hover:-translate-y-1 hover:border-[#c9a96d]/35 sm:min-w-[296px] sm:p-6 md:min-w-0 md:rounded-[30px] ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="relative inline-flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#c9a96d]/30 bg-[#0a0d14] shadow-[0_0_0_4px_rgba(227,197,142,0.06)] sm:h-14 sm:w-14">
                    <img src={avatarsByName[name] ?? '/placeholder-user.jpg'} alt={name} className="h-full w-full object-cover" />
                  </span>
                  <div>
                    <p className="font-serif text-xl text-white sm:text-2xl">{name}</p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.28em] text-slate-400">{city}</p>
                  </div>
                </div>

                <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#c9a96d]/25 bg-[#0a0d14] text-[#e3c58e] sm:h-11 sm:w-11">
                  <Quote size={18} />
                </span>
              </div>

              <div className="mt-6 flex items-center gap-1 text-[#e3c58e]">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star key={starIndex} size={14} fill="currentColor" />
                ))}
              </div>

              <p className="mt-5 text-sm leading-7 text-slate-200">{review}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
