import { apiClient } from '@/services/api/client';
import type { ApiSummaryItem } from '@/types/summary/summary';

export function getBookmarkedSummaries(userId: number) {
  return apiClient.get<ApiSummaryItem[]>('/api/summaries/bookmarks', {
    params: { userId },
    withCredentials: true,
  });
}

export function toggleSummaryBookmark(summaryId: number) {
  return apiClient.patch(`/api/summaries/${summaryId}/bookmark`, null, { withCredentials: true });
}
