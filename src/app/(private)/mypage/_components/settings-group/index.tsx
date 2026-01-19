import type { ReactNode } from 'react';

interface Props {
  title: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

export const SettingsGroup = ({ title, children, className, containerClassName }: Props) => {
  return (
    <section className={className ?? ''}>
      <p className="mb-3 text-sm font-semibold text-gray-500">{title}</p>
      <div
        className={[
          'divide-y divide-gray-100 overflow-hidden rounded-2xl bg-white shadow-sm',
          containerClassName ?? '',
        ]
          .join(' ')
          .trim()}
      >
        {children}
      </div>
    </section>
  );
};
