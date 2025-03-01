import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

// Secret key for JWT verification
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "default_jwt_secret_key_change_in_production"
)

export async function middleware(request: NextRequest) {
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
  const isLoginRoute = request.nextUrl.pathname === '/admin/login'
  const isAuthApiRoute = request.nextUrl.pathname.startsWith('/api/auth')
  
  // Get session token from cookies
  const sessionCookie = request.cookies.get('admin-session')
  
  // If trying to access login page with a valid session, redirect to admin dashboard
  if (isLoginRoute && sessionCookie?.value) {
    try {
      await jwtVerify(sessionCookie.value, JWT_SECRET)
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    } catch {
      // Invalid token, continue to login page
    }
  }
  
  // Skip auth check for login page and auth API routes
  if (isLoginRoute || isAuthApiRoute) {
    return NextResponse.next()
  }
  
  // Only check admin routes
  if (isAdminRoute) {
    // If no session cookie, redirect to login
    if (!sessionCookie?.value) {
      const url = new URL('/admin/login', request.url)
      url.searchParams.set('redirect', request.nextUrl.pathname)
      return NextResponse.redirect(url)
    }
    
    try {
      // Verify the JWT token
      await jwtVerify(sessionCookie.value, JWT_SECRET)
      return NextResponse.next()
    } catch {
      // Invalid token, redirect to login
      const url = new URL('/admin/login', request.url)
      url.searchParams.set('redirect', request.nextUrl.pathname)
      return NextResponse.redirect(url)
    }
  }
  
  return NextResponse.next()
}

// Only run middleware on admin routes and auth API routes
export const config = {
  matcher: ['/admin/:path*', '/api/auth/:path*'],
} 