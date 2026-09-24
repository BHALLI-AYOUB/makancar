'use client'

import { useEffect, useRef, type ReactNode } from 'react'

export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const element = ref.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!element || reducedMotion.matches) return
    let animation: Animation | undefined
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      if (!reducedMotion.matches) animation = element.animate(
        [{ opacity: 0, transform: 'translateY(24px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 750, delay, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' },
      )
      observer.disconnect()
    }, { threshold: 0.08 })
    observer.observe(element)
    return () => { observer.disconnect(); animation?.cancel() }
  }, [delay])
  return <div ref={ref} className={className}>{children}</div>
}
