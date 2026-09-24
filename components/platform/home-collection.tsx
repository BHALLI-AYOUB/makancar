'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { ShowroomCar } from '@/types/showroom'
import { useCurrentLocale } from '@/lib/i18n/client'
import { withLocalePath } from '@/lib/i18n/config'
import { ShowroomCard } from '@/components/platform/showroom-card'
import { Reveal } from '@/components/platform/reveal'

const copy = {
  fr: { eyebrow: '01 — Notre collection', title: 'Votre prochaine', accent: 'évidence.', description: 'Une sélection qui privilégie le caractère, le confort et le plaisir de conduire.', all: 'Tous les véhicules', available: 'véhicules dans la sélection', catalog: 'Voir le catalogue complet' },
  en: { eyebrow: '01 — Our collection', title: 'Your next', accent: 'great drive.', description: 'A collection chosen for its character, comfort and the pleasure of driving.', all: 'All vehicles', available: 'vehicles in the collection', catalog: 'Explore the full catalogue' },
  ar: { eyebrow: '01 — مجموعتنا', title: 'سيارتك القادمة،', accent: 'اختيار مميز.', description: 'مجموعة نختارها لشخصيتها وراحتها ومتعة قيادتها.', all: 'جميع السيارات', available: 'سيارات ضمن المجموعة', catalog: 'تصفح المجموعة كاملة' },
}

export function HomeCollection({ cars }: { cars: ShowroomCar[] }) {
  const locale = useCurrentLocale()
  const c = copy[locale]
  const [brand, setBrand] = useState('all')
  const brands = Array.from(new Set(cars.map(car => car.brand).filter((brand): brand is string => Boolean(brand))))
  const filtered = brand === 'all' ? cars : cars.filter(car => car.brand === brand)
  return (
    <section id="collection" className="home-collection section-shell" aria-labelledby="collection-title">
      <Reveal className="collection-heading">
        <div><p className="makan-eyebrow">{c.eyebrow}</p><h2 id="collection-title" className="makan-heading">{c.title}<br /><em>{c.accent}</em></h2></div>
        <p className="collection-description">{c.description}</p>
      </Reveal>
      <div className="collection-toolbar">
        <div className="collection-filters" role="group" aria-label={c.all}>
          {['all', ...brands].map(item => <button type="button" key={item} aria-pressed={brand === item} onClick={() => setBrand(item)}>{item === 'all' ? c.all : item}<span>{item === 'all' ? cars.length : cars.filter(car => car.brand === item).length}</span></button>)}
        </div>
        <p aria-live="polite">{String(filtered.length).padStart(2, '0')} {c.available}</p>
      </div>
      <div className="home-car-grid" key={brand}>
        {filtered.map((car, index) => <Reveal key={car.id} delay={index % 2 * 90}><ShowroomCard car={car} /></Reveal>)}
      </div>
      <div className="collection-bottom"><Link href={withLocalePath('/vente', locale)} className="makan-button makan-button-outline">{c.catalog}<ArrowUpRight size={18} /></Link></div>
    </section>
  )
}
