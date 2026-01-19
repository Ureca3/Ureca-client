'use client';

import { useEffect, useState } from 'react';

import { OnboardingSlide } from '@/components/onboarding/OnboardingSlide';
import { ONBOARDING_STEPS } from '@/constants/onboarding';

interface Props {
  currentIndex: number;
  onChangeIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const OnboardingSlider = ({ currentIndex, onChangeIndex }: Props) => {
  const total = ONBOARDING_STEPS.length;
  const [hoverDirection, setHoverDirection] = useState<'left' | 'right' | null>(null);

  const handlePrev = () => {
    onChangeIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    onChangeIndex((prev) => (prev + 1) % total);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      onChangeIndex((prev) => (prev + 1) % total);
    }, 4000);

    return () => clearInterval(intervalId);
  }, [hoverDirection, onChangeIndex, total]);

  return (
    <div className="group relative w-full overflow-hidden">
      <div className="absolute inset-0 z-10 flex">
        <button
          type="button"
          className="h-full w-[40%]"
          onClick={handlePrev}
          onMouseEnter={() => setHoverDirection('left')}
          onMouseLeave={() => setHoverDirection(null)}
          aria-label="이전 슬라이드"
        />
        <div className="pointer-events-none h-full w-[20%]" />
        <button
          type="button"
          className="h-full w-[40%]"
          onClick={handleNext}
          onMouseEnter={() => setHoverDirection('right')}
          onMouseLeave={() => setHoverDirection(null)}
          aria-label="다음 슬라이드"
        />
      </div>

      <div
        className="my-8 flex transition-transform duration-750 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {ONBOARDING_STEPS.map((step) => (
          <OnboardingSlide key={step.id} step={step} hoverDirection={hoverDirection} />
        ))}
      </div>
    </div>
  );
};
