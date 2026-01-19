import React from 'react';

import SendIcon from '@/assets/images/chat/send.svg';

export const ChattingFooter = () => {
  return (
    <div className="mx-5 flex h-16 shrink-0 items-center justify-center">
      <input
        aria-label="메시지 입력"
        className="border-primary-300 bg-primary-50 focus:border-primary-500 h-11 w-screen rounded-xl border"
        placeholder="메시지를 입력하세요."
      />
      <button
        type="button"
        aria-label="메시지 전송"
        className="bg-primary-500 ml-4 rounded-full p-2"
      >
        <SendIcon />
      </button>
    </div>
  );
};
