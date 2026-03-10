'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { LoaderCircle } from 'lucide-react'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import { getDashboardPath } from '@/lib/routes'
import { isMissingProfilesTableError } from '@/lib/supabase/errors'
import { formatSupabaseAuthError } from '@/lib/supabase/auth-errors'

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [portal, setPortal] = useState<'client' | 'admin'>('client')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createSupabaseBrowserClient()
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError || !data.user) {
      setError(formatSupabaseAuthError(signInError?.message ?? 'Connexion impossible.'))
      setLoading(false)
      return
    }

    let { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, role, email, full_name')
      .eq('id', data.user.id)
      .maybeSingle()

    if (profileError && !isMissingProfilesTableError(profileError)) {
      setError(profileError.message)
      setLoading(false)
      return
    }

    if (!profile) {
      const createdProfile = await supabase
        .from('profiles')
        .upsert({
          id: data.user.id,
          email: data.user.email ?? email,
          full_name: data.user.user_metadata?.full_name ?? '',
          role: 'client',
        })
        .select('id, role, email, full_name')
        .single()

      if (createdProfile.error && !isMissingProfilesTableError(createdProfile.error)) {
        setError(createdProfile.error.message)
        setLoading(false)
        return
      }

      profile = createdProfile.data ?? {
        id: data.user.id,
        email: data.user.email ?? email,
        full_name: (data.user.user_metadata?.full_name as string | undefined) ?? '',
        role: 'client',
      }
    }

    if (portal !== profile.role) {
      await supabase.auth.signOut()
      setError(
        portal === 'admin'
          ? 'Ce compte n a pas le role admin. Connectez-vous en mode client ou creez la table profiles puis assignez le role admin dans Supabase.'
          : 'Ce compte est configure comme admin. Utilisez le portail admin.'
      )
      setLoading(false)
      return
    }

    const redirectedFrom = searchParams.get('redirectedFrom')
    const target = redirectedFrom || getDashboardPath(profile?.role ?? 'client')
    router.replace(target)
    router.refresh()
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-[#0b1220] p-1">
        <button
          type="button"
          onClick={() => setPortal('client')}
          className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
            portal === 'client' ? 'bg-sky-500 text-white' : 'text-slate-300 hover:bg-white/5'
          }`}
        >
          Login as Client
        </button>
        <button
          type="button"
          onClick={() => setPortal('admin')}
          className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
            portal === 'admin' ? 'bg-sky-500 text-white' : 'text-slate-300 hover:bg-white/5'
          }`}
        >
          Login as Admin
        </button>
      </div>
      <div className="space-y-2">
        <label className="text-sm text-slate-300">Email</label>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-white outline-none focus:border-sky-400"
          placeholder="vous@makancar.com"
          required
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm text-slate-300">Mot de passe</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-white outline-none focus:border-sky-400"
          placeholder="Votre mot de passe"
          required
        />
      </div>
      {error ? <p className="text-sm text-rose-300">{error}</p> : null}
      <button type="submit" disabled={loading} className="btn-blue w-full rounded-2xl py-3">
        {loading ? <LoaderCircle className="animate-spin" size={18} /> : `Se connecter comme ${portal}`}
      </button>
    </form>
  )
}
