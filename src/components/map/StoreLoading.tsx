import React from 'react';

export const StoreLoading = () => {
  return (
    <div className="rounded-t-2xl bg-white px-4 py-6 shadow-xl">
      <p className="text-center text-sm text-gray-600">
        정보를 불러오는 중이에요
        <span className="ml-1 animate-pulse">.</span>
        <span className="animate-pulse delay-150">.</span>
        <span className="animate-pulse delay-300">.</span>
      </p>
    </div>
  );
};
