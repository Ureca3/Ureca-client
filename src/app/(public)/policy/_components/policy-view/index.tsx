import React from 'react';

import Dot from '@/assets/icons/policy/dot.svg';

export const PolicyView = () => {
  return (
    <main className="flex flex-col gap-2 p-4 text-xs font-semibold text-black">
      <div className="flex items-center">
        <Dot />
        <p>본 서비스는 상담 내용을 기반으로 AI가 요약 정보를 제공합니다.</p>
      </div>
      <div className="flex items-center">
        <Dot />
        <span>요약 결과는 참고용이며 실제 요금제 적용 결과와 다를 수 있습니다.</span>
      </div>
      <div className="flex items-center">
        <Dot />
        <p>상담 요약 및 북마크 정보는 개인화된 서비스 제공을 위해 저장됩니다.</p>
      </div>
    </main>
  );
};
