'use client';

import { useEffect } from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import { apiClient, setupInterceptors } from '@/services/api';
import { authActions } from '@/store/slices/authSlice';
import { store } from '@/store/store';

import { QueryProvider } from './QueryProvider';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const teardown = setupInterceptors(apiClient, {
      getAccessToken: () => store.getState().auth?.accessToken ?? null,
      setAccessToken: (t) => store.dispatch(authActions.setAccessToken(t)),
      clearAuth: () => store.dispatch(authActions.clearAuth()),
      onUnauthorized: () => {
        // 선택: refresh 실패하면 온보딩으로 강제 이동
        window.location.assign('/onboarding');
      },
    });

    return () => teardown();
  }, []);

  return (
    <ReduxProvider store={store}>
      <QueryProvider>{children}</QueryProvider>
    </ReduxProvider>
  );
};
