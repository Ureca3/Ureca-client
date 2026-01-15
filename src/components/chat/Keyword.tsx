import React from 'react';

import type { KeywordProps } from '@/types/chat/dto';

export const Keyword = ({
  keyword,
  event,
}: {
  keyword: KeywordProps;
  event: (keyword: KeywordProps) => void;
}) => {
  return (
    <button
      className="border-third-100 hover:bg-third-100 flex h-18 w-23 cursor-pointer flex-col items-center justify-center gap-1 rounded-sm border p-1"
      onClick={() => event(keyword)}
    >
      <div className="flex items-center justify-center">
        <div className="text-center text-3xl">{keyword.img}</div>
      </div>
      <p className="text-center text-sm leading-none font-medium wrap-break-word break-keep">
        {keyword.text}
      </p>
    </button>
  );
};
