import React from 'react';

import { Button } from '@/components/ui/button';

export const StoreInfoCallButton = () => {
  return (
    <Button
      variant="solid"
      tone="primary"
      size="m"
      className="border-primary-500! hover:bg-primary-500! flex-1 bg-white! font-semibold text-pink-500! hover:text-white!"
    >
      전화하기
    </Button>
  );
};
