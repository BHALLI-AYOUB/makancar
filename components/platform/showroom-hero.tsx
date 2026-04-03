'use client'

import Link from 'next/link'
import { ArrowRight, MessageCircle } from 'lucide-react'
import type { ShowroomCar } from '@/types/showroom'
import { getWhatsAppHref } from '@/lib/data/showroom-stock'
import { useCurrentLocale, useTranslations } from '@/lib/i18n/client'
import { withLocalePath } from '@/lib/i18n/config'

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes revealWidth {
    from { width: 0; }
    to   { width: 56px; }
  }
  @keyframes pulseGold {
    0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(212,167,67,0.6); }
    50%       { opacity: 0.8; box-shadow: 0 0 0 8px rgba(212,167,67,0); }
  }
  @keyframes scrollDown {
    0%   { opacity: 0; transform: translateY(-4px); }
    50%  { opacity: 1; }
    100% { opacity: 0; transform: translateY(8px); }
  }

  .sh-a1 { animation: fadeIn  1.2s ease 0s both; }
  .sh-a2 { animation: fadeUp  1s cubic-bezier(.22,.68,0,1.1) 0.3s both; }
  .sh-a3 { animation: fadeUp  1s cubic-bezier(.22,.68,0,1.1) 0.5s both; }
  .sh-a4 { animation: fadeUp  1s cubic-bezier(.22,.68,0,1.1) 0.65s both; }
  .sh-a5 { animation: fadeUp  1s cubic-bezier(.22,.68,0,1.1) 0.8s both; }
  .sh-a6 { animation: fadeUp  1s cubic-bezier(.22,.68,0,1.1) 0.95s both; }

  .sh-divider {
    display: block;
    height: 1px;
    width: 0;
    background: linear-gradient(90deg, #d4a743, rgba(212,167,67,0));
    animation: revealWidth 1s cubic-bezier(.77,0,.18,1) 0.7s both;
  }
  .sh-divider-rtl {
    display: block;
    height: 1px;
    width: 0;
    background: linear-gradient(270deg, #d4a743, rgba(212,167,67,0));
    animation: revealWidth 1s cubic-bezier(.77,0,.18,1) 0.7s both;
    margin-left: auto;
  }

  .sh-dot { animation: pulseGold 2.6s ease-in-out infinite; }
  .sh-scroll-dot { animation: scrollDown 1.8s ease-in-out infinite; }

  .sh-cta-primary {
    display: inline-flex; align-items: center; gap: 8px;
    border-radius: 999px; padding: 0.9rem 2rem;
    font-size: 0.72rem; font-weight: 600; letter-spacing: 0.1em;
    text-transform: uppercase; color: #0e0c07; text-decoration: none;
    background: linear-gradient(135deg, #f5deb0 0%, #c99747 100%);
    box-shadow: 0 20px 60px -20px rgba(201,151,71,0.6), 0 0 0 1px rgba(255,220,150,0.3) inset;
    transition: transform 0.22s ease, box-shadow 0.22s ease, filter 0.22s ease;
    white-space: nowrap; border: none;
  }
  .sh-cta-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 28px 70px -18px rgba(201,151,71,0.75), 0 0 0 1px rgba(255,220,150,0.3) inset;
    filter: brightness(1.06);
  }
  .sh-cta-ghost {
    display: inline-flex; align-items: center; justify-content: center;
    border-radius: 999px; padding: 0.9rem 2rem;
    font-size: 0.72rem; font-weight: 500; letter-spacing: 0.1em;
    text-transform: uppercase; color: rgba(255,255,255,0.88); text-decoration: none;
    background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.22);
    backdrop-filter: blur(8px); transition: all 0.22s ease; white-space: nowrap;
  }
  .sh-cta-ghost:hover { background: rgba(255,255,255,0.14); transform: translateY(-2px); }

  .sh-cta-wa {
    display: inline-flex; align-items: center; gap: 8px;
    border-radius: 999px; padding: 0.9rem 2rem;
    font-size: 0.72rem; font-weight: 500; letter-spacing: 0.1em;
    text-transform: uppercase; color: rgba(180,240,200,0.9); text-decoration: none;
    background: rgba(37,211,102,0.08); border: 1px solid rgba(37,211,102,0.28);
    backdrop-filter: blur(8px); transition: all 0.22s ease; white-space: nowrap;
  }
  .sh-cta-wa:hover {
    background: rgba(37,211,102,0.15); border-color: rgba(37,211,102,0.5);
    transform: translateY(-2px);
  }

  .sh-stat:not(:last-child) { border-right: 1px solid rgba(255,255,255,0.1); }

  @media (max-width: 640px) {
    .sh-stat:not(:last-child) { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.1); }
    .sh-stats-row { flex-direction: column !important; }
    .sh-btns { flex-direction: column !important; align-items: stretch !important; }
    .sh-btns a, .sh-btns a { justify-content: center; text-align: center; }
  }
`

export function ShowroomHero({ car }: { car: ShowroomCar }) {
  const locale = useCurrentLocale()
  const t = useTranslations()
  const isArabic = locale === 'ar'
  const dir = isArabic ? 'rtl' : 'ltr'

  const agencyName = 'MAKAN LUXURY MOTORS'

  const eyebrow =
    locale === 'fr' ? 'Showroom Signature — Marrakech'
    : locale === 'en' ? 'Signature Showroom — Marrakech'
    : 'معرض مميز — مراكش'

  const line1 =
    locale === 'fr' ? 'L\'excellence'
    : locale === 'en' ? 'Excellence'
    : 'التميّز'

  const line2 =
    locale === 'fr' ? 'automobile'
    : locale === 'en' ? 'in motion'
    : 'في كل تفصيل'

  const line3 =
    locale === 'fr' ? 'redéfinie.'
    : locale === 'en' ? 'redefined.'
    : 'معاد تعريفه.'

  const sub =
    locale === 'fr'
      ? 'Chaque véhicule, une déclaration d\'élégance. Découvrez notre collection de prestige, soigneusement sélectionnée pour les connaisseurs.'
      : locale === 'en'
        ? 'Every vehicle, a statement of elegance. Discover our prestige collection, carefully curated for true connoisseurs.'
        : 'كل سيارة تعبير عن الأناقة. اكتشف مجموعتنا الراقية المختارة بعناية لعشاق الفخامة الحقيقية.'

  const searchLabel =
    locale === 'fr' ? 'Recherche personnalisée'
    : locale === 'en' ? 'Custom sourcing'
    : 'بحث مخصص'

  const stats = [
    {
      num: '200+',
      label: locale === 'fr' ? 'Véhicules' : locale === 'en' ? 'Vehicles' : 'سيارة',
    },
    {
      num: '12+',
      label: locale === 'fr' ? 'Marques' : locale === 'en' ? 'Brands' : 'علامة',
    },
    {
      num: '5★',
      label: locale === 'fr' ? 'Satisfaction' : locale === 'en' ? 'Satisfaction' : 'رضا',
    },
  ]

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <section
        dir={dir}
        style={{
          position: 'relative',
          minHeight: '100svh',
          overflow: 'hidden',
          fontFamily: "'Montserrat', sans-serif",
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* ── BACKGROUND IMAGE full bleed ── */}
        <div className="sh-a1" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img
            src="/background.png"
            alt=""
            aria-hidden="true"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 40%',
              display: 'block',
              transform: 'scale(1.08)',
              transformOrigin: 'center',
            }}
          />
        </div>

        {/* ── OVERLAYS ── */}
        {/* Directional dark gradient — text side gets opaque, photo side stays visible */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: isArabic
            ? `
              linear-gradient(to left,  rgba(4,5,8,0.94) 0%, rgba(4,5,8,0.75) 38%, rgba(4,5,8,0.15) 65%, transparent 100%),
              linear-gradient(to top,   rgba(4,5,8,0.8)  0%, rgba(4,5,8,0.2)  45%, transparent 70%),
              linear-gradient(to bottom,rgba(4,5,8,0.5)  0%, transparent 22%)
            `
            : `
              linear-gradient(to right, rgba(4,5,8,0.94) 0%, rgba(4,5,8,0.75) 38%, rgba(4,5,8,0.15) 65%, transparent 100%),
              linear-gradient(to top,   rgba(4,5,8,0.8)  0%, rgba(4,5,8,0.2)  45%, transparent 70%),
              linear-gradient(to bottom,rgba(4,5,8,0.5)  0%, transparent 22%)
            `,
        }} />

        {/* Warm gold glow behind text area */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: isArabic
            ? 'radial-gradient(ellipse 45% 65% at 92% 55%, rgba(160,100,20,0.15) 0%, transparent 65%)'
            : 'radial-gradient(ellipse 45% 65% at 8%  55%, rgba(160,100,20,0.15) 0%, transparent 65%)',
        }} />

        {/* ── MAIN CONTENT ── */}
        <div style={{
          position: 'relative', zIndex: 10,
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          padding: 'clamp(6rem, 10vw, 8rem) clamp(1.5rem, 6vw, 6rem)',
          /* Limit text column to left (or right for RTL) ~55% of screen */
          maxWidth: '820px',
          marginLeft: isArabic ? 'auto' : 0,
          marginRight: isArabic ? 0 : 'auto',
        }}>
          <div style={{ textAlign: isArabic ? 'right' : 'left', width: '100%' }}>

            {/* Eyebrow */}
            <div className="sh-a2" style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              flexDirection: isArabic ? 'row-reverse' : 'row',
              marginBottom: '1.75rem',
            }}>
              <span className="sh-dot" style={{
                display: 'inline-block', width: 7, height: 7,
                borderRadius: '50%', background: '#d4a743', flexShrink: 0,
              }} />
              <span style={{
                fontSize: '10px', letterSpacing: '0.38em',
                textTransform: 'uppercase', color: 'rgba(212,167,67,0.85)', fontWeight: 500,
              }}>
                {eyebrow}
              </span>
            </div>

            {/* Agency micro-label */}
            <p className="sh-a2" style={{
              fontSize: '10px', letterSpacing: '0.5em', textTransform: 'uppercase',
              color: 'rgba(241,210,154,0.35)', marginBottom: '1rem', fontWeight: 400,
            }}>
              {agencyName}
            </p>

            {/* Headline */}
            <h1 className="sh-a3" style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: 'clamp(3.4rem, 7.5vw, 7rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
              color: '#ffffff',
              margin: 0,
              textShadow: '0 8px 48px rgba(0,0,0,0.5)',
            }}>
              {line1}
              <br />
              <span style={{ color: 'rgba(255,255,255,0.82)' }}>{line2}</span>
              <br />
              <em style={{
                fontStyle: 'italic', fontWeight: 300,
                background: 'linear-gradient(135deg, #f5deb0 0%, #c99747 55%, #f5deb0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                {line3}
              </em>
            </h1>

            {/* Gold rule */}
            <span
              className={isArabic ? 'sh-divider-rtl' : 'sh-divider'}
              style={{ display: 'block', margin: '2rem 0' }}
            />

            {/* Sub-description */}
            <p className="sh-a4" style={{
              fontSize: 'clamp(0.875rem, 1.4vw, 1rem)',
              lineHeight: 1.9,
              color: 'rgba(255,255,255,0.55)',
              maxWidth: '44ch',
              marginBottom: '2.5rem',
              textShadow: '0 2px 12px rgba(0,0,0,0.6)',
              marginLeft: isArabic ? 'auto' : 0,
            }}>
              {sub}
            </p>

            {/* CTA buttons */}
            <div className="sh-a5 sh-btns" style={{
              display: 'flex', flexWrap: 'wrap', gap: '0.75rem',
              justifyContent: isArabic ? 'flex-end' : 'flex-start',
              marginBottom: '3.5rem',
            }}>
              <Link href={withLocalePath('/vente', locale)} className="sh-cta-primary">
                {t('common.actions.viewStock')}
                <ArrowRight size={13} />
              </Link>
              <Link href={withLocalePath('/recherche-personnalisee', locale)} className="sh-cta-ghost">
                {searchLabel}
              </Link>
              <a
                href={getWhatsAppHref(car.whatsapp, agencyName)}
                target="_blank" rel="noopener noreferrer"
                className="sh-cta-wa"
              >
                <MessageCircle size={13} />
                {t('common.actions.contactWhatsapp')}
              </a>
            </div>

            {/* Stats */}
            <div className="sh-a6 sh-stats-row" style={{
              display: 'inline-flex',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(4,5,8,0.5)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
            }}>
              {stats.map((s, i) => (
                <div key={i} className="sh-stat" style={{ padding: '1.1rem 1.8rem', textAlign: 'center' }}>
                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 300,
                    fontSize: 'clamp(1.7rem, 2.8vw, 2.1rem)',
                    letterSpacing: '-0.02em',
                    color: '#f5e2bc',
                    lineHeight: 1, margin: 0,
                  }}>
                    {s.num}
                  </p>
                  <p style={{
                    fontSize: '9px', letterSpacing: '0.2em',
                    textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)',
                    marginTop: '6px', fontWeight: 400,
                  }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div style={{
          position: 'relative', zIndex: 10,
          borderTop: '1px solid rgba(255,255,255,0.07)',
          background: 'rgba(4,5,8,0.55)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          padding: '0.9rem clamp(1.5rem, 6vw, 6rem)',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: '1rem',
          flexWrap: 'wrap',
          flexDirection: isArabic ? 'row-reverse' : 'row',
        }}>
          <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
            {['Rolls-Royce', 'Bentley', 'Lamborghini', 'Ferrari', 'Porsche', 'Mercedes-AMG'].map((b, i) => (
              <span key={i} style={{
                fontSize: '9px', letterSpacing: '0.32em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', fontWeight: 500,
              }}>
                {b}
              </span>
            ))}
          </div>

          {/* Scroll indicator */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
            <div style={{
              width: 1, height: 28,
              background: 'rgba(255,255,255,0.15)',
              position: 'relative', overflow: 'hidden',
            }}>
              <div className="sh-scroll-dot" style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '40%',
                background: 'linear-gradient(to bottom, transparent, #d4a743)',
              }} />
            </div>
            <span style={{
              fontSize: '8px', letterSpacing: '0.28em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)',
            }}>
              {locale === 'fr' ? 'Défiler' : locale === 'en' ? 'Scroll' : 'تمرير'}
            </span>
          </div>
        </div>
      </section>
    </>
  )
}
