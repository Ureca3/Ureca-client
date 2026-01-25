'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { AnimatePresence } from 'framer-motion';

import { SettingsGroup } from '@/app/(private)/mypage/_components/settings-group';
import { SettingsRow } from '@/app/(private)/mypage/_components/settings-row';
import ThemeIcon from '@/assets/icons/mypage/accessibility.svg';
import LogoutIcon from '@/assets/icons/mypage/account.svg';
import BookmarkIcon from '@/assets/icons/mypage/bookmark.svg';
import GroupIcon from '@/assets/icons/mypage/group.svg';
import FileIcon from '@/assets/icons/mypage/paper-line.svg';
import QuestionIcon from '@/assets/icons/mypage/question.svg';
import { LogoutModal } from '@/components/auth/logout-modal';
import { WithdrawModal } from '@/components/auth/withdraw-modal';
import { BottomNav } from '@/components/layout/bottom-navigation';
import { authApi } from '@/services/auth/authApi';
import { useAppDispatch } from '@/store/hooks';
import { authActions } from '@/store/slices/authSlice';
import { toastActions } from '@/store/slices/ToastSlice';

const Mypage = () => {
  const router = useRouter();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const dispatch = useAppDispatch();

  const noop = () => {};

  const handleLogout = async () => {
    try {
      await authApi.logout();
      dispatch(authActions.clearAuth());
      dispatch(toastActions.show({ text: '로그아웃 되었습니다.', variant: 'success' }));
      router.replace('/onboarding');
    } catch (e) {
      dispatch(toastActions.show({ text: '로그아웃에 실패했습니다.', variant: 'error' }));
      console.error(e);
    }
  };

  const handleWithdrawal = async () => {
    try {
      await authApi.withdrawal();
      dispatch(authActions.clearAuth());
      dispatch(toastActions.show({ text: '회원탈퇴가 완료되었습니다.', variant: 'success' }));
      router.replace('/onboarding');
    } catch (e) {
      dispatch(
        toastActions.show({
          text: '회원탈퇴에 실패했습니다. 잠시 후 다시 시도해 주세요.',
          variant: 'error',
        }),
      );
      console.error(e);
    }
  };

  const 상담Rows = [
    {
      label: '북마크 상담',
      icon: <BookmarkIcon width="18px" height="18px" />,
    },
  ];

  const 설정Rows = [
    {
      label: '테마 변경',
      icon: <ThemeIcon width="18px" height="18px" />,
    },
    {
      label: '언어 설정',
      icon: <GroupIcon width="18px" height="18px" />,
    },
  ];

  const 지원Rows = [
    {
      label: '약관',
      icon: <FileIcon width="18px" height="18px" />,
    },
    {
      label: '도움말',
      icon: <QuestionIcon width="18px" height="18px" />,
    },
    {
      label: '로그아웃',
      icon: <LogoutIcon width="18px" height="18px" />,
      tone: 'danger' as const,
      onClick: () => setIsLogoutOpen(true),
      // onClick: handleLogout,
    },
    {
      label: '회원 탈퇴',
      icon: <GroupIcon width="18px" height="18px" />,
      tone: 'danger' as const,
      onClick: () => setIsWithdrawOpen(true),
      // onClick: handleWithdrawal,
    },
  ];

  return (
    <>
      <div className="px-4 pt-6 pb-24">
        <section className="overflow-hidden rounded-[28px] bg-gradient-to-br from-[#FFD7E9] via-[#FBE6F1] to-[#F6E6FF] shadow-lg">
          <div className="flex items-center gap-3 px-5 pt-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/70 shadow-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FFE1EF] text-2xl">
                <span aria-hidden>🐙</span>
              </div>
            </div>
            <div>
              <p className="text-base font-semibold text-gray-900">박승연</p>
              <p className="text-sm text-gray-600">food0204@gmail.com</p>
              <span className="mt-1 inline-flex rounded-full bg-white/80 px-2 py-0.5 text-[11px] font-semibold text-gray-600">
                SILVER
              </span>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 px-5 pb-5">
            <div className="rounded-2xl bg-white/70 px-4 py-3 text-center">
              <p className="text-lg font-bold text-[#FF3A9D]">12</p>
              <p className="text-[11px] text-gray-600">상담 횟수</p>
            </div>
            <div className="rounded-2xl bg-white/70 px-4 py-3 text-center">
              <p className="text-lg font-bold text-[#B36BFF]">5</p>
              <p className="text-[11px] text-gray-600">북마크한 상담</p>
            </div>
          </div>
        </section>

        <div className="mt-6 space-y-6 pb-4">
          <SettingsGroup title="상담">
            {상담Rows.map((row) => (
              <SettingsRow key={row.label} icon={row.icon} label={row.label} onClick={noop} />
            ))}
          </SettingsGroup>

          <SettingsGroup title="설정">
            {설정Rows.map((row) => (
              <SettingsRow key={row.label} icon={row.icon} label={row.label} onClick={noop} />
            ))}
          </SettingsGroup>

          <SettingsGroup title="지원">
            {지원Rows.map((row) => (
              <SettingsRow
                key={row.label}
                icon={row.icon}
                label={row.label}
                onClick={row.onClick ?? noop}
                tone={row.tone}
              />
            ))}
          </SettingsGroup>
        </div>
      </div>

      <AnimatePresence>
        {isLogoutOpen && (
          <LogoutModal onClose={() => setIsLogoutOpen(false)} onConfirm={handleLogout} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isWithdrawOpen && (
          <WithdrawModal onClose={() => setIsWithdrawOpen(false)} onConfirm={handleWithdrawal} />
        )}
      </AnimatePresence>
      <BottomNav />
    </>
  );
};

export default Mypage;
