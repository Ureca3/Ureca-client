export const queryKeys = {
  summaries: {
    list: (userId?: number) => ['summaries', 'list', userId] as const,
    bookmarks: (userId?: number) => ['summaries', 'bookmarks', userId] as const,
    detail: (summaryId: number) => ['summary', summaryId] as const,
  },
};
