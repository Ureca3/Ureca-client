'use client';

import React from 'react';

<<<<<<< Updated upstream
=======
import Wink from '@/assets/fallback/mooner_wink.svg';
import { LoadingState } from '@/components/ui/status';

>>>>>>> Stashed changes
import '@/styles/animation.css';

export const LoadingComponent = () => {
  return (
<<<<<<< Updated upstream
    <div
      className="flex h-full w-screen flex-col items-center justify-center"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      {/* <Wink aria-hidden="true" focusable="false" /> */}
      <div className="mt-10 flex items-center justify-center space-x-4">
        <span
          className="bg-gray h-4 w-4 animate-(--animate-bounce-color) rounded-full"
          style={{ animationDelay: '0s' }}
        ></span>
        <span
          className="bg-gray h-4 w-4 animate-(--animate-bounce-color) rounded-full"
          style={{ animationDelay: '0.2s' }}
        ></span>
        <span
          className="bg-gray h-4 w-4 animate-(--animate-bounce-color) rounded-full"
          style={{ animationDelay: '0.4s' }}
        ></span>
      </div>
    </div>
=======
    <LoadingState
      title="로딩 중입니다."
      icon={<Wink aria-hidden="true" focusable="false" />}
      indicator={
        <div className="mt-2 flex items-center justify-center space-x-4">
          <span
            className="bg-gray h-4 w-4 animate-(--animate-bounce-color) rounded-full"
            style={{ animationDelay: '0s' }}
          ></span>
          <span
            className="bg-gray h-4 w-4 animate-(--animate-bounce-color) rounded-full"
            style={{ animationDelay: '0.2s' }}
          ></span>
          <span
            className="bg-gray h-4 w-4 animate-(--animate-bounce-color) rounded-full"
            style={{ animationDelay: '0.4s' }}
          ></span>
        </div>
      }
    />
>>>>>>> Stashed changes
  );
};
