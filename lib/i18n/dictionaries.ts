import type { Locale } from '@/lib/i18n/config'
import frAuth from '@/locales/fr/auth.json'
import frCars from '@/locales/fr/cars.json'
import frChatbot from '@/locales/fr/chatbot.json'
import frCommon from '@/locales/fr/common.json'
import frDashboard from '@/locales/fr/dashboard.json'
import frHome from '@/locales/fr/home.json'
import frNotifications from '@/locales/fr/notifications.json'
import frSeo from '@/locales/fr/seo.json'
import enAuth from '@/locales/en/auth.json'
import enCars from '@/locales/en/cars.json'
import enChatbot from '@/locales/en/chatbot.json'
import enCommon from '@/locales/en/common.json'
import enDashboard from '@/locales/en/dashboard.json'
import enHome from '@/locales/en/home.json'
import enNotifications from '@/locales/en/notifications.json'
import enSeo from '@/locales/en/seo.json'
import arAuth from '@/locales/ar/auth.json'
import arCars from '@/locales/ar/cars.json'
import arChatbot from '@/locales/ar/chatbot.json'
import arCommon from '@/locales/ar/common.json'
import arDashboard from '@/locales/ar/dashboard.json'
import arHome from '@/locales/ar/home.json'
import arNotifications from '@/locales/ar/notifications.json'
import arSeo from '@/locales/ar/seo.json'

const dictionaries = {
  fr: {
    common: frCommon,
    home: frHome,
    cars: frCars,
    chatbot: frChatbot,
    dashboard: frDashboard,
    notifications: frNotifications,
    auth: frAuth,
    seo: frSeo,
  },
  en: {
    common: enCommon,
    home: enHome,
    cars: enCars,
    chatbot: enChatbot,
    dashboard: enDashboard,
    notifications: enNotifications,
    auth: enAuth,
    seo: enSeo,
  },
  ar: {
    common: arCommon,
    home: arHome,
    cars: arCars,
    chatbot: arChatbot,
    dashboard: arDashboard,
    notifications: arNotifications,
    auth: arAuth,
    seo: arSeo,
  },
} as const

export function getMessages(locale: Locale) {
  return dictionaries[locale]
}

export type Messages = ReturnType<typeof getMessages>
