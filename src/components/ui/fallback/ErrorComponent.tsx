'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import Sorry from '@/assets/images/fallback/mooner_sorry.svg';
import { ErrorState } from '@/components/ui/status';

export const ErrorComponent = ({ message }: { message?: string }) => {
  const router = useRouter();
  return (
    <div className="flex min-h-dvh items-center justify-center">
      <ErrorState
        title="요청하신 페이지를 찾을 수 없습니다."
        action={{ label: '돌아가기', onClick: () => router.back() }}
        icon={<Sorry aria-hidden="true" focusable="false" />}
      />
    </div>
  );
};
