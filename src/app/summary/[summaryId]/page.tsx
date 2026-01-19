'use client';

import { useSearchParams } from 'next/navigation';

import { SummaryFailPage } from '@/components/summary/detail/SummaryFailPage';
import { SummaryLoadingPage } from '@/components/summary/detail/SummaryLoadingPage';
import { SummarySuccessPage } from '@/components/summary/detail/SummarySuccessPage';

type SummaryStatus = 'LOADING' | 'FAIL' | 'SUCCESS';

export default function SummaryDetailPage() {
  // Next 15 규칙 대응
  const searchParams = useSearchParams();

  const status = searchParams.get('status') as SummaryStatus;

  if (status === 'LOADING') {
    return <SummaryLoadingPage />;
  }

  if (status === 'FAIL') {
    return <SummaryFailPage />;
  }

  return <SummarySuccessPage />;
}
