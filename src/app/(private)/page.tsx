'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';

import FileIcon from '@/assets/icons/summary/File1.png';
import ForwardIcon from '@/assets/icons/summary/Forward.png';
import Banner1 from '@/assets/images/banner/image1.png';
import Banner2 from '@/assets/images/banner/image2.png';
import Banner3 from '@/assets/images/banner/image3.png';
import { HomeBannerSlider } from '@/components/home/home-banner-slider';
import { BottomNav } from '@/components/layout/bottom-navigation';
import { Header } from '@/components/layout/header';
import { queryKeys } from '@/lib/queryKeys';
import { fetchRecommendMe } from '@/services/recommend/recommendApi';

const QUICK_ACTIONS = [
  {
    title: '요금조회',
    hint: '5',
    tone: 'from-pink-200 to-pink-50',
    href: 'https://account.lguplus.com/login?client_id=G8RoYUvnwILirwwwK3xG4WR8q9D83to7&login_type=STANDARD_WEB&prompt=select_account&i18nextLng=ko',
    kind: 'external',
  },
  {
    title: '데이터',
    hint: 'LTE',
    tone: 'from-sky-200 to-sky-50',
    href: 'https://www.lguplus.com/mobile/plan/mplan/plan-all/',
    kind: 'external',
  },
  {
    title: '멤버십',
    hint: 'VIP',
    tone: 'from-violet-200 to-violet-50',
    href: 'https://www.lguplus.com/benefit-membership/rank-info',
    kind: 'external',
  },
  {
    title: '매장찾기',
    hint: 'Near',
    tone: 'from-amber-200 to-amber-50',
    href: 'https://www.lguplus.com/support/store-address?gad_source=1&gad_campaignid=23361299212&gbraid=0AAAAAq0QTp2_fQb5sWRVy9Irg52X_WjJq&gclid=Cj0KCQiAp-zLBhDkARIsABcYc6vhkXVPDHzNk8NohISduuaukR07iinMJholXRQZI1Bdzn7w2tSjVQUaAoslEALw_wcB',
    kind: 'external',
  },
];

const HOME_BANNERS = [
  {
    src: Banner1,
    alt: 'U+ 배너 1',
    href: 'https://www.lguplus.com/benefit-event/ongoing/82066?pageNo=1&sortBaseCd=N&tabId=',
  },
  {
    src: Banner2,
    alt: 'U+ 배너 2',
    href: 'https://www.lguplus.com/benefit-event/ongoing/81695?pageNo=1&sortBaseCd=N&tabId=',
  },
  {
    src: Banner3,
    alt: 'U+ 배너 3',
    href: 'https://www.lguplus.com/benefit-event/ongoing/387?pageNo=1&sortBaseCd=N&tabId=&postParam=newyear2026_open',
  },
];

const Home = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleRecommend = () => {
    void queryClient.prefetchQuery({
      queryKey: queryKeys.recommend.me(),
      queryFn: fetchRecommendMe,
    });
    router.push('/recommend');
  };
  const handleSummary = () => router.push('/summary');

  return (
    <div className="min-h-dvh bg-[#FBF8FB] pb-24">
      <Header />

      <div className="space-y-7 px-4 pt-4">
        <section className="space-y-3">
          <HomeBannerSlider items={HOME_BANNERS} />
        </section>

        <section className="grid grid-cols-4 gap-3">
          {QUICK_ACTIONS.map((action) => {
            const content = (
              <>
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${action.tone}`}
                >
                  <span className="text-xs font-bold text-pink-500">{action.hint}</span>
                </div>
                {action.title}
              </>
            );

            if (action.kind === 'internal') {
              return (
                <Link
                  key={action.title}
                  href={action.href}
                  className="flex flex-col items-center gap-2 rounded-2xl bg-white px-2 py-3 text-xs font-semibold text-gray-800 shadow-sm"
                >
                  {content}
                </Link>
              );
            }

            return (
              <a
                key={action.title}
                href={action.href}
                className="flex flex-col items-center gap-2 rounded-2xl bg-white px-2 py-3 text-xs font-semibold text-gray-800 shadow-sm"
                rel="noreferrer"
              >
                {content}
              </a>
            );
          })}
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
                  <p className="text-sm font-semibold text-gray-900">유럽 여행 로밍 캐스터</p>
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-500">
                    오늘
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  유럽으로 출국하는 고객이 이탈리아, 스위스, 벨기에에서 사용할 데이터 중심 로밍
                  요금제 "로밍캐스터"를 신청했습니다.
                </p>
                <div className="mt-2 flex gap-2">
                  <span className="rounded-full bg-pink-50 px-2 py-0.5 text-[10px] text-pink-600">
                    요금제
                  </span>
                  <span className="rounded-full bg-pink-50 px-2 py-0.5 text-[10px] text-pink-600">
                    로밍
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
