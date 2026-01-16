// 'use client';

// export const NaverLoginButton = () => {
//   const handleLogin = () => {
//     const params = new URLSearchParams({
//       response_type: 'code',
//       client_id: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID!,
//       redirect_uri: 'http://localhost:3000/oauth/callback/naver',
//       state: 'test',
//     });

//     window.location.href = `https://nid.naver.com/oauth2.0/authorize?${params.toString()}`;
//   };

//   return (
//     <button
//       onClick={handleLogin}
//       className="text-md flex h-12 w-full max-w-sm items-center justify-center gap-3 rounded-md bg-[#03C75A] font-medium text-white transition-colors hover:bg-[#02b152] active:bg-[#029e4a]"
//     >
//       <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-white font-extrabold text-[#03C75A]">
//         N
//       </span>
//       <span>Naver 로그인</span>
//     </button>
//   );
// };
import React from 'react';

import NaverLogo from '@/assets/auth/naver-login-logo.svg';
import { Button } from '@/components/ui/button';

export const NaverLoginButton = () => {
  return (
    <Button
      className="gap-[8px] bg-[#03A94D] p-[20px] text-base font-semibold text-[#FFFFFF]"
      variant="solid"
      tone="primary"
      size="l"
    >
      <NaverLogo />
      네이버 로그인
    </Button>
  );
};
