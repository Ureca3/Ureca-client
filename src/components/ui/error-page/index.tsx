'use client';

import { ErrorState } from '@/components/ui/status';
import { normalizeError } from '@/services/api/errors';

type AppErrorPageProps = {
  error: Error;
  reset: () => void;
  title?: string;
};

export const AppErrorPage = ({ error, reset, title = '문제가 발생했어요.' }: AppErrorPageProps) => {
  const appError = normalizeError(error);
  const statusLabel = appError.status ? `(${appError.status})` : '';

  return (
    <ErrorState
      title={title}
      description={`${appError.message} ${statusLabel}`.trim()}
      action={{ label: '다시 시도', onClick: reset }}
    />
  );
};
