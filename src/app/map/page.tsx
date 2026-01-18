'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { MapFooter } from '@/components/map/MapFooter';
import { MapHeader } from '@/components/map/MapHeader';
import { StoreError } from '@/components/map/StoreError';
import { StoreInfo } from '@/components/map/StoreInfo';
import { StoreLoading } from '@/components/map/StoreLoading';
import { fetchStoreMock } from '@/services/map/mapApi';

export default function MapPage() {
  const router = useRouter();
  const {
    data: store,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['store', 'selected'],
    queryFn: fetchStoreMock,
    enabled: false,
  });

  const handleMarkerClick = () => {
    refetch();
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
          {isLoading && <StoreLoading />}
          {isError && <StoreError onRetry={handleMarkerClick} />}
          {store && <StoreInfo {...store} />}
        </MapFooter>
      </div>
    </div>
  );
}
