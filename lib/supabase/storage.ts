'use client'

import { createSupabaseBrowserClient } from '@/lib/supabase/client'

const CARS_BUCKET = 'cars'

function sanitizeFileName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9.-]+/g, '-')
}

export async function uploadCarImage(file: File) {
  const supabase = createSupabaseBrowserClient()
  const extension = file.name.split('.').pop() ?? 'jpg'
  const path = `cars/${Date.now()}-${crypto.randomUUID()}.${sanitizeFileName(extension)}`

  const { error } = await supabase.storage.from(CARS_BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  })

  if (error) {
    throw new Error(error.message)
  }

  const { data } = supabase.storage.from(CARS_BUCKET).getPublicUrl(path)
  return data.publicUrl
}
