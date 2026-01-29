import React from 'react';

import NaverLogo from '@/assets/icons/auth/naver-login-logo.svg';
import { Button } from '@/components/ui/button';
import { setOAuthStateCookie } from '@/services/auth/oauth-state';
import { useAppDispatch } from '@/store/hooks';
import { toastActions } from '@/store/slices/ToastSlice';

export const NaverLoginButton = () => {
  const dispatch = useAppDispatch();

  const handleNaverLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
    const appUrl = process.env.NEXT_PUBLIC_NAVER_REDIRECT_URL;

    if (!clientId || !appUrl) {
      console.error('Naver OAuth env missing');
      dispatch(
        toastActions.show({
          text: '네이버 로그인 설정 오류가 발생했습니다.',
          variant: 'error',
        }),
      );
      return;
    }

    const redirectUri = `${appUrl}`;
    const state = crypto.randomUUID();

    setOAuthStateCookie('naver', state);

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      redirect_uri: redirectUri,
      state,
    });

    window.location.href = `https://nid.naver.com/oauth2.0/authorize?${params.toString()}`;
  };

  return (
    <Button
      className="flex justify-center gap-2 bg-[#03A94D]! hover:opacity-60!"
      variant="solid"
      tone="secondary"
      size="l"
      onClick={handleNaverLogin}
      aria-label="네이버 계정으로 로그인"
    >
      <NaverLogo />
      <span className="text-base font-semibold text-[#FFFFFF]">네이버로 로그인 하기</span>
    </Button>
  );
};
