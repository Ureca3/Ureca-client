'use client';

import Link from 'next/link';

import { BottomNav } from '@/components/layout/bottom-navigation';
import { Header } from '@/components/layout/header';
import { SummaryNavigateCard } from '@/components/summary/SummaryNavigateCard';
import { useSummaryList } from '@/hooks/summary/useSummaryList';

export default function SummaryPage() {
  const { data, isLoading, isError } = useSummaryList();

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="py-12 text-center text-sm text-gray-400">요약 불러오는 중...</div>
        <BottomNav />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <Header />
        <div className="py-12 text-center text-sm text-gray-400">요약을 불러오지 못했습니다</div>
        <BottomNav />
      </>
    );
  }

  return (
    <>
      <Header />

      <div className="flex flex-col gap-6 pt-6 pb-24">
        {data && data.length === 0 && (
          <div className="py-12 text-center text-sm text-gray-400">요약 데이터가 없습니다</div>
        )}

        {data?.map((summary) => (
          <Link key={summary.id} href={`/summary/${summary.id}`}>
            <SummaryNavigateCard
              status={summary.status}
              title={summary.title}
              badges={summary.keywords}
              createdAt={summary.createdAt}
            />
          </Link>
        ))}
      </div>

      <BottomNav />
    </>
  );
}
