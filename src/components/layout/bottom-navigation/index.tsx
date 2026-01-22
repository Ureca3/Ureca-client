'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Chatting from '@/assets/icons/nav/Chatting.png';
import Home from '@/assets/icons/nav/Home.png';
import My from '@/assets/icons/nav/My.png';
import Recommend from '@/assets/icons/nav/Recommend.png';
import SummaryMain from '@/assets/icons/nav/SummaryMain.png';

export const BottomNav = () => {
  const router = useRouter();

  return (
    <nav className="fixed bottom-4 left-1/2 z-50 w-[360px] -translate-x-1/2 rounded-2xl border-[#61626F] bg-white px-6 py-1.5 shadow-xl">
      <ul className="flex items-end justify-between">
        {/* 홈 */}
        <li>
          <button
            type="button"
            onClick={() => router.push('/')}
            className="flex flex-col items-center gap-1"
          >
            <Image src={Home} alt="홈" width={15} height={15} />
            <span className="text-xs text-gray-400">홈</span>
          </button>
        </li>

        {/* 추천 */}
        <li>
          <button
            type="button"
            onClick={() => router.push('/recommend')}
            className="flex flex-col items-center gap-1"
          >
            <Image src={Recommend} alt="추천" width={15} height={15} />
            <span className="text-xs text-gray-400">추천</span>
          </button>
        </li>
        {/* 상담 */}
        <li className="-mt-8">
          <button
            type="button"
            onClick={() => router.push('/chat')}
            className="flex flex-col items-center gap-1"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-[#E30084] shadow-lg">
              <Image src={Chatting} alt="상담" width={21} height={21} />
            </div>
            <span className="text-xs font-semibold text-[#E30084]">상담</span>
          </button>
        </li>

        {/* 요약 */}
        <li>
          <button
            type="button"
            onClick={() => router.push('/summary')}
            className="flex flex-col items-center gap-1"
          >
            <Image src={SummaryMain} alt="요약" width={15} height={15} />
            <span className="text-xs text-gray-400">요약</span>
          </button>
        </li>

        {/* MY */}
        <li>
          <button
            type="button"
            onClick={() => router.push('/mypage')}
            className="flex flex-col items-center gap-1"
          >
            <Image src={My} alt="MY" width={15} height={15} />
            <span className="text-xs text-gray-400">MY</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};
