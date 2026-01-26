import React from 'react';

import { PolicyAgree } from '@/app/(public)/policy/_components/policy-agree';
import { PolicyHeader } from '@/app/(public)/policy/_components/policy-header';
import { PolicyView } from '@/app/(public)/policy/_components/policy-view';
import type { PolicyMode } from '@/types/policy/policy.ts';

interface PolicyPageProps {
  searchParams: {
    mode?: PolicyMode;
  };
}

export default function PolicyPage({ searchParams }: PolicyPageProps) {
  const mode = searchParams.mode ?? 'agree';

  return (
    <div className="min-h-dvh bg-[#FBF8FB] px-4 pt-6">
      <PolicyHeader />

      {mode === 'agree' ? <PolicyAgree /> : <PolicyView />}
    </div>
  );
}
