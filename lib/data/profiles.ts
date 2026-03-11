import type { UserRole } from '@/types/database'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { isMissingProfilesTableError } from '@/lib/supabase/errors'

const fallbackProfiles = [
  {
    id: 'fallback-admin',
    email: 'ayoubbhalli2003@gmail.com',
    full_name: 'Ayoub Bhalli',
    role: 'admin' as const,
    created_at: '2026-03-01T00:00:00.000Z',
  },
  {
    id: 'fallback-client',
    email: 'louisvalll41@gmail.com',
    full_name: 'Client Makan',
    role: 'client' as const,
    created_at: '2026-03-02T00:00:00.000Z',
  },
]

export async function getAllProfiles() {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })

  if (error && !isMissingProfilesTableError(error)) {
    throw new Error(error.message)
  }

  const profiles = data ?? []
  const merged = [...profiles]

  fallbackProfiles.forEach((fallbackProfile) => {
    const exists = merged.some(
      (profile) =>
        profile.id === fallbackProfile.id ||
        profile.email.toLowerCase() === fallbackProfile.email.toLowerCase()
    )

    if (!exists) {
      merged.push(fallbackProfile)
    }
  })

  return merged.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
}

export async function upsertProfile(id: string, email: string, fullName: string, role: 'admin' | 'client' = 'client') {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('profiles')
    .upsert({
      id,
      email,
      full_name: fullName,
      role,
    })
    .select('*')
    .single()

  if (error && !isMissingProfilesTableError(error)) {
    throw new Error(error.message)
  }

  if (!data) {
    return {
      id,
      email,
      full_name: fullName,
      role,
      created_at: new Date(0).toISOString(),
    }
  }

  return data
}

export async function updateProfileRole(id: string, role: UserRole) {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.from('profiles').update({ role }).eq('id', id).select('*').single()

  if (error && !isMissingProfilesTableError(error)) {
    throw new Error(error.message)
  }

  if (!data) {
    return {
      id,
      email: '',
      full_name: null,
      role,
      created_at: new Date(0).toISOString(),
    }
  }

  return data
}
