import React from 'react';

import { Button } from '@/components/ui/button';

interface Props {
  onClick: () => void;
}

export const OnboardingButton = ({ onClick }: Props) => {
  return (
    <Button
      variant="solid"
      tone="primary"
      size="l"
      children="시작하기"
      onClick={onClick}
      className="w-[320px] font-semibold"
    />
  );
};
