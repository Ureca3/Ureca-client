import React from 'react';

import { PolicyAgree } from '@/app/(public)/policy/_components/policy-agree';
import { PolicyHeader } from '@/app/(public)/policy/_components/policy-header';
import { PolicyView } from '@/app/(public)/policy/_components/policy-view';

interface PolicyPageProps {
  searchParams: {
    mode?: 'agree' | 'view';
  };
}

export default async function PolicyPage({ searchParams }: PolicyPageProps) {
  const mode = searchParams.mode ?? 'agree';

  return (
    <div className="min-h-dvh bg-[#FBF8FB] px-4 pt-6">
      <PolicyHeader />

      {mode === 'agree' ? <PolicyAgree /> : <PolicyView />}
    </div>
  );
}
