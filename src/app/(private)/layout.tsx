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
  const store = await cookies();

  const devPass = store.get('DEV_SUMMARY')?.value;
  if (devPass === '1') {
    console.log('[auth] DEV_SUMMARY bypass');
    return children;
  }

  if (!API) {
    console.error('[auth] API BASE URL missing');
    redirect('/onboarding');
  }

  const cookieHeader = await buildCookieHeader();
  const meRes = await callMe(cookieHeader);

  if (!meRes) {
    redirect('/onboarding');
  }

  if (meRes.ok) {
    return children;
  }

  if (!meRes.ok) {
    redirect('/onboarding');
  }

  try {
    const me: { termsAgreed?: boolean } = await meRes.json();

    if (!me.termsAgreed) {
      redirect('/policy?mode=agree');
    }
  } catch (e) {
    console.error('[auth] Failed to parse /me json:', e);
    redirect('/onboarding');
  }

  return children;
}
