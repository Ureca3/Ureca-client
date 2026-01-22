import React from 'react';

import KakaoLogo from '@/assets/icons/auth/kakao-login-logo.svg';
import { Button } from '@/components/ui/button';

export const KakaoLoginButton = () => {
  const handleKakaoLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
    const appUrl = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL;

    if (!clientId || !appUrl) {
      console.error('Kakao OAuth env missing');
      return;
    }

    const redirectUri = `${appUrl}/oauth/callback/kakao`;
    const state = crypto.randomUUID();

    sessionStorage.setItem('oauth_state_kakao', state);

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
    >
      <KakaoLogo className="text-[#000000]" />
      <span className="text-base font-semibold text-[#000000] opacity-80">
        카카오로 로그인 하기
      </span>
    </Button>
  );
};
