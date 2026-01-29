import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import type { ProductProps } from '@/types/product/dto';

export const ProductGoods = ({ product }: { product: ProductProps }) => {
  const priceLabel = typeof product.price === 'number' ? product.price.toLocaleString() : null;

  return (
    <Link href={product.link || '#'} target="_blank" rel="noopener noreferrer">
      <div className="bg-white-light flex h-full w-full cursor-pointer flex-col items-center justify-between gap-2 rounded-[20px] p-2 shadow-[0_0_4px_rgba(0,0,0,0.25)]">
        {product.img && (
          <div className="relative h-28 w-28 overflow-hidden rounded-[20px]">
            <Image
              src={product.img}
              alt={product.name}
              fill
              className="object-cover"
              sizes="112px"
              unoptimized
            />
          </div>
        )}

        <div className="text-md line-clamp-3 w-full max-w-[90px] px-2 text-center leading-snug break-keep">
          {product.name}
        </div>
        <div className="flex text-sm font-semibold text-black">
          {priceLabel ? <>월 {priceLabel}원 ~</> : <span className="text-black">상담 시 안내</span>}
        </div>
      </div>
    </Link>
  );
};
