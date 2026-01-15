'use client';

import Image from 'next/image';

import Chat from '@/assets/header/Chat.png';
import Logo from '@/assets/header/Logo.png';

export const Header = () => {
  return (
    <header className="flex h-14 items-center justify-between bg-white">
      <Image src={Logo} alt="U+NITY 로고" width={72} height={24} priority className="ml-2" />

      <Image src={Chat} alt="채팅" width={40} height={40} />
    </header>
  );
};
