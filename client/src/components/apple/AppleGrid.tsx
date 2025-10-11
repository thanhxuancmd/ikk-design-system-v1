import { ReactNode } from 'react';
import { designTokens } from '@/constants/design-tokens';

interface AppleGridProps {
  children: ReactNode;
  cols?: number | { sm?: number; md?: number; lg?: number; xl?: number };
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const gapClasses = {
  xs: 'gap-2',
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
  xl: 'gap-12',
};

export function AppleGrid({
  children,
  cols = 1,
  gap = 'md',
  className = '',
}: AppleGridProps) {
  const gapClass = gapClasses[gap];

  let colsClass = '';
  let testId = '';

  if (typeof cols === 'number') {
    colsClass = `grid-cols-1 md:grid-cols-${cols}`;
    testId = `grid-cols-${cols}`;
  } else {
    const responsiveCols = [];
    if (cols.sm) responsiveCols.push(`sm:grid-cols-${cols.sm}`);
    if (cols.md) responsiveCols.push(`md:grid-cols-${cols.md}`);
    if (cols.lg) responsiveCols.push(`lg:grid-cols-${cols.lg}`);
    if (cols.xl) responsiveCols.push(`xl:grid-cols-${cols.xl}`);
    
    colsClass = `grid-cols-1 ${responsiveCols.join(' ')}`;
    testId = `grid-cols-${JSON.stringify(cols)}`;
  }

  return (
    <div
      data-testid={testId}
      className={`grid ${colsClass} ${gapClass} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
