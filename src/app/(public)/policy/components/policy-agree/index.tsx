import React from 'react';

import { Button } from '@/components/ui/button';

export const PolicyAgree = () => {
  //   const [agreements, setAgreements] = useState({
  //     all: false,
  //     terms: false, // 이용약관 동의(필수)
  //     privacy: false, // 개인정보 수집 및 이용동의(필수)
  //     service: false, // 서비스 이용 안내 동의 (필수)
  //   });

  return (
    <main>
      <section className="relative flex flex-col gap-2 px-6 pt-4 pb-6 text-xs font-semibold text-black">
        <div className="absolute top-[-36] flex items-center gap-2 text-xl font-bold text-black">
          <input className="form-checkbox text-primary-500 border-gray-dark h-4 w-4 rounded-full border-2" />
          <p>약관 전체동의</p>
        </div>
        <div className="flex items-center gap-2">
          <input className="form-checkbox text-primary-500 border-gray-dark h-4 w-4 rounded-full border-2" />
          <p>이용약관 동의(필수)</p>
        </div>
        <div className="flex items-center gap-2">
          <input className="form-checkbox text-primary-500 border-gray-dark h-4 w-4 rounded-full border-2" />
          <p className="text-gray-dark">개인정보 수집 및 이용동의(필수)</p>
        </div>
        <div className="flex items-center gap-2">
          <input className="form-checkbox text-primary-500 border-gray-dark h-4 w-4 rounded-full border-2" />
          <p className="text-gray-dark">서비스 이용 안내 동의(필수)</p>
        </div>
        <p className="pl-6 text-[8px]">상담 요약 및 서비스 이용 관련 안내를 받을 수 있습니다.</p>
      </section>
      <section className="px-2">
        <Button variant="solid" tone="primary" size="m" className="w-full font-semibold">
          시작하기
        </Button>
      </section>
    </main>
  );
};
