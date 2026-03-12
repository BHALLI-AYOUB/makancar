import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import type { Database } from '@/types/database'
import { supabaseAnonKey, supabaseUrl, validateSupabaseEnv } from '@/lib/supabase/env'
import { isMissingProfilesTableError } from '@/lib/supabase/errors'
import { getSignedInLandingPath } from '@/lib/routes'
import {
  defaultLocale,
  isLocale,
  localeCookieName,
  stripLocaleFromPathname,
  withLocalePath,
} from '@/lib/i18n/config'

const authRoutes = ['/auth/login', '/auth/register']
const protectedRoutes = ['/client', '/admin']

export async function updateSession(request: NextRequest) {
  // Validate environment variables at runtime
  validateSupabaseEnv()
  
  let response = NextResponse.next({
    request,
  })

  const supabase = createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        response = NextResponse.next({
          request,
        })
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
      },
    },
  })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname
  const { locale: localeFromPath, pathnameWithoutLocale } = stripLocaleFromPathname(pathname)
  const locale = localeFromPath ?? (isLocale(request.cookies.get(localeCookieName)?.value) ? (request.cookies.get(localeCookieName)?.value as typeof defaultLocale) : defaultLocale)

  if (!localeFromPath) {
    const url = request.nextUrl.clone()
    url.pathname = withLocalePath(pathname, locale)
    return NextResponse.redirect(url)
  }

  response.cookies.set(localeCookieName, locale)

  const isProtectedRoute = protectedRoutes.some((route) => pathnameWithoutLocale.startsWith(route))
  const isAuthRoute = authRoutes.some((route) => pathnameWithoutLocale.startsWith(route))

  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone()
    url.pathname = withLocalePath('/auth/login', locale)
    url.searchParams.set('redirectedFrom', pathnameWithoutLocale)
    return NextResponse.redirect(url)
  }

  if (user) {
    const { data: profile, error } = await supabase.from('profiles').select('role').eq('id', user.id).maybeSingle()
    const metadataRole =
      user.user_metadata?.role === 'admin' || user.user_metadata?.role === 'client'
        ? user.user_metadata.role
        : 'client'
    const resolvedRole = error && isMissingProfilesTableError(error) ? metadataRole : profile?.role ?? metadataRole

    if (error && !isMissingProfilesTableError(error)) {
      throw error
    }

    if (isAuthRoute && resolvedRole) {
      const url = request.nextUrl.clone()
      url.pathname = getSignedInLandingPath(resolvedRole, locale)
      return NextResponse.redirect(url)
    }

    if (pathnameWithoutLocale.startsWith('/admin') && resolvedRole !== 'admin') {
      const url = request.nextUrl.clone()
      url.pathname = withLocalePath('/client/dashboard', locale)
      return NextResponse.redirect(url)
    }

    if (pathnameWithoutLocale.startsWith('/client') && resolvedRole === 'admin') {
      const url = request.nextUrl.clone()
      url.pathname = withLocalePath('/admin/dashboard', locale)
      return NextResponse.redirect(url)
    }
  }

  return response
}
