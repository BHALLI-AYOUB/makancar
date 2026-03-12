export const locales = ['fr', 'en', 'ar'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'fr'
export const rtlLocales: Locale[] = ['ar']
export const localeCookieName = 'NEXT_LOCALE'

export function isLocale(value: string | null | undefined): value is Locale {
  return !!value && locales.includes(value as Locale)
}

export function getDirection(locale: Locale) {
  return rtlLocales.includes(locale) ? 'rtl' : 'ltr'
}

export function stripLocaleFromPathname(pathname: string) {
  const segments = pathname.split('/')
  const maybeLocale = segments[1]

  if (!isLocale(maybeLocale)) {
    return { locale: null, pathnameWithoutLocale: pathname || '/' }
  }

  const rest = `/${segments.slice(2).join('/')}`.replace(/\/+$/, '') || '/'
  return {
    locale: maybeLocale,
    pathnameWithoutLocale: rest === '' ? '/' : rest,
  }
}

export function withLocalePath(pathname: string, locale: Locale) {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`
  const { pathnameWithoutLocale } = stripLocaleFromPathname(normalized)
  return pathnameWithoutLocale === '/' ? `/${locale}` : `/${locale}${pathnameWithoutLocale}`
}
