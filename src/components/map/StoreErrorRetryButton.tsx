import React from 'react';

import { Button } from '@/components/ui/button';

interface StoreErrorRetryButtonProps {
  onClick: () => void;
}

export const StoreErrorRetryButton = ({ onClick }: StoreErrorRetryButtonProps) => {
  return (
    <Button variant="solid" tone="primary" size="m" onClick={onClick}>
      재시도
    </Button>
  );
};
