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
    <div className="flex min-h-screen flex-col items-center justify-evenly">
      <OnboardingIndicator currentIndex={currentIndex} onChangeIndex={setCurrentIndex} />

      <OnboardingSlider currentIndex={currentIndex} onChangeIndex={setCurrentIndex} />

      <OnboardingButton onClick={() => setIsLoginOpen(true)} />

      <AnimatePresence>
        {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
