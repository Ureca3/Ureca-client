import { useQuery } from '@tanstack/react-query';

import type { SummaryStatus } from '@/components/summary/SummaryNavigateCard';
import { queryKeys } from '@/lib/queryKeys';
import { apiClient } from '@/services/api/client';
import type { ApiSummaryItem } from '@/types/summary/summary';
import { mapSummaryStatus } from '@/utils/map/summary/mapSummaryStatus';

export interface BookmarkedSummaryListItem {
  id: number;
  title?: string;
  status: SummaryStatus;
  keywords: string[];
  createdAt?: string;
}

export const useBookmarkedSummaryList = (userId?: number) => {
  return useQuery<BookmarkedSummaryListItem[]>({
    queryKey: queryKeys.summaries.bookmarks(userId),
    enabled: Number.isFinite(userId),
    queryFn: async () => {
      const res = await apiClient.get('/api/summaries/bookmarks', {
        params: { userId },
      });

      const list: ApiSummaryItem[] = Array.isArray(res.data) ? res.data : res.data.data;

      return list.map((item) => ({
        id: item.summaryId,
        title: item.title,
        status: mapSummaryStatus(item.status),
        keywords: (() => {
          if (Array.isArray(item.keywords)) return item.keywords;
          if (typeof item.keywords === 'string') {
            try {
              const parsed = JSON.parse(item.keywords);
              return Array.isArray(parsed) ? parsed : [item.keywords];
            } catch {
              return [item.keywords];
            }
          }
          return [];
        })(),
        createdAt: item.createdAt,
      }));
    },
  });
};
