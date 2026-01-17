import React from 'react';

import Cross from '@/assets/map/x.svg';

import { StoreInfoCallButton } from './StoreInfoCallButton';
import { StoreInfoDirectionsButton } from './StoreInfoDirectionsButton';

interface StoreInfoProps {
  name: string;
  address: string;
  phone: string;
  isOpen: boolean;
  distance?: number;
  businessHours: string;
  onClose: () => void;
}

export const StoreInfo = ({
  name,
  address,
  phone,
  isOpen,
  distance,
  businessHours,
  onClose,
}: StoreInfoProps) => {
  return (
    <div className="max-h-auto px-4 pb-4 text-black">
      {/* Border */}
      <div className="border-primary-500 flex flex-col gap-3 rounded-xl border p-4">
        {/* Header */}
        <section className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">{name}</h2>
            <Cross
              onClick={onClose}
              className="text-md text-gray cursor-pointer hover:opacity-50"
              aria-label="닫기"
            />
          </div>
          <div className="justify-starter flex items-center gap-4">
            {distance !== undefined && (
              <p className="text-primary-500 text-md font-semibold">
                {distance >= 1 ? `${distance.toFixed(1)}km` : `${Math.round(distance * 1000)}m`}
              </p>
            )}
            <div className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${isOpen ? 'bg-green-600' : 'bg-gray-400'}`} />
              <span className={`text-sm ${isOpen ? 'text-green-600' : 'text-gray-400'}`}>
                {isOpen ? '영업중' : '영업종료'}
              </span>
            </div>
          </div>
        </section>

        {/* Body */}
        <section className={`flex flex-col gap-2 text-sm ${isOpen ? 'text-black' : 'text-gray'}`}>
          <p>· 주소: {address}</p>
          <p>· 영업시간: {businessHours}</p>
          <p>· 전화번호: {phone}</p>
        </section>

        {/* Buttons */}
        <section className="flex gap-2">
          <StoreInfoCallButton />
          <StoreInfoDirectionsButton />
        </section>
      </div>
    </div>
  );
};
