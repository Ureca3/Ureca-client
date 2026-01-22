import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const API = process.env.NEXT_PUBLIC_API_BASE_URL;

async function buildCookieHeader() {
  const store = await cookies(); // RequestCookies
  return store
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join('; ');
}

async function callMe(cookieHeader: string) {
  return fetch(`${API}/api/auth/me`, {
    method: 'GET',
    headers: cookieHeader ? { cookie: cookieHeader } : {},
    cache: 'no-store',
  });
}

async function callRefresh(cookieHeader: string) {
  return fetch(`${API}/api/auth/refresh`, {
    method: 'POST',
    headers: cookieHeader ? { cookie: cookieHeader } : {},
    cache: 'no-store',
  });
}

export default async function PrivateLayout({ children }: { children: React.ReactNode }) {
  if (!API) redirect('/onboarding');

  const cookieHeader = await buildCookieHeader();

  const meRes = await callMe(cookieHeader);

  if (meRes.ok) return children;

  if (meRes.status === 401) {
    const refreshRes = await callRefresh(cookieHeader);
    if (!refreshRes.ok) redirect('/onboarding');

    // 새 쿠키가 브라우저에 저장되도록 한 번 새 요청을 발생
    redirect('/');
  }

  redirect('/onboarding');
}
