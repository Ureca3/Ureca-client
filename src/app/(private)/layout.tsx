import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const API = process.env.NEXT_PUBLIC_API_BASE_URL;

async function buildCookieHeader() {
  const store = await cookies();
  return store
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join('; ');
}

async function callMe(cookieHeader: string) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await fetch(`${API}/api/auth/me`, {
      method: 'GET',
      headers: cookieHeader ? { cookie: cookieHeader } : {},
      cache: 'no-store',
      signal: controller.signal,
    });
    return res;
  } catch (e) {
    console.error('[auth] callMe failed:', e);
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

export default async function PrivateLayout({ children }: { children: React.ReactNode }) {
  if (!API) redirect('/onboarding');

  const cookieHeader = await buildCookieHeader();
  const meRes = await callMe(cookieHeader);

  if (!meRes) redirect('/onboarding');

  if (meRes.ok) return children;

  if (meRes.status === 401) {
    redirect('/api/auth/refresh?next=/');
  }
  redirect('/onboarding');
}
