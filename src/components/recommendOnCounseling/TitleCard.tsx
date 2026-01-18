import React from 'react';

import UserOcto from '@/assets/recommend/user_octo.svg';

interface ROCTitleCardProps {
  title: string;
}

export const TitleCard = ({ title }: ROCTitleCardProps) => {
  return (
    <div className="text-gray flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <div className="bg-primary-100 border-white-light flex h-13 w-13 items-center justify-center overflow-hidden rounded-full border">
          <UserOcto />
        </div>
        <div className="text-gray text-base">
          이 상담을 기반으로 추천했어요.
          <div className="text-primary-500">{title}</div>
        </div>
      </div>
      고객님의 요청에 맞는 요금제를 비교해보세요.
    </div>
  );
};
