'use client';

import React from 'react';

import { BottomNav } from '@/components/layout/bottom-navigation';
import { Header } from '@/components/layout/header';
import { Loading } from '@/components/loading';
import { ProductList } from '@/components/recommend/product-list';
import { useRecommendMe } from '@/hooks/recommend/useRecommendMe';

const page = () => {
  const { data, isLoading, isError, refetch } = useRecommendMe();
  const categories = data?.categories ?? [];
  const products = data?.products ?? [];

  return (
    <div className="mx-auto w-full overflow-hidden pb-24">
      <Header />
      {isLoading && (
        <div className="mt-4">
          <Loading />
        </div>
      )}
      {isError && (
        <div className="px-6 py-4 text-sm text-red-600">
          Failed to load recommendations.
          <button type="button" className="ml-2 underline" onClick={() => refetch()}>
            Retry
          </button>
        </div>
      )}
      {!isLoading &&
        !isError &&
        categories.map((i) => (
          <ProductList
            key={i.id}
            category={i}
            products={products.filter((p) => p.categoryId === i.id)}
          />
        ))}
      <BottomNav />
    </div>
  );
};

export default page;
