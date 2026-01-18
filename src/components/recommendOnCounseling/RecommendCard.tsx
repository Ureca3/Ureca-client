import React from 'react';
import Link from 'next/link';

import Check from '@/assets/recommend/check.svg';
import type { ProductProps } from '@/types/product/dto';

import { Button } from '../ui/button';

export const RecommendCard = ({
  is_monthly,
  product,
  best,
}: {
  is_monthly: boolean;
  product: ProductProps;
  best: string;
}) => {
  return (
    <div className={`flex max-w-200 flex-col rounded-2xl ${best}`}>
      <div className="mx-10 my-5">
        <div className="text-[14px] font-semibold">{product.name}</div>
        <div className="text-primary-500 mb-2 text-[20px] font-bold">
          {is_monthly ? '월 ' : null}
          {product.price.toLocaleString()}원{product.is_sale ? '부터' : null}
        </div>
        {product.content?.split(', ').map((text, idx) => (
          <div key={idx} className="flex items-center">
            <Check />
            &nbsp;{text}
          </div>
        ))}
        <Button
          variant={'outline'}
          tone={'secondary'}
          size={'m'}
          className="border-gray-light mt-2 w-full text-black shadow-[0_0_2px_#eeeeee]"
        >
          <Link href={product.link} target="_blank" className="h-full w-full">
            보러가기
          </Link>
        </Button>
      </div>
    </div>
  );
};
