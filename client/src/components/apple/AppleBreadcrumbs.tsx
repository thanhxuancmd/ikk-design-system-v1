import { ReactNode } from 'react';
import { IoChevronForwardOutline } from 'react-icons/io5';
import { designTokens } from '@/constants/design-tokens';

interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface AppleBreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: ReactNode;
}

export function AppleBreadcrumbs({ 
  items, 
  separator = <IoChevronForwardOutline className="w-4 h-4" /> 
}: AppleBreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 flex-wrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isClickable = !isLast && (item.href || item.onClick);

          return (
            <li key={index} className="flex items-center gap-2">
              {isClickable ? (
                <button
                  onClick={item.onClick}
                  data-testid={`breadcrumb-${index}`}
                  className={`
                    text-sm text-[#ff0086] hover:text-[#e60078] 
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff0086] focus-visible:ring-offset-2 
                    ${designTokens.transitions.base} 
                    max-w-[200px] truncate
                  `}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </button>
              ) : (
                <span
                  data-testid={`breadcrumb-${index}`}
                  className={`
                    text-sm ${isLast ? 'text-gray-900 font-medium' : 'text-gray-600'}
                    max-w-[200px] truncate
                  `}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
              
              {!isLast && (
                <span className="text-gray-400 flex items-center" aria-hidden="true">
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
