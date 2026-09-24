'use client'

import { ArrowUpRight, Quote } from 'lucide-react'
import { useCurrentLocale } from '@/lib/i18n/client'
import { Reveal } from '@/components/platform/reveal'
import { business } from '@/lib/business'

const copy = {
  fr: {
    eyebrow: '04 — Les voix de notre communauté', title: 'Leur expérience.', accent: 'Notre plus belle signature.',
    intro: 'Quelques témoignages présentés sur notre site, autour de l’accueil, de la qualité des véhicules et de l’accompagnement.',
    note: 'Témoignages déjà publiés sur le site Makan. Les portraits sont des illustrations et ne représentent pas les auteurs.',
    cta: 'Parler de votre projet',
    reviews: [
      { name: 'Yassine B.', city: 'Oujda', quote: 'Très satisfait de mon achat. Véhicule conforme, service sérieux et accompagnement professionnel du début à la fin.', image: '/review-portraits/yassine-illustration.jpg' },
      { name: 'Sara L.', city: 'Casablanca', quote: 'Présentation soignée, stock réel et équipe à l’écoute. Une très belle expérience d’achat.', image: '/review-portraits/sara-illustration.jpg' },
      { name: 'Mehdi A.', city: 'Berkane', quote: 'Accueil premium, voiture impeccable et transaction très fluide. Je recommande vivement Makan Luxury Motors.', image: '/review-portraits/mehdi-illustration.jpg' },
    ],
  },
  en: {
    eyebrow: '04 — From our community', title: 'Their experience.', accent: 'Our finest signature.',
    intro: 'A few testimonials previously featured on our website, about the welcome, vehicle quality and personal support.',
    note: 'Testimonials previously published on the Makan website. Portraits are illustrative and do not depict the authors.',
    cta: 'Tell us about your project',
    reviews: [
      { name: 'Yassine B.', city: 'Oujda', quote: 'Very satisfied with my purchase. The vehicle matched the description, the service was serious and the support was professional from start to finish.', image: '/review-portraits/yassine-illustration.jpg' },
      { name: 'Sara L.', city: 'Casablanca', quote: 'Careful presentation, real inventory and a team that truly listens. A very pleasant buying experience.', image: '/review-portraits/sara-illustration.jpg' },
      { name: 'Mehdi A.', city: 'Berkane', quote: 'Premium welcome, impeccable car and a very smooth transaction. I highly recommend Makan Luxury Motors.', image: '/review-portraits/mehdi-illustration.jpg' },
    ],
  },
  ar: {
    eyebrow: '04 — آراء مجتمعنا', title: 'تجربتهم.', accent: 'أجمل شهادة لنا.',
    intro: 'بعض الشهادات المنشورة سابقاً على موقعنا حول الاستقبال وجودة السيارات والمرافقة الشخصية.',
    note: 'شهادات منشورة سابقاً على موقع مكان. الصور توضيحية ولا تمثل أصحاب الشهادات.',
    cta: 'حدثنا عن مشروعك',
    reviews: [
      { name: 'Yassine B.', city: 'وجدة', quote: 'راضٍ جداً عن الشراء. السيارة كما وُصفت، والخدمة جدية، والمرافقة احترافية من البداية إلى النهاية.', image: '/review-portraits/yassine-illustration.jpg' },
      { name: 'Sara L.', city: 'الدار البيضاء', quote: 'عرض أنيق، سيارات متوفرة وفريق يُحسن الاستماع. كانت تجربة شراء جميلة جداً.', image: '/review-portraits/sara-illustration.jpg' },
      { name: 'Mehdi A.', city: 'بركان', quote: 'استقبال راقٍ، سيارة ممتازة ومعاملة سلسة. أنصح بشدة بـ Makan Luxury Motors.', image: '/review-portraits/mehdi-illustration.jpg' },
    ],
  },
} as const

export function HomeReviews() {
  const locale = useCurrentLocale()
  const c = copy[locale]

  return (
    <section className="home-reviews" aria-labelledby="home-reviews-title">
      <div className="section-shell">
        <Reveal className="home-reviews-heading">
          <div><p className="makan-eyebrow">{c.eyebrow}</p><h2 id="home-reviews-title" className="makan-heading">{c.title}<br /><em>{c.accent}</em></h2></div>
          <p>{c.intro}</p>
        </Reveal>
        <div className="home-reviews-grid">
          {c.reviews.map((review, index) => (
            <Reveal key={review.name} delay={index * 90}>
              <article className="home-review-card">
                <Quote className="home-review-quote" size={31} strokeWidth={1} aria-hidden="true" />
                <blockquote>“{review.quote}”</blockquote>
                <div className="home-review-author">
                  <img src={review.image} alt="" loading="lazy" width="50" height="50" />
                  <div><strong>{review.name}</strong><span>{review.city}</span></div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="home-reviews-footer"><p>{c.note}</p><a href={business.whatsappLink} target="_blank" rel="noopener noreferrer">{c.cta}<ArrowUpRight size={17} /></a></div>
      </div>
    </section>
  )
}
