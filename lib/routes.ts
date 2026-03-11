import type { UserRole } from '@/types/database'

export function getDashboardPath(role: UserRole) {
  return role === 'admin' ? '/admin/dashboard' : '/client/dashboard'
}

export function getSignedInLandingPath(role: UserRole) {
  return role === 'admin' ? '/admin/dashboard' : '/'
}
