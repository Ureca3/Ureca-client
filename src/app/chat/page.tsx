import React from 'react';

import { ChattingFooter } from '@/components/chat/ChattingFooter';
import { ChattingScreen } from '@/components/chat/ChattingScreen';

const page = () => {
  return (
    <div className="flex h-screen flex-col">
      <ChattingScreen />
      <ChattingFooter />
    </div>
  );
};

export default page;
