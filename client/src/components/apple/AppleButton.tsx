import { ButtonHTMLAttributes, ReactNode } from 'react';
import { designTokens, ButtonSize, ButtonVariant } from '@/constants/design-tokens';

interface AppleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
}

export function AppleButton({
  size = 'md',
  variant = 'primary',
  children,
  className = '',
  ...buttonProps
}: AppleButtonProps) {
  const sizeClass = designTokens.button.sizes[size];
  const variantClass = designTokens.button.variants[variant];
  const baseClass = designTokens.button.base;

  return (
    <button
      className={`${baseClass} ${sizeClass} ${variantClass} ${className}`}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
