import type { CategoryId, CategoryKey } from './dto';
import { categoryById } from './dto';

export const categoryMapper: Record<
  CategoryKey,
  { label: string; isPlan: boolean; isMonthly: boolean }
> = {
  PHONE: { label: '핸드폰', isPlan: false, isMonthly: true },
  RATE_PLAN: { label: '요금제', isPlan: true, isMonthly: true },
  ROAMING: { label: '로밍', isPlan: true, isMonthly: false },
  SMART_DEVICE: { label: '스마트기기', isPlan: false, isMonthly: true },
};

export type CategoryInfo = {
  id: CategoryId;
  key: CategoryKey;
  label: string;
};

export const getCategoryInfo = (categoryId: CategoryId): CategoryInfo => {
  const key = categoryById[categoryId];
  const meta = categoryMapper[key];
  return { id: categoryId, key, ...meta };
};
