'use client';

import { useState } from 'react';

import { OnboardingIndicator } from '@/components/onboarding/OnboardingIndicator';
import { OnboardingSlider } from '@/components/onboarding/OnboardingSlider';
// import LoginModal from '@/components/auth/LoginModal';

export default function OnboardingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-evenly">
      {/* 인디케이터 */}
      <OnboardingIndicator currentIndex={currentIndex} onChangeIndex={setCurrentIndex} />

      {/* 슬라이드 영역 */}
      <OnboardingSlider currentIndex={currentIndex} onChangeIndex={setCurrentIndex} />

      {/* 버튼 영역 */}
      {/* <OnboardingButton onClick={() => setIsLoginOpen(true)} /> */}

      {/* 로그인 모달 */}
      {/* {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />} */}
    </main>
  );
}
