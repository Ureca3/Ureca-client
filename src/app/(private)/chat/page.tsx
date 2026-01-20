import React from 'react';

import { ChattingFooter } from '@/components/chat/chatting-footer';
import { ChattingScreen } from '@/components/chat/chatting-screen';

const page = () => {
  return (
    <div className="flex h-screen flex-col">
      <ChattingScreen />
      <ChattingFooter />
    </div>
  );
};

export default page;
