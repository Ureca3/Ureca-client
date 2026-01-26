import React from 'react';

import Moono from '@/assets/icons/policy/bbaeggom.svg';
import GoBack from '@/assets/icons/policy/chevron-left.svg';
import Logo from '@/assets/icons/policy/logo.svg';

export const PolicyHeader = () => {
  return (
    <main className="flex flex-col">
      <section className="text-primary-200 flex items-center justify-start hover:opacity-50">
        <GoBack className="h-9 w-9" />
      </section>

      <section className="pl-4">
        <div className="bg-primary-100 my-8 flex h-51 w-51 items-center justify-center rounded-full">
          <Logo />
        </div>
      </section>

      <section className="flex flex-col pl-4 text-2xl font-semibold text-black">
        <p>고객님</p>
        <p>환영합니다!</p>
      </section>

      <section className="relative flex flex-col px-4 pt-16">
        <div className="absolute right-5 bottom-[-2]">
          <Moono />
        </div>
        <div className="border border-black/75"></div>
      </section>
    </main>
  );
};
