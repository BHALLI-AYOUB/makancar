'use client'

import Link from 'next/link'
import { ArrowUpRight, Gauge, CalendarDays, MessageCircle } from 'lucide-react'
import type { ShowroomCar } from '@/types/showroom'
import { getWhatsAppHref } from '@/lib/data/showroom-stock'
import { ShowroomCardMedia } from '@/components/platform/showroom-card-media'
import { useCurrentLocale, useTranslations } from '@/lib/i18n/client'

export function ShowroomCard({ car }: { car: ShowroomCar }) {
  const locale = useCurrentLocale()
  const t = useTranslations()
  const mileage = car.summary.find(item => item.label.toLowerCase().includes('kilom'))?.value
  const status = car.availabilityLabel ?? car.badges[0]
  const isSold = car.badges.some(badge => badge.toLowerCase().includes('vendu'))
  const year = car.summary[0]?.value

  return (
    <article className="vehicle-card">
      <ShowroomCardMedia images={car.gallery} alt={car.name} sold={isSold} illustrative={car.illustrativeImages} />
      <div className="vehicle-card-body">
        <div className="vehicle-card-eyebrow"><span>{car.brand}</span><span className="vehicle-status"><i />{status}</span></div>
        <Link href={`/${locale}/cars/${car.id}`} className="vehicle-title-link"><h3>{car.name}</h3><ArrowUpRight size={24} strokeWidth={1.3} /></Link>
        <p className="vehicle-version">{car.version ?? car.subtitle}</p>
        <div className="vehicle-specs">{year && <span><CalendarDays size={15} />{year}</span>}{mileage && <span><Gauge size={15} />{mileage}</span>}</div>
        <div className="vehicle-card-footer"><p>{car.price ?? t('common.labels.priceOnRequest')}</p><div><a href={getWhatsAppHref(car.whatsapp, car.name)} target="_blank" rel="noopener noreferrer" className="vehicle-whatsapp" aria-label={`WhatsApp — ${car.name}`}><MessageCircle size={19} /></a><Link href={`/${locale}/cars/${car.id}`} className="vehicle-details">{t('common.actions.viewDetails')}<ArrowUpRight size={15} /></Link></div></div>
      </div>
    </article>
  )
}
