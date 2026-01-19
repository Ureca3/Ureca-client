import React from 'react';

import { Button } from '@/components/ui/button';

interface Props {
  onClick: () => void;
}

export const RetryButton = ({ onClick }: Props) => {
  return (
    <Button variant="solid" tone="primary" size="m" onClick={onClick}>
      재시도
    </Button>
  );
};
