'use client'

import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import { useCurrentLocale, useTranslations } from '@/lib/i18n/client'
import { withLocalePath } from '@/lib/i18n/config'

export function LogoutButton({ className = '' }: { className?: string }) {
  const router = useRouter()
  const locale = useCurrentLocale()
  const t = useTranslations()

  async function handleLogout() {
    const supabase = createSupabaseBrowserClient()
    await supabase.auth.signOut()
    router.replace(withLocalePath('/auth/login', locale))
    router.refresh()
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className={`inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10 ${className}`}
    >
      <LogOut size={16} />
      {t('common.nav.logout')}
    </button>
  )
}
