'use client';

import React from 'react';

import { ONBOARDING_STEPS } from '@/constants/onboarding';

interface Props {
  currentIndex: number;
  onChangeIndex: (index: number) => void;
}

export const OnboardingIndicator = ({ currentIndex, onChangeIndex }: Props) => {
  return (
    <nav>
      <div className="flex justify-center gap-4">
        {ONBOARDING_STEPS.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onChangeIndex(index)}
            aria-label={`${index + 1}번째 온보딩`}
            className={`h-3 w-3 rounded-full transition-colors duration-200 ${
              index === currentIndex ? 'bg-primary-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </nav>
  );
};
