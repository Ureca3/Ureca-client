'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { BottomNav } from '@/components/layout/bottom-navigation';
import { SummaryNavigateCard } from '@/components/summary/SummaryNavigateCard';
import { useMe } from '@/hooks/auth/useMe';
import { useBookmarkedSummaryList } from '@/hooks/summary/useBookmarkedSummaryList';

export default function BookmarkedSummaryPage() {
  const router = useRouter();
  const { data: me, isLoading: meLoading } = useMe();
  const userId = me?.id;

  const { data, isLoading, isError } = useBookmarkedSummaryList(userId);

  if (meLoading || isLoading) {
    return (
      <>
        <div className="relative flex h-14 items-center bg-white">
          <button type="button" onClick={() => router.push('/mypage')} className="ml-4 text-sm">
            ←
          </button>
          <p className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold">북마크 상담</p>
        </div>
        <div className="py-12 text-center text-sm text-gray-400">북마크 불러오는 중...</div>
        <BottomNav />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <div className="relative flex h-14 items-center bg-white">
          <button type="button" onClick={() => router.push('/mypage')} className="ml-4 text-sm">
            ←
          </button>
          <p className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold">북마크 상담</p>
        </div>
        <div className="py-12 text-center text-sm text-gray-400">북마크를 불러오지 못했습니다</div>
        <BottomNav />
      </>
    );
  }

  return (
    <>
      <div className="relative flex h-14 items-center bg-white">
        <button type="button" onClick={() => router.push('/mypage')} className="ml-4 text-sm">
          ←
        </button>
        <p className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold">북마크 상담</p>
      </div>

      <div className="flex flex-col gap-6 pt-6 pb-24">
        {data && data.length === 0 && (
          <div className="py-12 text-center text-sm text-gray-400">북마크한 상담이 없습니다</div>
        )}

        {data?.map((summary) => {
          const badges =
            typeof summary.keywords === 'string' ? [summary.keywords] : summary.keywords;

          return (
            <Link key={summary.id} href={`/summary/${summary.id}`}>
              <SummaryNavigateCard
                status={summary.status}
                title={summary.title}
                badges={badges}
                createdAt={summary.createdAt}
              />
            </Link>
          );
        })}
      </div>

      <BottomNav />
    </>
  );
}
