import 'server-only'
import { getCatalogue } from '@/lib/catalogue'
import type { Locale } from '@/lib/i18n/config'
import type { ShowroomCar } from '@/types/showroom'
import type { CatalogueVehicle } from '@/types/catalogue'
import { money, STATUS_LABELS } from '@/shared/catalogue.mjs'
export { getWhatsAppHref } from '@/lib/contact'
function toShowroomCar(v: CatalogueVehicle, locale: Locale): ShowroomCar {
  const t = v.text[locale]
  return { ...t, id: v.id, slug: v.slug, brand: v.brand, model: v.model, version: v.trim,
    price: money(v.priceMAD, locale), priceMAD: v.priceMAD, mileageKm: v.mileageKm, year: v.year, registrationDate: v.registrationDate,
    status: v.status, featured: v.featured, whatsapp: getCatalogue().contact.whatsapp,
    gallery: v.photos.map(p => p.path), photos: v.photos, illustrativeImages: v.photos.some(p => p.illustrative),
    availabilityLabel: STATUS_LABELS[locale][v.status],
  }
}
export function getShowroomCars(locale: Locale = 'fr') { return getCatalogue().vehicles.filter(v => v.visibility === 'public').map(v => toShowroomCar(v, locale)) }
export function getShowroomCarById(id: string, locale: Locale = 'fr') {
  const v = getCatalogue().vehicles.find(v => v.visibility === 'public' && (v.id === id || v.slug === id))
  return v ? toShowroomCar(v, locale) : null
}
export function getFeaturedShowroomCars(locale: Locale = 'fr') {
  const cars = getShowroomCars(locale)
  const featured = getCatalogue().featuredIds.map(id => cars.find(c => c.id === id)).filter((c): c is ShowroomCar => !!c)
  return { hero: featured[0] ?? cars.find(c => c.status === 'available') ?? cars[0], secondary: cars.filter(c => c.id !== featured[0]?.id), featured }
}
