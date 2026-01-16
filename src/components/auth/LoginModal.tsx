'use client';

import Logo from '@/assets/auth/unity-logo.svg';
import Cross from '@/assets/auth/x.svg';

import { GoogleLoginButton } from './GoogleLoginButton';
import { KakaoLoginButton } from './KakaoLoginButton';
import { NaverLoginButton } from './NaverLoginButton';

interface Props {
  onClose: () => void;
}

export const LoginModal = ({ onClose }: Props) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative w-full max-w-sm rounded-3xl bg-white p-6">
        <button type="button" onClick={onClose} className="text-gray absolute top-4 right-4">
          <Cross />
        </button>
        <div className="flex flex-col gap-4">
          <div className="flex justify-center">
            <Logo />
          </div>
          <h2 className="mt-4 mb-8 text-center text-2xl font-bold text-black">유니티 로그인</h2>

          <GoogleLoginButton />
          <KakaoLoginButton />
          <NaverLoginButton />
          {/* <button className="rounded-md bg-yellow-400 py-3">카카오로 로그인</button>
          <button className="rounded-md bg-green-500 py-3 text-white">네이버로 로그인</button>
          <button className="rounded-md bg-red-500 py-3 text-white">구글로 로그인</button> */}
        </div>
      </div>
    </div>
  );
};
