import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/lib/queryKeys';
import type { RecommendMeResponse } from '@/services/recommend/recommendApi';
import { fetchRecommendMe } from '@/services/recommend/recommendApi';
import type { ProductProps } from '@/types/product/dto';
import type { CategoryInfo } from '@/types/product/mapper';
import { getCategoryInfo } from '@/types/product/mapper';

export interface RecommendMeMapped {
  summaryId: number;
  categories: CategoryInfo[];
  products: ProductProps[];
}

const mapRecommendMe = (data: RecommendMeResponse): RecommendMeMapped => {
  const categories = new Map<number, CategoryInfo>();
  const products: ProductProps[] = [];

  data.items.forEach((item: RecommendMeResponse['items'][number]) => {
    const categoryId = item.categoryId;
    const category = getCategoryInfo(categoryId);
    categories.set(category.id, category);

    products.push({
      productId: item.productId,
      name: item.name,
      desc: null,
      categoryId,
      content: null,
      score: item.score ?? null,
      rankNo: item.rankNo ?? null,
      link: item.link,
      img: item.img,
      price: item.price,
    });
  });

  const sortedCategories = Array.from(categories.values()).sort(
    (a, b) => a.id - b.id,
  );

  return {
    summaryId: data.summaryId,
    categories: sortedCategories,
    products,
  };
};

export const useRecommendMe = () =>
  useQuery<RecommendMeResponse, Error, RecommendMeMapped>({
    queryKey: queryKeys.recommend.me(),
    queryFn: fetchRecommendMe,
    select: mapRecommendMe,
  });
