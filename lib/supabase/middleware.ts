import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import type { Database } from '@/types/database'
import { validateSupabaseEnv } from '@/lib/supabase/env'
import { isMissingProfilesTableError } from '@/lib/supabase/errors'
import { getSignedInLandingPath } from '@/lib/routes'

const authRoutes = ['/auth/login', '/auth/register']
const protectedRoutes = ['/client', '/admin']

export async function updateSession(request: NextRequest) {
  // Validate and get environment variables at runtime
  const { url: supabaseUrl, key: supabaseAnonKey } = validateSupabaseEnv()
  
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
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))

  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    url.searchParams.set('redirectedFrom', pathname)
    return NextResponse.redirect(url)
  }

  if (user) {
    const { data: profile, error } = await supabase.from('profiles').select('role').eq('id', user.id).maybeSingle()
    const resolvedRole = error && isMissingProfilesTableError(error) ? 'client' : profile?.role

    if (error && !isMissingProfilesTableError(error)) {
      throw error
    }

    if (isAuthRoute && resolvedRole) {
      const url = request.nextUrl.clone()
      url.pathname = getSignedInLandingPath(resolvedRole)
      return NextResponse.redirect(url)
    }

    if (pathname.startsWith('/admin') && resolvedRole !== 'admin') {
      const url = request.nextUrl.clone()
      url.pathname = '/client/dashboard'
      return NextResponse.redirect(url)
    }

    if (pathname.startsWith('/client') && resolvedRole === 'admin') {
      const url = request.nextUrl.clone()
      url.pathname = '/admin/dashboard'
      return NextResponse.redirect(url)
    }
  }

  return response
}
