export type ApiSummaryStatus = 'LOADING' | 'SUCCESS' | 'FAIL';

export interface ApiSummaryItem {
  summaryId: number;
  title?: string;
  status: ApiSummaryStatus;
  badges?: string[];
}

export interface ApiSummaryDetail {
  summaryId: number;
  title: string;
  subject: string;
  keywords: string[];
  points: string[];
  status: ApiSummaryStatus;
  isBookmarked: boolean;
  createdAt: string;
}
