'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import Call from '@/assets/images/call/call.svg';
import Calling from '@/assets/images/call/mooner_calling.svg';
import { ErrorComponent } from '@/components/ui/fallback/error';
import { useAgora } from '@/hooks/call/useAgora';

import { Button } from '../../ui/button';
import { LoadingComponent } from '../../ui/fallback/loading';
import { AgoraFrequencyVisualizer } from '../agora-visualizer';

export const CallComponent = () => {
  const [channel] = useState('room1');
  const { error, ready, localAudioTrack, client } = useAgora(channel);
  const router = useRouter();

  const handleEndCall = async () => {
    if (localAudioTrack) {
      localAudioTrack.stop();
      localAudioTrack.close();
    }
    if (client) {
      client.removeAllListeners();
      await client.leave();
    }
    router.push('summary');
  };

  if (error) {
    return <ErrorComponent message="문제가 발생했습니다. 잠시 후 다시 시도해주세요." />;
  }
  if (!ready) {
    return <LoadingComponent />;
  }

  return (
    <div className="mx-4 flex h-full flex-col items-center justify-evenly">
      <div className="flex flex-col items-center">
        <Calling />
        <div className="mt-5.5 text-[14px] font-bold">상담원과 통화중입니다.</div>
        <div className="mt-11.5 flex h-15 items-center justify-center [&>canvas]:bg-transparent">
          {localAudioTrack && <AgoraFrequencyVisualizer localAudioTrack={localAudioTrack} />}
        </div>
      </div>
      <div className="w-full">
        <Button
          variant="solid"
          tone="secondary"
          size="l"
          className="bg-secondary-400! hover:bg-secondary-300! text-white-light mt-12.5 mb-2 w-full px-5 font-semibold"
          onClick={handleEndCall}
        >
          <Call /> 상담 종료하기
        </Button>
        <div className="flex w-full items-end justify-end">
          <span className="text-[10px] font-semibold text-black">
            상담 종료하기 버튼을 누르시면 자동 요약이 됩니다.
          </span>
        </div>
      </div>
    </div>
  );
};
