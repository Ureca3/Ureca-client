import React from 'react';

import { ProductList } from '@/components/recommend/product-list';
import {
  dummyCategoriesApi,
  dummyProductsApi,
} from '@/service/recommend/MockupRecommendApi.client';

const page = () => {
  const categories = dummyCategoriesApi;
  const products = dummyProductsApi;

  return (
    <div className="mx-auto w-full overflow-hidden">
      {categories.map((i) => (
        <ProductList
          key={i.category_id}
          category={i}
          products={products.filter((p) => p.category === i.code)}
        />
      ))}
    </div>
  );
};

export default page;
