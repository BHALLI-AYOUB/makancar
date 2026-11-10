import type { Locale } from '@/lib/i18n/config'
import frCars from '@/locales/fr/cars.json'
import frChatbot from '@/locales/fr/chatbot.json'
import frCommon from '@/locales/fr/common.json'
import frHome from '@/locales/fr/home.json'
import frNotifications from '@/locales/fr/notifications.json'
import frSeo from '@/locales/fr/seo.json'
import enCars from '@/locales/en/cars.json'
import enChatbot from '@/locales/en/chatbot.json'
import enCommon from '@/locales/en/common.json'
import enHome from '@/locales/en/home.json'
import enNotifications from '@/locales/en/notifications.json'
import enSeo from '@/locales/en/seo.json'
import arCars from '@/locales/ar/cars.json'
import arChatbot from '@/locales/ar/chatbot.json'
import arCommon from '@/locales/ar/common.json'
import arHome from '@/locales/ar/home.json'
import arNotifications from '@/locales/ar/notifications.json'
import arSeo from '@/locales/ar/seo.json'

const dictionaries = {
  fr: {
    common: frCommon,
    home: frHome,
    cars: frCars,
    chatbot: frChatbot,
    notifications: frNotifications,
    seo: frSeo,
  },
  en: {
    common: enCommon,
    home: enHome,
    cars: enCars,
    chatbot: enChatbot,
    notifications: enNotifications,
    seo: enSeo,
  },
  ar: {
    common: arCommon,
    home: arHome,
    cars: arCars,
    chatbot: arChatbot,
    notifications: arNotifications,
    seo: arSeo,
  },
} as const

export function getMessages(locale: Locale) {
  return dictionaries[locale]
}

export type Messages = ReturnType<typeof getMessages>
