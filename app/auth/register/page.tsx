import { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { RegisterForm } from '@/components/platform/auth/register-form'

export default function RegisterPage() {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#080a0f] px-4 py-10 sm:py-14">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_55%_45%,rgba(15,22,40,0.95)_0%,rgba(8,10,15,1)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_75%_20%,rgba(180,148,72,0.06)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_50%_50%,rgba(180,148,72,0.04)_0%,transparent_65%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#b49448]/15 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(180,148,72,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(180,148,72,1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_110%_110%_at_50%_50%,transparent_35%,rgba(0,0,0,0.75)_100%)]" />
      </div>

      <div className="absolute left-8 top-7 flex select-none items-center gap-3">
        <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
          <path d="M11 1L21 11L11 21L1 11Z" stroke="#b49448" strokeWidth="1.2" />
          <path d="M11 5L17 11L11 17L5 11Z" stroke="#b49448" strokeWidth="0.7" opacity="0.45" />
        </svg>
        <span
          className="hidden text-[10px] font-light uppercase text-[#b49448]/70 sm:block"
          style={{ letterSpacing: '0.42em', fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Maison Prestige
        </span>
      </div>

      <div className="absolute right-8 top-7 hidden opacity-15 sm:block">
        <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
          <path d="M48 0 L48 48 L0 48" stroke="#b49448" strokeWidth="0.8" />
          <path d="M48 14 L48 48 L14 48" stroke="#b49448" strokeWidth="0.35" />
        </svg>
      </div>
      <div className="absolute bottom-7 left-8 hidden opacity-15 sm:block">
        <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
          <path d="M0 48 L0 0 L48 0" stroke="#b49448" strokeWidth="0.8" />
          <path d="M0 34 L0 0 L34 0" stroke="#b49448" strokeWidth="0.35" />
        </svg>
      </div>

      <div className="relative z-10 flex w-full max-w-[470px] flex-col items-center">
        <div className="mb-8 sm:mb-10">
          <div className="relative overflow-hidden rounded-[28px] border border-[#b49448]/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))] px-8 py-5 shadow-[0_26px_80px_-36px_rgba(0,0,0,0.9)] backdrop-blur-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(180,148,72,0.12),transparent_60%)]" />
            <Image
              src="/logo.png"
              alt="Makan Luxury Motors"
              width={220}
              height={140}
              priority
              className="relative h-[110px] w-auto object-contain sm:h-[132px]"
            />
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-x-6 top-[105px] rounded-[80px] sm:top-[122px]"
          style={{
            height: '180px',
            background: 'radial-gradient(ellipse at center, rgba(180,148,72,0.07) 0%, transparent 72%)',
            filter: 'blur(28px)',
          }}
        />

        <div
          className="relative w-full rounded-[3px] p-8 sm:p-10"
          style={{
            background: 'rgba(12, 15, 23, 0.82)',
            border: '1px solid rgba(180,148,72,0.22)',
            backdropFilter: 'blur(40px) saturate(140%)',
            WebkitBackdropFilter: 'blur(40px) saturate(140%)',
            boxShadow: [
              '0 0 0 1px rgba(255,255,255,0.03) inset',
              '0 1px 0 rgba(255,255,255,0.06) inset',
              '0 32px 80px -16px rgba(0,0,0,0.85)',
              '0 8px 32px rgba(0,0,0,0.6)',
            ].join(', '),
          }}
        >
          <div className="mb-7 flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#b49448]/35" />
            <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
              <path d="M5 0L10 5L5 10L0 5Z" fill="#b49448" opacity="0.55" />
            </svg>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#b49448]/35" />
          </div>

          <p
            className="mb-4 text-[9px] uppercase"
            style={{
              color: '#b49448',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              letterSpacing: '0.48em',
            }}
          >
            Nouveau membre
          </p>

          <h1
            className="mb-3 text-[2.2rem] font-light leading-[1.06] text-white sm:text-[2.4rem]"
            style={{
              fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
              fontStyle: 'italic',
              textShadow: '0 2px 20px rgba(0,0,0,0.5)',
            }}
          >
            Créer un compte.
          </h1>

          <p
            className="mb-8 leading-relaxed"
            style={{
              color: 'rgba(203, 213, 225, 0.75)',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 300,
              letterSpacing: '0.015em',
              fontSize: '13.5px',
            }}
          >
            Accédez à vos réservations, vos demandes d&apos;achat
            <br className="hidden sm:block" /> et votre profil personnel.
          </p>

          <Suspense
            fallback={
              <div className="space-y-4 py-1">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-3 w-20 animate-pulse rounded-sm bg-slate-700/60" />
                    <div className="h-11 w-full animate-pulse rounded-[2px] border border-white/[0.07] bg-[#0f172a]" />
                  </div>
                ))}
                <div
                  className="mt-5 h-11 w-full animate-pulse rounded-[2px]"
                  style={{ background: 'rgba(180,148,72,0.18)', border: '1px solid rgba(180,148,72,0.3)' }}
                />
              </div>
            }
          >
            <style>{`
              .register-card input[type="email"],
              .register-card input[type="password"],
              .register-card input[type="text"],
              .register-card input[type="tel"] {
                background: #0f172a !important;
                border: 1px solid rgba(255,255,255,0.08) !important;
                color: #f1f5f9 !important;
                border-radius: 2px !important;
              }
              .register-card input::placeholder {
                color: rgba(148,163,184,0.5) !important;
              }
              .register-card input:focus {
                border-color: rgba(180,148,72,0.55) !important;
                outline: none !important;
                box-shadow: 0 0 0 3px rgba(180,148,72,0.08) !important;
              }
              .register-card label {
                color: #cbd5e1 !important;
                font-size: 12px !important;
                letter-spacing: 0.04em !important;
              }
              .register-card button[type="submit"] {
                background: linear-gradient(135deg, #b49448 0%, #d4af37 50%, #b49448 100%) !important;
                color: #0a0a0b !important;
                font-weight: 600 !important;
                border: none !important;
                letter-spacing: 0.06em !important;
                border-radius: 2px !important;
              }
              .register-card button[type="submit"]:hover {
                background: linear-gradient(135deg, #c9a84c 0%, #e2c04a 50%, #c9a84c 100%) !important;
              }
              .register-card [role="alert"],
              .register-card .text-red-500,
              .register-card .text-red-400 {
                color: #fca5a5 !important;
              }
            `}</style>
            <div className="register-card">
              <RegisterForm />
            </div>
          </Suspense>

          <div className="mb-5 mt-7 h-px w-full bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

          <p
            className="text-center text-[12.5px]"
            style={{
              color: 'rgba(148, 163, 184, 0.8)',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              letterSpacing: '0.01em',
            }}
          >
            Vous avez déjà un compte ?{' '}
            <Link
              href="/auth/login"
              className="transition-colors duration-200"
              style={{ color: '#b49448' }}
            >
              Connectez-vous
            </Link>
          </p>

          <div className="mt-7 flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#b49448]/20" />
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#b49448]/20" />
          </div>
        </div>
      </div>

      <p
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 whitespace-nowrap text-[8.5px] uppercase sm:block"
        style={{
          color: 'rgba(255,255,255,0.18)',
          fontFamily: "'Cormorant Garamond', serif",
          letterSpacing: '0.48em',
        }}
      >
        L&apos;excellence en mouvement
      </p>
    </main>
  )
}