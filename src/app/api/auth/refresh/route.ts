import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const API = process.env.NEXT_PUBLIC_API_BASE_URL;

function isInternalPath(path: string): boolean {
  return path.startsWith('/') && !path.startsWith('//') && !path.includes('://');
}

export async function GET(req: NextRequest) {
  if (!API) {
    return NextResponse.json({ message: 'API base URL not configured' }, { status: 500 });
  }

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
    return NextResponse.json({ message: 'Refresh proxy failed' }, { status: 502 });
  } finally {
    clearTimeout(timeoutId);
  }

  if (!backendRes.ok) {
    return NextResponse.json(
      { message: 'Refresh failed', status: backendRes.status },
      { status: backendRes.status },
    );
  }

  const data = await backendRes.json().catch(() => null);
  const res = NextResponse.json(data ?? {}, { status: 200 });

  const setCookie = backendRes.headers.get('set-cookie');
  if (setCookie) res.headers.append('set-cookie', setCookie);

  return res;
}
