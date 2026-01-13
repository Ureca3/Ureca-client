'use client';
import type { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'solid' | 'outline' | 'text';
type ButtonTone = 'primary' | 'secondary' | 'error';
type ButtonSize = 'm' | 'l';

const variantStyle: Record<ButtonVariant, string> = {
  solid: 'border-transparent',
  outline: 'bg-transparent border-current',
  text: 'bg-transparent border-transparent',
};

const toneStyle: Record<ButtonVariant, Record<ButtonTone, string>> = {
  solid: {
    primary: 'text-white bg-black hover:bg-black/90',
    secondary: 'text-black bg-gray-100 hover:bg-gray-200',
    error: 'text-white bg-red-600 hover:bg-red-700',
  },
  outline: {
    primary: 'text-black border-black hover:bg-black/5',
    secondary: 'text-gray-700 border-gray-300 hover:bg-gray-100',
    error: 'text-red-600 border-red-600 hover:bg-red-50',
  },
  text: {
    primary: 'text-black hover:bg-black/5',
    secondary: 'text-gray-600 hover:bg-gray-100',
    error: 'text-red-600 hover:bg-red-50',
  },
};

const sizeStyle: Record<ButtonSize, string> = {
  m: 'px-4 py-2 text-sm',
  l: 'px-4 py-2 text-base',
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
  tone: ButtonTone;
  size: ButtonSize;
  children: React.ReactNode;
  loading?: boolean;
}

export const Button = ({
  variant,
  tone,
  size,
  children,
  className,
  type = 'button',
  disabled = false,
  loading = false,
  ...rest
}: Props) => {
  const isDisabled = disabled || loading;

  const buttonStyle = [
    'inline-flex items-center justify-center rounded-md border transition-colors',
    'disabled:cursor-not-allowed disabled:opacity-50',
    variantStyle[variant],
    toneStyle[variant][tone],
    sizeStyle[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} className={buttonStyle} disabled={isDisabled} aria-busy={loading} {...rest}>
      {children}
    </button>
  );
};
