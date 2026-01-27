import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toggleSummaryBookmark } from '@/lib/auth/SummaryBookmark';

export function useToggleBookmark(summaryId: number, userId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => toggleSummaryBookmark(summaryId),
    onSuccess: () => {
      // 🔥 북마크 페이지 & 상세 페이지 캐시 동기화
      queryClient.invalidateQueries({
        queryKey: ['summaries', 'bookmarks', userId],
      });
      queryClient.invalidateQueries({
        queryKey: ['summary', summaryId],
      });
    },
  });
}
