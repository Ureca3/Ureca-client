import type { ReactNode } from 'react';

import ForwardIcon from '@/assets/icons/mypage/forward.svg';

interface Props {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  tone?: 'default' | 'danger';
}

export const SettingsRow = ({ icon, label, onClick, tone = 'default' }: Props) => {
  const isDanger = tone === 'danger';

  return (
    <button
      type="button"
      onClick={onClick}
      className={['flex w-full items-center gap-3 px-4 py-4', isDanger ? 'text-red-500' : '']
        .join(' ')
        .trim()}
    >
      <div
        className={[
          'flex h-9 w-9 items-center justify-center rounded-full',
          isDanger ? 'bg-[#FDEBEC] text-red-500' : 'bg-[#F5F0F8] text-gray-600',
        ]
          .join(' ')
          .trim()}
      >
        {icon}
      </div>
      <span className={['text-sm font-semibold', isDanger ? '' : 'text-gray-900'].join(' ').trim()}>
        {label}
      </span>
      <span className="ml-auto">
        <ForwardIcon width="20px" height="20px" />
      </span>
    </button>
  );
};
