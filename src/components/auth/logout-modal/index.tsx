import React, { useEffect } from 'react';

import { motion } from 'framer-motion';

import Logo from '@/assets/icons/auth/unity-logo.svg';
import Cross from '@/assets/icons/auth/x.svg';
import { Button } from '@/components/ui/button';

interface Props {
  onClose: () => void;
  onConfirm: () => void;
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

export const LogoutModal = ({ onClose, onConfirm }: Props) => {
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

        <section className="flex flex-col gap-4">
          <div className="flex justify-center">
            <Logo />
          </div>
          <p className="text-center text-lg font-bold text-black">로그아웃 하시겠어요?</p>
          <Button
            variant="solid"
            tone="primary"
            size="m"
            onClick={onConfirm}
            className="font-semibold"
          >
            로그아웃
          </Button>
        </section>
      </motion.div>
    </motion.div>
  );
};
