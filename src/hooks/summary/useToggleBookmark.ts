// src/hooks/summary/useToggleBookmark.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/lib/queryKeys';
import { apiClient } from '@/services/api/client';

export function useToggleBookmark(params: { summaryId: number; userId?: number }) {
  const { summaryId, userId } = params;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // 서버에서 토글 처리
      await apiClient.patch(`/api/summaries/${summaryId}/bookmark`);
    },
    onSuccess: async () => {
      // 리스트/북마크/상세 전부 최신화
      if (Number.isFinite(userId)) {
        await queryClient.invalidateQueries({ queryKey: queryKeys.summaries.list(userId) });
        await queryClient.invalidateQueries({ queryKey: queryKeys.summaries.bookmarks(userId) });
      } else {
        // userId 없을 때 안전하게 prefix invalidate
        await queryClient.invalidateQueries({ queryKey: ['summaries', 'list'] });
        await queryClient.invalidateQueries({ queryKey: ['summaries', 'bookmarks'] });
      }

      await queryClient.invalidateQueries({ queryKey: queryKeys.summaries.detail(summaryId) });
    },
  });
}
