import { Suspense } from 'react'
import Link from 'next/link'
import { LoginForm } from '@/components/platform/auth/login-form'

export default function LoginPage() {
  return (
    <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-[0_32px_90px_-40px_rgba(0,0,0,0.95)] backdrop-blur-xl">
      <p className="text-xs uppercase tracking-[0.34em] text-sky-300">Connexion</p>
      <h1 className="mt-3 font-serif text-4xl text-white">Bon retour.</h1>
      <p className="mt-3 text-sm text-slate-300">Connectez-vous pour reserver, suivre vos demandes ou gerer la plateforme.</p>
      <div className="mt-8">
        <Suspense fallback={<div className="text-sm text-slate-400">Chargement...</div>}>
          <LoginForm />
        </Suspense>
      </div>
      <p className="mt-6 text-sm text-slate-300">
        Pas encore de compte ?{' '}
        <Link href="/auth/register" className="text-sky-300 hover:text-sky-200">
          Creez-en un ici
        </Link>
      </p>
    </div>
  )
}
