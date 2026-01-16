import React from 'react';
import Link from 'next/link';

import type { ProductProps } from '@/types/product/dto';

export const ProductPlans = ({ product, monthly }: { product: ProductProps; monthly: boolean }) => {
  return (
    //ProductGoods와 비슷하지만 같은 컴포넌트로 쓰기엔 스타일이 꽤 달라서 if로 길게 만드느니 그냥 따로 뺌
    <Link href={product.link} target="_blank">
      <div className="bg-white-light border-primary-500 flex h-21.25 w-48 cursor-pointer flex-col justify-between gap-1 rounded-[20px] border-2 p-3">
        <div className="text-sm leading-none font-normal">{product.desc}</div>
        <div className="line-clamp-2 leading-none wrap-break-word break-keep">{product.name}</div>
        <div
          className={`flex leading-none ${product.is_sale ? 'text-primary-500' : 'text-#000000'}`}
        >
          {monthly ? '월 ' : null}
          {product.price.toLocaleString()}
          {product.is_sale === true ? '원부터' : '원'}
        </div>
      </div>
    </Link>
  );
};
