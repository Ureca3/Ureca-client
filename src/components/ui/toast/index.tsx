'use client';

import { useEffect, useMemo } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toastActions } from '@/store/slices/ToastSlice';

const TOAST_DURATION_MS = 2000;

export const Toast = () => {
  const dispatch = useAppDispatch();
  const { open, text, variant, seq } = useAppSelector((s) => s.toast);

  const variantStyle = useMemo(() => {
    switch (variant) {
      case 'success':
        return 'bg-gray text-white';
      case 'error':
        return 'bg-danger-500 text-white';
      default:
        return 'bg-gray text-white';
    }
  }, [variant]);

  useEffect(() => {
    if (!open) return;

    const t = window.setTimeout(() => {
      dispatch(toastActions.hide());
    }, TOAST_DURATION_MS);

    return () => window.clearTimeout(t);
  }, [open, seq, dispatch]);

  if (!open) return null;

  return (
    <div className="z-tooltip fixed inset-x-0 bottom-4 px-4">
      <div
        role="status"
        aria-live="polite"
        className={[
          'mx-auto w-full',
          'shadow-dim w-full rounded-sm px-4 py-2',
          'duration-normal ease-standard transition-all',
          variantStyle,
        ].join(' ')}
      >
        <span className="text-sm">{text}</span>
      </div>
    </div>
  );
};
