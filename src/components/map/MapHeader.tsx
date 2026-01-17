import React from 'react';

import GoBack from '@/assets/map/chevron-left.svg';

export const MapHeader = () => {
  return (
    <div className="flex items-center gap-2 bg-[#FFFFFF]/90 px-4 py-3 shadow-sm">
      <button className="text-sm">
        <GoBack />
      </button>
      <h1 className="text-sm font-semibold">가까운 매장 찾기</h1>
    </div>
  );
};
