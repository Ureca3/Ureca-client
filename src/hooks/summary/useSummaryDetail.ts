import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/services/api/client';
import type { ApiSummaryDetail } from '@/types/summary/summary';

export const useSummaryDetail = (summaryId: number) => {
  return useQuery<ApiSummaryDetail>({
    queryKey: ['summary', summaryId],
    queryFn: async () => {
      const res = await apiClient.get(`/api/summaries/${summaryId}`);

      console.log('summary detail raw response:', res.data);

      return res.data;
    },
    enabled: Number.isFinite(summaryId),
  });
};
