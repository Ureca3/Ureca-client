'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Character from '@/assets/images/splash/Splash.png';
import UPlusLogo from '@/assets/images/splash/ulogo.png';
import UnityLogo from '@/assets/images/splash/unity.png';

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/onboarding');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-[#FFF7F8]">
      <div className="relative z-20 mt-[112px] ml-6 flex flex-col items-start">
        <p className="text-[18px] leading-[1.45] font-medium text-[#111111]">
          내 손안에
          <br />
          가장 작은 상담원
        </p>

        <div className="mt-4">
          <Image src={UnityLogo} alt="U+NITY logo" width={140} priority />
        </div>
      </div>

      <div className="absolute right-[-56px] bottom-[-40px] z-20">
        <Image src={Character} alt="Unity character" width={360} priority />
      </div>

      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
        <Image src={UPlusLogo} alt="U+ logo" width={36} />
      </div>
    </main>
  );
}
