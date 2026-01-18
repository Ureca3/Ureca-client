import React from 'react';
import Image from 'next/image';

import loadingPng from '@/assets/map/map-loading.png';
export const StoreLoading = () => {
  return (
    <div className="bg-white px-4 pb-4">
      <div className="bg-primary-100 flex flex-col items-center justify-center gap-2 rounded-xl py-2">
        <div className="relative flex h-40 w-40 justify-center">
          <Image src={loadingPng} alt="로딩 중" fill className="object-contain" />
        </div>
        <div className="flex items-center justify-center gap-4">
          <div className="bg-primary-500 animate-dot h-2 w-2 rounded-full"></div>
          <div className="bg-primary-500 animate-dot animation-delay-200 h-2 w-2 rounded-full"></div>
          <div className="bg-primary-500 animate-dot animation-delay-400 h-2 w-2 rounded-full"></div>
        </div>
        <p className="text-gray text-center text-lg font-semibold">정보를 불러오는 중이에요.</p>
      </div>
    </div>
  );
};
