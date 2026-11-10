export interface ShowroomSpec {
  label: string
  value: string
}

export interface ShowroomFeatureGroup {
  title: string
  items: string[]
}

export interface ShowroomCar {
  id: string
  slug?: string
  priceMAD?: number | null
  mileageKm?: number | null
  year?: number | null
  registrationDate?: string
  status?: 'available' | 'coming-soon' | 'sold' | 'unavailable'
  featured?: boolean
  photos?: { path: string; illustrative: boolean; alt: Record<'fr' | 'en' | 'ar', string> }[]
  name: string
  heroTitle?: string
  brand?: string
  model?: string
  version?: string
  subtitle?: string
  price?: string
  whatsapp: string
  gallery: string[]
  illustrativeImages?: boolean
  badges: string[]
  summary: ShowroomSpec[]
  featureGroups: ShowroomFeatureGroup[]
  sellingPoints: string[]
  availabilityLabel?: string
  description?: string
  presentation?: string[]
  heroSubtitle?: string
  heroDescription?: string
  availabilityNote?: string
}
