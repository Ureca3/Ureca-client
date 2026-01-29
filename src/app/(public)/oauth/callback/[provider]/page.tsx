'use client';

import { useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';

import { LoadingState } from '@/components/ui/status';

export default function OAuthCallbackPage() {
  const params = useParams<{ provider: string }>();
  const searchParams = useSearchParams();

  useEffect(() => {
    const provider = params?.provider;
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (!provider || !code) {
      window.location.assign('/oauth/result?status=fail&reason=Missing%20params');
      return;
    }

    const qs = new URLSearchParams({ code });
    if (state) qs.set('state', state);

    window.location.assign(`/api/auth/oauth/${provider}?${qs.toString()}`);
  }, [params?.provider, searchParams]);

  return <LoadingState title="로그인 처리 중" description="잠시만 기다려 주세요." />;
}
