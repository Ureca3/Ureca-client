import Image from 'next/image';

import loadingPng from '@/assets/images/map/map-loading.png';
export const Loading = () => {
  return (
    <div className="bg-primary-100 flex h-96 w-full flex-col items-center justify-center gap-3 rounded-xl py-8">
      <div className="relative flex h-40 w-40 justify-center">
        <Image src={loadingPng} alt="로딩 중" fill className="object-contain" />
      </div>

      <div className="flex items-center justify-center gap-4">
        <div className="bg-primary-500 animate-dot h-2 w-2 rounded-full"></div>
        <div className="bg-primary-500 animate-dot animation-delay-200 h-2 w-2 rounded-full"></div>
        <div className="bg-primary-500 animate-dot animation-delay-400 h-2 w-2 rounded-full"></div>
      </div>
    </div>
  );
};
