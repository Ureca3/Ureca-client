import React from 'react';

import GoBack from '@/assets/map/chevron-left.svg';
import Hamburger from '@/assets/map/menu.svg';

interface MapHeaderProps {
  onBack: () => void;
  onMenu: () => void;
}

export const MapHeader = ({ onBack, onMenu }: MapHeaderProps) => {
  return (
    <div className="flex items-center justify-center bg-white px-4 py-3 text-black shadow-sm">
      <button className="w-[33%]" onClick={onBack} aria-label="뒤로가기">
        <GoBack />
      </button>

      <h1 className="text-md flex w-[33%] justify-center font-semibold">가까운 매장 찾기</h1>

      <button className="flex w-[33%] justify-end" onClick={onMenu} aria-label="메뉴">
        <Hamburger />
      </button>
    </div>
  );
};
