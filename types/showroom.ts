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
  name: string
  heroTitle?: string
  brand?: string
  model?: string
  version?: string
  subtitle?: string
  price?: string
  whatsapp: string
  gallery: string[]
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
