'use client';
import { useEffect, useState } from 'react';

import type { IAgoraRTCClient, ILocalAudioTrack, ILocalVideoTrack } from 'agora-rtc-sdk-ng';
import axios from 'axios';

let client: IAgoraRTCClient;

interface UseAgoraVideoReturn {
  client: IAgoraRTCClient | null;
  localVideoTrack: ILocalVideoTrack | null;
  localAudioTrack: ILocalAudioTrack | null;
  ready: boolean;
}

export function useAgoraVideo(
  channel: string,
  uid: number = Math.floor(Math.random() * 10000),
): UseAgoraVideoReturn {
  const [ready, setReady] = useState(false);
  const [localVideoTrack, setLocalVideoTrack] = useState<ILocalVideoTrack | null>(null);
  const [localAudioTrack, setLocalAudioTrack] = useState<ILocalAudioTrack | null>(null);

  useEffect(() => {
    async function init() {
      if (typeof window === 'undefined') return;

      const AgoraRTC = (await import('agora-rtc-sdk-ng')).default;
      client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

      // 1️⃣ 백엔드에서 토큰 요청
      const { data } = await axios.get(
        `http://localhost:8080/api/agora/token?channel=${channel}&uid=${uid}`,
      );

      const token =
        '007eJxTYHi96+Xnne66lzvicsJclknx/Ww7vnrR13YP66VMkzvTjx9RYEhKNTEysEgxs7BINTExTku2SDQ0SkxONTJJTLRINDVIDSvLz2wIZGTYvYCBkZEBAkF8Noai/PxcXUMGBgA62SGk';
      await client.join(data.appId, channel, token, uid);

      // 2️⃣ 로컬 오디오/비디오 트랙 생성
      const videoTrack = await AgoraRTC.createCameraVideoTrack();
      const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();

      await client.publish([videoTrack, audioTrack]);

      setLocalVideoTrack(videoTrack);
      setLocalAudioTrack(audioTrack);

      // 3️⃣ 상대방 트랙 구독
      client.on('user-published', async (user, mediaType) => {
        if (!client || client.uid === undefined) return;
        await client.subscribe(user, mediaType);
        if (mediaType === 'video') {
          user.videoTrack?.play('remote-player'); // div id="remote-player"에 재생
        }
        if (mediaType === 'audio') {
          user.audioTrack?.play();
        }
      });

      setReady(true);
    }

    init();
  }, [channel]);

  return { client, localVideoTrack, localAudioTrack, ready };
}
