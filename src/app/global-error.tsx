'use client';

import type { ReactElement } from 'react';

import { AppErrorPage } from '@/components/ui/error-page';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: ErrorProps): ReactElement {
  return (
    <html lang="ko">
      <body>
        <AppErrorPage error={error} reset={reset} />
      </body>
    </html>
  );
}
