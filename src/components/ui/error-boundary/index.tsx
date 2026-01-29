'use client';

import React from 'react';

import { ErrorState } from '@/components/ui/status';
import { normalizeError } from '@/services/api/errors';

type ErrorBoundaryProps = {
  children: React.ReactNode;
  fallback?: (error: Error, reset: () => void) => React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    console.error('[ErrorBoundary]', error);
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (!this.state.hasError || !this.state.error) return this.props.children;

    if (this.props.fallback) {
      return this.props.fallback(this.state.error, this.reset);
    }

    const appError = normalizeError(this.state.error);
    const statusLabel = appError.status ? `(${appError.status})` : '';

    return (
      <ErrorState
        title="문제가 발생했어요."
        description={`${appError.message} ${statusLabel}`.trim()}
        action={{ label: '다시 시도', onClick: this.reset }}
      />
    );
  }
}
