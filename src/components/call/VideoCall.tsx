'use client';
import { useEffect, useRef, useState } from 'react';

import { useAgoraVideo } from '@/hooks/call/useAgoraVideo';

export const VideoCall = () => {
  const [channel] = useState('room-1');
  const { localVideoTrack } = useAgoraVideo(channel);
  const localVideoRef = useRef<HTMLDivElement>(null);

  // 로컬 비디오 화면에 붙이기
  useEffect(() => {
    if (localVideoTrack && localVideoRef.current) {
      localVideoTrack.play(localVideoRef.current);
    }
  }, [localVideoTrack]);

  return (
    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', padding: '2rem' }}>
      <h1>1:1 영상통화 테스트</h1>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <div>
          <h2>내 화면</h2>
          <div ref={localVideoRef} style={{ width: 320, height: 240, backgroundColor: '#000' }} />
        </div>
        <div>
          <h2>상대방 화면</h2>
          <div id="remote-player" style={{ width: 320, height: 240, backgroundColor: '#000' }} />
        </div>
      </div>
    </div>
  );
};
