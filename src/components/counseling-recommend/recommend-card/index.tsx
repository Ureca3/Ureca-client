import React from 'react';
import Link from 'next/link';

import Check from '@/assets/images/recommend/check.svg';
import type { ProductProps } from '@/types/product/dto';

export const RecommendCard = ({
  product,
  best,
}: {
  is_monthly: boolean;
  product: ProductProps;
  best: string;
}) => {
  const priceLabel = typeof product.price === 'number' ? product.price.toLocaleString() : null;

  return (
    <div className={`flex w-200 max-w-200 flex-col rounded-2xl ${best}`}>
      <div className="mx-10 my-5">
        <div className="text-[14px] font-semibold">{product.name}</div>
        <div className="text-primary-500 mb-2 text-[20px] font-bold">
          {priceLabel ? (
            <>
              {priceLabel}
            </>
          ) : (
            <span className="text-gray-400">TBD</span>
          )}
        </div>
        {product.content?.split(', ').map((text, idx) => (
          <div key={idx} className="flex items-center">
            <Check aria-hidden="true" focusable="false" />
            &nbsp;{text}
          </div>
        ))}
        {product.link && (
          <Link
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:bg-gray-light border-gray-light mt-2 inline-flex w-full items-center justify-center rounded-md border bg-transparent px-4 py-2 text-sm text-black shadow-[0_0_2px_#eeeeee] transition-colors"
          >
            View
          </Link>
        )}
      </div>
    </div>
  );
};
