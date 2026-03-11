import { redirect } from 'next/navigation'
import type { Profile, UserRole } from '@/types/database'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { getDashboardPath } from '@/lib/routes'
import { isMissingProfilesTableError } from '@/lib/supabase/errors'

export async function getCurrentSession() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return session
}

export async function getCurrentProfile(): Promise<Profile | null> {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data: profile, error } = await supabase.from('profiles').select('*').eq('id', user.id).maybeSingle()

  if (error && !isMissingProfilesTableError(error)) {
    throw new Error(error.message)
  }

  if (!profile) {
    const metadataRole =
      user.user_metadata?.role === 'admin' || user.user_metadata?.role === 'client'
        ? user.user_metadata.role
        : 'client'

    return {
      id: user.id,
      email: user.email ?? '',
      full_name: (user.user_metadata?.full_name as string | undefined) ?? null,
      role: metadataRole,
      created_at: new Date(0).toISOString(),
    }
  }

  return profile ?? null
}

export async function requireUser() {
  const profile = await getCurrentProfile()

  if (!profile) {
    redirect('/auth/login')
  }

  return profile
}

export async function requireRole(role: UserRole) {
  const profile = await requireUser()

  if (profile.role !== role) {
    redirect(getDashboardPath(profile.role))
  }

  return profile
}
