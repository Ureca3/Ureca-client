import React from 'react';

import KakaoLogo from '@/assets/icons/auth/kakao-login-logo.svg';
import { Button } from '@/components/ui/button';
import { setOAuthStateCookie } from '@/services/auth/oauth-state';
import { useAppDispatch } from '@/store/hooks';
import { toastActions } from '@/store/slices/ToastSlice';

export const KakaoLoginButton = () => {
  const dispatch = useAppDispatch();

  const handleKakaoLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
    const appUrl = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL;

    if (!clientId || !appUrl) {
      console.error('Kakao OAuth env missing');
      dispatch(
        toastActions.show({
          text: '카카오 로그인 설정 오류가 발생했습니다.',
          variant: 'error',
        }),
      );
      return;
    }

    const redirectUri = `${appUrl}`;
    const state = crypto.randomUUID();

    setOAuthStateCookie('kakao', state);

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      redirect_uri: redirectUri,
      state,
    });

    window.location.href = `https://kauth.kakao.com/oauth/authorize?${params.toString()}`;
  };

  return (
    <Button
      variant="solid"
      tone="primary"
      size="l"
      className="flex justify-center gap-2 bg-[#FEE500]! hover:opacity-60!"
      onClick={handleKakaoLogin}
      aria-label="카카오 계정으로 로그인"
    >
      <KakaoLogo className="text-[#000000]" />
      <span className="text-base font-semibold text-[#000000] opacity-80">
        카카오로 로그인 하기
      </span>
    </Button>
  );
};
