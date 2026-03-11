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
  subtitle?: string
  price?: string
  whatsapp: string
  gallery: string[]
  badges: string[]
  summary: ShowroomSpec[]
  featureGroups: ShowroomFeatureGroup[]
  sellingPoints: string[]
  availabilityLabel?: string
}
