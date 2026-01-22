import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // public은 통과
  if (pathname.startsWith('/onboarding') || pathname.startsWith('/oauth')) {
    return NextResponse.next();
  }

  // 보호할 경로만 matcher로 걸리게 했으면 여기서 추가 체크는 최소화
  const refreshToken = req.cookies.get('refreshToken');

  if (!refreshToken) {
    const url = req.nextUrl.clone();
    url.pathname = '/onboarding';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/chat/:path*', '/summary/:path*', '/settings/:path*'],
  // matcher: ['/((?!onboarding|oauth).*)'],
};
