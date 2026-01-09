"use client"
import { useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { login } from "@/services/api/LoginApi";

const LoginCallback =()=> {
  const params=useParams();
  const searchParams=useSearchParams();

  const provider=params.provider as "google"|"naver"|"kakao"; //나중에 enum 분리할 필요 o
  const code=searchParams.get("code");

  useEffect(() => {
    if(!provider||!code) return;
    login(provider, code);
  }, [provider,code]);

  return <div>{provider} 로그인 중...</div>;
}

export default LoginCallback;