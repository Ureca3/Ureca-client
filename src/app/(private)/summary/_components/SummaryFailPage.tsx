'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Back from '@/assets/icons/summary/Back.png';
import SummaryFail from '@/assets/images/summary/SummaryFail.png';

export const SummaryFailPage = () => {
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
        <Image src={SummaryFail} alt="요약 실패" width={201} height={223} priority />

        <p className="mt-4 text-sm font-semibold text-[#6E1E3D]">요청을 다시 시도해주세요</p>

        {/* 로딩 스피너 */}
        <div className="mt-4 h-6 w-6 animate-spin rounded-full border-2 border-[#6E1E3D] border-t-transparent" />
      </div>
    </>
  );
};
