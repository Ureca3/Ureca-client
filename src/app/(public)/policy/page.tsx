import React from 'react';

import { PolicyAgree } from '@/app/(public)/policy/components/policy-agree';
import { PolicyHeader } from '@/app/(public)/policy/components/policy-header';

// interface PolicyPageProps {
//   searchParams: {
//     mode?: PolicyMode;
//   };
// }

export default function PolicyPage() {
  return (
    <div className="min-h-dvh bg-[#FBF8FB] px-4 pt-6">
      <PolicyHeader />
      <PolicyAgree />
      {/* <PolicyView /> */}
      {/* <div className="mt-6">{searchParams.mode === 'agree' ? <PolicyAgree /> : <PolicyView />}</div> */}
    </div>
  );
}
