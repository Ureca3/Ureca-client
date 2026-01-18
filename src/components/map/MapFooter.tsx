import React, { useState } from 'react';

interface MapFooterProps {
  children: React.ReactNode;
}

export const MapFooter = ({ children }: MapFooterProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="rounded-t-2xl bg-white shadow-xl">
      {/* Grab Handle */}
      <button
        onClick={() => setIsExpanded((prev) => !prev)}
        className="flex w-full justify-center py-2"
        aria-label="매장 정보 접기/펼치기"
      >
        <div className="bg-gray h-1 w-10 rounded-full" />
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isExpanded ? 'max-h-[50vh] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
};
