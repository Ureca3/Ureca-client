'use client';
import { useState } from 'react';

import axios from 'axios';

export const AudioRecorder = ({
  channel,
  uid,
  token,
}: {
  channel: string;
  uid: number;
  token: string;
}) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  // 녹음 중지를 위해 서버에서 받은 resourceId와 sid를 저장해둬야 합니다.
  const [recordIds, setRecordIds] = useState<{ resourceId: string; sid: string } | null>(null);

  const startRecording = async () => {
    try {
      // 1. 백엔드에 녹음 시작 요청 (기존 CloudRecordingService 호출)
      const { data } = await axios.post('http://localhost:8080/api/recording/start', {
        channelName: channel,
        uid: String(uid), // 스트링으로 전달
        token: token,
      });

      setRecordIds({ resourceId: data.resourceId, sid: data.sid });
      setIsRecording(true);
      alert('Agora 서버 녹음이 시작되었습니다.');
    } catch (error) {
      console.error('녹음 시작 실패:', error);
    }
  };

  const stopRecording = async () => {
    if (!recordIds) return;

    try {
      // 2. 백엔드에 녹음 종료 요청
      await axios.post('http://localhost:8080/api/recording/stop', {
        channelName: channel,
        uid: String(uid),
        resourceId: recordIds.resourceId,
        sid: recordIds.sid,
      });

      setIsRecording(false);
      setRecordIds(null);
      alert('녹음이 종료되어 S3에 자동 저장되었습니다.');
    } catch (error) {
      console.error('녹음 종료 실패:', error);
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`rounded px-4 py-2 ${isRecording ? 'bg-red-500' : 'bg-blue-500'} text-white`}
      >
        {isRecording ? '서버 녹음 중지' : '서버 녹음 시작'}
      </button>
    </div>
  );
};
