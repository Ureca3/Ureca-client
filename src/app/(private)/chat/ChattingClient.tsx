'use client';

import dynamic from 'next/dynamic';

import { ErrorBoundary } from '@/components/ui/error-boundary';

const ChattingScreen = dynamic(
  () => import('@/components/chat/chatting-screen').then((m) => m.ChattingScreen),
  { ssr: false },
);

export const ChattingClient = () => {
  return (
    <ErrorBoundary>
      <ChattingScreen />
    </ErrorBoundary>
  );
};
