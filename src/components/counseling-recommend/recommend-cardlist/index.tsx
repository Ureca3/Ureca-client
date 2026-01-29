import React from 'react';

import type { ProductProps } from '@/types/product/dto';

import { RecommendCard } from '../recommend-card';

export const RecommendCardList = ({ products }: { products: ProductProps[] }) => {
  return (
    <div className="mt-3">
      <div className="no-scrollbar flex gap-4 overflow-x-auto overscroll-x-contain scroll-smooth px-1">
        {products.map((product) => (
          <div key={product.productId} className="shrink-0">
            <RecommendCard
              product={product}
              is_monthly={true}
              best=" border-1 border-primary-500 bg-white"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
