'use client'
import { useShowroomContent } from '@/components/platform/showroom-context'

import Link from 'next/link'
import { ArrowUpRight, Check, MapPin } from 'lucide-react'
import { useCurrentLocale } from '@/lib/i18n/client'
import { withLocalePath } from '@/lib/i18n/config'
import { Reveal } from '@/components/platform/reveal'
import { ShowroomImage } from '@/components/platform/showroom-image'
import type { ShowroomCar } from '@/types/showroom'


export function HomeExperience({ soldCars }: { soldCars: ShowroomCar[] }) {
  const locale = useCurrentLocale()
  const c = useShowroomContent('experience')
  return <>
    <section className="home-experience" aria-labelledby="experience-title">
      <div className="section-shell experience-layout">
        <Reveal className="experience-copy">
          <p className="makan-eyebrow">{c.eyebrow}</p>
          <h2 id="experience-title" className="makan-heading">{c.title}<br /><em>{c.accent}</em></h2>
          <p className="experience-description">{c.text}</p>
          <ul>{c.pillars.map(pillar => <li key={pillar}><Check size={16} /><span>{pillar}</span></li>)}</ul>
          <a href="#contact" className="makan-text-link">{c.visit}<ArrowUpRight size={18} /></a>
        </Reveal>
        <Reveal className="experience-visual" delay={100}>
          <ShowroomImage src="/vehicles/tiguan-elegance-2022/interior.webp" alt={locale === 'ar' ? 'مقصورة فولكس فاغن تيغوان' : 'Volkswagen Tiguan — intérieur Alcantara'} loading="lazy" className="experience-image" />
          <div className="experience-caption"><span>MAKAN</span><p>{c.detail}</p></div>
          <span className="experience-frame" aria-hidden="true" />
        </Reveal>
      </div>
    </section>
    <section className="home-sourcing section-shell">
      <Reveal className="sourcing-panel">
        <img src="/background.png" alt="" loading="lazy" className="sourcing-background" />
        <div className="sourcing-shade" />
        <div className="sourcing-content"><p className="makan-eyebrow">{c.sourcing}</p><h2 className="makan-heading">{c.sourcingTitle}<br /><em>{c.sourcingAccent}</em></h2><p>{c.sourcingText}</p><Link href={withLocalePath('/recherche-personnalisee', locale)} className="makan-button makan-button-gold">{c.sourcingCta}<ArrowUpRight size={18} /></Link></div>
        <span className="sourcing-location"><MapPin size={15} /> Oujda · Europe</span>
      </Reveal>
    </section>
    {soldCars.length > 0 && <section className="home-delivered section-shell">
      <Reveal><p className="makan-eyebrow">{c.soldLabel}</p><h2 className="makan-heading">{c.sold}</h2></Reveal>
      <div className="delivered-grid">{soldCars.map(car => <Reveal key={car.id}><Link href={withLocalePath(`/cars/${car.id}`, locale)} className="delivered-card"><div><ShowroomImage src={car.gallery[0]} alt={car.name} loading="lazy" /><span>{c.soldTag}</span></div><h3>{car.name}<ArrowUpRight size={20} /></h3></Link></Reveal>)}</div>
    </section>}
  </>
}
