'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

import Sorry from '@/assets/fallback/mooner_sorry.svg';

import { Button } from '../button';

export const ErrorComponent = () => {
  const router = useRouter();
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <Sorry />
      <p className="font-gowun mt-10 text-2xl">요청하신 페이지를 찾을 수 없습니다.</p>
      <Button
        variant={'solid'}
        tone={'primary'}
        size={'m'}
        children={'뒤로가기'}
        className="mt-5"
        onClick={() => {
          router.back();
        }}
      />
    </div>
  );
};
