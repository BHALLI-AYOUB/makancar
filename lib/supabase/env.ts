// Export functions instead of constants to ensure variables are read at runtime
export function getSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
}

export function getSupabaseAnonKey() {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
}

// For backwards compatibility with existing imports
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

export function validateSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!url || !key) {
    throw new Error(
      `Missing Supabase environment variables. NEXT_PUBLIC_SUPABASE_URL: ${!!url}, NEXT_PUBLIC_SUPABASE_ANON_KEY: ${!!key}`
    )
  }
  
  return { url, key }
}
