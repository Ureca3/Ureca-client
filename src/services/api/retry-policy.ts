import { normalizeError } from './errors';

export function shouldRetry(failureCount: number, error: unknown, maxRetries: number): boolean {
  if (failureCount >= maxRetries) return false;

  const appError = normalizeError(error);
  if (appError.isNetwork) return true;
  return typeof appError.status === 'number' && appError.status >= 500;
}
