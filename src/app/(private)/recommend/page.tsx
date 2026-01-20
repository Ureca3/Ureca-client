import React from 'react';

import { BottomNav } from '@/components/layout/bottom-navigation';
import { Header } from '@/components/layout/header';
import { ProductList } from '@/components/recommend/product-list';
import {
  dummyCategoriesApi,
  dummyProductsApi,
} from '@/services/recommend/MockupRecommendApi.client';

const page = () => {
  const categories = dummyCategoriesApi;
  const products = dummyProductsApi;

  return (
    <div className="mx-auto w-full overflow-hidden">
      <Header />
      {categories.map((i) => (
        <ProductList
          key={i.category_id}
          category={i}
          products={products.filter((p) => p.category === i.code)}
        />
      ))}
      <BottomNav />
    </div>
  );
};

export default page;
