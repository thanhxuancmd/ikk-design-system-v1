import { ReactNode } from 'react';
import { designTokens, BadgeSize, BadgeVariant } from '@/constants/design-tokens';

interface AppleBadgeProps {
  size?: BadgeSize;
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

export function AppleBadge({
  size = 'md',
  variant = 'default',
  children,
  className = '',
}: AppleBadgeProps) {
  const sizeClass = designTokens.badge.sizes[size];
  const variantClass = designTokens.badge.variants[variant];
  const baseClass = designTokens.badge.base;

  return (
    <span className={`${baseClass} ${sizeClass} ${variantClass} ${className}`}>
      {children}
    </span>
  );
}
