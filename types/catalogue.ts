import type { ShowroomCar } from './showroom'
import type source from '@/content/catalogue.json'
export type LocaleText = Omit<ShowroomCar, 'id' | 'brand' | 'model' | 'price' | 'whatsapp' | 'gallery' | 'illustrativeImages'>
export interface CatalogueVehicle {
  id: string; slug: string; brand: string; model: string; trim: string
  year: number | null; registrationDate: string; mileageKm: number | null; mileageNote: string; priceMAD: number | null
  status: 'available' | 'coming-soon' | 'sold' | 'unavailable'; visibility: 'public' | 'hidden'; featured: boolean
  photos: { path: string; illustrative: boolean; alt: Record<'fr' | 'en' | 'ar', string> }[]
  text: Record<'fr' | 'en' | 'ar', LocaleText>
}
export interface Catalogue {
  schemaVersion: 1; revision: number; updatedAt: string
  contact: { name: string; phone: string; whatsapp: string; email: string; location: Record<'fr'|'en'|'ar',string>; instagram: string; facebook: string; mapsUrl: string }
  featuredIds: string[]
  showroom: typeof source.showroom
  vehicles: CatalogueVehicle[]
}
