'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import Moono from '@/assets/icons/policy/bbaeggom.svg';
import GoBack from '@/assets/icons/policy/chevron-left.svg';
import Logo from '@/assets/icons/policy/logo.svg';
import { authApi } from '@/services/auth/authApi';
import { useAppDispatch } from '@/store/hooks';
import { authActions } from '@/store/slices/authSlice';
import { toastActions } from '@/store/slices/ToastSlice';
import type { PolicyMode } from '@/types/policy/policy';

export const PolicyHeader = ({ mode }: { mode: PolicyMode }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [busy, setBusy] = useState(false);

  const handleBack = async () => {
    if (mode === 'view') {
      router.replace('/mypage');
      return;
    }

    if (busy) return;
    setBusy(true);

    try {
      await authApi.logout();
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(authActions.clearAuth());
      dispatch(
        toastActions.show({ text: '서비스 약관에 미동의 처리 되었습니다.', variant: 'success' }),
      );
      router.replace('/onboarding');
      setBusy(false);
    }
  };

  return (
    <main className="flex flex-col">
      <button
        type="button"
        onClick={handleBack}
        aria-label="뒤로 가기"
        className="text-primary-200 flex items-center justify-start hover:opacity-50"
      >
        <GoBack className="h-9 w-9" />
      </button>

      <section className="pl-4">
        <div className="bg-primary-100 my-8 flex h-51 w-51 items-center justify-center rounded-full">
          <Logo />
        </div>
      </section>

      <section className="flex flex-col pl-4 text-2xl font-semibold text-black">
        <p>고객님</p>
        <p>환영합니다!</p>
      </section>

      <section className="relative flex flex-col px-4 pt-16">
        <div className="absolute right-5 -bottom-0.5">
          <Moono />
        </div>
        <div className="border border-black/75"></div>
      </section>
    </main>
  );
};
