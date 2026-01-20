import Image from 'next/image';

import ErrorPng from '@/assets/images/map/map-error.png';
import { RetryButton } from '@/components/retry-button';

interface StoreErrorProps {
  onRetry: () => void;
}

export const StoreError = ({ onRetry }: StoreErrorProps) => {
  return (
    <div className="px-4">
      <div className="bg-primary-100 flex flex-col items-center justify-center gap-2 rounded-xl">
        <div className="relative flex h-40 w-40 justify-center">
          <Image src={ErrorPng} alt="에러" fill className="object-contain" />
        </div>

        <RetryButton onClick={onRetry} />
        <p className="text-gray text-center text-lg font-semibold">
          정보를 불러오는데 실패했어요...
        </p>
      </div>
    </div>
  );
};
