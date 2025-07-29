import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get the token directly using getToken
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  });
  
  const isLoggedIn = !!token;
  
  console.log('Middleware - Path:', pathname, 'Token exists:', isLoggedIn, 'User ID:', token?.id);

  // Protected routes - redirect to login if not authenticated
  if (pathname.startsWith('/profile') || pathname.startsWith('/settings')) {
    if (!isLoggedIn) {
      console.log('Redirecting to login - accessing protected route without auth');
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Auth pages - redirect to profile if already authenticated
  if (pathname === '/login' || pathname === '/signup') {
    if (isLoggedIn) {
      console.log('Redirecting to profile - user already authenticated');
      return NextResponse.redirect(new URL('/profile', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile/:path*', 
    '/login', 
    '/signup', 
    '/settings/:path*'
  ],
};