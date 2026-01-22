import React from 'react';

import NaverLogo from '@/assets/icons/auth/naver-login-logo.svg';
import { Button } from '@/components/ui/button';

export const NaverLoginButton = () => {
  const handleNaverLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
    const appUrl = process.env.NEXT_PUBLIC_NAVER_REDIRECT_URL;

    if (!clientId || !appUrl) {
      console.error('Naver OAuth env missing');
      return;
    }

    const redirectUri = `${appUrl}/oauth/callback/naver`;
    const state = crypto.randomUUID();

    sessionStorage.setItem('oauth_state_naver', state);

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
    >
      <NaverLogo />
      <span className="text-base font-semibold text-[#FFFFFF]">네이버로 로그인 하기</span>
    </Button>
  );
};
