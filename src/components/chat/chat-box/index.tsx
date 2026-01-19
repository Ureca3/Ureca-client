import React from 'react';

import type { ChatProps, KeywordProps } from '@/types/chat/dto';

import { Keyword } from '../keyword';

export const ChatBox = ({
  chat,
  onClick,
}: {
  chat: ChatProps;
  onClick: (keyword: KeywordProps) => void;
}) => {
  const timeString = chat.time.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div>
      <div
        className={`mx-3 mb-3 flex max-w-sm flex-row items-end text-base font-medium ${
          chat.type === 'me' ? 'flex-row-reverse' : 'flex-row'
        } `}
      >
        <div
          className={`max-w-xs rounded-2xl p-3 wrap-break-word break-keep ${
            chat.type === 'me'
              ? 'bg-primary-50 self-end rounded-tr-none text-black shadow-(--shadow-primary-500-30)'
              : 'bg-white-light self-start rounded-tl-none text-black shadow-(--shadow-secondary-400-30)'
          }`}
        >
          {chat.text}
        </div>
        <div className="mx-1 text-xs font-light">{timeString}</div>
      </div>
      <div>
        {chat.keywords && (
          <div
            className={`mb-7 ml-2 gap-1 ${
              chat.keywords.length <= 3
                ? 'flex flex-row'
                : 'grid max-w-40 grid-flow-col grid-rows-2'
            }`}
          >
            {chat.keywords.map((i) => (
              <Keyword key={i.keyword_id} keyword={i} event={onClick} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
