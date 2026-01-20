import dynamicImport from 'next/dynamic';

import { ChattingFooter } from '@/components/chat/chatting-footer';

export const dynamic = 'force-static';

const ChattingScreen = dynamicImport(
  () => import('@/components/chat/chatting-screen').then((m) => m.ChattingScreen),
  { ssr: false },
);

export default function Page() {
  return (
    <div className="flex h-screen flex-col">
      <ChattingScreen />
      <ChattingFooter />
    </div>
  );
}
