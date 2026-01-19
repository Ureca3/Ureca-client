'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Back from '@/assets/summary/Back.png';
import BoxText from '@/assets/summary/BoxText.png';
import Check from '@/assets/summary/Check.png';
import File1 from '@/assets/summary/File1.png';
import Profile from '@/assets/summary/Profile.png';
import Topic from '@/assets/summary/Topic.png';
import { BottomNav } from '@/components/layout/bottom-navigation';

export const SummarySuccessPage = () => {
  const router = useRouter();

  return (
    <>
      <div className="pb-28">
        <div className="relative flex h-14 items-center bg-white">
          <button type="button" onClick={() => router.push('/summary')} className="ml-4">
            <Image src={Back} alt="돌아가기" width={20} height={20} priority />
          </button>
          <p className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold">상담 요약</p>
        </div>

        <div className="mt-6 flex items-start gap-3 px-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pink-100">
            <Image src={Profile} alt="" width={24} height={24} />
          </div>

          <div className="flex-1">
            <h1 className="text-[15px] font-semibold text-gray-900">5G 요금제 변경 상담</h1>
            <p className="mt-0.5 text-[10px] text-gray-500">2025년 1월 12일 오후 2:45</p>

            <div className="mt-2 flex gap-1.5">
              <span className="rounded-full bg-pink-50 px-2 py-0.5 text-[11px] font-medium text-pink-600">
                요금제
              </span>
              <span className="rounded-full bg-sky-50 px-2 py-0.5 text-[11px] font-medium text-sky-600">
                5G
              </span>
              <span className="rounded-full bg-violet-50 px-2 py-0.5 text-[11px] font-medium text-violet-600">
                할인
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 mb-2 flex items-center gap-2 px-6">
          <Image src={Topic} alt="" width={15} height={15} />
          <h2 className="text-base font-semibold">상담 주제</h2>
        </div>
        <div className="mx-6 rounded-lg bg-white px-6 py-4 text-[13px] shadow-lg">
          5G 요금제 변경 및 할인 혜택 문의
        </div>

        <div className="mt-6 mb-2 flex items-center gap-2 px-6">
          <Image src={File1} alt="" width={15} height={15} />
          <h2 className="text-base font-semibold">핵심 요약</h2>
        </div>
        <div className="mx-6 rounded-lg bg-white px-6 py-4 text-[13px] shadow-lg">
          <ul className="space-y-2">
            <li>① 현재 LTE 요금에서 5G 요금제로 변경</li>
            <li>② 5G 프리미어 에센셜 요금제 추천 (월 69,000원)</li>
            <li>③ 기존 대비 월 10,000원 할인 혜택 제공</li>
          </ul>
        </div>

        <div className="mt-6 mb-2 flex items-center gap-2 px-6">
          <Image src={BoxText} alt="" width={15} height={15} />
          <h2 className="text-base font-semibold">추천 요금제</h2>
        </div>
        <div className="mx-6 rounded-lg bg-white px-6 py-4 shadow-lg">
          <ul className="space-y-4">
            <li className="flex items-start justify-between">
              <div>
                <p className="text-[14px] font-semibold text-gray-900">5G 프리미어 에센셜</p>
                <p className="mt-0.5 text-[14px] font-semibold text-pink-600">월 69,000원</p>
                <ul className="mt-2 space-y-0.5 text-[11px] text-gray-500">
                  <li>· 데이터 무제한</li>
                  <li>· 통화/문자 무제한</li>
                  <li>· 넷플릭스 베이직</li>
                </ul>
              </div>
              <span className="mt-1 text-gray-400">{'>'}</span>
            </li>
          </ul>
        </div>

        <div className="mt-8 px-6">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center">
              <Image src={Check} alt="" width={20} height={20} />
            </div>
            <h2 className="text-lg font-semibold">주요 조건 및 혜택</h2>
          </div>

          <div className="rounded-2xl bg-white px-6 py-5 shadow-lg">
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center">
                  <Image src={Check} alt="" width={20} height={20} />
                </div>
                <p className="text-[15px] text-gray-700">
                  24개월 약정 시 월 <span className="font-semibold">10,000원 할인</span>
                </p>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center">
                  <Image src={Check} alt="" width={20} height={20} />
                </div>
                <p className="text-[15px] text-gray-700">
                  가족결합 추가 <span className="font-semibold">5% 할인 가능</span>
                </p>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center">
                  <Image src={Check} alt="" width={20} height={20} />
                </div>
                <p className="text-[15px] text-gray-700">
                  신규 가입 시 <span className="font-semibold">갤럭시 버즈 증정</span>
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex gap-4 px-6">
          <button className="flex-1 rounded-xl bg-pink-500 py-4 text-[15px] font-semibold text-white">
            상품 추천 보기
          </button>
          <button className="flex-1 rounded-xl border-2 border-gray-300 bg-white py-4 text-[15px] font-semibold text-gray-900">
            매장 찾기
          </button>
        </div>
      </div>

      <BottomNav />
    </>
  );
};
