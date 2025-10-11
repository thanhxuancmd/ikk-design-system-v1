import { ReactNode } from 'react';
import { designTokens } from '@/constants/design-tokens';

interface AppleCardProps {
  children: ReactNode;
  variant?: 'elevated' | 'outlined' | 'filled';
  hoverable?: boolean;
  onClick?: () => void;
  className?: string;
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

interface CardBodyProps {
  children: ReactNode;
}

interface CardFooterProps {
  children: ReactNode;
}

interface CardImageProps {
  src: string;
  alt: string;
  height?: string;
}

function AppleCardRoot({
  children,
  variant = 'elevated',
  hoverable = false,
  onClick,
  className = '',
}: AppleCardProps) {
  const variantClasses = {
    elevated: `${designTokens.shadows.md} bg-white`,
    outlined: 'border border-gray-200 bg-white',
    filled: 'bg-gray-50',
  };

  return (
    <article
      data-testid={`card-${variant}`}
      className={`
        ${designTokens.borderRadius.md}
        ${variantClasses[variant]}
        ${hoverable ? `hover:${designTokens.shadows.xl}` : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${designTokens.transitions.base}
        overflow-hidden
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </article>
  );
}

function CardHeader({ title, subtitle, actions }: CardHeaderProps) {
  return (
    <div data-testid="card-header" className="px-6 py-4 border-b border-gray-200">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        {actions && <div className="ml-4">{actions}</div>}
      </div>
    </div>
  );
}

function CardBody({ children }: CardBodyProps) {
  return (
    <div data-testid="card-body" className="px-6 py-4">
      {children}
    </div>
  );
}

function CardFooter({ children }: CardFooterProps) {
  return (
    <div data-testid="card-footer" className="px-6 py-4 border-t border-gray-200 bg-gray-50">
      {children}
    </div>
  );
}

function CardImage({ src, alt, height = '200px' }: CardImageProps) {
  return (
    <div className="w-full overflow-hidden" style={{ height }}>
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
}

export const AppleCard = Object.assign(AppleCardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
  Image: CardImage,
});
