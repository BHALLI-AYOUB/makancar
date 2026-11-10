'use client'
import { createContext, useContext, type ReactNode } from 'react'
import type source from '@/content/catalogue.json'
import { useCurrentLocale } from '@/lib/i18n/client'
type Settings = Pick<typeof source, 'contact' | 'showroom'>
const Context = createContext<Settings | null>(null)
export function ShowroomProvider({ settings, children }: { settings: Settings; children: ReactNode }) {
  return <Context.Provider value={settings}>{children}</Context.Provider>
}
function useSettings() {
  const settings = useContext(Context)
  if (!settings) throw new Error('Showroom settings provider is missing')
  return settings
}
export function useShowroomContent<K extends keyof Settings['showroom']>(section: K): Settings['showroom'][K]['fr'] {
  const locale = useCurrentLocale()
  return useSettings().showroom[section][locale] as Settings['showroom'][K]['fr']
}
export function useBusiness() {
  const locale = useCurrentLocale()
  const { contact } = useSettings()
  return { ...contact, location: contact.location[locale], whatsappLink: `https://wa.me/${contact.whatsapp}`, emailLink: `mailto:${contact.email}`, googleMapsLink: contact.mapsUrl }
}
