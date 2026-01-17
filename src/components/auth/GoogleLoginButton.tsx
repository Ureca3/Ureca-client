// 'use client';

// export const GoogleLoginButton = () => {
//   const handleLogin = () => {
//     const params = new URLSearchParams({
//       response_type: 'code',
//       client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
//       redirect_uri: 'http://localhost:3000/oauth/callback/google',
//       scope: 'email profile',
//     });

//     window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
//   };

//   return (
//     <button
//       onClick={handleLogin}
//       className="text-md flex w-full max-w-sm items-center justify-center gap-3 rounded-md border border-gray-300 bg-white py-3 font-medium text-gray-700 transition hover:bg-gray-100 active:bg-gray-100"
//     >
//       <svg className="h-5 w-5" viewBox="0 0 48 48">
//         <path
//           fill="#EA4335"
//           d="M24 9.5c3.54 0 6.34 1.54 7.8 2.83l5.7-5.7C34.04 3.58 29.44 1.5 24 1.5 14.61 1.5 6.73 6.88 3.13 14.68l6.63 5.14C11.24 13.1 17.1 9.5 24 9.5z"
//         />
//         <path
//           fill="#4285F4"
//           d="M46.1 24.5c0-1.7-.15-2.96-.47-4.26H24v8.06h12.7c-.26 2.13-1.67 5.34-4.82 7.49l7.4 5.73c4.33-4 6.82-9.88 6.82-17.02z"
//         />
//         <path
//           fill="#FBBC05"
//           d="M9.76 28.18c-.4-1.2-.63-2.48-.63-3.8s.23-2.6.63-3.8l-6.63-5.14C1.87 18.08 1 21.13 1 24.38c0 3.25.87 6.3 2.13 8.94l6.63-5.14z"
//         />
//         <path
//           fill="#34A853"
//           d="M24 46.5c6.48 0 11.93-2.13 15.9-5.98l-7.4-5.73c-2.04 1.42-4.8 2.42-8.5 2.42-6.9 0-12.76-3.6-15.24-8.68l-6.63 5.14C6.73 41.12 14.61 46.5 24 46.5z"
//         />
//       </svg>
//       <span>Google 로그인</span>
//     </button>
//   );
// };
import React from 'react';

import GoogleLogo from '@/assets/auth/google-login-logo.svg';
import { Button } from '@/components/ui/button';

export const GoogleLoginButton = () => {
  return (
    <Button
      variant="solid"
      tone="primary"
      size="l"
      className="flex justify-center gap-2 border! border-[#747775]! bg-[#FFFFFF]! hover:opacity-60!"
    >
      <GoogleLogo />
      <span className="text-base font-semibold text-[#1F1F1F]">Google로 로그인 하기</span>
    </Button>
  );
};
