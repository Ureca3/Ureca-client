import type { SummaryStatus } from '@/components/summary/summary-navigate-card';
export const mapSummaryStatus = (status?: string): SummaryStatus => {
  switch (status) {
    case 'SUCCESS':
    case 'DONE':
    case 'COMPLETED':
      return 'SUCCESS';

    case 'FAIL':
    case 'ERROR':
      return 'FAIL';

    case 'LOADING':
    case 'PROCESSING':
    default:
      return 'LOADING';
  }
};
