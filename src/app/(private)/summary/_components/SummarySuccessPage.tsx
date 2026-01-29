'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Bookmark } from 'lucide-react';
import {BoxText} from "@/assets/icons/summary";
import GoBack from '@/assets/icons/header/chevron-left.svg';
import File1 from '@/assets/icons/summary/File1.png';
import Profile from '@/assets/icons/summary/Profile.png';
import Topic from '@/assets/icons/summary/Topic.png';
import { RecommendCardList } from '@/components/counseling-recommend/recommend-cardlist';
import { BottomNav } from '@/components/layout/bottom-navigation';
import { useMe } from '@/hooks/auth/useMe';
import { useRecommendSummary } from '@/hooks/recommend/useRecommendSummary';
import { useToggleBookmark } from '@/hooks/summary/useToggleBookmark';
import type { ApiSummaryDetail } from '@/types/summary/summary';

interface SummarySuccessPageProps {
  data: ApiSummaryDetail;
}

export const SummarySuccessPage = ({ data }: SummarySuccessPageProps) => {
  const router = useRouter();

  const { data: me, isLoading: meLoading, isError: meError } = useMe();
  const userId = me?.id;

  const { summaryId, title, subject, keywords = [], points = [], createdAt, isBookmarked } = data;
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const { mutateAsync, isPending } = useToggleBookmark({ summaryId, userId });
  const {
    data: recommendData,
    isLoading: recommendLoading,
    isError: recommendError,
    refetch: refetchRecommend,
  } = useRecommendSummary(summaryId);
  const recommendProducts = recommendData?.products ?? [];

  const disabled = meLoading || meError || !Number.isFinite(userId) || isPending;

  const handleToggleBookmark = async () => {
    if (disabled) return;
    setBookmarked((prev) => !prev);

    try {
      await mutateAsync();
    } catch (e) {
      setBookmarked((prev) => !prev);
      console.error(e);
    }
  };

  const convertDate = (date: string): string => {
    const toDate = new Date(date);
    return toDate.toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <>
      <div className="min-h-screen bg-[#FFF6FA] pb-28">
        <div className="relative flex h-14 items-center bg-white">
          <button type="button" onClick={() => router.push('/summary')} className="ml-4">
            <GoBack className="hover:text-primary-500" />
          </button>

          <p className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold">상담 요약</p>

          <button
            type="button"
            onClick={handleToggleBookmark}
            disabled={disabled}
            aria-label={bookmarked ? '북마크 해제' : '북마크 추가'}
            aria-pressed={bookmarked}
            className="mr-4 ml-auto"
          >
            <Bookmark
              size={22}
              className={bookmarked ? 'fill-pink-500 stroke-pink-500' : 'stroke-gray-400'}
            />
          </button>
        </div>

        <div className="mt-5 flex items-start gap-3 px-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100">
            <Image src={Profile} alt="" width={22} height={22} />
          </div>

          <div className="flex-1">
            <h1 className="text-[15px] font-semibold">{title}</h1>
            {createdAt && (
              <p className="mt-0.5 text-[11px] text-gray-500">{convertDate(createdAt)}</p>
            )}

            <div className="mt-2 flex flex-wrap gap-1.5">
              {keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full bg-pink-100 px-2 py-0.5 text-[11px] font-medium text-pink-600"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 px-4">
          <div className="mb-2 flex items-center gap-2">
            <Image src={Topic} alt="" width={15} height={15} />
            <h2 className="text-sm font-semibold">상담 주제</h2>
          </div>
          <div className="rounded-2xl bg-white px-4 py-3 text-[13px]">{subject}</div>
        </div>

        <div className="mt-6 px-4">
          <div className="mb-2 flex items-center gap-2">
            <Image src={File1} alt="" width={15} height={15} />
            <h2 className="text-sm font-semibold">핵심 요약</h2>
          </div>

          <div className="rounded-2xl bg-white px-4 py-4">
            <ul className="space-y-3">
              {points.map((point, idx) => (
                <li key={idx} className="flex gap-3 text-[13px]">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-[11px] font-semibold text-white">
                    {idx + 1}
                  </span>
                  <span className="flex-1">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-6 px-4">
          <div className="mb-2 flex items-center gap-2">
            <Image src={BoxText} alt="" width={15} height={15} />
            <h2 className="text-sm font-semibold">추천 상품</h2>
          </div>

          {recommendLoading && (
            <div className="rounded-2xl bg-white px-4 py-3 text-[13px] text-gray-400">
              추천 상품 불러오는 중...
            </div>
          )}

          {recommendError && (
            <div className="rounded-2xl bg-white px-4 py-3 text-[13px] text-red-500">
              추천 상품을 불러오지 못했습니다.
              <button type="button" className="ml-2 underline" onClick={() => refetchRecommend()}>
                다시 시도
              </button>
            </div>
          )}

          {!recommendLoading && !recommendError && recommendProducts.length === 0 && (
            <div className="rounded-2xl bg-white px-4 py-3 text-[13px] text-gray-400">
              추천 상품이 없습니다.
            </div>
          )}

          {!recommendLoading && !recommendError && recommendProducts.length > 0 && (
            <RecommendCardList products={recommendProducts} />
          )}
        </div>
      </div>

      <BottomNav />
    </>
  );
};
