'use client';

import { useSearchParams } from 'next/navigation';

import { SummaryFailPage } from '@/app/summary/components/SummaryFailPage';

import { SummaryLoadingPage } from '../components/SummaryLoadingPage';
import { SummarySuccessPage } from '../components/SummarySuccessPage';

const VALID_STATUS = ['LOADING', 'FAIL', 'SUCCESS'] as const;
type SummaryStatus = (typeof VALID_STATUS)[number];

function isSummaryStatus(value: string | null): value is SummaryStatus {
  return value !== null && VALID_STATUS.includes(value as SummaryStatus);
}

export default function SummaryDetailClient() {
  const searchParams = useSearchParams();
  const rawStatus = searchParams.get('status');

  const status: SummaryStatus = isSummaryStatus(rawStatus) ? rawStatus : 'SUCCESS';

  if (status === 'LOADING') {
    return <SummaryLoadingPage />;
  }

  if (status === 'FAIL') {
    return <SummaryFailPage />;
  }

  return <SummarySuccessPage />;
}
