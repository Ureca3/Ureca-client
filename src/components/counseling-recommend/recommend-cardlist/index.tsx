import React from 'react';

import type { ProductProps } from '@/types/product/dto';

import { RecommendCard } from '../recommend-card';

export const RecommendCardList = ({ products }: { products: ProductProps[] }) => {
  return (
    <div className="mt-3 grid w-full grid-cols-3 justify-items-center gap-4 md:grid-cols-4 lg:grid-cols-5">
      {products.map((product, idx) => (
        <RecommendCard
          key={product.productId}
          is_monthly={true}
          product={product}
          best={idx === 0 ? 'border border-primary-500 bg-white' : 'border border-gray bg-white'}
        />
      ))}
    </div>
  );
};
