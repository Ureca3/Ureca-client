import React from 'react';
import type { Preview } from '@storybook/nextjs-vite';
import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import { store } from '../src/store/store';

import '../src/app/globals.css';
import { Provider } from 'react-redux';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const pretendard = localFont({
  src: '../src/assets/fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
});

const gowunDodum = localFont({
  src: '../src/assets/fonts/GowunDodum.ttf',
  variable: '--font-gowun-dodum',
  display: 'swap',
});

const kotraHope = localFont({
  src: '../src/assets/fonts/KOTRA-HOPE.otf',
  variable: '--font-kotra-hope',
  display: 'swap',
});

const preview: Preview = {
  decorators: [
    (Story) => (
      <Provider store={store}>
        <div
          className={`${geistSans.variable} ${geistMono.variable} ${pretendard.variable} ${gowunDodum.variable} ${kotraHope.variable} antialiased`}
        >
          <Story />
        </div>
      </Provider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
};

export default preview;
