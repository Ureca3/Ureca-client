import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const API = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET(req: NextRequest) {
  if (!API) return NextResponse.redirect(new URL('/onboarding', req.url));

  const next = req.nextUrl.searchParams.get('next') ?? '/';
  const cookieHeader = req.headers.get('cookie') ?? '';

  const backendRes = await fetch(`${API}/api/auth/refresh`, {
    method: 'POST',
    headers: cookieHeader ? { cookie: cookieHeader } : {},
    cache: 'no-store',
  });

  if (!backendRes.ok) {
    return NextResponse.redirect(new URL('/onboarding', req.url));
  }

  const res = NextResponse.redirect(new URL(next, req.url));

  // 백엔드 Set-Cookie를 브라우저 응답으로 전달
  const setCookie = backendRes.headers.get('set-cookie');
  if (setCookie) res.headers.append('set-cookie', setCookie);

  return res;
}
