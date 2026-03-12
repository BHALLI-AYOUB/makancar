import { getShowroomCars } from '@/lib/data/showroom-stock'

export type AdminInventoryStatus = 'Disponible' | 'Disponible prochainement' | 'Indisponible'
export type AdminInventoryCategory = 'vente' | 'location'

export interface AdminInventoryCar {
  id: string
  title: string
  subtitle: string
  brand: string
  model: string
  year: string
  price: string
  mileage: string
  transmission: string
  fuel: string
  power: string
  status: AdminInventoryStatus
  category: AdminInventoryCategory
  available: boolean
  location: string
  registration: string
  customs: string
  description: string
  features: string[]
  sellingPoints: string[]
  badges: string[]
  whatsapp: string
  gallery: string[]
}

function getSummaryValue(summary: { label: string; value: string }[], labelPart: string) {
  return summary.find((item) => item.label.toLowerCase().includes(labelPart.toLowerCase()))?.value ?? ''
}

export function getAdminInventoryCars(): AdminInventoryCar[] {
  return getShowroomCars().map((car) => {
    const mergedFeatures = car.featureGroups.flatMap((group) => group.items)
    const status =
      car.availabilityLabel ??
      (car.badges.some((badge) => badge.toLowerCase().includes('prochainement'))
        ? 'Disponible prochainement'
        : 'Disponible')

    const defaultDescription =
      car.sellingPoints.length > 0
        ? car.sellingPoints.join(' - ')
        : 'Vehicule premium disponible chez Makan Luxury Motors.'

    return {
      id: car.id,
      title: car.name,
      subtitle: car.subtitle ?? car.version ?? '',
      brand: car.brand ?? car.name.split(' ')[0] ?? '',
      model: car.model ?? car.name.replace(`${car.name.split(' ')[0]} `, ''),
      year:
        getSummaryValue(car.summary, 'annee') ||
        getSummaryValue(car.summary, 'date modele') ||
        getSummaryValue(car.summary, 'immatriculation') ||
        '',
      price: car.price ?? 'Prix sur demande',
      mileage: getSummaryValue(car.summary, 'kilometrage'),
      transmission: getSummaryValue(car.summary, 'transmission'),
      fuel: getSummaryValue(car.summary, 'moteur').includes('Diesel') ? 'Diesel' : '',
      power:
        getSummaryValue(car.summary, 'moteur').match(/\(([^)]+)\)/)?.[1] ??
        (getSummaryValue(car.summary, 'moteur').includes('2.0 TDI') ? '2.0 TDI' : ''),
      status: status as AdminInventoryStatus,
      category: 'vente',
      available: status !== 'Indisponible',
      location: getSummaryValue(car.summary, 'localisation'),
      registration: getSummaryValue(car.summary, 'immatriculation'),
      customs: getSummaryValue(car.summary, 'dedouanement') || getSummaryValue(car.summary, 'diwana'),
      description: car.description ?? defaultDescription,
      features: mergedFeatures,
      sellingPoints: car.sellingPoints,
      badges: car.badges,
      whatsapp: car.whatsapp,
      gallery: car.gallery,
    }
  })
}

