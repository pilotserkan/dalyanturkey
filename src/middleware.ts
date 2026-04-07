import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle admin routes
  if (pathname.startsWith('/admin')) {
    // Allow login page and API routes without auth
    if (pathname === '/admin/login' || pathname.startsWith('/api/admin')) {
      return NextResponse.next();
    }

    // Check auth cookie
    const authCookie = request.cookies.get('dalyan-admin-auth');
    if (!authCookie?.value) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  // Handle API routes - pass through
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Handle i18n routes
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(en|de|ru|nl|fr|es|it|tr|ar|zh)/:path*', '/admin/:path*'],
};
