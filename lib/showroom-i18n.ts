import type { Locale } from '@/lib/i18n/config'
import type { ShowroomCar, ShowroomFeatureGroup, ShowroomSpec } from '@/types/showroom'

const directMap = {
  en: new Map<string, string>([
    ['Prix sur demande', 'Price on request'],
    ['Disponible', 'Available'],
    ['Disponible immédiatement', 'Available immediately'],
    ['Disponible très bientôt', 'Available very soon'],
    ['Véhicule très propre', 'Very clean vehicle'],
    ['Aucun frais à prévoir', 'No expenses to plan for'],
    ['Kilométrage certifié', 'Certified mileage'],
    ['Véhicule en parfait état', 'Vehicle in perfect condition'],
    ['Très bien équipée', 'Very well equipped'],
    ['Pack AMG', 'AMG Pack'],
    ['Full Options', 'Full options'],
    ['Série Sport - Pack Black Night', 'Sport Series - Black Night Pack'],
    ['Version Haut de Gamme', 'High-end version'],
    ['Diwana 2026 - Version Confortline', 'Customs 2026 - Confortline version'],
    ['Pack AMG / Full Options', 'AMG Pack / Full options'],
    [
      'Stock réel, présentation haut de gamme et accompagnement personnalisé pour chaque véhicule sélectionné par Makan Luxury Motors.',
      'Real inventory, premium presentation and personalized support for every vehicle selected by Makan Luxury Motors.',
    ],
    ['Mercedes-Benz', 'Mercedes-Benz'],
    ['Oujda / Berkane', 'Oujda / Berkane'],
    ['Berkane', 'Berkane'],
    ["166 000 km d'origine", '166,000 km original mileage'],
    ["185 000 km d'origine", '185,000 km original mileage'],
    ["139.000 km d'origine", '139,000 km original mileage'],
    ['148.000 km', '148,000 km'],
    ['117.000 km', '117,000 km'],
  ]),
  ar: new Map<string, string>([
    ['Prix sur demande', 'السعر عند الطلب'],
    ['Disponible', 'متوفر'],
    ['Disponible immédiatement', 'متوفر فورًا'],
    ['Disponible très bientôt', 'متوفر قريبًا جدًا'],
    ['Véhicule très propre', 'سيارة نظيفة جدًا'],
    ['Aucun frais à prévoir', 'لا توجد مصاريف إضافية متوقعة'],
    ['Kilométrage certifié', 'كيلومترات موثقة'],
    ['Véhicule en parfait état', 'السيارة في حالة ممتازة'],
    ['Très bien équipée', 'مجهزة بشكل ممتاز'],
    ['Pack AMG', 'باك AMG'],
    ['Full Options', 'جميع التجهيزات'],
    ['Série Sport - Pack Black Night', 'سلسلة سبورت - باك بلاك نايت'],
    ['Version Haut de Gamme', 'نسخة عالية التجهيز'],
    ['Diwana 2026 - Version Confortline', 'ديوانة 2026 - نسخة Confortline'],
    ['Pack AMG / Full Options', 'باك AMG / جميع التجهيزات'],
    [
      'Stock réel, présentation haut de gamme et accompagnement personnalisé pour chaque véhicule sélectionné par Makan Luxury Motors.',
      'مخزون حقيقي، عرض راقٍ ومرافقة شخصية لكل سيارة يتم اختيارها من طرف Makan Luxury Motors.',
    ],
    ['Mercedes-Benz', 'مرسيدس-بنز'],
    ['Oujda / Berkane', 'وجدة / بركان'],
    ['Berkane', 'بركان'],
    ["166 000 km d'origine", '166000 كلم أصلية'],
    ["185 000 km d'origine", '185000 كلم أصلية'],
    ["139.000 km d'origine", '139000 كلم أصلية'],
    ['148.000 km', '148000 كلم'],
    ['117.000 km', '117000 كلم'],
  ]),
} as const

export function translateShowroomText(value: string | undefined, locale: Locale) {
  if (!value || locale === 'fr') return value
  return directMap[locale].get(value) ?? value
}

export function getLocalizedCar(car: ShowroomCar, locale: Locale): ShowroomCar {
  if (locale === 'fr') return car

  const summary: ShowroomSpec[] = car.summary.map((item) => ({
    label: translateShowroomText(item.label, locale) ?? item.label,
    value: translateShowroomText(item.value, locale) ?? item.value,
  }))

  const featureGroups: ShowroomFeatureGroup[] = car.featureGroups.map((group) => ({
    title: translateShowroomText(group.title, locale) ?? group.title,
    items: group.items.map((item) => translateShowroomText(item, locale) ?? item),
  }))

  return {
    ...car,
    subtitle: translateShowroomText(car.subtitle, locale),
    price: translateShowroomText(car.price, locale),
    badges: car.badges.map((badge) => translateShowroomText(badge, locale) ?? badge),
    summary,
    featureGroups,
    sellingPoints: car.sellingPoints.map((point) => translateShowroomText(point, locale) ?? point),
    availabilityLabel: translateShowroomText(car.availabilityLabel, locale),
    description: translateShowroomText(car.description, locale),
    availabilityNote: translateShowroomText(car.availabilityNote, locale),
    heroDescription: translateShowroomText(car.heroDescription, locale),
  }
}
