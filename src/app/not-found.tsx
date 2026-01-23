'use client';
import React, { useEffect } from 'react';

import { ErrorComponent } from '@/components/ui/fallback/ErrorComponent';

const error = ({ error }: { error: Error & { digest?: string }; reset: () => void }) => {
  useEffect(() => {
    // 백엔드 에러 로그 서비스(예: Sentry)에 기록
    console.error('Captured Error:', error);
  }, [error]);

  return (
    <div className="h-screen">
      <ErrorComponent />
    </div>
  );
};

export default error;
