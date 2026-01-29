import React from 'react';

import { CallComponent } from '@/components/call/calling';

const page = () => {
  return (
    <div className="flex h-screen flex-col">
      <div className="bg-secondary-50 text-secondary-400 mx-3.5 my-2.75 rounded-lg px-6 py-3 text-center wrap-break-word break-keep">
        우리의 상담원은 고객님의 도움을 위해 최선을 다하는 누군가의 소중한 가족입니다. 따뜻한 말
        한마디가 다정한 관계를 만듭니다.
      </div>
      <div className="flex-1">
        <CallComponent />
      </div>
    </div>
  );
};

export default page;
