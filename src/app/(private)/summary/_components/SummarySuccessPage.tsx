'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Back from '@/assets/icons/summary/Back.png';
import File1 from '@/assets/icons/summary/File1.png';
import Profile from '@/assets/icons/summary/Profile.png';
import Topic from '@/assets/icons/summary/Topic.png';
import { BottomNav } from '@/components/layout/bottom-navigation';
import type { ApiSummaryDetail } from '@/types/summary/summary';

interface SummarySuccessPageProps {
  data: ApiSummaryDetail;
}

export const SummarySuccessPage = ({ data }: SummarySuccessPageProps) => {
  const router = useRouter();

  const { title, subject, keywords = [], points = [], createdAt } = data;

  return (
    <>
      <div className="min-h-screen bg-[#FFF6FA] pb-28">
        {/* 헤더 */}
        <div className="relative flex h-14 items-center bg-white">
          <button type="button" onClick={() => router.push('/summary')} className="ml-4">
            <Image src={Back} alt="돌아가기" width={20} height={20} />
          </button>
          <p className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold">상담 요약</p>
        </div>

        {/* 요약 기본 정보 */}
        <div className="mt-5 flex items-start gap-3 px-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100">
            <Image src={Profile} alt="" width={22} height={22} />
          </div>

          <div className="flex-1">
            <h1 className="text-[15px] font-semibold">{title}</h1>
            {createdAt && <p className="mt-0.5 text-[11px] text-gray-500">{createdAt}</p>}

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

        {/* 상담 주제 */}
        <div className="mt-6 px-4">
          <div className="mb-2 flex items-center gap-2">
            <Image src={Topic} alt="" width={15} height={15} />
            <h2 className="text-sm font-semibold">상담 주제</h2>
          </div>
          <div className="rounded-2xl bg-white px-4 py-3 text-[13px]">{subject}</div>
        </div>

        {/* 핵심 요약 */}
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
      </div>

      <BottomNav />
    </>
  );
};
