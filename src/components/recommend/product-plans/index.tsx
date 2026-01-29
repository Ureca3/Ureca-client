import Link from 'next/link';

import type { ProductProps } from '@/types/product/dto';

export const ProductPlans = ({ product }: { product: ProductProps }) => {
  const priceLabel = typeof product.price === 'number' ? product.price.toLocaleString() : null;
  console.log('PLAN PRODUCT', product);

  return (
    <Link href={product.link || '#'} target="_blank" rel="noopener noreferrer">
      <div className="bg-white-light border-primary-500 flex h-21.25 w-50 cursor-pointer flex-col justify-evenly gap-1 truncate rounded-[20px] border-2 p-3">
        {/* <div className="text-sm leading-none font-normal">{product.desc ?? ''}</div> */}
        <div className="line-clamp-2 text-center text-base leading-none wrap-break-word break-keep">
          {product.name}
        </div>
        <div className="text-center text-sm leading-none text-black">
          {priceLabel ? <>월 {priceLabel}원 부터</> : <span>상담 시 안내</span>}
        </div>
      </div>
    </Link>
  );
};
