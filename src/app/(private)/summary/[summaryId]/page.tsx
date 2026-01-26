'use client';

import { useParams } from 'next/navigation';

import { useSummaryDetail } from '@/hooks/summary/useSummaryDetail';
import { mapSummaryStatus } from '@/utils/map/summary/mapSummaryStatus';

import { SummaryFailPage } from '../_components/SummaryFailPage';
import { SummaryLoadingPage } from '../_components/SummaryLoadingPage';
import { SummarySuccessPage } from '../_components/SummarySuccessPage';

export default function SummaryDetailPage() {
  const params = useParams();

  const rawId = Array.isArray(params?.summaryId) ? params.summaryId[0] : params?.summaryId;

  const summaryId = Number(rawId);
  const safeId = Number.isFinite(summaryId) ? summaryId : 0;

  const { data, isLoading } = useSummaryDetail(safeId);

  // 잘못된 id
  if (!Number.isFinite(summaryId)) {
    return <SummaryFailPage />;
  }

  // 로딩
  if (isLoading) {
    return <SummaryLoadingPage />;
  }

  // 데이터 없음
  if (!data) {
    return <SummaryFailPage />;
  }

  // 🔥 결과 기준 성공
  const hasSummaryResult = Boolean(data.subject) && Boolean(data.keywords) && Boolean(data.points);

  if (hasSummaryResult) {
    return <SummarySuccessPage data={data} />;
  }

  // 결과 없을 때만 status 확인
  const status = mapSummaryStatus(data.status);

  if (status === 'FAIL') {
    return <SummaryFailPage />;
  }

  return <SummaryLoadingPage />;
}
