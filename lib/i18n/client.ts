'use client'

import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { defaultLocale, getDirection, isLocale, stripLocaleFromPathname } from '@/lib/i18n/config'
import { getTranslator } from '@/lib/i18n/utils'

export function useCurrentLocale() {
  const pathname = usePathname()
  const { locale } = stripLocaleFromPathname(pathname)
  return locale ?? defaultLocale
}

export function useCurrentDirection() {
  return getDirection(useCurrentLocale())
}

export function useTranslations() {
  const locale = useCurrentLocale()
  return useMemo(() => getTranslator(locale), [locale])
}
