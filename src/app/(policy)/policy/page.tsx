import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { PolicyAgree } from '@/app/(policy)/policy/_components/policy-agree';
import { PolicyHeader } from '@/app/(policy)/policy/_components/policy-header';
import { PolicyView } from '@/app/(policy)/policy/_components/policy-view';
import type { PolicyMode } from '@/types/policy/policy';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const API = process.env.NEXT_PUBLIC_API_BASE_URL;

interface PolicyPageProps {
  searchParams: Promise<{ mode?: PolicyMode }>;
}

async function buildCookieHeader() {
  const store = await cookies();
  return store
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join('; ');
}

async function callMe(cookieHeader: string) {
  if (!API) return null;

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
    console.error('[policy] callMe failed:', e);
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

export default async function PolicyPage({ searchParams }: PolicyPageProps) {
  const { mode: rawMode } = await searchParams;
  const mode = rawMode ?? 'agree';

  if (mode === 'agree') {
    const cookieStore = await cookies();
    const hasRefreshToken = cookieStore.get('refreshToken');
    if (!hasRefreshToken) redirect('/onboarding');

    const cookieHeader = await buildCookieHeader();
    const meRes = await callMe(cookieHeader);
    if (meRes?.ok) {
      const me = await meRes.json();
      if (me?.termsAgreed) redirect('/policy?mode=view');
    }
  }

  return (
    <div className="min-h-dvh bg-[#FBF8FB] px-4 pt-6">
      <PolicyHeader mode={mode} />
      {mode === 'agree' ? <PolicyAgree /> : <PolicyView />}
    </div>
  );
}
