import React from 'react';

import GoogleLogo from '@/assets/icons/auth/google-login-logo.svg';
import { Button } from '@/components/ui/button';
import { setOAuthStateCookie } from '@/services/auth/oauth-state';
import { useAppDispatch } from '@/store/hooks';
import { toastActions } from '@/store/slices/ToastSlice';

export const GoogleLoginButton = () => {
  const dispatch = useAppDispatch();

  const handleGoogleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const appUrl = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL;

    if (!clientId || !appUrl) {
      console.error('Google OAuth env missing');
      dispatch(
        toastActions.show({
          text: '구글 로그인 설정 오류가 발생했습니다.',
          variant: 'error',
        }),
      );
      return;
    }

    const redirectUri = `${appUrl}`;

    const state = crypto.randomUUID();
    setOAuthStateCookie('google', state);

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: 'openid email profile',
      state,
      access_type: 'offline',
      prompt: 'consent',
      include_granted_scopes: 'true',
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
      aria-label="구글 계정으로 로그인"
    >
      <GoogleLogo />
      <span className="text-base font-semibold text-[#1F1F1F]">Google로 로그인 하기</span>
    </Button>
  );
};
