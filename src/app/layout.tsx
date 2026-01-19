import type { ReactNode } from 'react';
import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';

import { GlobalComponents } from '@/components/ui/global-components';
import { Providers } from '@/provider';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
});

const gowunDodum = localFont({
  src: './fonts/GowunDodum.ttf',
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
          pretendard.variable,
          gowunDodum.variable,
          'bg-[#FBF8FB]',
          'min-h-screen',
        ].join(' ')}
      >
        <Providers>
          {children}
          <GlobalComponents />
        </Providers>
      </body>
    </html>
  );
}
