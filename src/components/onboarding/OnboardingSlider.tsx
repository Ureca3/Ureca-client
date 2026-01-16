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
    onChangeIndex((currentIndex - 1 + total) % total);
  };

  const handleNext = () => {
    onChangeIndex((currentIndex + 1) % total);
  };

  useEffect(() => {
    // hover 중이면 자동 슬라이드 멈춤
    if (hoverDirection !== null) return;

    const intervalId = setInterval(() => {
      onChangeIndex((prev) => (prev + 1) % total);
    }, 4000); // 4초

    return () => clearInterval(intervalId);
  }, [hoverDirection, onChangeIndex, total]);

  return (
    <div className="group relative w-full overflow-hidden">
      {/* 슬라이드 이동을 위한 클릭 영역 */}
      <div className="absolute inset-0 z-10 flex">
        <button
          type="button"
          className="h-full w-[40%]"
          onClick={handlePrev}
          onMouseEnter={() => setHoverDirection('left')}
          onMouseLeave={() => setHoverDirection(null)}
        />
        <div className="pointer-events-none h-full w-[20%]" />
        <button
          type="button"
          className="h-full w-[40%]"
          onClick={handleNext}
          onMouseEnter={() => setHoverDirection('right')}
          onMouseLeave={() => setHoverDirection(null)}
        />
      </div>

      {/* 슬라이드 영역 */}
      <div
        className="flex transition-transform duration-750 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {ONBOARDING_STEPS.map((step) => (
          <OnboardingSlide key={step.id} step={step} hoverDirection={hoverDirection} />
        ))}
      </div>
    </div>
  );
};
