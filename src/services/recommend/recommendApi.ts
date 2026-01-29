import { apiClient } from '@/services/api/client';
import type { CategoryId } from '@/types/product/dto';

export interface RecommendItemDto {
  productId: number;
  categoryId: CategoryId;
  score: number;
  rankNo: number;
  name: string;
  price: number | null;
  img: string | null;
  link: string;
}

export interface RecommendMeResponse {
  summaryId: number;
  items: RecommendItemDto[];
}

export interface RecommendSummaryResponse {
  summaryId: number;
  items: RecommendItemDto[];
}

export const fetchRecommendMe = async (): Promise<RecommendMeResponse> => {
  const res = await apiClient.get('/api/v1/recommend/me');
  return res.data;
};

export const fetchRecommendSummary = async (
  summaryId: number,
): Promise<RecommendSummaryResponse> => {
  const res = await apiClient.get(`/api/v1/recommend/${summaryId}`);
  return res.data;
};
