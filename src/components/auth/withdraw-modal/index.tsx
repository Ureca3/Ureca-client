'use client';

import React, { useEffect, useRef, useState } from 'react';

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

export const WithdrawModal = ({ onClose, onConfirm }: Props) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const isConfirmDisabled = inputValue !== '회원탈퇴';

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

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
        <button
          type="button"
          onClick={onClose}
          className="text-gray absolute top-4 right-4"
          aria-label="모달 닫기"
        >
          <Cross className="hover:opacity-50" />
        </button>

        <section className="flex flex-col gap-4">
          <div className="flex justify-center">
            <Logo />
          </div>
          <div className="flex flex-col">
            <p className="text-center text-sm font-bold text-black">
              탈퇴 시 고객님의 모든 이용 기록이 즉시 삭제되며, 삭제된 데이터는 복구할 수 없습니다.
            </p>
            <p className="text-center text-sm font-bold text-black">
              탈퇴를 원하시는 경우, 아래 입력란에 "회원탈퇴"를 입력해주세요.
            </p>
          </div>

          <input
            id="withdraw-confirm"
            type="text"
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="회원탈퇴"
            className="focus:border-primary-500 text-primary-500 w-full rounded-md border border-gray-300 p-2 text-center text-sm font-semibold transition-colors placeholder:text-gray-300 focus:outline-none"
          />

          <Button
            variant="solid"
            tone="primary"
            size="m"
            onClick={onConfirm}
            disabled={isConfirmDisabled}
            className="font-semibold"
          >
            회원탈퇴
          </Button>
        </section>
      </motion.div>
    </motion.div>
  );
};
