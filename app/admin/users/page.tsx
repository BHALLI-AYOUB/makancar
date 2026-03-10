import { AdminUsersPanel } from '@/components/platform/admin/users-panel'
import { getAllProfiles } from '@/lib/data/profiles'
import { requireRole } from '@/lib/auth'

export default async function AdminUsersPage() {
  await requireRole('admin')
  const users = await getAllProfiles()

  return <AdminUsersPanel users={users} />
}
