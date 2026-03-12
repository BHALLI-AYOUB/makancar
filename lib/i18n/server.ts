import { cookies } from 'next/headers'
import { defaultLocale, getDirection, isLocale, localeCookieName } from '@/lib/i18n/config'

export async function getServerLocale() {
  const store = await cookies()
  const locale = store.get(localeCookieName)?.value
  return isLocale(locale) ? locale : defaultLocale
}

export async function getServerDirection() {
  return getDirection(await getServerLocale())
}
