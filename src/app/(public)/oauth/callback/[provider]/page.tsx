'use client';

import { useEffect, useRef } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

import { Loading } from '@/components/loading';

type Provider = 'google' | 'kakao' | 'naver';

const PROVIDERS: Provider[] = ['google', 'kakao', 'naver'];

export default function OAuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams<{ provider: string }>();

  const isCalled = useRef(false);

  useEffect(() => {
    if (isCalled.current) return;
    isCalled.current = true;

    const provider = params.provider as Provider;

    // 0) provider 검증
    if (!PROVIDERS.includes(provider)) {
      router.replace('/onboarding');
      return;
    }

    // 1) query 검증
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (!code) {
      router.replace('/onboarding');
      return;
    }

    // kakao/naver: state 필수 + (선택) sessionStorage로 검증
    if (provider !== 'google') {
      if (!state) {
        router.replace('/onboarding');
        return;
      }

      const expected = sessionStorage.getItem(`oauth_state_${provider}`);
      // state 저장이 없다면(새 탭/만료 등) 그냥 진행하거나 실패 처리 중 택1.
      // 보안적으로는 실패 처리 권장:
      if (!expected || expected !== state) {
        router.replace('/onboarding');
        return;
      }
      sessionStorage.removeItem(`oauth_state_${provider}`);
    }

    // 2) 백엔드 로그인 호출
    (async () => {
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
        if (!apiBase) throw new Error('NEXT_PUBLIC_API_BASE_URL missing');

        const url = new URL(`${apiBase}/api/auth/login/${provider}`);
        url.searchParams.set('code', code);
        if (provider !== 'google') url.searchParams.set('state', state!);

        const res = await fetch(url.toString(), {
          method: 'POST',
          credentials: 'include',
        });

        if (!res.ok) throw new Error('login failed');

        // accessToken을 지금 당장 저장하지 않아도 됨(가드/검증은 서버에서)
        router.replace('/');
      } catch (e) {
        console.error('OAuth 로그인 중 에러 발생:', e);
        router.replace('/onboarding');
      }
    })();
  }, [router, searchParams, params.provider]);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Loading />
      <p className="text-sm text-gray-500">로그인 처리 중입니다...</p>
    </div>
  );
}
