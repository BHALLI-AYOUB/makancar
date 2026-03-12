'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
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
  const [mode, setMode] = useState<'client' | 'admin'>('client')
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const submitLock = useRef(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (submitLock.current || loading) {
      return
    }

    const normalizedEmail = email.trim().toLowerCase()
    const normalizedName = fullName.trim()

    submitLock.current = true
    setLoading(true)
    setError(null)
    setMessage(null)

    try {
      const supabase = createSupabaseBrowserClient()
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: normalizedEmail,
        password,
        options: {
          data: {
            full_name: normalizedName,
            role: 'client',
          },
        },
      })

      if (signUpError) {
        setError(formatSupabaseAuthError(signUpError.message))
        return
      }

      if (!data.user) {
        setError("Impossible de créer le compte pour le moment. Veuillez réessayer.")
        return
      }

      if (!data.session) {
        setMessage('Compte client créé. Vérifiez votre email puis connectez-vous.')
        return
      }

      const upsertResult = await supabase.from('profiles').upsert({
        id: data.user.id,
        email: normalizedEmail,
        full_name: normalizedName,
        role: 'client',
      })

      if (
        upsertResult.error &&
        !isMissingProfilesTableError(upsertResult.error) &&
        !isProfilesRlsError(upsertResult.error)
      ) {
        setError(upsertResult.error.message)
        return
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .maybeSingle()

      if (profileError && !isMissingProfilesTableError(profileError) && !isProfilesRlsError(profileError)) {
        setError(profileError.message)
        return
      }

      router.replace(getDashboardPath(profile?.role ?? 'client'))
      router.refresh()
    } finally {
      setLoading(false)
      submitLock.current = false
    }
  }

  if (mode === 'admin') {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-[#0b1220] p-1">
          <button
            type="button"
            onClick={() => setMode('client')}
            className="rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5"
          >
            Créer un compte client
          </button>
          <button
            type="button"
            onClick={() => setMode('admin')}
            className="rounded-xl bg-sky-500 px-4 py-3 text-sm font-medium text-white transition"
          >
            Accès administrateur
          </button>
        </div>

        <div className="rounded-2xl border border-[#c9a96d]/25 bg-[#0b1220] px-4 py-4 text-sm leading-7 text-slate-200">
          <p className="font-medium text-white">L&apos;inscription administrateur n&apos;est pas publique.</p>
          <p className="mt-2">
            Pour protéger la plateforme, un visiteur ne peut pas créer lui-même un compte administrateur.
            Utilisez le portail de connexion administrateur si votre accès existe déjà.
          </p>
        </div>

        <Link
          href="/auth/login?portal=admin"
          className="btn-blue inline-flex w-full items-center justify-center rounded-2xl py-3"
        >
          Accéder à l&apos;espace administrateur
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-[#0b1220] p-1">
        <button
          type="button"
          onClick={() => setMode('client')}
          disabled={loading}
          className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
            mode === 'client' ? 'bg-sky-500 text-white' : 'text-slate-300 hover:bg-white/5'
          } ${loading ? 'cursor-not-allowed opacity-70' : ''}`}
        >
          Créer un compte client
        </button>
        <button
          type="button"
          onClick={() => setMode('admin')}
          disabled={loading}
          className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
            mode === 'admin' ? 'bg-sky-500 text-white' : 'text-slate-300 hover:bg-white/5'
          } ${loading ? 'cursor-not-allowed opacity-70' : ''}`}
        >
          Accès administrateur
        </button>
      </div>
      <div className="space-y-2">
        <label className="text-sm text-slate-300">Nom complet</label>
        <input
          type="text"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          disabled={loading}
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
          disabled={loading}
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
          disabled={loading}
          className="w-full rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-white outline-none focus:border-sky-400"
          placeholder="Au moins 6 caractères"
          minLength={6}
          required
        />
      </div>
      {error ? (
        <p className="rounded-2xl border border-rose-400/20 bg-rose-500/8 px-4 py-3 text-sm leading-7 text-rose-200">
          {error}
        </p>
      ) : null}
      {message ? (
        <p className="rounded-2xl border border-emerald-400/20 bg-emerald-500/8 px-4 py-3 text-sm leading-7 text-emerald-200">
          {message}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={loading}
        aria-busy={loading}
        className="btn-blue w-full rounded-2xl py-3 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <LoaderCircle className="animate-spin" size={18} />
            Création du compte...
          </span>
        ) : (
          'Créer mon compte client'
        )}
      </button>
    </form>
  )
}
