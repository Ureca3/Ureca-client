import React from 'react';

import KakaoLogo from '@/assets/auth/kakao-login-logo.svg';
import { Button } from '@/components/ui/button';

export const KakaoLoginButton = () => {
  return (
    <Button
      variant="solid"
      tone="primary"
      size="l"
      className="!hover:opacity-60 flex justify-center gap-2 !bg-[#FEE500]"
    >
      <KakaoLogo className="text-[#000000]" />
      <span className="text-base font-semibold text-[#000000] opacity-80">
        카카오로 로그인 하기
      </span>
    </Button>
  );
};
