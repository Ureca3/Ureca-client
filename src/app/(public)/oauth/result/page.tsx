'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { ErrorState, LoadingState } from '@/components/ui/status';
import { getAccessTokenFromCookie } from '@/services/auth/access-token';
import { useAppDispatch } from '@/store/hooks';
import { authActions } from '@/store/slices/authSlice';
import { toastActions } from '@/store/slices/ToastSlice';

export default function OAuthResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const status = searchParams.get('status');
  const reason = searchParams.get('reason');

  const reasonMap: Record<string, string> = {
    api_config: '인증 설정이 올바르지 않습니다.',
    invalid_params: '요청 정보가 올바르지 않습니다.',
    state_mismatch: '보안 검증에 실패했습니다. 다시 시도해 주세요.',
    login_failed: '로그인에 실패했습니다.',
    missing_token: '인증 토큰을 받지 못했습니다.',
    processing_error: '로그인 처리 중 오류가 발생했습니다.',
  };

  const resolvedReason =
    (reason && reasonMap[reason]) || (reason ? reason : '다시 시도해 주세요.');

  useEffect(() => {
    if (status === 'success') {
      const token = getAccessTokenFromCookie();
      if (token) dispatch(authActions.setAccessToken(token));

      dispatch(
        toastActions.show({
          text: '로그인에 성공했습니다.',
          variant: 'success',
        }),
      );
    } else if (status === 'fail') {
      dispatch(
        toastActions.show({
          text: '로그인에 실패했습니다.',
          variant: 'error',
        }),
      );
    }

    if (status === 'success') {
      const timer = setTimeout(() => router.replace('/'), 700);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [router, status]);

  if (status === 'success') {
    return <LoadingState title="로그인 완료" description="잠시 후 이동합니다." />;
  }

  return (
    <ErrorState
      title="로그인에 실패했어요"
      description={resolvedReason}
      action={{ label: '온보딩으로 이동', onClick: () => router.replace('/onboarding') }}
    />
  );
}
