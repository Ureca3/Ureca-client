'use client';

import dynamic from 'next/dynamic';

const ChattingScreen = dynamic(
  () => import('@/components/chat/chatting-screen').then((m) => m.ChattingScreen),
  { ssr: false },
);

export const ChattingClient = () => {
  return <ChattingScreen />;
};
