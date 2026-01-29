'use client';

import { RetryButton } from '@/components/retry-button';

type StatusAction = {
  label: string;
  onClick: () => void;
};

type StatusBaseProps = {
  title: string;
  description?: string;
  action?: StatusAction;
  icon?: React.ReactNode;
};

type LoadingStateProps = StatusBaseProps & {
  indicator?: React.ReactNode;
};

export const LoadingState = ({ title, description, icon, indicator }: LoadingStateProps) => {
  return (
    <div
      className="flex min-h-[240px] flex-col items-center justify-center gap-2 px-4 text-center"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      {icon && <div className="mb-2">{icon}</div>}
      {indicator ?? (
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
      )}
      <p className="text-base font-semibold text-gray-800">{title}</p>
      {description && <p className="text-sm text-gray-500">{description}</p>}
    </div>
  );
};

export const EmptyState = ({ title, description, action, icon }: StatusBaseProps) => {
  return (
    <div className="flex min-h-[240px] flex-col items-center justify-center gap-2 px-4 text-center">
      {icon && <div className="mb-2">{icon}</div>}
      <p className="text-base font-semibold text-gray-800">{title}</p>
      {description && <p className="text-sm text-gray-500">{description}</p>}
      {action && (
        <button
          type="button"
          className="mt-2 text-sm font-semibold text-primary-600 hover:text-primary-500"
          onClick={action.onClick}
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

export const ErrorState = ({ title, description, action, icon }: StatusBaseProps) => {
  return (
    <div className="flex min-h-[240px] flex-col items-center justify-center gap-2 px-4 text-center">
      {icon && <div className="mb-2">{icon}</div>}
      <p className="text-base font-semibold text-gray-800">{title}</p>
      {description && <p className="text-sm text-gray-500">{description}</p>}
      {action ? (
        <RetryButton onClick={action.onClick} />
      ) : (
        <RetryButton onClick={() => window.location.reload()} />
      )}
    </div>
  );
};
