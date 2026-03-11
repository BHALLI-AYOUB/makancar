'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LoaderCircle } from 'lucide-react'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import { getDashboardPath } from '@/lib/routes'
import { isMissingProfilesTableError, isProfilesRlsError } from '@/lib/supabase/errors'
import { formatSupabaseAuthError } from '@/lib/supabase/auth-errors'

export function RegisterForm() {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    const supabase = createSupabaseBrowserClient()
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (signUpError) {
      setError(formatSupabaseAuthError(signUpError.message))
      setLoading(false)
      return
    }

    if (!data.session) {
      setMessage('Compte cree. Verifiez votre email puis connectez-vous.')
      setLoading(false)
      return
    }

    const upsertResult = await supabase.from('profiles').upsert({
      id: data.user.id,
      email,
      full_name: fullName,
      role: 'client',
    })

    if (
      upsertResult.error &&
      !isMissingProfilesTableError(upsertResult.error) &&
      !isProfilesRlsError(upsertResult.error)
    ) {
      setError(upsertResult.error.message)
      setLoading(false)
      return
    }

    const { data: profile, error: profileError } = await supabase.from('profiles').select('role').eq('id', data.user.id).maybeSingle()

    if (profileError && !isMissingProfilesTableError(profileError) && !isProfilesRlsError(profileError)) {
      setError(profileError.message)
      setLoading(false)
      return
    }

    router.replace(getDashboardPath(profile?.role ?? 'client'))
    router.refresh()
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm text-slate-300">Nom complet</label>
        <input
          type="text"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-white outline-none focus:border-sky-400"
          placeholder="Votre nom"
          required
        />
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
          placeholder="Au moins 6 caracteres"
          minLength={6}
          required
        />
      </div>
      {error ? <p className="text-sm text-rose-300">{error}</p> : null}
      {message ? <p className="text-sm text-emerald-300">{message}</p> : null}
      <button type="submit" disabled={loading} className="btn-blue w-full rounded-2xl py-3">
        {loading ? <LoaderCircle className="animate-spin" size={18} /> : 'Creer mon compte'}
      </button>
    </form>
  )
}
