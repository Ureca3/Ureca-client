'use client';

import { useState } from 'react';

import { AnimatePresence } from 'framer-motion';

import { LoginModal } from '@/components/auth/login-modal';
import { OnboardingButton } from '@/components/onboarding/onboarding-button';
import { OnboardingIndicator } from '@/components/onboarding/onboarding-indicator';
import { OnboardingSlider } from '@/components/onboarding/onboarding-slider';

export default function OnboardingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-evenly">
      {/* 인디케이터 */}
      <OnboardingIndicator currentIndex={currentIndex} onChangeIndex={setCurrentIndex} />

      {/* 슬라이드 영역 */}
      <OnboardingSlider currentIndex={currentIndex} onChangeIndex={setCurrentIndex} />

      {/* 버튼 영역 */}
      <OnboardingButton onClick={() => setIsLoginOpen(true)} />

      {/* 로그인 모달 */}
      <AnimatePresence>
        {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}
      </AnimatePresence>
    </main>
  );
}
