// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  // Example: check for a session cookie (Edge-compatible)
  const hasSession = req.cookies.get('next-auth.session-token') || req.cookies.get('__Secure-next-auth.session-token');
  const { pathname } = req.nextUrl;

  const publicRoutes = ['/login', '/register', '/'];

  if (!hasSession && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (hasSession && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};