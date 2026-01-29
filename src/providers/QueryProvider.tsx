'use client';

import { isServer, MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { normalizeError } from '@/services/api/errors';
import { shouldRetry } from '@/services/api/retry-policy';

function makeQueryClient() {
  return new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        const appError = normalizeError(error);
        if ((appError.status === 401 || appError.status === 403) && typeof window !== 'undefined') {
          window.location.assign('/login');
        }
      },
    }),
    mutationCache: new MutationCache({
      onError: (error) => {
        const appError = normalizeError(error);
        if ((appError.status === 401 || appError.status === 403) && typeof window !== 'undefined') {
          window.location.assign('/login');
        }
      },
    }),
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        retry: (failureCount, error) => shouldRetry(failureCount, error, 2),
      },
      mutations: {
        retry: (failureCount, error) => shouldRetry(failureCount, error, 1),
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  }

  // Browser: make a new query client if we don't already have one
  // This is very important, so we don't re-make a new client if React
  // suspends during the initial render. This may not be needed if we
  // have a suspense boundary BELOW the creation of the query client
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient();
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
