'use client'
import { useShowroomContent } from '@/components/platform/showroom-context'

import { ArrowUpRight, Quote } from 'lucide-react'
import { Reveal } from '@/components/platform/reveal'
import { useBusiness } from '@/components/platform/showroom-context'


export function HomeReviews() {
  const business = useBusiness()
  const c = useShowroomContent('reviews')

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
