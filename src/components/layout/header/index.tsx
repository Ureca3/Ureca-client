'use client';

import Image from 'next/image';
import Link from 'next/link';

import Logo from '@/assets/icons/header/Logo.png';
import Call from '@/assets/icons/header/Phone.svg';

export const Header = () => {
  return (
    <header className="flex h-14 items-center justify-between bg-white">
      <Image src={Logo} alt="U+NITY 로고" width={72} height={24} priority className="ml-2" />

      <Link href="/call">
        <Image src={Call} alt="상담하기" width={40} height={40} className="cursor-pointer" />
      </Link>
    </header>
  );
};
