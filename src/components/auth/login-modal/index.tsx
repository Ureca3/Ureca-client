'use client';

import Logo from '@/assets/icons/auth/unity-logo.svg';
import Cross from '@/assets/icons/auth/x.svg';

import { GoogleLoginButton } from '../google-login-button';
import { KakaoLoginButton } from '../kakao-login-button';
import { NaverLoginButton } from '../naver-login-button';

interface Props {
  onClose: () => void;
}

export const LoginModal = ({ onClose }: Props) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative w-full max-w-sm rounded-xl bg-white p-6 shadow-lg">
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
      </div>
    </div>
  );
};
