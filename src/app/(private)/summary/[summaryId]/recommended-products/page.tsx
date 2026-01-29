'use client';

import { useParams } from 'next/navigation';

import { RecommendCardList } from '@/components/counseling-recommend/recommend-cardlist';
import { TitleCard } from '@/components/counseling-recommend/title-card';
import { useRecommendSummary } from '@/hooks/recommend/useRecommendSummary';
import { useSummaryDetail } from '@/hooks/summary/useSummaryDetail';

const page = () => {
  const params = useParams();
  const rawId = Array.isArray(params?.summaryId) ? params.summaryId[0] : params?.summaryId;
  const summaryId = Number(rawId);
  const safeId = Number.isFinite(summaryId) ? summaryId : 0;

  const { data: summaryData } = useSummaryDetail(safeId);
  const { data: recommendData, isLoading, isError, refetch } = useRecommendSummary(safeId);
  const products = recommendData?.products ?? [];

  const title = summaryData?.title ?? '추천 상품';

  return (
    <div className="mx-7.5 my-4">
      <TitleCard title={title} />
      {isLoading && <div className="mt-4 text-sm text-gray-400">추천 상품 불러오는 중...</div>}
      {isError && (
        <div className="mt-4 text-sm text-red-500">
          추천 상품을 불러오지 못했습니다.
          <button type="button" className="ml-2 underline" onClick={() => refetch()}>
            다시 시도
          </button>
        </div>
      )}
      {!isLoading && !isError && products.length === 0 && (
        <div className="mt-4 text-sm text-gray-400">추천 상품이 없습니다.</div>
      )}
      {!isLoading && !isError && products.length > 0 && <RecommendCardList products={products} />}
    </div>
  );
};

export default page;
