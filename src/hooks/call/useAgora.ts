'use client';

import { useEffect, useRef, useState } from 'react';

import type { IAgoraRTCClient, ILocalAudioTrack } from 'agora-rtc-sdk-ng';
import type { AxiosError } from 'axios';
import axios from 'axios';

import { callApi } from '@/services/call/callApi';
import { useAppSelector } from '@/store/hooks';
import type { TokenResponse } from '@/types/call/dto';

const tokenRequestCache = new Map<string, Promise<{ data: TokenResponse }>>();
let globalClient: IAgoraRTCClient | null = null;

type JoinState = 'IDLE' | 'JOINING' | 'JOINED';

interface UseAgoraReturn {
  client: IAgoraRTCClient | null;
  ready: boolean;
  error: AxiosError | Error | null;
  localAudioTrack: ILocalAudioTrack | null;
  token: string;
}

export const useAgora = (channel: string): UseAgoraReturn => {
  const uid = useAppSelector((s) => s.auth).userId;

  const [token, setToken] = useState('');
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<AxiosError | Error | null>(null);
  const [localAudioTrack, setLocalAudioTrack] = useState<ILocalAudioTrack | null>(null);

  const trackRef = useRef<ILocalAudioTrack | null>(null);
  const joinStateRef = useRef<JoinState>('IDLE');
  const joinedChannelRef = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !uid || !channel) return;
    if (joinStateRef.current !== 'IDLE') return;

    let cancelled = false;

    const init = async () => {
      const cacheKey = `${channel}-${uid}`;

      try {
        joinStateRef.current = 'JOINING';

        const AgoraRTC = (await import('agora-rtc-sdk-ng')).default;

        if (!tokenRequestCache.has(cacheKey)) {
          tokenRequestCache.set(cacheKey, callApi.token(channel, uid));
        }

        const { data } = await tokenRequestCache.get(cacheKey)!;
        if (cancelled) return;

        setToken(data.token);

        if (!globalClient) {
          globalClient = AgoraRTC.createClient({
            mode: 'rtc',
            codec: 'vp8',
          });
        }

        const client = globalClient;

        if (
          joinStateRef.current === 'JOINING' &&
          joinedChannelRef.current &&
          joinedChannelRef.current !== channel &&
          client.connectionState !== 'DISCONNECTED'
        ) {
          await client.leave();
          joinedChannelRef.current = null;
        }

        if (cancelled) return;

        if (client.connectionState === 'DISCONNECTED') {
          await client.join(data.appId, channel, data.token, uid);
          joinedChannelRef.current = channel;
        }

        if (cancelled) return;

        const audioTrack = await AgoraRTC.createMicrophoneAudioTrack({
          encoderConfig: 'speech_standard',
        });

        trackRef.current = audioTrack;
        setLocalAudioTrack(audioTrack);

        await client.publish([audioTrack]);

        joinStateRef.current = 'JOINED';
        setReady(true);
      } catch (e) {
        joinStateRef.current = 'IDLE';
        tokenRequestCache.delete(`${channel}-${uid}`);

        if (axios.isAxiosError(e)) setError(e);
        else if (e instanceof Error) setError(e);
      }
    };

    init();

    return () => {
      cancelled = true;

      const cleanup = async () => {
        if (
          joinStateRef.current === 'JOINED' &&
          globalClient &&
          globalClient.connectionState !== 'DISCONNECTED'
        ) {
          await globalClient.leave();
        }

        if (trackRef.current) {
          trackRef.current.stop();
          trackRef.current.close();
          trackRef.current = null;
          setLocalAudioTrack(null);
        }

        joinStateRef.current = 'IDLE';
        joinedChannelRef.current = null;
        setReady(false);
      };

      cleanup();
    };
  }, [channel, uid]);

  return {
    client: globalClient,
    ready,
    token,
    localAudioTrack,
    error,
  };
};
