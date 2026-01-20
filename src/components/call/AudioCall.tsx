'use client';
import { useState } from 'react';

import axios from 'axios';

import { useAgora } from '@/hooks/call/useAgora';

interface RecordingStartResponse {
  resourceId: string;
  sid: string;
}

interface RecordingStopResponse {
  recordingUrl: string;
}

export const AudioCall = () => {
  const [channel] = useState('room-1');
  const [recordingData, setRecordingData] = useState<RecordingStartResponse | null>(null);

  useAgora(channel);

  const startRecording = async () => {
    const resp = await axios.post<RecordingStartResponse>(
      'http://localhost:8080/api/agora/record/start',
      { channel },
    );
    setRecordingData(resp.data);
  };

  const stopRecording = async () => {
    if (!recordingData) return;
    const resp = await axios.post<RecordingStopResponse>(
      'http://localhost:8080/api/agora/record/stop',
      {
        channel,
        resourceId: recordingData.resourceId,
        sid: recordingData.sid,
      },
    );
    console.log('녹음 파일 URL:', resp.data.recordingUrl);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Agora 1:1 상담</h1>
      <div>
        <button onClick={startRecording}>녹음 시작</button>
        <button onClick={stopRecording}>녹음 종료</button>
      </div>
    </div>
  );
};
