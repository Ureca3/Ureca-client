'use client';

import { useState } from 'react';

import { OnboardingSlider } from '@/components/onboarding/OnboardingSlider';
import { ONBOARDING_STEPS } from '@/constants/onboarding';
// import LoginModal from '@/components/auth/LoginModal';

export default function OnboardingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <>
      {/* 인디케이터 */}
      <div className="mt-6">
        <div className="flex justify-center gap-3">
          {ONBOARDING_STEPS.map((_, index) => (
            <span
              key={index}
              className={`h-3 w-3 rounded-full ${
                index === currentIndex ? 'bg-primary-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 슬라이드 영역 */}
      <OnboardingSlider currentIndex={currentIndex} onChangeIndex={setCurrentIndex} />

      {/* 버튼 영역 */}
      {/* <LoginModal />} */}
    </>
  );
}
