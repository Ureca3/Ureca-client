import React from 'react';

interface StoreErrorProps {
  onRetry: () => void;
}

export const StoreError = ({ onRetry }: StoreErrorProps) => {
  return (
    <div className="rounded-t-2xl bg-white px-4 py-6 shadow-xl">
      <p className="text-center text-sm text-red-500">매장 정보를 불러오지 못했어요</p>
      <div className="mt-4 flex justify-center">
        <button
          onClick={onRetry}
          className="bg-primary-500 rounded-md px-4 py-2 text-sm font-semibold text-white"
        >
          다시 시도
        </button>
      </div>
    </div>
  );
};
