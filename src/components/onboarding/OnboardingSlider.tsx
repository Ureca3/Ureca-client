'use client';

import { OnboardingSlide } from '@/components/onboarding/OnboardingSlide';
import { ONBOARDING_STEPS } from '@/constants/onboarding';

interface Props {
  currentIndex: number;
  onChangeIndex: (index: number) => void;
}

export const OnboardingSlider = ({ currentIndex, onChangeIndex }: Props) => {
  const handlePrev = () => {
    if (currentIndex > 0) {
      onChangeIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < ONBOARDING_STEPS.length - 1) {
      onChangeIndex(currentIndex + 1);
    }
  };

  return (
    <div className="overflow-hidden">
      {/* 슬라이드 이동을 위한 클릭 영역 */}
      <div className="absolute inset-0 z-10 flex">
        <button
          type="button"
          className="h-full w-[33%]"
          onClick={handlePrev}
          aria-label="이전 슬라이드"
        />

        <div className="pointer-events-none h-full w-[34%]" />

        <button
          type="button"
          className="h-full w-[33%]"
          onClick={handleNext}
          aria-label="다음 슬라이드"
        />
      </div>

      {/* 슬라이드 영역 */}
      <div
        className="flex transition-transform duration-750 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {ONBOARDING_STEPS.map((step) => (
          <OnboardingSlide key={step.id} step={step} />
        ))}
      </div>
    </div>
  );
};
