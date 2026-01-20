'use client';
import { useEffect, useState } from 'react';

import type { IAgoraRTCClient } from 'agora-rtc-sdk-ng';
import axios from 'axios';

let client: IAgoraRTCClient;

export function useAgora(channel: string, uid: number = 0) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function init() {
      // 브라우저 환경에서만 import
      const AgoraRTC = (await import('agora-rtc-sdk-ng')).default;

      client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

      // 백엔드에서 토큰 요청
      const { data } = await axios.get(
        `http://localhost:8080/api/agora/token?channel=${channel}&uid=${uid}`,
      );

      await client.join(data.appId, channel, data.token, uid);

      const micTrack = await AgoraRTC.createMicrophoneAudioTrack();
      await client.publish([micTrack]);

      client.on('user-published', async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === 'audio') user.audioTrack?.play();
      });

      setReady(true);
    }

    // window 있는 브라우저 환경에서만 실행
    if (typeof window !== 'undefined') {
      init();
    }
  }, [channel, uid]);

  return { client, ready };
}
