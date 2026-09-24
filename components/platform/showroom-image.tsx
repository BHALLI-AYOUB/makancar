'use client'

import { useState, type ImgHTMLAttributes } from 'react'
import { ImageOff } from 'lucide-react'
import { useCurrentLocale } from '@/lib/i18n/client'
import { cn } from '@/lib/utils'

export function ShowroomImage({ src, alt, className, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const [failedSource, setFailedSource] = useState<string | null>(null)
  const locale = useCurrentLocale()
  const label = { fr: 'Photo indisponible', en: 'Photo unavailable', ar: 'الصورة غير متوفرة' }[locale]

  if (!src || failedSource === src) {
    return (
      <span role="img" aria-label={`${alt} — ${label}`} className={cn('flex flex-col items-center justify-center gap-2 bg-[#0b0f16] p-3 text-center text-xs text-slate-400', className)}>
        <ImageOff size={24} aria-hidden="true" />
        <span>{label}</span>
      </span>
    )
  }

  return (
    <img {...props} src={src} alt={alt} className={className} decoding="async"
      ref={(image) => {
        // A cached failure can occur before React attaches the error handler.
        if (image?.complete && image.naturalWidth === 0) setFailedSource(String(src))
      }}
      onError={() => setFailedSource(String(src))}
    />
  )
}
