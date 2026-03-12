import type { Locale } from '@/lib/i18n/config'
import { defaultLocale } from '@/lib/i18n/config'
import { getMessages } from '@/lib/i18n/dictionaries'

export function getTranslator(locale: Locale = defaultLocale) {
  const messages = getMessages(locale)

  return function t(path: string, replacements?: Record<string, string | number>) {
    const value = path.split('.').reduce<unknown>((current, key) => {
      if (!current || typeof current !== 'object') return undefined
      return (current as Record<string, unknown>)[key]
    }, messages)

    if (typeof value !== 'string') return path
    if (!replacements) return value

    return Object.entries(replacements).reduce(
      (result, [key, replacement]) => result.replaceAll(`{${key}}`, String(replacement)),
      value
    )
  }
}
