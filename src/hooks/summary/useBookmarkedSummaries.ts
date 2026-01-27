import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import { getBookmarkedSummaries } from '@/lib/auth/SummaryBookmark';
import type { ApiSummaryItem } from '@/types/summary/summary';

export function useBookmarkedSummaries(userId: number): UseQueryResult<ApiSummaryItem[]> {
  return useQuery<ApiSummaryItem[]>({
    queryKey: ['summaries', 'bookmarks', userId],
    queryFn: async () => {
      const res = await getBookmarkedSummaries(userId);
      return res.data;
    },
  });
}
