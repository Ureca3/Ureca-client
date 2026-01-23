'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import Call from '@/assets/images/call/call.svg';
import Calling from '@/assets/images/call/mooner_calling.svg';
import { useAgora } from '@/hooks/call/useAgora';

import { Button } from '../ui/button';
import { ErrorComponent } from '../ui/fallback/ErrorComponent';
import { LoadingComponent } from '../ui/fallback/LoadingComponent';

import { AgoraFrequencyVisualizer } from './AgoraVisualizer';

export const CallComponent = () => {
  const [channel] = useState('room1');
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const { error, ready, localAudioTrack } = useAgora(channel);
  const router = useRouter();

  useEffect(() => {
    let stream: MediaStream | null = null;
    const initRecorder = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        recorderRef.current = recorder;
        recorder.ondataavailable = (e: BlobEvent) => {
          if (e.data.size > 0) chunksRef.current.push(e.data);
        };
        recorder.start();
      } catch (err) {
        console.error('마이크 접근 권한 거부 또는 에러:', err);
      }
    };
    initRecorder();

    return () => {
      if (recorderRef.current && recorderRef.current.state !== 'inactive') {
        recorderRef.current.stop();
      }
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  // 4. 모든 훅 호출이 끝난 뒤에 조건부 리턴 (Early Return)
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
          onClick={() => {
            router.push('summary');
          }}
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
