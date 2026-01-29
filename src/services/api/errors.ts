import axios from 'axios';

export type AppError = {
  message: string;
  status?: number;
  code?: string;
  isNetwork: boolean;
  raw?: unknown;
};

export function isAppError(error: unknown): error is AppError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as AppError).message === 'string' &&
    'isNetwork' in error &&
    typeof (error as AppError).isNetwork === 'boolean'
  );
}

export function normalizeAxiosError(error: unknown): AppError {
  if (!axios.isAxiosError(error)) {
    return normalizeError(error);
  }

  const status = error.response?.status;
  const data = error.response?.data as { message?: string; code?: string } | undefined;
  const message =
    data?.message ||
    error.message ||
    (status ? `Request failed with status ${status}` : 'Network error');

  return {
    message,
    status,
    code: data?.code,
    isNetwork: !error.response,
    raw: error,
  };
}

export function normalizeError(error: unknown): AppError {
  if (isAppError(error)) return error;
  if (axios.isAxiosError(error)) return normalizeAxiosError(error);
  if (error instanceof Error) {
    return { message: error.message, isNetwork: false, raw: error };
  }
  return { message: 'Unknown error', isNetwork: false, raw: error };
}
