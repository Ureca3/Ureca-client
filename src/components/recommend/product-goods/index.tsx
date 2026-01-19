import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import type { ProductProps } from '@/types/product/dto';

export const ProductGoods = ({ product, monthly }: { product: ProductProps; monthly: boolean }) => {
  return (
    <Link href={product.link} target="_blank">
      <div className="bg-white-light flex h-53 w-37 cursor-pointer flex-col items-center justify-between gap-1 rounded-[20px] p-3 shadow-[0_0_4px_rgba(0,0,0,0.25)]">
        <div className="bg-primary-300 relative h-28 w-28 overflow-hidden rounded-[20px]">
          <Image
            src={product.img}
            alt={product.name}
            fill
            className="object-cover"
            sizes="112px"
            unoptimized //접속불가링크 거르는 걸 우회하는 것, 나중에 S3 연결하면 꺼야함
          />
        </div>
        <div className="line-clamp-2 w-28 px-2 text-center leading-none wrap-break-word break-keep">
          {product.name}
        </div>
        <div className="flex text-sm font-normal">
          {monthly ? '월 ' : null}
          {product.price.toLocaleString()}
          {product.is_sale === true ? '원부터' : '원'}
        </div>
      </div>
    </Link>
  );
};
