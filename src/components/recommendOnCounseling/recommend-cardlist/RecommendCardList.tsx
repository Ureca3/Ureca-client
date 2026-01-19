import React from 'react';

import { dummyProductsApi } from '@/service/recommend/MockupRecommendApi.client';

import { RecommendCard } from '../recommend-card';

//나중에 상담 요약 데잍에서 point? content? 꺼내서 추천 받아오도록 할거임
//monthly는 백 단에서 category에 묶어 가져오도록 하기
export const RecommendCardList = () => {
  const products = dummyProductsApi;

  return (
    <div className="mt-3 flex w-full flex-col items-center gap-2">
      {products.map((i, idx) => (
        <RecommendCard
          key={i.product_id}
          is_monthly={true}
          product={i}
          best={idx === 0 ? 'border border-primary-500' : 'border border-gray'}
        />
      ))}
    </div>
  );
};
