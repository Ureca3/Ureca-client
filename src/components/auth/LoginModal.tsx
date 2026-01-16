'use client';

import Cross from '@/assets/auth/x.svg';

interface Props {
  onClose: () => void;
}

export const LoginModal = ({ onClose }: Props) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative w-full max-w-sm rounded-3xl bg-white p-6">
        <button type="button" onClick={onClose} className="absolute top-4 right-4 text-gray-500">
          <Cross />
        </button>

        <h2 className="mb-6 text-center text-xl font-bold">로그인</h2>

        <div className="flex flex-col gap-3">
          <button className="rounded-md bg-yellow-400 py-3">카카오로 로그인</button>
          <button className="rounded-md bg-green-500 py-3 text-white">네이버로 로그인</button>
          <button className="rounded-md bg-red-500 py-3 text-white">구글로 로그인</button>
        </div>
      </div>
    </div>
  );
};
