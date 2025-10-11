import { ReactNode } from 'react';
import { designTokens } from '@/constants/design-tokens';

interface AppleStackProps {
  children: ReactNode;
  direction?: 'horizontal' | 'vertical';
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  wrap?: boolean;
  className?: string;
}

const spacingClasses = {
  xs: 'gap-2',
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
  xl: 'gap-12',
};

const alignClasses = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
};

const justifyClasses = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
};

export function AppleStack({
  children,
  direction = 'vertical',
  spacing = 'md',
  align = 'stretch',
  justify = 'start',
  wrap = false,
  className = '',
}: AppleStackProps) {
  const directionClass = direction === 'horizontal' ? 'flex-row' : 'flex-col';
  const spacingClass = spacingClasses[spacing];
  const alignClass = alignClasses[align];
  const justifyClass = justifyClasses[justify];
  const wrapClass = wrap ? 'flex-wrap' : '';

  return (
    <div
      data-testid={`stack-${direction}`}
      className={`flex ${directionClass} ${spacingClass} ${alignClass} ${justifyClass} ${wrapClass} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
