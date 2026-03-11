// Safely export environment variables without throwing at module load time
// Variables will be validated at runtime when actually used
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

export function validateSupabaseEnv() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      `Missing Supabase environment variables. NEXT_PUBLIC_SUPABASE_URL: ${!!supabaseUrl}, NEXT_PUBLIC_SUPABASE_ANON_KEY: ${!!supabaseAnonKey}`
    )
  }
}
