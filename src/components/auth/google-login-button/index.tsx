import React from 'react';

import GoogleLogo from '@/assets/icons/auth/google-login-logo.svg';
import { Button } from '@/components/ui/button';

export const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const appUrl = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL;

    if (!clientId || !appUrl) {
      console.error('Google OAuth env missing');
      return;
    }

    const redirectUri = `${appUrl}/oauth/callback/google`;

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: 'email profile',
      // 필요하면 추가:
      // access_type: 'offline',
      // prompt: 'consent',
    });

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  };

  return (
    <Button
      variant="solid"
      tone="primary"
      size="l"
      className="flex justify-center gap-2 border! border-[#747775]! bg-[#FFFFFF]! hover:opacity-60!"
      onClick={handleGoogleLogin}
    >
      <GoogleLogo />
      <span className="text-base font-semibold text-[#1F1F1F]">Google로 로그인 하기</span>
    </Button>
  );
};
