'use client';

import React, { useEffect, useRef, useState } from 'react';
import { FrequencyVisualizer } from 'react-audio-visualizer-pro';

import Call from '@/assets/call/call.svg';
import Calling from '@/assets/call/mooner_calling.svg';
import { useAgora } from '@/hooks/call/useAgora';

import { Button } from '../ui/button';

import { AudioRecorder } from './AudioRecorder';

const uid: number = Math.floor(Math.random() * 10000);

export const CallComponent = () => {
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [channel] = useState('room1');
  const { token } = useAgora(channel, uid);

  useEffect(() => {
    let stream: MediaStream;

    const initRecorder = async () => {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const recorder = new MediaRecorder(stream);
      recorderRef.current = recorder;

      recorder.ondataavailable = (e: BlobEvent) => {
        chunksRef.current.push(e.data);
      };

      recorder.start();
    };

    initRecorder();

    return () => {
      recorderRef.current?.stop();
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  return (
    <div className="mx-4 flex h-full flex-col items-center justify-evenly">
      <div className="flex flex-col items-center">
        <Calling />
        <div className="mt-5.5 text-[14px] font-bold">상담원과 통화중입니다.</div>
        <div className="mt-11.5 h-15 [&>canvas]:bg-transparent">
          <FrequencyVisualizer
            useMicrophone={true}
            width={800}
            height={50}
            backgroundColor="#ffffff"
            gradientColors={['#f12b95', '#f9a3cf']}
            barWidth={6}
            barSpacing={1}
            barRadius={2}
          />
        </div>
      </div>
      <AudioRecorder channel={channel} uid={uid} token={token} />
      <div className="w-full">
        <Button
          variant="solid"
          tone="secondary"
          size="l"
          className="bg-secondary-400! hover:bg-secondary-300! text-white-light mt-12.5 mb-2 w-full px-5 font-semibold"
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
