import { cookies, headers } from 'next/headers'
import { defaultLocale, getDirection, isLocale, localeCookieName } from '@/lib/i18n/config'

export async function getServerLocale() {
  const localeHeader = (await headers()).get('x-makan-locale')
  if (isLocale(localeHeader)) return localeHeader
  const store = await cookies()
  const locale = store.get(localeCookieName)?.value
  return isLocale(locale) ? locale : defaultLocale
}

export async function getServerDirection() {
  return getDirection(await getServerLocale())
}
