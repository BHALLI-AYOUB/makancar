import type { UserRole } from '@/types/database'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { isMissingProfilesTableError } from '@/lib/supabase/errors'

export async function getAllProfiles() {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })

  if (error && !isMissingProfilesTableError(error)) {
    throw new Error(error.message)
  }

  return data ?? []
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
