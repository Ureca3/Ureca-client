'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import FileIcon from '@/assets/icons/summary/File1.png';
import ForwardIcon from '@/assets/icons/summary/Forward.png';
import { BottomNav } from '@/components/layout/bottom-navigation';
import { Header } from '@/components/layout/header';

const QUICK_ACTIONS = [
  { title: '요금조회', hint: '5', tone: 'from-pink-200 to-pink-50' },
  { title: '데이터', hint: 'LTE', tone: 'from-sky-200 to-sky-50' },
  { title: '멤버십', hint: 'VIP', tone: 'from-violet-200 to-violet-50' },
  { title: '매장찾기', hint: 'Near', tone: 'from-amber-200 to-amber-50' },
];

const Home = () => {
  const router = useRouter();

  const handleRecommend = () => router.push('/recommend');
  const handleSummary = () => router.push('/summary');

  return (
    <div className="min-h-dvh bg-[#FBF8FB] pb-24">
      <Header />

      <div className="space-y-7 px-4 pt-4">
        <section className="relative overflow-hidden rounded-[26px] bg-[#EDEBFF] px-5 py-6 shadow-md">
          <div className="space-y-2">
            <p className="text-2xl font-bold text-gray-900">친구 추천 이벤트</p>
            <p className="text-sm text-gray-600">친구 따라 U+로 가면 휴대폰 요금 할인!</p>
          </div>

          <div className="mt-6 flex items-end gap-3">
            <div className="rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-md">
              추천받은 친구에게
              <br />
              1만원 할인
            </div>
            <div className="rounded-full bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-md">
              추천인에게
              <br />
              1만원 할인
            </div>
          </div>

          <div className="absolute right-4 bottom-4 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white">
            1 / 5
          </div>
        </section>

        <section className="grid grid-cols-4 gap-3">
          {QUICK_ACTIONS.map((action) => (
            <button
              key={action.title}
              type="button"
              className="flex flex-col items-center gap-2 rounded-2xl bg-white px-2 py-3 text-xs font-semibold text-gray-800 shadow-sm"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${action.tone}`}
              >
                <span className="text-xs font-bold text-pink-500">{action.hint}</span>
              </div>
              {action.title}
            </button>
          ))}
        </section>

        <section className="space-y-3">
          <p className="text-sm font-semibold text-gray-900">LG 유플러스 new 상담 챗봇</p>
          <div className="flex items-center gap-3 rounded-2xl border border-[#E6E2F4] bg-[#F5F3FF] px-4 py-3 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xs font-semibold text-gray-700 shadow-sm">
              CHAT
            </div>
            <div>
              <p className="text-xs text-gray-600">유플러스만의 상담 요약 서비스</p>
              <p className="text-sm font-semibold text-gray-900">요플이를 지금 당장 만나보세요!</p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-900">최근 상담</p>
            <button
              type="button"
              className="text-xs font-semibold text-pink-600"
              onClick={handleSummary}
            >
              전체보기
            </button>
          </div>

          <div className="rounded-2xl bg-white px-4 py-4 shadow-md">
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100">
                <Image src={FileIcon} alt="" width={22} height={22} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-gray-900">5G 요금제 변경 상담</p>
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-500">
                    오늘
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  현재 사용 중인 요금제에서 5G 프리미어 에센셜로 변경 시 월 69,000원으로 데이터
                  무제한 사용 가능합니다.
                </p>
                <div className="mt-2 flex gap-2">
                  <span className="rounded-full bg-pink-50 px-2 py-0.5 text-[10px] text-pink-600">
                    요금제
                  </span>
                  <span className="rounded-full bg-pink-50 px-2 py-0.5 text-[10px] text-pink-600">
                    5G
                  </span>
                </div>
              </div>
              <Image src={ForwardIcon} alt="" width={16} height={16} />
            </div>
          </div>
        </section>

        <section className="space-y-3 pb-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-900">추천</p>
            <button
              type="button"
              className="text-xs font-semibold text-pink-600"
              onClick={handleRecommend}
            >
              전체보기
            </button>
          </div>

          <div className="rounded-2xl bg-gradient-to-r from-[#FF2E97] via-[#FF2E97] to-[#FF5FB6] px-4 py-4 text-white shadow-md">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-xs font-semibold">
                PLAN
              </div>
              <div>
                <p className="text-sm font-semibold">요금제 최적화 추천!</p>
                <p className="text-xs text-white/90">LG유플러스만의 최적의 서비스!</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white px-4 py-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-purple-100 text-xs font-semibold text-purple-600">
                TV
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">LG 가전 추천 보러가기</p>
                <p className="text-xs text-gray-500">카드 할인 확인하러가기</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <BottomNav />
    </div>
  );
};

export default Home;
