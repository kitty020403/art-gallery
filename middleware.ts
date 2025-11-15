import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Public routes that do NOT require authentication
const publicPaths = new Set<string>([
  '/',
  '/landingpage',
  '/aboutus',
  '/login',
  '/signup',
  '/forgotpassword',
  '/contact',
]);

// Routes that require authentication (prefix match)
const protectedMatchers = [
  '/catalog',
  '/artists',
  '/artworks',
  '/myaccount',
  '/mysubmissions',
  '/profiladmin',
  '/submit',
  '/users',
  '/userprofil',
  '/featured',
  '/search',
  '/style',
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow Next internals and static assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/public')
  ) {
    return NextResponse.next();
  }

  // Always allow API routes to be handled by route handlers (they can verify token themselves)
  if (pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // Public paths allowed without auth
  if (publicPaths.has(pathname)) {
    return NextResponse.next();
  }

  // Check if this route is protected by prefix
  const isProtected = protectedMatchers.some((prefix) => pathname === prefix || pathname.startsWith(prefix + '/'));
  if (!isProtected) {
    return NextResponse.next();
  }

  // Basic auth check: token cookie presence + signature verification
  const token = req.cookies.get('token')?.value;
  if (!token) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = '/login';
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Verify JWT signature and expiration
  try {
    const secret = process.env.JWT_SECRET || 'your-secret-key-change-this';
    const encodedKey = new TextEncoder().encode(secret);
    await jwtVerify(token, encodedKey);
    return NextResponse.next();
  } catch (_e) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = '/login';
    loginUrl.searchParams.set('from', pathname);
    const res = NextResponse.redirect(loginUrl);
    // Clear invalid token
    res.cookies.set('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
    });
    return res;
  }
}

// Apply middleware to all routes so we can filter within
export const config = {
  // Apply to all routes; early returns above skip assets and API
  matcher: ['/(.*)'],
};
