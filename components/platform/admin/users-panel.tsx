'use client'

import { useState, useTransition } from 'react'
import type { Profile } from '@/types/database'
import { updateUserRoleAction } from '@/app/admin/users/actions'

export function AdminUsersPanel({ users }: { users: Profile[] }) {
  const [items, setItems] = useState(users)
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  function handleRoleChange(id: string, role: Profile['role']) {
    setError(null)
    startTransition(async () => {
      try {
        const updated = await updateUserRoleAction(id, role)
        setItems((current) => current.map((user) => (user.id === id ? { ...user, role: updated.role } : user)))
      } catch (actionError) {
        setError(actionError instanceof Error ? actionError.message : 'Mise a jour du role impossible.')
      }
    })
  }

  return (
    <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 shadow-[0_24px_80px_-44px_rgba(0,0,0,0.92)] backdrop-blur-xl">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#e3c58e]">Utilisateurs</p>
          <h2 className="mt-2 font-serif text-4xl text-white">Acces admin et clients</h2>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#0b0f16] px-4 py-3 text-sm text-slate-300">
          {items.length} utilisateur(s) charges
        </div>
      </div>
      {error ? <p className="mb-4 text-sm text-rose-300">{error}</p> : null}
      {items.length === 0 ? (
        <div className="rounded-[26px] border border-dashed border-white/10 bg-[#0b0f16] p-8 text-center text-slate-400">
          Aucun utilisateur disponible.
        </div>
      ) : null}
      <div className="overflow-x-auto rounded-[26px] border border-white/10 bg-[#0b0f16]">
        <table className="w-full min-w-[720px] text-left text-sm text-slate-200">
          <thead className="bg-white/5 text-xs uppercase tracking-[0.2em] text-slate-400">
            <tr>
              <th className="px-5 py-4">Nom</th>
              <th className="px-5 py-4">Email</th>
              <th className="px-5 py-4">Role</th>
              <th className="px-5 py-4">Created</th>
              <th className="px-5 py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((user) => (
              <tr key={user.id} className="border-t border-white/10 transition hover:bg-white/4">
                <td className="px-5 py-4">{user.full_name || 'Sans nom'}</td>
                <td className="px-5 py-4">{user.email}</td>
                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      user.role === 'admin'
                        ? 'border border-[#c9a96d]/30 bg-[#c9a96d]/12 text-[#f0dfba]'
                        : 'border border-white/10 bg-white/6 text-slate-300'
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-5 py-4">{new Date(user.created_at).toLocaleDateString('fr-FR')}</td>
                <td className="px-5 py-4">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={pending || user.role === 'client'}
                      onClick={() => handleRoleChange(user.id, 'client')}
                      className="rounded-full border border-white/15 px-3 py-1 text-xs text-white transition hover:bg-white/8 disabled:opacity-40"
                    >
                      Client
                    </button>
                    <button
                      type="button"
                      disabled={pending || user.role === 'admin'}
                      onClick={() => handleRoleChange(user.id, 'admin')}
                      className="rounded-full bg-[#c9a96d] px-3 py-1 text-xs font-semibold text-black transition hover:bg-[#d8b97e] disabled:opacity-40"
                    >
                      Admin
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
