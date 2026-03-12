import type { ReactNode } from 'react'
import { requireRole } from '@/lib/auth'
import { DashboardShell } from '@/components/platform/dashboard-shell'

export const dynamic = 'force-dynamic'

export default async function ClientLayout({ children }: { children: ReactNode }) {
  await requireRole('client')

  return (
    <DashboardShell
      role="client"
      title="Espace client"
      subtitle="Consultez vos réservations, votre profil et l'état de vos demandes."
    >
      {children}
    </DashboardShell>
  )
}
