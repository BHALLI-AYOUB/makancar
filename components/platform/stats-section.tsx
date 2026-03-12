'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useCurrentLocale, useTranslations } from '@/lib/i18n/client'

type StatItem = {
  value: number
  suffix?: string
  label: string
  duration: number
}

const statsByLocale = {
  fr: [
    { value: 40, suffix: '+', label: 'Véhicules premium', duration: 1800 },
    { value: 12, label: 'Pays de sourcing', duration: 1600 },
    { value: 21, suffix: ' jours', label: 'Délai moyen', duration: 2000 },
  ],
  en: [
    { value: 40, suffix: '+', label: 'Premium vehicles', duration: 1800 },
    { value: 12, label: 'Sourcing countries', duration: 1600 },
    { value: 21, suffix: ' days', label: 'Average lead time', duration: 2000 },
  ],
  ar: [
    { value: 40, suffix: '+', label: 'سيارات فاخرة', duration: 1800 },
    { value: 12, label: 'دول التوريد', duration: 1600 },
    { value: 21, suffix: ' يومًا', label: 'متوسط الآجال', duration: 2000 },
  ],
} as const

function useRevealOnce<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!ref.current || visible) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setVisible(true)
        observer.disconnect()
      },
      { threshold: 0.25, rootMargin: '0px 0px -8% 0px' }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [visible])

  return { ref, visible }
}

function StatsCard({ item, index, active }: { item: StatItem; index: number; active: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    let frame = 0
    let start: number | null = null
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
    const tick = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / item.duration, 1)
      setCount(Math.floor(easeOutCubic(progress) * item.value))
      if (progress < 1) frame = window.requestAnimationFrame(tick)
      else setCount(item.value)
    }
    frame = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(frame)
  }, [active, item.duration, item.value])

  return (
    <article
      className={`rounded-[30px] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-7 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.95)] backdrop-blur-xl transition duration-700 md:min-h-[220px] ${active ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <p className="font-serif text-[56px] leading-[0.9] tracking-[-0.05em] text-white sm:text-[72px] lg:text-[88px]">
        {count}
        {item.suffix ? <span>{item.suffix}</span> : null}
      </p>
      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.32em] text-slate-300">{item.label}</p>
    </article>
  )
}

export function StatsSection() {
  const locale = useCurrentLocale()
  const t = useTranslations()
  const stats = statsByLocale[locale]
  const { ref, visible } = useRevealOnce<HTMLElement>()
  const titleVisibleClass = useMemo(() => (visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'), [visible])

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[radial-gradient(circle_at_top,rgba(123,153,255,0.07),transparent_28%),linear-gradient(180deg,#040507_0%,#08111d_100%)] py-16 sm:py-20"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] opacity-20" />
      <div className="section-shell relative z-10">
        <div className={`max-w-3xl transition duration-700 ${titleVisibleClass}`}>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-300">{t('home.stats.eyebrow')}</p>
          <h2 className="mt-3 font-serif text-4xl font-medium tracking-[-0.03em] text-white sm:text-6xl">{t('home.stats.title')}</h2>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {stats.map((item, index) => (
            <StatsCard key={item.label} item={item} index={index} active={visible} />
          ))}
        </div>
      </div>
    </section>
  )
}
