import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const API = process.env.NEXT_PUBLIC_API_BASE_URL;
const OAUTH_PROVIDERS = new Set(['google', 'naver', 'kakao'] as const);

function isSupportedProvider(provider: string): boolean {
  return OAUTH_PROVIDERS.has(provider as 'google' | 'naver' | 'kakao');
}

function buildCookieHeader(req: NextRequest) {
  return req.cookies
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join('; ');
}

export async function GET(req: NextRequest, { params }: { params: { provider: string } }) {
  if (!API) {
    return NextResponse.redirect(new URL('/oauth/result?status=fail&reason=api_config', req.url));
  }

  const provider = params?.provider;
  const code = req.nextUrl.searchParams.get('code');
  const state = req.nextUrl.searchParams.get('state');

  if (!provider || !code || !isSupportedProvider(provider)) {
    return NextResponse.redirect(new URL('/oauth/result?status=fail&reason=invalid_params', req.url));
  }

  const stateKey = `oauth_state_${provider}`;
  const savedState = req.cookies.get(stateKey)?.value;
  if (!state || !savedState || state !== savedState) {
    const res = NextResponse.redirect(new URL('/oauth/result?status=fail&reason=state_mismatch', req.url));
    res.cookies.set(stateKey, '', { maxAge: 0, path: '/', sameSite: 'lax' });
    return res;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const loginUrl = new URL(`/api/auth/login/${provider}`, API);
    loginUrl.searchParams.set('code', code);

    const cookieHeader = buildCookieHeader(req);
    const backendRes = await fetch(loginUrl.toString(), {
      method: 'POST',
      headers: cookieHeader ? { cookie: cookieHeader } : {},
      cache: 'no-store',
      signal: controller.signal,
    });

    if (!backendRes.ok) {
      const res = NextResponse.redirect(new URL(`/oauth/result?status=fail&reason=login_failed`, req.url));
      res.cookies.set(stateKey, '', { maxAge: 0, path: '/', sameSite: 'lax' });
      return res;
    }

    const data = await backendRes.json().catch(() => ({}));
    const accessToken: string | undefined = data?.token?.accessToken;

    if (!accessToken) {
      const res = NextResponse.redirect(new URL(`/oauth/result?status=fail&reason=missing_token`, req.url));
      res.cookies.set(stateKey, '', { maxAge: 0, path: '/', sameSite: 'lax' });
      return res;
    }

    const res = NextResponse.redirect(new URL('/oauth/result?status=success', req.url));

    const setCookie = backendRes.headers.get('set-cookie');
    if (setCookie) res.headers.append('set-cookie', setCookie);

    res.cookies.set('access_token', accessToken, { path: '/', sameSite: 'lax' });
    res.cookies.set(stateKey, '', { maxAge: 0, path: '/', sameSite: 'lax' });

    return res;
  } catch (error) {
    console.error('[auth] oauth callback failed:', error);
    const res = NextResponse.redirect(new URL('/oauth/result?status=fail&reason=processing_error', req.url));
    res.cookies.set(stateKey, '', { maxAge: 0, path: '/', sameSite: 'lax' });
    return res;
  } finally {
    clearTimeout(timeoutId);
  }
}
