import React from 'react';

import GoogleLogo from '@/assets/auth/google-login-logo.svg';
import { Button } from '@/components/ui/button';

export const GoogleLoginButton = () => {
  return (
    <Button
      variant="solid"
      tone="primary"
      size="l"
      className="!hover:opacity-60 flex justify-center gap-2 !border !border-[#747775] !bg-[#FFFFFF]"
    >
      <GoogleLogo />
      <span className="text-base font-semibold text-[#1F1F1F]">Google로 로그인 하기</span>
    </Button>
  );
};
