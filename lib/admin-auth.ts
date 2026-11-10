import crypto from 'node:crypto'
import { sealData, unsealData } from 'iron-session'

// Admin account. Default email: makan@gmail.com. The default password is stored
// only as a scrypt hash ("salt:hash"). Override with ADMIN_EMAIL / ADMIN_PASSWORD.
const DEFAULT_EMAIL = 'makan@gmail.com'
const DEFAULT_PASSWORD_HASH =
  'fc96d1ab09927206e56111ef3f13d132:a13b84eb799fa0a7c76a229d93204ed5f861334e5f88b0dc038d420092767508'

export const ADMIN_COOKIE = 'makan_admin'
export const ADMIN_SESSION_TTL_SECONDS = 12 * 60 * 60

const adminEmail = (process.env.ADMIN_EMAIL || DEFAULT_EMAIL).trim().toLowerCase()
const scrypt = (password: string, saltHex: string) => crypto.scryptSync(password, Buffer.from(saltHex, 'hex'), 32)
const [salt, storedHash] = process.env.ADMIN_PASSWORD
  ? (() => {
      const s = crypto.randomBytes(16).toString('hex')
      return [s, scrypt(process.env.ADMIN_PASSWORD, s)] as const
    })()
  : ([DEFAULT_PASSWORD_HASH.split(':')[0], Buffer.from(DEFAULT_PASSWORD_HASH.split(':')[1], 'hex')] as const)

const sha256 = (value: string) => crypto.createHash('sha256').update(value).digest()

export function checkAdminCredentials(email: string, password: string) {
  const emailOk = crypto.timingSafeEqual(sha256(email.trim().toLowerCase()), sha256(adminEmail))
  const passwordOk = crypto.timingSafeEqual(scrypt(password, salt), storedHash)
  return emailOk && passwordOk
}

function sessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET
  return secret && secret.length >= 32 ? secret : null
}

export const isAdminConfigured = () => sessionSecret() !== null

export async function createAdminSession() {
  const secret = sessionSecret()
  if (!secret) throw new Error('ADMIN_SESSION_SECRET is not set (min. 32 characters)')
  return sealData({ email: adminEmail }, { password: secret, ttl: ADMIN_SESSION_TTL_SECONDS })
}

export async function isAdminSession(token: string | undefined) {
  const secret = sessionSecret()
  if (!token || !secret) return false
  try {
    const data = await unsealData<{ email?: string }>(token, { password: secret, ttl: ADMIN_SESSION_TTL_SECONDS })
    return data.email === adminEmail
  } catch {
    return false
  }
}

// Simple in-memory brute-force brake (per server instance).
let failedAttempts = 0
let lockedUntil = 0
export function loginLocked() {
  return Date.now() < lockedUntil
}
export function recordLoginFailure() {
  failedAttempts += 1
  if (failedAttempts >= 5) {
    failedAttempts = 0
    lockedUntil = Date.now() + 60_000
  }
}
export function recordLoginSuccess() {
  failedAttempts = 0
}
