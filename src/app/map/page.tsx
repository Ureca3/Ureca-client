'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { MapFooter } from '@/components/map/MapFooter';
import { MapHeader } from '@/components/map/MapHeader';
import { StoreError } from '@/components/map/StoreError';
import { StoreInfo } from '@/components/map/StoreInfo';
import { StoreLoading } from '@/components/map/StoreLoading';
import type { FooterState, Store } from '@/types/map';
import { isValidStore } from '@/utils/map';

export default function MapPage() {
  const router = useRouter();
  const [footerState, setFooterState] = useState<FooterState>({
    status: 'idle',
    // store: {
    //   name: 'LG U+ 강남점',
    //   address: '서울 강남구 테헤란로',
    //   phone: '02-1234-5678',
    //   isOpen: true,
    //   distance: 0.15,
    //   businessHours: '10:00 - 21:00',
    // },
  });

  const handleMarkerClick = () => {
    setFooterState({ status: 'loading' });

    // mock API 흉내
    setTimeout(() => {
      const mockStore: Partial<Store> = {
        name: 'LG U+ 강남점',
        address: '서울 강남구 테헤란로',
        phone: '02-1234-5678',
        isOpen: true,
        distance: 0.15,
        businessHours: '10:00 - 21:00',
      };

      if (!isValidStore(mockStore)) {
        setFooterState({ status: 'error' });
        return;
      }

      setFooterState({
        status: 'selected',
        store: mockStore,
      });
    }, 1000);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* 헤더 레이어 */}
      <header className="absolute top-0 right-0 left-0 z-10">
        <MapHeader
          onBack={() => router.push('/')}
          onMenu={() => {
            /* 사이드바 */
          }}
        />
      </header>

      {/* 지도 레이어 */}
      <div className="bg-gray absolute inset-0 flex flex-col">
        <button
          className="flex flex-1 cursor-pointer items-center justify-center"
          onClick={handleMarkerClick}
        >
          지도 화면 (마커 클릭 mock)
        </button>
        <div className="flex-1"></div>
      </div>

      {/* 마커 레이어 */}
      <div className="pointer-events-none absolute inset-0 z-10">{/* Marker UI */}</div>

      {/* 풋터 레이어 */}
      <div className="absolute right-0 bottom-0 left-0 z-20">
        <MapFooter>
          {footerState.status === 'loading' && <StoreLoading />}
          {footerState.status === 'error' && (
            <StoreError onRetry={() => setFooterState({ status: 'loading' })} />
          )}
          {footerState.status === 'selected' && (
            <StoreInfo {...footerState.store} onClose={() => setFooterState({ status: 'idle' })} />
          )}
        </MapFooter>
      </div>
    </div>
  );
}
