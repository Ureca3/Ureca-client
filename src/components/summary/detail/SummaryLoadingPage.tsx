'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Back from '@/assets/summary/Back.png';
import SummaryLoading from '@/assets/summary/SummaryIng.png';

export const SummaryLoadingPage = () => {
  const router = useRouter();

  return (
    <>
      {/* 헤더 */}
      <div className="relative flex h-14 items-center bg-white">
        {/* 뒤로가기 */}
        <button type="button" onClick={() => router.push('/summary')} className="ml-4">
          <Image src={Back} alt="돌아가기" width={20} height={20} priority />
        </button>

        {/* 중앙 타이틀 */}
        <p className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold">상담 요약</p>
      </div>

      {/* 본문 */}
      <div className="mx-auto mt-10 flex min-h-[450px] w-[335px] flex-col items-center justify-center rounded-2xl bg-white p-6 shadow-lg">
        <Image src={SummaryLoading} alt="요약 중" width={201} height={223} priority />

        <p className="mt-4 text-sm font-semibold text-[#6E1E3D]">아직은 요약중이에요!</p>
        <p className="mt-4 text-sm font-semibold text-[#6E1E3D]">
          요약이 다 끝나면 다시 확인해주세요!
        </p>
      </div>
    </>
  );
};
