import type { ReactNode } from 'react';
import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';

import { GlobalComponents } from '@/components/ui/global-components';
import { Providers } from '@/providers';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const gowunDodum = localFont({
  src: '../assets/fonts/GowunDodum.ttf',
  variable: '--font-gowun-dodum',
  display: 'swap',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body
        className={[
          geistSans.variable,
          geistMono.variable,
          // pretendard.variable,
          gowunDodum.variable,
          'bg-[#FBF8FB]',
          'min-h-dvh',
          'flex',
          'flex-col',
          'items-center',
          'justify-center',
        ].join(' ')}
      >
        <div className="w-93.75">
          <Providers>
            {children}
            <GlobalComponents />
          </Providers>
        </div>
      </body>
    </html>
  );
}
