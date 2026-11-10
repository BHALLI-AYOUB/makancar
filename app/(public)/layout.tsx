import type { ReactNode } from 'react'
import { SiteHeader } from '@/components/platform/site-header'
import { SiteFooter } from '@/components/platform/site-footer'
import { ShowroomProvider } from '@/components/platform/showroom-context'
import { getShowroomSettings } from '@/lib/catalogue'
export default function PublicLayout({ children }: { children: ReactNode }) {
  return <ShowroomProvider settings={getShowroomSettings()}><div className="min-h-screen bg-[#0c0e0d] text-white">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <SiteHeader /><div id="main-content">{children}</div><SiteFooter />
  </div></ShowroomProvider>
}
