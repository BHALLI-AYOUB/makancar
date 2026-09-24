import type { ReactNode } from 'react'
import { SiteHeader } from '@/components/platform/site-header'
import { SiteFooter } from '@/components/platform/site-footer'
import { FirstVisitSearch } from '@/components/platform/first-visit-search'

export const dynamic = 'force-dynamic'

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#05070c] text-white">
      <SiteHeader />
      {children}
      <SiteFooter />
      <FirstVisitSearch />
    </div>
  )
}
