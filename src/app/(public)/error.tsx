'use client';

import type { ReactElement } from 'react';

import { AppErrorPage } from '@/components/ui/error-page';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function PublicError({ error, reset }: ErrorProps): ReactElement {
  return <AppErrorPage error={error} reset={reset} />;
}
