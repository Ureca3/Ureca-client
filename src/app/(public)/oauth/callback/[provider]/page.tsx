'use client';

import { useEffect, useRef } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

import { Loading } from '@/components/loading';
import { apiClient } from '@/services/api';
import { authActions } from '@/store/slices/authSlice';
import { store } from '@/store/store';

const OAUTH_PROVIDERS = new Set(['google', 'naver', 'kakao'] as const);
type OAuthProvider = 'google' | 'naver' | 'kakao';

export default function OAuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams<{ provider: string }>();

  const called = useRef(false);

  useEffect(() => {
    if (called.current) return;
    called.current = true;

    const providerRaw = params?.provider;
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (!providerRaw || !code) {
      router.replace('/onboarding');
      return;
    }

    if (!OAUTH_PROVIDERS.has(providerRaw as OAuthProvider)) {
      console.error('Unsupported provider:', providerRaw);
      router.replace('/onboarding');
      return;
    }

    const provider = providerRaw as OAuthProvider;

    const stateKey = `oauth_state_${provider}`;
    const savedState = sessionStorage.getItem(stateKey);

    if (!state || !savedState || state !== savedState) {
      console.error('OAuth state mismatch', { provider, state, savedState });
      router.replace('/onboarding');
      return;
    }

    sessionStorage.removeItem(stateKey);

    (async () => {
      try {
        const res = await apiClient.post(`/api/auth/login/${provider}`, null, {
          params: { code },
        });

        const accessToken: string | undefined = res.data?.token?.accessToken;
        const termsAgreed: boolean = res.data?.termsAgreed ?? false;

        if (!accessToken) {
          router.replace('/onboarding');
          return;
        }

        store.dispatch(authActions.setAccessToken(accessToken));

        if (!termsAgreed) {
          router.replace('/policy?mode=agree');
          return;
        }

        router.replace('/');
      } catch (e) {
        console.error('OAuth 로그인 중 에러 발생:', e);
        router.replace('/onboarding');
      }
    })();
  }, [router, searchParams, params?.provider]);

  return (
    <div className="bg-primary-500 flex h-screen flex-col items-center justify-center opacity-20">
      <Loading />
      <p className="text-sm text-gray-500">로그인 처리 중입니다...</p>
    </div>
  );
}
