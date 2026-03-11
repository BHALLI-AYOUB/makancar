'use client'

import { useEffect, useRef, useState } from 'react'
import { Quote, Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Yassine B.',
    city: 'Oujda',
    review:
      'Tres satisfait de mon achat. Vehicule conforme, service serieux et accompagnement professionnel du debut a la fin.',
    avatar: 'https://i.pravatar.cc/160?img=12',
  },
  {
    name: 'Mehdi A.',
    city: 'Berkane',
    review:
      'Accueil premium, voiture impeccable et transaction tres fluide. Je recommande vivement Makan Luxury Motors.',
    avatar: 'https://i.pravatar.cc/160?img=14',
  },
  {
    name: 'Sara L.',
    city: 'Casablanca',
    review:
      'Presentation soignee, stock reel et equipe a l ecoute. Une tres belle experience d achat.',
    avatar: 'https://i.pravatar.cc/160?img=32',
  },
  {
    name: 'Imad K.',
    city: 'Rabat',
    review:
      'Vehicule en parfait etat, dossier clair et excellent suivi. Merci pour le professionnalisme.',
    avatar: 'https://i.pravatar.cc/160?img=19',
  },
  {
    name: 'Hamza R.',
    city: 'Nador',
    review:
      "Service tres professionnel, vehicule irreprochable et accompagnement serieux. Une adresse de confiance pour un achat premium.",
    avatar: 'https://i.pravatar.cc/160?img=17',
  },
  {
    name: 'Salma E.',
    city: 'Fes',
    review:
      "Tres belle experience chez Makan Luxury Motors. L equipe est reactive, transparente et le vehicule etait exactement comme presente.",
    avatar: 'https://i.pravatar.cc/160?img=44',
  },
  {
    name: 'Anas M.',
    city: 'Tanger',
    review:
      'Transaction rapide, vehicule propre et excellent suivi apres prise de contact. Je recommande fortement.',
    avatar: 'https://i.pravatar.cc/160?img=22',
  },
  {
    name: 'Lina T.',
    city: 'Marrakech',
    review:
      "Showroom elegant, presentation soignee et service haut de gamme. Je suis tres satisfaite de mon achat.",
    avatar: 'https://i.pravatar.cc/160?img=48',
  },
]

export function TestimonialsSection() {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!ref.current || visible) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setVisible(true)
        observer.disconnect()
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    )

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
        <div
          className={`max-w-3xl transition duration-700 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        >
          <p className="text-xs uppercase tracking-[0.35em] text-[#e3c58e]">Temoignages clients</p>
          <h2 className="mt-3 font-serif text-4xl font-medium tracking-[-0.03em] text-white sm:text-6xl">
            Ils nous ont fait confiance.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">
            L experience Makan Luxury Motors repose sur la transparence, la qualite des vehicules et un
            accompagnement premium a chaque etape.
          </p>
        </div>

        <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 md:mt-10 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:pb-0 xl:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <article
              key={testimonial.name}
              className={`min-w-[84vw] snap-start rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))] p-5 shadow-[0_24px_80px_-44px_rgba(0,0,0,0.95)] backdrop-blur-xl transition duration-700 hover:-translate-y-1 hover:border-[#c9a96d]/35 sm:min-w-[296px] sm:p-6 md:min-w-0 md:rounded-[30px] ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="relative inline-flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#c9a96d]/30 bg-[#0a0d14] shadow-[0_0_0_4px_rgba(227,197,142,0.06)] sm:h-14 sm:w-14">
                    <img src={testimonial.avatar} alt={testimonial.name} className="h-full w-full object-cover" />
                  </span>
                  <div>
                    <p className="font-serif text-xl text-white sm:text-2xl">{testimonial.name}</p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.28em] text-slate-400">
                      {testimonial.city}
                    </p>
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

              <p className="mt-5 text-sm leading-7 text-slate-200">{testimonial.review}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
