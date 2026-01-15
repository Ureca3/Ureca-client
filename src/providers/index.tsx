'use client';

import { Provider as ReduxProvider } from 'react-redux';

import { store } from '@/store/store';

import { QueryProvider } from './QueryProvider';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider store={store}>
      <QueryProvider>{children}</QueryProvider>
    </ReduxProvider>
  );
};
