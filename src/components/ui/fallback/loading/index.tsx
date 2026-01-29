import React from 'react';

import '@/styles/animation.css';

export const LoadingComponent = () => {
  return (
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
  );
};
