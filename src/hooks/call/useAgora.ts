'use client';
import { useEffect, useState } from 'react';

import type { IAgoraRTCClient, ILocalAudioTrack } from 'agora-rtc-sdk-ng';
import type { AxiosError } from 'axios';
import axios from 'axios';

let client: IAgoraRTCClient;

interface UseAgoraReturn {
  ready: boolean;
  error: Error | AxiosError | null;
  localAudioTrack: ILocalAudioTrack | null;
  token: string;
}

export const useAgora = (channel: string, uid: number): UseAgoraReturn => {
  const [token, setToken] = useState<string>('');
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<Error | AxiosError | null>(null);
  const [localAudioTrack, setLocalAudioTrack] = useState<ILocalAudioTrack | null>(null);

  useEffect(() => {
    async function init() {
      try {
        if (typeof window === 'undefined') return;
        const AgoraRTC = (await import('agora-rtc-sdk-ng')).default;
        client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
        client.enableAudioVolumeIndicator();

        const { data } = await axios.get(
          `http://localhost:8080/api/agora/token?channel=${channel}&uid=${uid}`,
        );
        setToken(data.token);

        client.on('user-published', async (user, mediaType) => {
          await client.subscribe(user, mediaType);
          if (mediaType === 'audio') user.audioTrack?.play();
        });

        await client.join(data.appId, channel, data.token, uid);

        const audioTrack = await AgoraRTC.createMicrophoneAudioTrack({
          encoderConfig: 'high_quality_stereo',
        });
        await client.publish([audioTrack]);

        setLocalAudioTrack(audioTrack);

        setReady(true);
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          setReady(true);
          setError(e);
        } else if (e instanceof Error) {
          setReady(true);
          setError(e);
        } else {
          setReady(true);
          setError(new Error('알 수 없는 에러가 발생했습니다.'));
        }
      }
    }
    init();
  }, [channel, uid]);

  return { ready, token, localAudioTrack, error };
};
