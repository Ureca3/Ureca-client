import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/lib/queryKeys';
import { apiClient } from '@/services/api/client';

export function useToggleBookmark(params: { summaryId: number; userId?: number }) {
  const { summaryId, userId } = params;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await apiClient.patch(`/api/summaries/${summaryId}/bookmark`);
    },
    onSuccess: async () => {
      if (Number.isFinite(userId)) {
        await queryClient.invalidateQueries({ queryKey: queryKeys.summaries.list(userId) });
        await queryClient.invalidateQueries({ queryKey: queryKeys.summaries.bookmarks(userId) });
      } else {
        await queryClient.invalidateQueries({
          predicate: (q) => q.queryKey[0] === 'summaries' && q.queryKey[1] === 'list',
        });
        await queryClient.invalidateQueries({
          predicate: (q) => q.queryKey[0] === 'summaries' && q.queryKey[1] === 'bookmarks',
        });
      }

      await queryClient.invalidateQueries({ queryKey: queryKeys.summaries.detail(summaryId) });
    },
  });
}
