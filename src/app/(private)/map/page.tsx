'use client';

import { useQuery } from '@tanstack/react-query';

import { Loading as StoreLoading } from '@/components/loading';
import { MapFooter } from '@/components/map/map-footer';
import { StoreError } from '@/components/map/store-error';
import { StoreInfo } from '@/components/map/store-info';
import { fetchStoreMock } from '@/services/map/mapApi';

export default function MapPage() {
  const {
    data: store,
    isLoading,
    isError,
    isFetching,
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
          {(() => {
            if (isLoading || isFetching) return <StoreLoading />;
            if (isError) return <StoreError onRetry={handleMarkerClick} />;
            if (store) return <StoreInfo {...store} />;
            return null;
          })()}
        </MapFooter>
      </div>
    </div>
  );
}
