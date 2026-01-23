import { cookies } from 'next/headers';

export async function buildCookieHeader() {
  const store = await cookies();
  return store
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join('; ');
}

export async function callAuthMe(apiBaseUrl: string, cookieHeader: string) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    return await fetch(`${apiBaseUrl}/api/auth/me`, {
      method: 'GET',
      headers: cookieHeader ? { cookie: cookieHeader } : {},
      cache: 'no-store',
      signal: controller.signal,
    });
  } catch (e) {
    console.error('[auth] callAuthMe failed:', e);
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}
