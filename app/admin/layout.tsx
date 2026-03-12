import type { ReactNode } from 'react'
import { requireRole } from '@/lib/auth'
import { DashboardShell } from '@/components/platform/dashboard-shell'

export const dynamic = 'force-dynamic'

export default async function AdminLayout({ children }: { children: ReactNode }) {
  await requireRole('admin')

  return (
    <DashboardShell
      role="admin"
      title="Administration"
      subtitle="Gérez les voitures, les réservations, les utilisateurs et les demandes de vente."
    >
      {children}
    </DashboardShell>
  )
}
