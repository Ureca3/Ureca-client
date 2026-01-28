import Link from 'next/link';

import type { ProductProps } from '@/types/product/dto';

export const ProductPlans = ({ product }: { product: ProductProps; monthly: boolean }) => {
  const priceLabel = typeof product.price === 'number' ? product.price.toLocaleString() : null;

  return (
    <Link href={product.link || '#'} target="_blank" rel="noopener noreferrer">
      <div className="bg-white-light border-primary-500 flex h-21.25 w-50 cursor-pointer flex-col justify-between gap-1 truncate rounded-[20px] border-2 p-3">
        <div className="text-sm leading-none font-normal">{product.desc ?? ''}</div>
        <div className="line-clamp-2 leading-none wrap-break-word break-keep">{product.name}</div>
        <div className="flex leading-none text-black">
          {priceLabel ? (
            <>
              {priceLabel}
            </>
          ) : (
            <span className="text-gray-400">TBD</span>
          )}
        </div>
      </div>
    </Link>
  );
};
