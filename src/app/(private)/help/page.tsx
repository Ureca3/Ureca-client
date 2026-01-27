'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Moono from '@/assets/icons/help/bbaeggom.svg';
import X from '@/assets/icons/help/x.svg';
import Help1 from '@/assets/images/help/Help1.png';
import Help2 from '@/assets/images/help/Help2.png';
import Help3 from '@/assets/images/help/Help3.png';
import Help4 from '@/assets/images/help/Help4.png';

const HELP_STEPS = [
  {
    title: '1.',
    description: '상담 아이콘을 눌러 전화 상담을 시작하세요.',
    image: Help1,
  },
  {
    title: '2.',
    description: '전화로 상담을 진행하며 요금제, 데이터, 약정 관련 내용을 문의할 수 있습니다.',
    image: Help2,
  },
  {
    title: '3.',
    description: '통화가 끝나면 AI가 상담 내용을 요약해 드려요.',
    image: Help3,
  },
  {
    title: '4.',
    description: '요약 리스트에서 상담 내용을 다시 확인할 수 있어요.',
    image: Help4,
  },
];

const HelpPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-dvh bg-[#FFF6FA]">
      <div className="relative flex h-21 items-center bg-[#A86B8F] pl-4">
        <button
          type="button"
          // className="text-bg-[#FFF6FA] absolute top-5 left-4 flex h-10 w-10 items-center justify-center text-2xl font-semibold hover:opacity-50"
          className="w-fit"
          onClick={() => router.back()}
          aria-label="닫기"
        >
          <X className="h-9 w-9" />
        </button>
        <div className="absolute top-13 right-4 h-14 w-14">
          {/* <Image src={Mooner} alt="" fill className="object-contain" /> */}
          <Moono />
        </div>
      </div>

      <div className="space-y-6 px-6 py-6">
        <h2 className="text-xl font-semibold text-gray-900">도움말</h2>

        <div className="flex flex-col space-y-6">
          {HELP_STEPS.map((step) => (
            <div key={step.title} className="flex items-center gap-4">
              <div className="relative h-[90px] w-[140px] flex-shrink-0 overflow-hidden rounded-2xl bg-white shadow-sm">
                <Image src={step.image} alt="" fill className="object-cover" />
              </div>
              <p className="text-sm leading-6 text-gray-700">
                <span className="mr-1 font-semibold text-gray-900">{step.title}</span>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
