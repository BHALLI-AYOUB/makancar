'use client'
import Link from 'next/link'
import { ArrowUpRight, Gauge, CalendarDays, MessageCircle } from 'lucide-react'
import type { ShowroomCar } from '@/types/showroom'
import { getWhatsAppHref } from '@/lib/contact'
import { ShowroomCardMedia } from '@/components/platform/showroom-card-media'
import { useCurrentLocale, useTranslations } from '@/lib/i18n/client'
export function ShowroomCard({ car }: { car: ShowroomCar }) {
  const locale = useCurrentLocale(), t = useTranslations(), href=`/${locale}/cars/${car.slug ?? car.id}`
  return <article className="vehicle-card" data-vehicle-id={car.id}>
    <ShowroomCardMedia images={car.gallery} photos={car.photos} alt={car.name} sold={car.status==='sold'} illustrative={car.illustrativeImages} />
    <div className="vehicle-card-body"><div className="vehicle-card-eyebrow"><span>{car.brand}</span><span className="vehicle-status" data-status={car.status}><i/>{car.availabilityLabel}</span></div>
      <Link href={href} className="vehicle-title-link"><h3>{car.name}</h3><ArrowUpRight size={22}/></Link>
      <p className="vehicle-version">{car.version ?? car.subtitle}</p>
      <div className="vehicle-specs">{car.year&&<span><CalendarDays size={15}/>{car.registrationDate || car.year}</span>}{car.mileageKm!=null&&<span><Gauge size={15}/>{new Intl.NumberFormat(locale).format(car.mileageKm)} {locale==='ar'?'كم':'km'}</span>}</div>
      <div className="vehicle-card-footer"><p>{car.price}</p><div><a href={getWhatsAppHref(car.whatsapp,car.name,locale)} target="_blank" rel="noopener noreferrer" className="vehicle-whatsapp" aria-label={`WhatsApp — ${car.name}`}><MessageCircle size={18}/></a><Link href={href} className="vehicle-details">{t('common.actions.viewDetails')}<ArrowUpRight size={15}/></Link></div></div>
    </div>
  </article>
}
