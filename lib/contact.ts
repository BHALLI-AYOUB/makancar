import type { Locale } from '@/lib/i18n/config'
export function getWhatsAppHref(number: string, carName: string, locale: Locale = 'fr') {
  const digits = number.replace(/\D/g, '').replace(/^0/, '212')
  const greeting = { fr: "Bonjour, je souhaite plus d'informations concernant", en: 'Hello, I would like to enquire about', ar: 'مرحباً، أود الاستفسار عن' }[locale]
  return `https://wa.me/${digits}?text=${encodeURIComponent(`${greeting} ${carName}.`)}`
}
