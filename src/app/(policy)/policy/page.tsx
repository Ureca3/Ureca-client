import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { PolicyAgree } from '@/app/(policy)/policy/_components/policy-agree';
import { PolicyHeader } from '@/app/(policy)/policy/_components/policy-header';
import { PolicyView } from '@/app/(policy)/policy/_components/policy-view';

interface PolicyPageProps {
  searchParams: Promise<{
    mode?: 'agree' | 'view';
  }>;
}

export default async function PolicyPage({ searchParams }: PolicyPageProps) {
  const { mode: rawMode } = await searchParams;
  const mode = rawMode ?? 'agree';

  if (mode === 'agree') {
    const cookieStore = await cookies();
    const hasRefreshToken = cookieStore.get('refreshToken');

    if (!hasRefreshToken) {
      redirect('/onboarding');
    }
  }

  return (
    <div className="min-h-dvh bg-[#FBF8FB] px-4 pt-6">
      <PolicyHeader />

      {mode === 'agree' ? <PolicyAgree /> : <PolicyView />}
    </div>
  );
}
