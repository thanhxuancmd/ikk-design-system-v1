import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { designTokens } from '@/constants/design-tokens';

interface ApplePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  maxVisible?: number;
}

export function ApplePagination({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = false,
  maxVisible = 5
}: ApplePaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const leftSiblingIndex = Math.max(currentPage - 1, 1);
      const rightSiblingIndex = Math.min(currentPage + 1, totalPages);
      
      const shouldShowLeftDots = leftSiblingIndex > 2;
      const shouldShowRightDots = rightSiblingIndex < totalPages - 1;
      
      if (!shouldShowLeftDots && shouldShowRightDots) {
        const leftItemCount = 3;
        for (let i = 1; i <= leftItemCount; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (shouldShowLeftDots && !shouldShowRightDots) {
        pages.push(1);
        pages.push('...');
        const rightItemCount = 3;
        for (let i = totalPages - rightItemCount + 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else if (shouldShowLeftDots && shouldShowRightDots) {
        pages.push(1);
        pages.push('...');
        for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const buttonBaseClass = `
    px-3 py-2 text-sm font-medium ${designTokens.borderRadius.md}
    focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff0086] focus-visible:ring-offset-2
    ${designTokens.transitions.base}
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const pageButtonClass = (isActive: boolean) => `
    ${buttonBaseClass}
    ${isActive 
      ? 'bg-[#ff0086] text-white' 
      : 'text-gray-700 hover:bg-gray-100'
    }
  `;

  const navButtonClass = `
    ${buttonBaseClass}
    text-gray-700 hover:bg-gray-100
    disabled:hover:bg-transparent
  `;

  return (
    <nav aria-label="Pagination" className="flex items-center gap-1">
      {showFirstLast && (
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          data-testid="pagination-first"
          className={navButtonClass}
          aria-label="Go to first page"
        >
          <ChevronsLeft className="w-5 h-5" />
        </button>
      )}
      
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        data-testid="pagination-prev"
        className={navButtonClass}
        aria-label="Go to previous page"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {getPageNumbers().map((page, index) => {
        if (page === '...') {
          return (
            <span 
              key={`ellipsis-${index}`} 
              className="px-3 py-2 text-gray-400"
              aria-hidden="true"
            >
              ...
            </span>
          );
        }

        const pageNumber = page as number;
        const isActive = pageNumber === currentPage;

        return (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            data-testid={`pagination-page-${pageNumber}`}
            className={pageButtonClass(isActive)}
            aria-label={`Go to page ${pageNumber}`}
            aria-current={isActive ? 'page' : undefined}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        data-testid="pagination-next"
        className={navButtonClass}
        aria-label="Go to next page"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {showFirstLast && (
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          data-testid="pagination-last"
          className={navButtonClass}
          aria-label="Go to last page"
        >
          <ChevronsRight className="w-5 h-5" />
        </button>
      )}
    </nav>
  );
}
