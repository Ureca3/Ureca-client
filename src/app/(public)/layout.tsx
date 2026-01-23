import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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
    const response = await fetch(`${API}/api/auth/me`, {
      method: 'GET',
      headers: cookieHeader ? { cookie: cookieHeader } : {},
      cache: 'no-store',
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    console.error('Auth check failed:', error);
    return null;
  }
}

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  if (!API) return children;

  const cookieHeader = await buildCookieHeader();
  const meRes = await callMe(cookieHeader);

  if (meRes?.ok) redirect('/');
  return children;
}
