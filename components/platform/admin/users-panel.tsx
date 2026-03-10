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
    <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      {error ? <p className="mb-4 text-sm text-rose-300">{error}</p> : null}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm text-slate-200">
          <thead className="text-xs uppercase tracking-[0.2em] text-slate-400">
            <tr>
              <th className="pb-4">Nom</th>
              <th className="pb-4">Email</th>
              <th className="pb-4">Role</th>
              <th className="pb-4">Created</th>
              <th className="pb-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((user) => (
              <tr key={user.id} className="border-t border-white/10">
                <td className="py-4">{user.full_name || 'Sans nom'}</td>
                <td className="py-4">{user.email}</td>
                <td className="py-4">{user.role}</td>
                <td className="py-4">{new Date(user.created_at).toLocaleDateString('fr-FR')}</td>
                <td className="py-4">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={pending || user.role === 'client'}
                      onClick={() => handleRoleChange(user.id, 'client')}
                      className="rounded-full border border-white/15 px-3 py-1 text-xs text-white disabled:opacity-40"
                    >
                      Client
                    </button>
                    <button
                      type="button"
                      disabled={pending || user.role === 'admin'}
                      onClick={() => handleRoleChange(user.id, 'admin')}
                      className="rounded-full bg-sky-500 px-3 py-1 text-xs text-white disabled:opacity-40"
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
