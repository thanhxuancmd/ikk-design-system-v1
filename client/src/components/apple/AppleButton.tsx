import { ButtonHTMLAttributes, ReactNode } from 'react';
import { designTokens, ButtonSize, ButtonVariant } from '@/constants/design-tokens';

interface AppleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
  /** Show loading spinner and disable button */
  loading?: boolean;
  /** Icon to display before children */
  icon?: ReactNode;
}

export function AppleButton({
  size = 'md',
  variant = 'primary',
  children,
  className = '',
  loading = false,
  icon,
  disabled,
  ...buttonProps
}: AppleButtonProps) {
  const sizeClass = designTokens.button.sizes[size];
  const variantClass = designTokens.button.variants[variant];
  const baseClass = designTokens.button.base;

  return (
    <button
      className={`${baseClass} ${sizeClass} ${variantClass} ${className} ${loading || disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
      disabled={loading || disabled}
      {...buttonProps}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 inline-block"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {!loading && icon && <span className="mr-2 inline-block">{icon}</span>}
      {children}
    </button>
  );
}
