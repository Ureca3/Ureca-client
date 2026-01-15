'use client';

import type { StaticImageData } from 'next/image';
import Image from 'next/image';

import ForwardIcon from '@/assets/summary/Forward.png';
import GrayProfile from '@/assets/summary/GrayProfile.png';
import ProfileIcon from '@/assets/summary/Profile.png';

const CARD_BASE_STYLE = `
  w-full
  rounded-2xl
  px-4 py-3
  mx-2
  flex items-center gap-3
  shadow-sm
  transition
  active:scale-[0.98]
`;

const BADGE_BASE_STYLE = `
  text-[10px]
  px-2 py-0.5
  rounded-full
`;

export type SummaryStatus = 'LOADING' | 'SUCCESS' | 'FAIL';

export interface SummaryNavigateCardProps {
  status: SummaryStatus;
  title?: string;
  badges?: string[];
}

/** 상태별 UI 정의 */
const STATUS_UI: Record<
  SummaryStatus,
  {
    title: string;
    subText: string;
    badges?: string[];
    cardBg: string;
    iconBg: string;
    badgeStyle: string;
    icon: StaticImageData;
  }
> = {
  LOADING: {
    title: '무너가 요약중이에요',
    subText: '요약이 곧 끝나요! 잠시만 기다려주세요',
    badges: ['요약중'],
    cardBg: 'bg-white',
    iconBg: 'bg-pink-100',
    badgeStyle: 'bg-pink-50 text-pink-600',
    icon: ProfileIcon,
  },

  SUCCESS: {
    title: '',
    subText: '요약 내용을 확인할 수 있어요',
    cardBg: 'bg-white',
    iconBg: 'bg-pink-100',
    badgeStyle: 'bg-pink-50 text-pink-600',
    icon: ProfileIcon,
  },

  FAIL: {
    title: '무너가 요약을 실패했어요',
    subText: '요약에 실패했어요. 다시 시도해주세요',
    badges: ['요약 실패'],
    cardBg: 'bg-gray-100',
    iconBg: 'bg-gray-300',
    badgeStyle: 'bg-gray-200 text-gray-600',
    icon: GrayProfile,
  },
};

export const SummaryNavigateCard = ({ status, title, badges }: SummaryNavigateCardProps) => {
  const ui = STATUS_UI[status];

  const displayTitle = status === 'SUCCESS' ? (title ?? '') : ui.title;

  const displayBadges = ui.badges ?? badges ?? [];

  return (
    <div role="button" tabIndex={0} className={` ${CARD_BASE_STYLE} ${ui.cardBg} cursor-pointer`}>
      {/* 문어 아이콘 */}
      <div className={`flex h-10 w-10 items-center justify-center rounded-full ${ui.iconBg} `}>
        <Image src={ui.icon} alt="문어 아이콘" width={30} height={30} priority />
      </div>

      {/* 텍스트 */}
      <div className="flex-1 text-left">
        <p className="text-sm font-semibold text-gray-900">{displayTitle}</p>

        <p className="mt-0.5 text-xs text-gray-500">{ui.subText}</p>

        {displayBadges.length > 0 && (
          <div className="mt-2 flex gap-1">
            {displayBadges.map((badge) => (
              <span key={badge} className={`${BADGE_BASE_STYLE} ${ui.badgeStyle}`}>
                {badge}
              </span>
            ))}
          </div>
        )}
      </div>

      <Image src={ForwardIcon} alt="이동" width={20} height={20} />
    </div>
  );
};
