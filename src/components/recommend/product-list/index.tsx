import React from 'react';

import type { CategoryProps, ProductProps } from '@/types/product/dto';

import { ProductGoods } from '../product-goods';
import { ProductPlans } from '../product-plans';

export const ProductList = ({
  category,
  products,
}: {
  category: CategoryProps;
  products: ProductProps[];
}) => {
  return (
    <div className="mt-4 ml-6 text-lg font-bold">
      {category.name}
      <div className="no-scrollbar mt-1 flex gap-2 overflow-x-auto overscroll-x-contain scroll-smooth p-0.5">
        {products.map((p) =>
          category.is_plan ? (
            <ProductPlans key={p.product_id} product={p} monthly={category.is_monthly} />
          ) : (
            <ProductGoods key={p.product_id} product={p} monthly={category.is_monthly} />
          ),
        )}
      </div>
    </div>
  );
};
