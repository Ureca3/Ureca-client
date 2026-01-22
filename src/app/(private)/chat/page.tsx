import React from 'react';

import { ChattingFooter } from '@/components/chat/chatting-footer';

import { ChattingClient } from './ChattingClient';

export const dynamic = 'force-static';

export default function Page() {
  return (
    <div className="flex h-screen flex-col">
      <ChattingClient />
      <ChattingFooter />
    </div>
  );
}
