'use client';

import { usePathname, useRouter } from 'next/navigation';

import My from '@/assets/icons/nav/circle-user-round.svg';
import Summary from '@/assets/icons/nav/file-text.svg';
import Recommend from '@/assets/icons/nav/gift.svg';
import Home from '@/assets/icons/nav/house.svg';
import Call from '@/assets/images/call/call.svg';

export const BottomNav = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) =>
    path === '/' ? pathname === '/' : pathname === path || pathname.startsWith(`${path}/`);

  return (
    <nav className="fixed bottom-4 left-1/2 z-50 w-[90%] max-w-3xl -translate-x-1/2 rounded-2xl border-[#61626F] bg-white px-6 py-1.5 shadow-xl">
      <ul className="flex items-end justify-between">
        {/* 홈 */}
        <li>
          <button
            type="button"
            onClick={() => router.push('/')}
            className="flex flex-col items-center gap-1"
          >
            <Home
              className={`h-5 w-5 transition-colors ${isActive('/') ? 'text-primary-500' : 'text-gray-600'}`}
            />
            <span
              className={`text-xs ${
                isActive('/') ? 'text-primary-500 font-semibold' : 'text-gray-600'
              }`}
            >
              홈
            </span>
          </button>
        </li>

        {/* 추천 */}
        <li>
          <button
            type="button"
            onClick={() => router.push('/recommend')}
            className="flex flex-col items-center gap-1"
          >
            <Recommend
              className={`h-5 w-5 transition-colors ${isActive('/recommend') ? 'text-primary-500' : 'text-gray-600'}`}
            />
            <span
              className={`text-xs ${
                isActive('/recommend') ? 'text-primary-500 font-semibold' : 'text-gray-600'
              }`}
            >
              추천
            </span>
          </button>
        </li>

        {/* 상담 */}
        <li className="-mt-8">
          <button
            type="button"
            onClick={() => router.push('/call')}
            className="relative flex flex-col items-center gap-1"
          >
            <div className="bg-primary-500 relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-3 border-white shadow-[0_8px_20px_rgba(227,0,132,0.4)]">
              <Call />
            </div>
            <span className="text-primary-500 text-xs font-semibold">상담</span>
          </button>
        </li>

        {/* 요약 */}
        <li>
          <button
            type="button"
            onClick={() => router.push('/summary')}
            className="flex flex-col items-center gap-1"
          >
            <Summary
              className={`h-5 w-5 transition-colors ${isActive('/summary') ? 'text-primary-500' : 'text-gray-600'}`}
            />
            <span
              className={`text-xs ${
                isActive('/summary') ? 'text-primary-500 font-semibold' : 'text-gray-600'
              }`}
            >
              요약
            </span>
          </button>
        </li>

        {/* 마이 */}
        <li>
          <button
            type="button"
            onClick={() => router.push('/mypage')}
            className="flex flex-col items-center gap-1"
          >
            <My
              className={`h-5 w-5 transition-colors ${isActive('/mypage') ? 'text-primary-500' : 'text-gray-600'}`}
            />
            <span
              className={`text-xs ${
                isActive('/mypage') ? 'text-primary-500 font-semibold' : 'text-gray-600'
              }`}
            >
              MY
            </span>
          </button>
        </li>
      </ul>
    </nav>
  );
};
