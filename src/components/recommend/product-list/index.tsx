import React from 'react';

import type { ProductProps } from '@/types/product/dto';
import type { CategoryInfo } from '@/types/product/mapper';

import { ProductGoods } from '../product-goods';
import { ProductPlans } from '../product-plans';

export const ProductList = ({
  category,
  products,
}: {
  category: CategoryInfo;
  products: ProductProps[];
}) => {
  return (
    <div className="mt-4 ml-6 text-lg font-bold">
      {category.label}

      <div className="no-scrollbar mt-1 flex gap-2 overflow-x-auto overscroll-x-contain scroll-smooth p-0.5">
        {products.map((p) =>
          p.img ? (
            <ProductGoods key={p.productId} product={p} />
          ) : (
            <ProductPlans key={p.productId} product={p} />
          ),
        )}
      </div>
    </div>
  );
};
