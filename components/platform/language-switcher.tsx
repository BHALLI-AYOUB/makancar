'use client'

import { Globe } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { defaultLocale, locales, stripLocaleFromPathname, withLocalePath } from '@/lib/i18n/config'
import { useCurrentLocale } from '@/lib/i18n/client'

export function LanguageSwitcher() {
  const locale = useCurrentLocale()
  const pathname = usePathname()
  const router = useRouter()

  function switchLanguage(targetLocale: (typeof locales)[number]) {
    const { pathnameWithoutLocale } = stripLocaleFromPathname(pathname)
    document.cookie = `NEXT_LOCALE=${targetLocale}; path=/; max-age=31536000`
    router.push(withLocalePath(pathnameWithoutLocale || '/', targetLocale))
    router.refresh()
  }

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-300">
        <Globe size={14} />
      </span>
      {locales.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => switchLanguage(item)}
          className={`rounded-full px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition sm:px-3 ${
            (locale || defaultLocale) === item ? 'bg-white text-black' : 'text-slate-300 hover:bg-white/8 hover:text-white'
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  )
}
