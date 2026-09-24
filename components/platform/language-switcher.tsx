'use client'

import { ChevronDown, Globe } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { isLocale, locales, stripLocaleFromPathname, withLocalePath } from '@/lib/i18n/config'
import { useCurrentLocale, useTranslations } from '@/lib/i18n/client'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

const languages = {
  fr: { name: 'Français' },
  en: { name: 'English' },
  ar: { name: 'العربية' },
}

function LanguageFlag({ locale }: { locale: keyof typeof languages }) {
  return (
    <svg viewBox="0 0 30 20" width="18" height="12" aria-hidden="true" className="shrink-0 overflow-hidden rounded-[2px]">
      {locale === 'fr' ? <>
        <path fill="#fff" d="M0 0h30v20H0z" />
        <path fill="#002654" d="M0 0h10v20H0z" />
        <path fill="#ed2939" d="M20 0h10v20H20z" />
      </> : locale === 'en' ? <>
        <path fill="#012169" d="M0 0h30v20H0z" />
        <path stroke="#fff" strokeWidth="5" d="m0 0 30 20M30 0 0 20" />
        <path stroke="#c8102e" strokeWidth="2" d="m0 0 30 20M30 0 0 20" />
        <path stroke="#fff" strokeWidth="7" d="M15 0v20M0 10h30" />
        <path stroke="#c8102e" strokeWidth="4" d="M15 0v20M0 10h30" />
      </> : <>
        <path fill="#c1272d" d="M0 0h30v20H0z" />
        <path fill="none" stroke="#006233" strokeWidth="1.3" d="m15 4 3.5 11-9.2-6.8h11.4L11.5 15Z" />
      </>}
    </svg>
  )
}

export function LanguageSwitcher() {
  const locale = useCurrentLocale()
  const pathname = usePathname()
  const router = useRouter()
  const t = useTranslations()

  function switchLanguage(targetLocale: string) {
    if (!isLocale(targetLocale) || targetLocale === locale) return
    const { pathnameWithoutLocale } = stripLocaleFromPathname(pathname)
    document.cookie = `NEXT_LOCALE=${targetLocale}; path=/; max-age=31536000; SameSite=Lax`
    router.push(`${withLocalePath(pathnameWithoutLocale || '/', targetLocale)}${window.location.search}${window.location.hash}`)
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" aria-label={`${t('common.nav.language')} : ${languages[locale].name}`} className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.03] px-2.5 text-white transition hover:border-[#c9a96d]/50 hover:bg-white/5 sm:px-3" dir="ltr">
          <Globe size={14} className="text-[#e3c58e]" aria-hidden="true" />
          <LanguageFlag locale={locale} />
          <span className="text-[11px] font-semibold uppercase tracking-wide">{locale}</span>
          <ChevronDown size={12} className="text-slate-400" aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={10} className="min-w-44 rounded-xl border-white/15 bg-[#101319] p-1.5 text-white shadow-xl">
        <DropdownMenuRadioGroup value={locale} onValueChange={switchLanguage}>
          {locales.map((item) => (
            <DropdownMenuRadioItem key={item} value={item} className="min-h-11 cursor-pointer gap-3 rounded-lg focus:bg-white/10 focus:text-white">
              <LanguageFlag locale={item} />
              <span lang={item}>{languages[item].name}</span>
              <span className="ms-auto text-[10px] uppercase text-slate-400">{item}</span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
