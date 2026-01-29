export type CategoryId = 1 | 2 | 3 | 4;
export type CategoryKey = 'PHONE' | 'RATE_PLAN' | 'ROAMING' | 'SMART_DEVICE';

export interface ProductProps {
  productId: number;
  desc: string | null;
  name: string;
  categoryId: CategoryId;
  content: string | null;
  score: number | null;
  rankNo: number | null;
  img: string | null;
  price: number | null;
  link: string | null;
}

export const categoryById: Record<CategoryId, CategoryKey> = {
  1: 'PHONE',
  2: 'RATE_PLAN',
  3: 'ROAMING',
  4: 'SMART_DEVICE',
};