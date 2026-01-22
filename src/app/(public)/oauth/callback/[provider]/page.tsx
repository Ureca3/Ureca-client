'use client';

import { useEffect, useRef } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

import { Loading } from '@/components/loading';
import { apiClient } from '@/services/api';
import { authActions } from '@/store/slices/authSlice';
import { store } from '@/store/store';

export default function OAuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams<{ provider: string }>();

  const called = useRef(false);

  useEffect(() => {
    if (called.current) return;
    called.current = true;

    const provider = params?.provider;
    const code = searchParams.get('code');

    if (!provider || !code) {
      router.replace('/onboarding');
      return;
    }

    (async () => {
      try {
        const res = await apiClient.post(`/api/auth/login/${provider}`, null, {
          params: { code },
        });

        const accessToken: string | undefined = res.data?.token?.accessToken;

        if (!accessToken) {
          router.replace('/onboarding');
          return;
        }

        store.dispatch(authActions.setAccessToken(accessToken));

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
