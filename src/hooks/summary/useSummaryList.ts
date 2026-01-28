import { skipToken, useQuery } from '@tanstack/react-query';

import type { SummaryStatus } from '@/components/summary/SummaryNavigateCard';
import { apiClient } from '@/services/api/client';
import type { ApiSummaryItem } from '@/types/summary/summary';
import { mapSummaryStatus } from '@/utils/map/summary/mapSummaryStatus';

export interface SummaryListItem {
  id: number;
  title?: string;
  status: SummaryStatus;
  keywords: string[];
  createdAt?: string;
}

export const useSummaryList = (userId?: number) => {
  return useQuery<SummaryListItem[]>({
    queryKey: ['summaries', 'list', userId],
    enabled: Number.isFinite(userId),
    queryFn: async () => {
      const res = await apiClient.get('/api/summaries', {
        params: { userId },
      });

            const list: ApiSummaryItem[] = Array.isArray(res.data) ? res.data : res.data.data;

            return list.map((item) => ({
              id: item.summaryId,
              title: item.title,
              status: mapSummaryStatus(item.status),
              keywords:
                typeof item.keywords === 'string'
                  ? JSON.parse(item.keywords)
                  : (item.keywords ?? []),
              createdAt: item.createdAt,
            }));
          }
        : skipToken,
  });
};
