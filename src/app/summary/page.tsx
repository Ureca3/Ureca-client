import Link from 'next/link';

import { BottomNav } from '@/components/layout/bottom-navigation';
import { Header } from '@/components/layout/header';
import type { SummaryStatus } from '@/components/summary/SummaryNavigateCard';
import { SummaryNavigateCard } from '@/components/summary/SummaryNavigateCard';

const MOCK_SUMMARIES: {
  id: string;
  status: SummaryStatus;
  title?: string;
  badges?: string[];
}[] = [
  {
    id: '1',
    status: 'LOADING',
  },
  {
    id: '2',
    status: 'SUCCESS',
    title: '인터넷 결합 할인 문의',
    badges: ['요금제', '결합', '할인'],
  },
  {
    id: '3',
    status: 'FAIL',
  },
];

export default function SummaryPage() {
  return (
    <>
      {/* 메인 콘텐츠 */}
      <main className="space-y-3 pb-24">
        <Header />

        {MOCK_SUMMARIES.map((summary) => (
          <Link
            key={summary.id}
            href={`/summary/${summary.id}?status=${summary.status}`}
            className="block"
          >
            <SummaryNavigateCard
              status={summary.status}
              title={summary.title}
              badges={summary.badges}
            />
          </Link>
        ))}
      </main>
      <BottomNav />
    </>
  );
}
