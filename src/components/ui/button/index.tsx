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
    primary: 'text-white bg-primary-500 hover:bg-primary-300',
    secondary: 'text-white bg-secondary-500 hover:bg-secondary-300',
    error: 'text-white bg-danger-500 hover:bg-danger-300',
  },
  outline: {
    primary: 'hover:bg-gray-light',
    secondary: 'hover:bg-gray-light',
    error: 'border-danger-500 hover:bg-danger-100',
  },
  text: {
    primary: 'text-primary-500 hover:text-primary-300',
    secondary: 'text-secondary-500 hover:text-secondary-300',
    error: 'text-danger-500 hover:text-danger-300',
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
