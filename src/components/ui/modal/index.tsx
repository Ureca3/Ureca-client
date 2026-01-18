'use client';
import { useAppSelector } from '@/store/hooks';

export const ModalRoot = () => {
  const { isOpen, content } = useAppSelector((s) => s.modal);

  if (!isOpen || !content) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px]">
      <div className="rounded-[20px] bg-white p-9">{content}</div>
    </div>
  );
};
