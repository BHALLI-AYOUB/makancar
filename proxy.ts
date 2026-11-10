import { NextResponse, type NextRequest } from 'next/server'
import { defaultLocale, isLocale, localeCookieName, stripLocaleFromPathname, withLocalePath } from '@/lib/i18n/config'
export function proxy(request: NextRequest) {
  // Admin space (login + showroom editor) lives at /admin, outside the locale routes.
  if (/^\/admin(\/|$)/.test(request.nextUrl.pathname)) return NextResponse.next()
  const { locale, pathnameWithoutLocale } = stripLocaleFromPathname(request.nextUrl.pathname)
  if (locale && /^\/admin(\/|$)/.test(pathnameWithoutLocale)) {
    const target = request.nextUrl.clone()
    target.pathname = pathnameWithoutLocale
    return NextResponse.redirect(target)
  }
  if (/^\/(admin|auth|client|api)(\/|$)/.test(pathnameWithoutLocale)) return new NextResponse('Not found', { status: 404, headers: { 'X-Robots-Tag': 'noindex' } })
  if (!locale) {
    const saved = request.cookies.get(localeCookieName)?.value
    const target = request.nextUrl.clone()
    target.pathname = withLocalePath(request.nextUrl.pathname, isLocale(saved) ? saved : defaultLocale)
    return NextResponse.redirect(target)
  }
  const headers = new Headers(request.headers)
  headers.set('x-makan-locale', locale)
  const response = NextResponse.next({ request: { headers } })
  response.cookies.set(localeCookieName, locale, { sameSite: 'lax', path: '/', maxAge: 31536000 })
  return response
}
export const config = { matcher: ['/((?!_next|.*\\.[a-zA-Z0-9]+$|sitemap.xml|robots.txt).*)'] }
