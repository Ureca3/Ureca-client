'use client';

import { useEffect } from 'react';

import { motion } from 'framer-motion';

import Logo from '@/assets/icons/auth/unity-logo.svg';
import Cross from '@/assets/icons/auth/x.svg';
import { GoogleLoginButton } from '@/components/auth/google-login-button';
import { KakaoLoginButton } from '@/components/auth/kakao-login-button';
import { NaverLoginButton } from '@/components/auth/naver-login-button';

interface Props {
  onClose: () => void;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 10, scale: 0.9 },
};

export const LoginModal = ({ onClose }: Props) => {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <motion.div
      onClick={onClose}
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        variants={modalVariants}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        initial="hidden"
        animate="visible"
        exit="exit"
        aria-modal="true"
        role="dialog"
        className="relative w-full max-w-sm rounded-xl bg-white p-6 shadow-lg"
      >
        <button type="button" onClick={onClose} className="text-gray absolute top-4 right-4">
          <Cross className="hover:opacity-50" />
        </button>

        <div className="flex flex-col gap-4">
          <div className="flex justify-center">
            <Logo />
          </div>

          <h2 className="mt-4 mb-6 text-center text-2xl font-bold text-black">유니티 로그인</h2>

          <GoogleLoginButton />
          <KakaoLoginButton />
          <NaverLoginButton />

          <p className="flex justify-end text-xs font-semibold text-black">
            U+NITY는 회원 전용 앱 입니다.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};
