import React from 'react';

import { PolicyAgree } from '@/components/policy/policy-agree';
import { PolicyHeader } from '@/components/policy/policy-header';

export default function PolicyPage() {
  return (
    <div className="min-h-dvh bg-[#FBF8FB] px-4 pt-6">
      <PolicyHeader />
      <PolicyAgree />
      {/* <div className="mt-6">{searchParams.mode === 'agree' ? <PolicyAgree /> : <PolicyView />}</div> */}
    </div>
  );
}
