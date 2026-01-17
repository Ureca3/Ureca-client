import React from 'react';

interface MapFooterProps {
  children: React.ReactNode;
}

export const MapFooter = ({ children }: MapFooterProps) => {
  return (
    <div className="rounded-t-2xl bg-white shadow-xl">
      {/* Grab Handle */}
      <div className="flex justify-center py-3">
        <div className="bg-gray h-1 w-10 rounded-full" />
      </div>

      {children}
    </div>
  );
};
