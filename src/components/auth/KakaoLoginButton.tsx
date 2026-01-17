// "use client";

// export default function KakaoLoginButton() {
//   const handleLogin = () => {
//     const redirectUri = encodeURIComponent("http://localhost:3000/oauth/callback/kakao");

//     const url =
//       "https://kauth.kakao.com/oauth/authorize" +
//       "?response_type=code" +
//       `&client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}` +
//       `&redirect_uri=${redirectUri}`;

//     window.location.href = url;
//   };

//   return <button onClick={handleLogin}>Kakao 로그인</button>;
// }

// 'use client';

// export const KakaoLoginButton = () => {
//   const handleLogin = () => {
//     const params = new URLSearchParams({
//       response_type: 'code',
//       client_id: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!,
//       redirect_uri: 'http://localhost:3000/oauth/callback/kakao',
//     });

//     window.location.href = `https://kauth.kakao.com/oauth/authorize?${params.toString()}`;
//   };

//   return (
//     <button
//       onClick={handleLogin}
//       className="text-md flex w-full max-w-sm items-center justify-center gap-2 rounded-md bg-[#FEE500] py-3 font-medium text-black hover:brightness-95 active:brightness-90"
//     >
//       <span>Kakao 로그인</span>
//     </button>
//   );
// };
import React from 'react';

import KakaoLogo from '@/assets/auth/kakao-login-logo.svg';
import { Button } from '@/components/ui/button';

export const KakaoLoginButton = () => {
  return (
    <Button
      variant="solid"
      tone="primary"
      size="l"
      className="flex justify-center gap-2 bg-[#FEE500]! hover:opacity-60!"
    >
      <KakaoLogo className="text-[#000000]" />
      <span className="text-base font-semibold text-[#000000] opacity-80">
        카카오로 로그인 하기
      </span>
    </Button>
  );
};
