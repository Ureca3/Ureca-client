'use client';

import { useParams } from 'next/navigation';

import { useSummaryDetail } from '@/hooks/summary/useSummaryDetail';
import { mapSummaryStatus } from '@/utils/map/summary/mapSummaryStatus';

import { SummaryFailPage } from '../_components/SummaryFailPage';
import { SummaryLoadingPage } from '../_components/SummaryLoadingPage';
import { SummarySuccessPage } from '../_components/SummarySuccessPage';
import { ErrorBoundary } from '@/components/ui/error-boundary';

export default function SummaryDetailPage() {
  const params = useParams();

  const rawId = Array.isArray(params?.summaryId) ? params.summaryId[0] : params?.summaryId;

  const summaryId = Number(rawId);
  const safeId = Number.isFinite(summaryId) ? summaryId : 0;

  const { data, isLoading, error } = useSummaryDetail(safeId);

  if (status === 'LOADING') {
    return (
      <ErrorBoundary>
        <SummaryLoadingPage />
      </ErrorBoundary>
    );
  }

  if (error) {
    return <SummaryFailPage />;
  }

  if (!data) {
    return <SummaryFailPage />;
  }

  const hasSummaryResult = Boolean(data.subject) && Boolean(data.keywords) && Boolean(data.points);

  if (hasSummaryResult) {
    return <SummarySuccessPage data={data} />;
  }

  const status = mapSummaryStatus(data.status);

  if (status === 'FAIL') {
    return (
      <ErrorBoundary>
        <SummaryFailPage />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <SummarySuccessPage />
    </ErrorBoundary>
  );
}
