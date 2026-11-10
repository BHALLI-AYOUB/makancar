'use client'
import Image from 'next/image'
import { useState, type ImgHTMLAttributes } from 'react'
import { ImageOff } from 'lucide-react'
import { useCurrentLocale } from '@/lib/i18n/client'
import { cn } from '@/lib/utils'
type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'width' | 'height'> & { src?: string; width?: number; height?: number }
export function ShowroomImage({ src, alt='', className, width=1200, height=900, ...props }: Props) {
  const [failed,setFailed]=useState<string|null>(null), locale=useCurrentLocale()
  const label={fr:'Photo indisponible',en:'Photo unavailable',ar:'الصورة غير متوفرة'}[locale]
  if(!src || failed===src) return <span role="img" aria-label={`${alt} — ${label}`} className={cn('flex items-center justify-center gap-2 bg-[#152015] p-3 text-xs text-slate-400',className)}><ImageOff size={24}/>{label}</span>
  return <Image {...props} src={src} alt={alt} width={width} height={height} sizes={props.sizes ?? '(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 650px'} loading={props.fetchPriority==='high'?'eager':props.loading} className={className} onError={()=>setFailed(src)}/>
}
