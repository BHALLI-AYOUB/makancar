import fs from 'node:fs/promises'
import path from 'node:path'
import { NextResponse, type NextRequest } from 'next/server'
import {
  ADMIN_COOKIE,
  ADMIN_SESSION_TTL_SECONDS,
  checkAdminCredentials,
  createAdminSession,
  isAdminConfigured,
  isAdminSession,
  loginLocked,
  recordLoginFailure,
  recordLoginSuccess,
} from '@/lib/admin-auth'
import { applyUpdateBuffer } from '@/scripts/apply-updates.mjs'

// Serves the Makan showroom editor (editor/, shared/) behind an admin login at /admin.
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const root = process.cwd()
const mime: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/plain; charset=utf-8',
}
const securityHeaders = {
  'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff',
  'X-Robots-Tag': 'noindex, nofollow',
  'Referrer-Policy': 'same-origin',
  'Content-Security-Policy':
    "default-src 'self'; img-src 'self' blob: data:; style-src 'self'; script-src 'self'; connect-src 'self'; form-action 'self'; frame-ancestors 'none'",
}
const publicPaths = new Set(['login', 'editor/login.css'])

type Params = { params: Promise<{ path?: string[] }> }

async function readHtml(file: string) {
  const html = await fs.readFile(path.join(root, 'editor', file), 'utf8')
  // All editor URLs are relative; resolve them under /admin/.
  return html.replace('<head>', '<head><base href="/admin/">')
}

async function loginPage(error = '', status = error ? 401 : 200) {
  let html = await readHtml('login.html')
  html = html.replace('<!--ERROR-->', error ? `<p class="login-error" role="alert">${error}</p>` : '')
  return new NextResponse(html, { status, headers: { ...securityHeaders, 'Content-Type': mime['.html'] } })
}

function redirect(request: NextRequest, to: string) {
  return NextResponse.redirect(new URL(to, request.url), { status: 303, headers: securityHeaders })
}

function sameOrigin(request: NextRequest) {
  const origin = request.headers.get('origin')
  if (!origin) return true
  try {
    return new URL(origin).host === request.headers.get('host')
  } catch {
    return false
  }
}

async function signedIn(request: NextRequest) {
  return isAdminSession(request.cookies.get(ADMIN_COOKIE)?.value)
}

export async function GET(request: NextRequest, { params }: Params) {
  const segments = (await params).path ?? []
  const rel = segments.join('/')
  if (segments.some(s => s === '..' || s.includes('\\'))) return new NextResponse('Not found', { status: 404 })

  // Site images and logo live in public/ and are served at the site root.
  if (segments[0] === 'public') return NextResponse.redirect(new URL('/' + segments.slice(1).join('/'), request.url), 307)

  if (rel === 'login') {
    if (await signedIn(request)) return redirect(request, '/admin')
    return loginPage(isAdminConfigured() ? '' : 'Espace admin non configuré : définissez ADMIN_SESSION_SECRET.')
  }

  if (!publicPaths.has(rel) && !(await signedIn(request))) {
    if (rel === '') return redirect(request, '/admin/login')
    return new NextResponse('Unauthorized', { status: 401, headers: securityHeaders })
  }

  if (rel === '') {
    return new NextResponse(await readHtml('index.html'), { headers: { ...securityHeaders, 'Content-Type': mime['.html'] } })
  }

  const file =
    rel === 'catalogue' ? 'content/catalogue.json'
    : rel === 'guide' ? 'docs/EDITOR.md'
    : (segments[0] === 'editor' || segments[0] === 'shared') && segments.length > 1 ? rel
    : null
  if (!file) return new NextResponse('Not found', { status: 404, headers: securityHeaders })

  const filename = path.resolve(root, file)
  if (!filename.startsWith(root + path.sep)) return new NextResponse('Not found', { status: 404 })
  try {
    const data = await fs.readFile(filename)
    return new NextResponse(data, {
      headers: { ...securityHeaders, 'Content-Type': mime[path.extname(filename)] || 'application/octet-stream' },
    })
  } catch {
    return new NextResponse('Not found', { status: 404, headers: securityHeaders })
  }
}

export async function POST(request: NextRequest, { params }: Params) {
  const rel = ((await params).path ?? []).join('/')
  if (!sameOrigin(request)) return new NextResponse('Forbidden', { status: 403 })

  if (rel === 'login') {
    if (!isAdminConfigured()) return loginPage('Espace admin non configuré : définissez ADMIN_SESSION_SECRET.', 503)
    if (loginLocked()) return loginPage('Trop de tentatives. Réessayez dans une minute.', 429)
    const form = await request.formData()
    const email = String(form.get('email') ?? '')
    const password = String(form.get('password') ?? '')
    if (!checkAdminCredentials(email, password)) {
      recordLoginFailure()
      await new Promise(r => setTimeout(r, 600))
      return loginPage('Email ou mot de passe incorrect.')
    }
    recordLoginSuccess()
    const response = redirect(request, '/admin')
    response.cookies.set(ADMIN_COOKIE, await createAdminSession(), {
      httpOnly: true,
      sameSite: 'strict',
      secure: request.nextUrl.protocol === 'https:',
      path: '/admin',
      maxAge: ADMIN_SESSION_TTL_SECONDS,
    })
    return response
  }

  if (rel === 'save') {
    if (!(await signedIn(request))) return NextResponse.json({ error: 'Session expirée. Reconnectez-vous.' }, { status: 401 })
    try {
      const zip = Buffer.from(await request.arrayBuffer())
      const result = applyUpdateBuffer(zip, root)
      return NextResponse.json({ revision: result.revision, newImages: result.newImages }, { headers: securityHeaders })
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      const readOnly = /EROFS|EACCES|EPERM|read-only/i.test(message)
      return NextResponse.json(
        { error: readOnly ? "Ce serveur ne peut pas enregistrer de fichiers. Enregistrez depuis l'admin local (localhost:3100/admin)." : message },
        { status: readOnly ? 503 : 409, headers: securityHeaders },
      )
    }
  }

  if (rel === 'logout') {
    const response = redirect(request, '/admin/login')
    response.cookies.set(ADMIN_COOKIE, '', { httpOnly: true, sameSite: 'strict', path: '/admin', maxAge: 0 })
    return response
  }

  return new NextResponse('Not found', { status: 404 })
}
