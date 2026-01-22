import React from 'react';

import NaverLogo from '@/assets/icons/auth/naver-login-logo.svg';
import { Button } from '@/components/ui/button';

export const NaverLoginButton = () => {
  return (
    <Button
      className="!hover:opacity-60 flex justify-center gap-2 !bg-[#03A94D]"
      variant="solid"
      tone="secondary"
      size="l"
    >
      <NaverLogo />
      <span className="text-base font-semibold text-[#FFFFFF]">네이버로 로그인 하기</span>
    </Button>
  );
};
