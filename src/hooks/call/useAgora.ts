'use client';
import { useEffect, useState } from 'react';

import type { IAgoraRTCClient, ILocalAudioTrack } from 'agora-rtc-sdk-ng';
import axios from 'axios';

let client: IAgoraRTCClient;

interface UseAgoraReturn {
  ready: boolean;
  localAudioTrack: ILocalAudioTrack | null;
  token: string;
}

export const useAgora = (channel: string, uid: number): UseAgoraReturn => {
  const [token, setToken] = useState<string>('');
  const [ready, setReady] = useState(false);
  const [localAudioTrack, setLocalAudioTrack] = useState<ILocalAudioTrack | null>(null);

  useEffect(() => {
    async function init() {
      if (typeof window === 'undefined') return;
      const AgoraRTC = (await import('agora-rtc-sdk-ng')).default;
      client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

      const { data } = await axios.get(
        `http://localhost:8080/api/agora/token?channel=${channel}&uid=${uid}`,
      );
      setToken(data.token);

      client.on('user-published', async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === 'audio') user.audioTrack?.play();
      });

      await client.join(data.appId, channel, data.token, uid);

      const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      await client.publish([audioTrack]);

      setLocalAudioTrack(audioTrack);

      setReady(true);
    }
    init();
  }, [channel, uid]);

  return { ready, token, localAudioTrack };
};
