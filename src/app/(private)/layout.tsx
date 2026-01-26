import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const API = process.env.NEXT_PUBLIC_API_BASE_URL;

// 쿠키 헤더 빌드
async function buildCookieHeader() {
  const store = await cookies();
  return store
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join('; ');
}

// /me 호출
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

  /* ===============================
     🔥 개발용 강제 통과 토큰
     =============================== */
  const devPass = store.get('DEV_SUMMARY')?.value;
  if (devPass === '1') {
    console.log('[auth] DEV_SUMMARY bypass');
    return children;
  }

  /* ===============================
     정상 인증 플로우
     =============================== */
  if (!API) {
    console.error('[auth] API BASE URL missing');
    redirect('/onboarding');
  }

  const cookieHeader = await buildCookieHeader();
  const meRes = await callMe(cookieHeader);

  if (!meRes) {
    console.error('[auth] /me call failed');
    redirect('/onboarding');
  }

  if (meRes.ok) {
    return children;
  }

  // ❗ refresh는 여기서 하지 않음 (클라이언트 인터셉터 전용)
  console.warn('[auth] /me unauthorized:', meRes.status);
  redirect('/onboarding');
}
