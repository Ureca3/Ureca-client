import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/lib/queryKeys';
import { apiClient } from '@/services/api/client';
import type { ApiSummaryDetail } from '@/types/summary/summary';

export const useSummaryDetail = (summaryId: number) => {
  return useQuery<ApiSummaryDetail>({
    queryKey: queryKeys.summaries.detail(summaryId),
    queryFn: async () => {
      const res = await apiClient.get(`/api/summaries/${summaryId}`);

      return res.data;
    },
    enabled: Number.isFinite(summaryId),
  });
};
