import Image from 'next/image';

import ErrorPng from '@/assets/images/map/map-error.png';
import { ErrorState } from '@/components/ui/status';
import { normalizeError } from '@/services/api/errors';

interface StoreErrorProps {
  onRetry: () => void;
  error?: unknown;
}

export const StoreError = ({ onRetry, error }: StoreErrorProps) => {
  const appError = error ? normalizeError(error) : null;
  const statusLabel = appError?.status ? `(${appError.status})` : '';
  const message = appError?.message ?? '정보를 불러오는 데 실패했어요.';

  return (
    <div className="px-4">
      <div className="rounded-xl bg-primary-100">
        <ErrorState
          title="요청에 실패했어요"
          description={`${message} ${statusLabel}`.trim()}
          action={{ label: '다시 시도', onClick: onRetry }}
          icon={<Image src={ErrorPng} alt="에러" width={120} height={120} />}
        />
      </div>
    </div>
  );
};
