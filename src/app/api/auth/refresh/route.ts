import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const API = process.env.NEXT_PUBLIC_API_BASE_URL;

function isInternalPath(path: string): boolean {
  return path.startsWith('/') && !path.startsWith('//') && !path.includes('://');
}

export async function GET(req: NextRequest) {
  if (!API) return NextResponse.redirect(new URL('/onboarding', req.url));

  const nextParam = req.nextUrl.searchParams.get('next') ?? '/';
  const next = isInternalPath(nextParam) ? nextParam : '/';

  const cookieHeader = req.headers.get('cookie') ?? '';

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  let backendRes: Response;
  try {
    backendRes = await fetch(`${API}/api/auth/refresh`, {
      method: 'POST',
      headers: cookieHeader ? { cookie: cookieHeader } : {},
      cache: 'no-store',
      signal: controller.signal,
    });
  } catch (error) {
    console.error('[auth] refresh proxy failed:', error);
    return NextResponse.redirect(new URL('/onboarding', req.url));
  } finally {
    clearTimeout(timeoutId);
  }

  if (!backendRes.ok) {
    return NextResponse.redirect(new URL('/onboarding', req.url));
  }

  const res = NextResponse.redirect(new URL(next, req.url));

  const setCookie = backendRes.headers.get('set-cookie');
  if (setCookie) res.headers.append('set-cookie', setCookie);

  return res;
}
