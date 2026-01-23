'use client';
import { useEffect, useRef, useState } from 'react';

import type { IAgoraRTCClient, IAgoraRTCRemoteUser, ILocalAudioTrack } from 'agora-rtc-sdk-ng';
import type { AxiosError } from 'axios';
import axios from 'axios';

interface UseAgoraReturn {
  client: IAgoraRTCClient | null;
  ready: boolean;
  error: Error | AxiosError | null;
  localAudioTrack: ILocalAudioTrack | null;
  token: string;
  uid: number | null;
}

export const useAgora = (channel: string): UseAgoraReturn => {
  const [uid, setUid] = useState<number | null>(null);
  const [token, setToken] = useState<string>('');
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<Error | AxiosError | null>(null);
  const [localAudioTrack, setLocalAudioTrack] = useState<ILocalAudioTrack | null>(null);

  const clientRef = useRef<IAgoraRTCClient | null>(null);
  const trackRef = useRef<ILocalAudioTrack | null>(null);

  useEffect(() => {
    setUid(Math.floor(Math.random() * 10000));
  }, []);

  useEffect(() => {
    if (uid === null || typeof window === 'undefined') return;

    const handleUserPublished = async (user: IAgoraRTCRemoteUser, mediaType: 'audio' | 'video') => {
      const client = clientRef.current;
      if (!client) return;

      try {
        await client.subscribe(user, mediaType);
        if (mediaType === 'audio') user.audioTrack?.play();
      } catch (e) {
        console.error('구독 실패:', e);
      }
    };

    async function init() {
      try {
        const AgoraRTC = (await import('agora-rtc-sdk-ng')).default;

        // 1. 클라이언트 생성 및 Ref 저장
        const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
        clientRef.current = client;
        client.enableAudioVolumeIndicator();

        const { data } = await axios.get(
          `http://localhost:8080/api/agora/token?channel=${channel}&uid=${uid}`,
        );
        setToken(data.token);

        // 2. 이벤트 등록
        client.on('user-published', handleUserPublished);

        // 3. 조인
        await client.join(data.appId, channel, data.token, uid);

        // 4. 오디오 트랙 생성 및 Ref 저장
        const audioTrack = await AgoraRTC.createMicrophoneAudioTrack({
          encoderConfig: 'high_quality_stereo',
        });
        trackRef.current = audioTrack;
        setLocalAudioTrack(audioTrack);

        // 5. 발행
        await client.publish([audioTrack]);
        setReady(true);
      } catch (e) {
        setReady(true);
        setError(e instanceof Error ? e : new Error('알 수 없는 에러'));
      }
    }

    init();

    // ★ 확실한 정리 로직
    return () => {
      const cleanup = async () => {
        // 마이크 끄기 (Ref 사용)
        if (trackRef.current) {
          trackRef.current.stop();
          trackRef.current.close();
          trackRef.current = null;
          setLocalAudioTrack(null);
        }

        // 채널 나가기 (Ref 사용)
        if (clientRef.current) {
          clientRef.current.removeAllListeners();
          await clientRef.current.leave();
          clientRef.current = null;
          console.log('Agora Cleanup 완벽 종료');
        }
        setReady(false);
      };
      cleanup();
    };
  }, [channel, uid]);

  return {
    client: clientRef.current,
    ready,
    token,
    localAudioTrack,
    error,
    uid,
  };
};
