import { getCurrentProfile } from '@/lib/auth'
import { SiteHeaderClient } from '@/components/platform/site-header-client'

export async function SiteHeader() {
  const profile = await getCurrentProfile()

  return <SiteHeaderClient profile={profile} />
}
