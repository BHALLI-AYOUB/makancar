'use server'

import { revalidatePath } from 'next/cache'
import type { UserRole } from '@/types/database'
import { requireRole } from '@/lib/auth'
import { updateProfileRole } from '@/lib/data/profiles'

export async function updateUserRoleAction(id: string, role: UserRole) {
  await requireRole('admin')
  const updated = await updateProfileRole(id, role)
  revalidatePath('/admin/users')
  revalidatePath('/admin/dashboard')
  return updated
}
