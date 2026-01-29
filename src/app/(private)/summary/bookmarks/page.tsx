'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import GoBack from '@/assets/icons/header/chevron-left.svg';
import { BottomNav } from '@/components/layout/bottom-navigation';
import { SummaryNavigateCard } from '@/components/summary/summary-navigate-card';
import { useMe } from '@/hooks/auth/useMe';
import { useBookmarkedSummaryList } from '@/hooks/summary/useBookmarkedSummaryList';

export default function BookmarkedSummaryPage() {
  const router = useRouter();
  const { data: me, isLoading: meLoading, isError: meError } = useMe();
  const userId = me?.id;

  const {
    data: bookmarked,
    isLoading: listLoading,
    isError: listError,
  } = useBookmarkedSummaryList(userId);

  // 1. 로딩 중
  if (meLoading || listLoading) {
    return (
      <>
        <div className="relative flex h-14 items-center bg-white">
          <button
            type="button"
            aria-label="뒤로가기"
            onClick={() => router.push('/mypage')}
            className="ml-4 flex items-center"
          >
            <GoBack className="hover:text-primary-500" />
          </button>
          <p className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold">북마크 상담</p>
        </div>
        <div className="py-12 text-center text-sm text-gray-400">북마크 불러오는 중...</div>
        <BottomNav />
      </>
    );
  }

  // 2. 인증 실패/미로그인(= userId 없음 포함)
  if (meError || !Number.isFinite(userId)) {
    return (
      <>
        <div className="relative flex h-14 items-center bg-white">
          <button
            type="button"
            aria-label="뒤로가기"
            onClick={() => router.push('/mypage')}
            className="ml-4 flex items-center"
          >
            <GoBack className="hover:text-primary-500" />
          </button>
          <p className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold">북마크 상담</p>
        </div>
        <div className="py-12 text-center text-sm text-gray-400">로그인이 필요합니다</div>
        <BottomNav />
      </>
    );
  }

  // 3. 북마크 목록 API 에러
  if (listError) {
    return (
      <>
        <div className="relative flex h-14 items-center bg-white">
          <button
            type="button"
            aria-label="뒤로가기"
            onClick={() => router.push('/mypage')}
            className="ml-4 flex items-center"
          >
            <GoBack className="hover:text-primary-500" />
          </button>
          <p className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold">북마크 상담</p>
        </div>
        <div className="py-12 text-center text-sm text-gray-400">
          북마크한 상담내역을 불러오지 못했습니다...
        </div>
        <BottomNav />
      </>
    );
  }

  // 4. 정상 렌더
  return (
    <>
      <div className="relative flex h-14 items-center bg-white">
        <button
          type="button"
          aria-label="뒤로가기"
          onClick={() => router.push('/mypage')}
          className="ml-4 flex items-center"
        >
          <GoBack className="hover:text-primary-500" />
        </button>
        <p className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold">북마크 상담</p>
      </div>

      <div className="flex flex-col gap-6 pt-6 pb-24">
        {bookmarked && bookmarked.length === 0 && (
          <div className="py-12 text-center text-sm text-gray-400">북마크한 상담이 없습니다.</div>
        )}

        {bookmarked?.map((summary) => {
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
