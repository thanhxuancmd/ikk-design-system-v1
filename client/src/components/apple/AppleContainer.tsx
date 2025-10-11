import { ReactNode } from 'react';

interface AppleContainerProps {
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: boolean;
  center?: boolean;
  className?: string;
}

const maxWidthClasses = {
  sm: 'max-w-[640px]',
  md: 'max-w-[768px]',
  lg: 'max-w-[1024px]',
  xl: 'max-w-[1280px]',
  '2xl': 'max-w-[1536px]',
  full: 'max-w-full',
};

export function AppleContainer({
  children,
  maxWidth = 'lg',
  padding = true,
  center = true,
  className = '',
}: AppleContainerProps) {
  const maxWidthClass = maxWidthClasses[maxWidth];
  const paddingClass = padding ? 'px-4' : '';
  const centerClass = center ? 'mx-auto' : '';

  return (
    <div
      data-testid={`container-${maxWidth}`}
      className={`${maxWidthClass} ${paddingClass} ${centerClass} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
