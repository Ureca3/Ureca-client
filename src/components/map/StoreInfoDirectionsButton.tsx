import React from 'react';

import { Button } from '@/components/ui/button';

export const StoreInfoDirectionsButton = () => {
  return (
    <Button
      variant="solid"
      tone="primary"
      size="m"
      className="hover:text-primary-500! bg-primary-500! border-primary-500! flex-1 font-semibold text-white! hover:bg-white!"
    >
      길찾기
    </Button>
  );
};
