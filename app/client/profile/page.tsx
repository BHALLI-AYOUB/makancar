import { requireRole } from '@/lib/auth'

export default async function ClientProfilePage() {
  const profile = await requireRole('client')

  return (
    <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <h2 className="font-serif text-3xl text-white">Profil</h2>
      <dl className="mt-6 grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-[#0b1220] p-4">
          <dt className="text-xs uppercase tracking-[0.2em] text-slate-400">Nom complet</dt>
          <dd className="mt-2 text-lg text-white">{profile.full_name || 'Non renseigne'}</dd>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#0b1220] p-4">
          <dt className="text-xs uppercase tracking-[0.2em] text-slate-400">Email</dt>
          <dd className="mt-2 text-lg text-white">{profile.email}</dd>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#0b1220] p-4">
          <dt className="text-xs uppercase tracking-[0.2em] text-slate-400">Role</dt>
          <dd className="mt-2 text-lg capitalize text-white">{profile.role}</dd>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#0b1220] p-4">
          <dt className="text-xs uppercase tracking-[0.2em] text-slate-400">Depuis</dt>
          <dd className="mt-2 text-lg text-white">{new Date(profile.created_at).toLocaleDateString('fr-FR')}</dd>
        </div>
      </dl>
    </div>
  )
}
