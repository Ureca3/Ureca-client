'use client';

import { useRouter } from 'next/navigation';

import { SettingsGroup } from '@/app/(private)/mypage/_components/settings-group';
import { SettingsRow } from '@/app/(private)/mypage/_components/settings-row';
import ThemeIcon from '@/assets/icons/mypage/accessibility.svg';
import LogoutIcon from '@/assets/icons/mypage/account.svg';
import BookmarkIcon from '@/assets/icons/mypage/bookmark.svg';
import GroupIcon from '@/assets/icons/mypage/group.svg';
import FileIcon from '@/assets/icons/mypage/paper-line.svg';
import QuestionIcon from '@/assets/icons/mypage/question.svg';
import { BottomNav } from '@/components/layout/bottom-navigation';

const API = process.env.NEXT_PUBLIC_API_BASE_URL;

const Mypage = () => {
  const router = useRouter();

  const noop = () => {};

  const handleLogout = async () => {
    try {
      if (!API) throw new Error('NEXT_PUBLIC_API_BASE_URL is missing');

      const res = await fetch(`${API}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include', // ✅ HttpOnly refreshToken 쿠키 보내기
      });

      if (!res.ok) {
        // 백엔드가 body를 안 주는 구조라 status만 체크
        throw new Error(`Logout failed: ${res.status}`);
      }

      // ✅ 쿠키 삭제가 반영된 상태로 public로 이동
      router.replace('/onboarding');
      router.refresh(); // (선택) App Router 캐시/상태 정리용
    } catch (e) {
      console.error(e);
      // 필요하면 토스트/모달로 “로그아웃 실패”만 보여줘도 됨
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
      onClick: handleLogout,
    },
    {
      label: '회원 탈퇴',
      icon: <GroupIcon width="18px" height="18px" />,
      tone: 'danger' as const,
    },
  ];

  return (
    <>
      <div className="px-4 pt-6">
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

        <div className="mt-6 space-y-6">
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

      <BottomNav />
    </>
  );
};

export default Mypage;
