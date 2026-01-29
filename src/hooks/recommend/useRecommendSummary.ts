import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/lib/queryKeys';
import type { RecommendSummaryResponse } from '@/services/recommend/recommendApi';
import { fetchRecommendSummary } from '@/services/recommend/recommendApi';
import type { ProductProps } from '@/types/product/dto';
import type { CategoryInfo } from '@/types/product/mapper';
import { getCategoryInfo } from '@/types/product/mapper';

export interface RecommendSummaryMapped {
  summaryId: number;
  categories: CategoryInfo[];
  products: ProductProps[];
}

const mapRecommendSummary = (data: RecommendSummaryResponse): RecommendSummaryMapped => {
  const categories = new Map<number, CategoryInfo>();
  const products: ProductProps[] = [];

  data.items.forEach((item) => {
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

  const sortedCategories = Array.from(categories.values()).sort((a, b) => a.id - b.id);

  return {
    summaryId: data.summaryId,
    categories: sortedCategories,
    products,
  };
};

export const useRecommendSummary = (summaryId: number) =>
  useQuery<RecommendSummaryResponse, Error, RecommendSummaryMapped>({
    queryKey: queryKeys.recommend.summary(summaryId),
    queryFn: () => fetchRecommendSummary(summaryId),
    select: mapRecommendSummary,
    enabled: Number.isFinite(summaryId) && summaryId > 0,
  });
