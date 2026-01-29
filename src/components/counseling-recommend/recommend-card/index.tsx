import React from 'react';
import Link from 'next/link';

import Check from '@/assets/images/recommend/check.svg';
import type { ProductProps } from '@/types/product/dto';

type RecommendCardProps = {
  product: ProductProps;
  best: string;
  is_monthly: boolean;
};

export const RecommendCard = ({ product, best }: RecommendCardProps) => {
  const priceLabel = typeof product.price === 'number' ? product.price.toLocaleString() : null;

  const content = (
    <div className={`grid w-[160px] rounded-2xl ${best} `}>
      <div className="mx-4 my-4 grid gap-2">
        <div className="line-clamp-3 text-center text-[14px] font-semibold break-keep">
          {product.name}
        </div>
        <div className="text-primary-500 text-center text-[16px] font-bold">
          {priceLabel ? (
            <>
              <span className="text-sm text-black">월 </span>
              <span>{priceLabel}</span>
              <span className="text-sm text-black">원 부터</span>
            </>
          ) : (
            <span className="text-gray-400">상담 시 안내</span>
          )}
        </div>
        <div className="grid gap-1">
          {product.content?.split(', ').map((text, idx) => (
            <div key={idx} className="grid grid-cols-[auto_1fr] items-start gap-1 text-sm">
              <Check aria-hidden="true" focusable="false" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return product.link ? (
    <Link href={product.link} target="_blank" rel="noopener noreferrer" className="block">
      {content}
    </Link>
  ) : (
    content
  );
};
