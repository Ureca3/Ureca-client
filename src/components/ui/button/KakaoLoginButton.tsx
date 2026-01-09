"use client"

import { useRouter } from "next/navigation";

export const KakaoLoginButton=()=>{
    const router=useRouter();

  const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
  const KAKAO_AUTH_URL = 
    `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <button onClick={() => router.push(KAKAO_AUTH_URL)}
        className="flex items-center justify-center gap-2
            w-full max-w-sm
            rounded-md
            bg-[#FEE500]
            py-3
            text-sm font-medium
            text-black
            hover:brightness-95
            active:brightness-90
        "
    >
      카카오 로그인
    </button>
  );
}