import type { UserRole } from '@/types/database'
import type { Locale } from '@/lib/i18n/config'
import { defaultLocale, withLocalePath } from '@/lib/i18n/config'

export function getDashboardPath(role: UserRole, locale: Locale = defaultLocale) {
  return withLocalePath(role === 'admin' ? '/admin/dashboard' : '/client/dashboard', locale)
}

export function getSignedInLandingPath(role: UserRole, locale: Locale = defaultLocale) {
  return withLocalePath(role === 'admin' ? '/admin/dashboard' : '/', locale)
}
