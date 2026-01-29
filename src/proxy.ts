import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith('/onboarding') ||
    pathname.startsWith('/oauth') ||
    pathname.startsWith('/splash')
  ) {
    return NextResponse.next();
  }

  const refreshToken = req.cookies.get('refreshToken');

  if (!refreshToken) {
    const url = req.nextUrl.clone();
    url.pathname = '/onboarding';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/chat/:path*',
    '/map/:path*',
    '/mypage/:path*',
    '/recommend/:path*',
    '/summary/:path*',
    '/settings/:path*',
  ],
};
