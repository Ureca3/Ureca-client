import React from 'react';

import { Button as CallButton } from '@/components/ui/button';
import type { Store } from '@/types/map';

type StoreInfoProps = Store;

export const StoreInfo = ({
  name,
  address,
  phone,
  isOpen,
  distance,
  businessHours,
}: StoreInfoProps) => {
  return (
    <div className="px-4 pb-4 text-black">
      {/* Border */}
      <div className="border-primary-500 flex flex-col gap-4 rounded-xl border p-4">
        {/* Header */}
        <section className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">{name}</h2>

            <div className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${isOpen ? 'bg-green-600' : 'bg-gray-400'}`} />
              <span className={`text-md ${isOpen ? 'text-green-600' : 'text-gray-400'}`}>
                {isOpen ? '영업중' : '영업종료'}
              </span>
            </div>
          </div>

          {distance !== undefined && (
            <p className="text-primary-500 text-md font-semibold">
              {distance >= 1 ? `${distance.toFixed(1)}km` : `${Math.round(distance * 1000)}m`}
            </p>
          )}
        </section>

        {/* Body */}
        <section className={`flex flex-col gap-2 text-sm ${isOpen ? 'text-black' : 'text-gray'}`}>
          <p>· 주소: {address}</p>
          {businessHours && <p>· 영업시간: {businessHours}</p>}
          <p>· 전화번호: {phone}</p>
        </section>

        {/* Buttons */}
        <section className="flex justify-center">
          <CallButton variant="solid" tone="primary" size="m">
            전화하기
          </CallButton>
        </section>
      </div>
    </div>
  );
};
