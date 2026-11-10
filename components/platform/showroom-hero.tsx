'use client'
import { useShowroomContent } from '@/components/platform/showroom-context'


import Link from 'next/link'
import { useState } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, MapPin, ShieldCheck } from 'lucide-react'
import type { ShowroomCar } from '@/types/showroom'
import { useCurrentLocale } from '@/lib/i18n/client'
import { withLocalePath } from '@/lib/i18n/config'
import { ShowroomImage } from '@/components/platform/showroom-image'


export function ShowroomHero({ cars }: { cars: ShowroomCar[] }) {
  const locale = useCurrentLocale()
  const c = useShowroomContent('hero')
  const [active, setActive] = useState(0)
  const car = cars[active] ?? cars[0]
  if (!car) return null

  return (
    <section className="makan-hero" aria-labelledby="hero-title">
      <div className="hero-layout">
        <div className="hero-copy">
          <div className="hero-eyebrow hero-enter"><span className="gold-line" />{c.eyebrow}</div>
          <h1 id="hero-title" className="hero-title hero-enter" style={{ animationDelay: '90ms' }}>
            <span>{c.title}</span><span>{c.second}</span><em>{c.accent}</em>
          </h1>
          <p className="hero-description hero-enter" style={{ animationDelay: '180ms' }}>{c.text}</p>
          <div className="hero-actions hero-enter" style={{ animationDelay: '270ms' }}>
            <a href={withLocalePath('/vente', locale)} className="makan-button makan-button-gold">{c.stock}<ArrowUpRight size={18} /></a>
            <a href="#contact" className="makan-text-link">{c.contact}<ArrowRight size={16} /></a>
          </div>
          <div className="hero-assurance hero-enter" style={{ animationDelay: '360ms' }}><ShieldCheck size={19} /><span>{c.trust}</span></div>
          <a href="#collection" className="hero-scroll"><span><ArrowDown size={16} /></span>{c.scroll}</a>
        </div>

        <div className="hero-visual">
          <div key={car.id} className="hero-photo-wrap">
            <ShowroomImage src={car.gallery[0]} alt={car.name} className="hero-photo" fetchPriority="high" width={1200} height={900} />
          </div>
          <div className="hero-photo-shade" />
          {(car.photos?.[0]?.illustrative ?? car.illustrativeImages) && <span className="hero-illustration-label">{c.illustrative}</span>}
          <div className="hero-visual-top"><span className="hero-selection"><span />{c.selection}</span><span className="hero-location"><MapPin size={13} />{c.place}</span></div>
          <div className="hero-visual-bottom">
            <div key={car.id} className="hero-car-info" aria-live="polite" aria-atomic="true">
              <p className="hero-car-brand">{car.brand} <span> / </span> {car.year ?? car.registrationDate}</p>
              <Link href={withLocalePath(`/cars/${car.slug ?? car.id}`, locale)} className="hero-car-link"><h2>{car.model} <span>{car.version}</span></h2><ArrowUpRight size={26} /></Link>
              <div className="hero-car-footer"><p>{car.price}</p><Link href={withLocalePath(`/cars/${car.slug ?? car.id}`, locale)}>{c.details}<ArrowRight size={14} /></Link></div>
            </div>
            <div className="hero-controls" dir="ltr">
              <div className="hero-pages" aria-hidden="true"><strong>{String(active + 1).padStart(2, '0')}</strong><span /><span>{String(cars.length).padStart(2, '0')}</span></div>
              <div className="hero-controls-buttons">
                <button type="button" aria-label={c.previous} onClick={() => setActive((active - 1 + cars.length) % cars.length)}><ChevronLeft size={19} /></button>
                <button type="button" aria-label={c.next} onClick={() => setActive((active + 1) % cars.length)}><ChevronRight size={19} /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-signature-strip"><p>{c.signature}</p><div aria-label="Marques"><span>VOLKSWAGEN</span><span>MERCEDES-BENZ</span><span>SEAT</span><span>ŠKODA</span></div></div>
    </section>
  )
}
