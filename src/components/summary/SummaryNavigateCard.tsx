'use client';

import Image from 'next/image';

import ForwardIcon from '@/assets/icons/summary/Forward.png';
import GrayProfile from '@/assets/icons/summary/GrayProfile.png';
import ProfileIcon from '@/assets/icons/summary/Profile.png';
import { convertDate } from '@/utils/summary/dateConverter';

export type SummaryStatus = 'LOADING' | 'SUCCESS' | 'FAIL';

interface SummaryNavigateCardProps {
  status: SummaryStatus;
  title?: string;
  badges?: string[];
  createdAt?: string;
}

export const SummaryNavigateCard = ({
  status,
  title,
  badges = [],
  createdAt,
}: SummaryNavigateCardProps) => {
  const isFail = status === 'FAIL';
  const isLoading = status === 'LOADING' && !createdAt;

  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-pink-100">
        <Image src={isFail ? GrayProfile : ProfileIcon} alt="" width={28} height={28} />
      </div>

      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-900">{title || '상담 요약'}</p>

        {isLoading ? (
          <p className="mt-0.5 text-xs text-gray-500">무너가 열심히 정리하고 있어요</p>
        ) : (
          createdAt && <p className="mt-0.5 text-xs text-gray-400">{convertDate(createdAt)}</p>
        )}

        {badges.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {badges.map((badge) => (
              <span
                key={badge}
                className="rounded-full bg-pink-50 px-2 py-0.5 text-[10px] font-medium text-pink-600"
              >
                {badge}
              </span>
            ))}
          </div>
        )}
      </div>

      <Image src={ForwardIcon} alt="" width={18} height={18} />
    </div>
  );
};
