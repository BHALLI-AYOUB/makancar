import Link from 'next/link'
import { RegisterForm } from '@/components/platform/auth/register-form'

export default function RegisterPage() {
  return (
    <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-[0_32px_90px_-40px_rgba(0,0,0,0.95)] backdrop-blur-xl">
      <p className="text-xs uppercase tracking-[0.34em] text-sky-300">Inscription</p>
      <h1 className="mt-3 font-serif text-4xl text-white">Creer un compte client.</h1>
      <p className="mt-3 text-sm text-slate-300">Accedez a vos reservations, vos demandes d'achat et votre profil.</p>
      <div className="mt-8">
        <RegisterForm />
      </div>
      <p className="mt-6 text-sm text-slate-300">
        Vous avez deja un compte ?{' '}
        <Link href="/auth/login" className="text-sky-300 hover:text-sky-200">
          Connectez-vous
        </Link>
      </p>
    </div>
  )
}
