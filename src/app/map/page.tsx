import React from 'react';

import { MapHeader } from '@/components/map/MapHeader';

export default function MapPage() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* 1. Map Layer */}
      <div className="bg-gray absolute inset-0 flex items-center justify-center">지도 화면</div>

      {/* 2. Header Overlay */}
      <header className="absolute top-0 right-0 left-0 z-10">
        <MapHeader />/
      </header>

      {/* 3. Marker Layer */}
      <div className="pointer-events-none absolute inset-0 z-10">{/* Marker UI */}</div>

      {/* 4. Bottom Sheet */}
      <div className="absolute right-0 bottom-0 left-0 z-20">{/* <StoreBottomSheet /> */}</div>
    </div>
  );
}
