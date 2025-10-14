import { ReactNode, useEffect, useRef, useState } from 'react';
import { IoChevronBackOutline } from 'react-icons/io5';
import { useIsMobile } from '@/hooks/use-mobile';
import { designTokens } from '@/constants/design-tokens';
import { cn } from '@/lib/utils';
import { AppleDrawer } from './AppleDrawer';
import { AppleSearchBar } from './AppleSearchBar';
import { AppleSkeleton } from './AppleSkeleton';
import { EmptyState } from './EmptyState';

export interface AppleListDetailShellProps<T = any> {
  // Data
  items: T[];
  selectedId?: string | number;
  onSelect: (item: T) => void;
  
  // Render functions
  renderListItem: (item: T, isSelected: boolean) => ReactNode;
  renderDetail: (item: T | null) => ReactNode;
  
  // Optional customization
  listHeader?: ReactNode;
  detailHeader?: ReactNode;
  emptyState?: ReactNode;
  
  // Search/Filter (optional)
  searchable?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  
  // Layout
  splitRatio?: number; // 0-100, default 30
  
  // States
  isLoading?: boolean;
  isDetailLoading?: boolean;
  
  // i18n
  labels?: {
    searchPlaceholder?: string;
    noItemsText?: string;
    noSelectionText?: string;
    backButton?: string; // Mobile back from detail
    closeButton?: string;
  };
  
  // Accessibility
  listAriaLabel?: string;
  detailAriaLabel?: string;
  
  // Styling
  className?: string;
}

const defaultLabels = {
  searchPlaceholder: "Tìm kiếm...",
  noItemsText: "Không có mục nào",
  noSelectionText: "Chọn một mục để xem chi tiết",
  backButton: "Quay lại",
  closeButton: "Đóng"
};

export function AppleListDetailShell<T extends { id: string | number }>({
  items,
  selectedId,
  onSelect,
  renderListItem,
  renderDetail,
  listHeader,
  detailHeader,
  emptyState,
  searchable = false,
  searchValue = '',
  onSearchChange,
  splitRatio = 30,
  isLoading = false,
  isDetailLoading = false,
  labels,
  listAriaLabel = "Danh sách mục",
  detailAriaLabel = "Chi tiết mục",
  className = '',
}: AppleListDetailShellProps<T>) {
  const isMobile = useIsMobile();
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const selectedItemRef = useRef<HTMLButtonElement>(null);
  
  const mergedLabels = { ...defaultLabels, ...labels };
  
  // Find selected item
  const selectedItem = items.find(item => item.id === selectedId) || null;
  
  // Update selected index when selectedId changes
  useEffect(() => {
    if (selectedId !== undefined) {
      const index = items.findIndex(item => item.id === selectedId);
      setSelectedIndex(index);
      
      // On mobile, open detail drawer when item is selected
      if (isMobile && index >= 0) {
        setIsDetailOpen(true);
      }
    } else {
      setSelectedIndex(-1);
    }
  }, [selectedId, items, isMobile]);
  
  // Auto-scroll selected item into view
  useEffect(() => {
    if (selectedItemRef.current && selectedIndex >= 0) {
      selectedItemRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [selectedIndex]);
  
  // Handle item selection
  const handleSelectItem = (item: T, index: number) => {
    setSelectedIndex(index);
    onSelect(item);
  };
  
  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, item: T, index: number) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (index < items.length - 1) {
          const nextItem = items[index + 1];
          handleSelectItem(nextItem, index + 1);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (index > 0) {
          const prevItem = items[index - 1];
          handleSelectItem(prevItem, index - 1);
        }
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        handleSelectItem(item, index);
        break;
      case 'Escape':
        if (isMobile) {
          e.preventDefault();
          setIsDetailOpen(false);
        }
        break;
    }
  };
  
  // Handle search with noop if not provided
  const handleSearch = (query: string) => {
    if (onSearchChange) {
      onSearchChange(query);
    }
  };
  
  // Close detail drawer on mobile
  const handleCloseDetail = () => {
    setIsDetailOpen(false);
  };
  
  // Render list panel
  const renderListPanel = () => (
    <div
      className="flex flex-col h-full bg-[var(--apple-background)] border-r border-[var(--apple-border)]"
      data-testid="list-panel"
    >
      {/* List Header */}
      {(listHeader || searchable) && (
        <div className="flex-shrink-0 p-4 border-b border-[var(--apple-border)]">
          {listHeader && (
            <div className="mb-3" data-testid="list-header">
              {listHeader}
            </div>
          )}
          {searchable && (
            <AppleSearchBar
              value={searchValue}
              onChange={handleSearch}
              onSearch={handleSearch}
              placeholder={mergedLabels.searchPlaceholder}
              data-testid="list-search"
            />
          )}
        </div>
      )}
      
      {/* List Content */}
      <div
        ref={listRef}
        className="flex-1 overflow-y-auto"
        data-testid="list-content"
      >
        {isLoading ? (
          // Loading skeleton
          <div className="p-2 space-y-2" data-testid="list-loading">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="p-3 space-y-2">
                <AppleSkeleton variant="text" width="60%" />
                <AppleSkeleton variant="text" width="80%" />
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          // Empty state
          emptyState || (
            <EmptyState
              variant="noData"
              title={mergedLabels.noItemsText}
              data-testid="list-empty"
            />
          )
        ) : (
          // List items
          <div
            role="list"
            aria-label={listAriaLabel}
            className="divide-y divide-[var(--apple-border)]"
          >
            {items.map((item, index) => {
              const isSelected = item.id === selectedId;
              return (
                <button
                  key={item.id}
                  ref={isSelected ? selectedItemRef : null}
                  role="listitem"
                  aria-selected={isSelected}
                  onClick={() => handleSelectItem(item, index)}
                  onKeyDown={(e) => handleKeyDown(e, item, index)}
                  data-testid={`list-item-${item.id}`}
                  className={cn(
                    'w-full text-left transition-colors',
                    designTokens.transitions.fast,
                    isSelected
                      ? 'bg-[var(--apple-primary-soft)] border-l-4 border-[var(--apple-primary)]'
                      : 'hover:bg-gray-50 border-l-4 border-transparent',
                    'focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--apple-primary)]'
                  )}
                >
                  {renderListItem(item, isSelected)}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
  
  // Render detail panel
  const renderDetailPanel = () => (
    <div
      className="flex flex-col h-full bg-[var(--apple-background)]"
      data-testid="detail-panel"
    >
      {/* Detail Header */}
      {detailHeader && (
        <div className="flex-shrink-0 p-4 border-b border-[var(--apple-border)]" data-testid="detail-header">
          {detailHeader}
        </div>
      )}
      
      {/* Detail Content */}
      <div
        role="region"
        aria-label={detailAriaLabel}
        className="flex-1 overflow-y-auto"
        data-testid="detail-content"
      >
        {isDetailLoading ? (
          // Detail loading skeleton
          <div className="p-6 space-y-4" data-testid="detail-loading">
            <AppleSkeleton variant="rectangular" height={200} />
            <AppleSkeleton variant="text" width="80%" />
            <AppleSkeleton variant="text" width="60%" />
            <AppleSkeleton variant="text" width="90%" />
          </div>
        ) : selectedItem ? (
          // Detail content
          renderDetail(selectedItem)
        ) : (
          // No selection placeholder
          <EmptyState
            variant="noResults"
            title={mergedLabels.noSelectionText}
            data-testid="detail-empty"
          />
        )}
      </div>
    </div>
  );
  
  // Desktop/Tablet layout (side-by-side)
  if (!isMobile) {
    return (
      <div
        className={cn('flex h-full', className)}
        data-testid="list-detail-shell"
      >
        {/* List Panel */}
        <div
          style={{ width: `${splitRatio}%` }}
          className="flex-shrink-0"
        >
          {renderListPanel()}
        </div>
        
        {/* Detail Panel */}
        <div
          style={{ width: `${100 - splitRatio}%` }}
          className="flex-1"
        >
          {renderDetailPanel()}
        </div>
      </div>
    );
  }
  
  // Mobile layout (stacked with drawer)
  return (
    <div
      className={cn('flex flex-col h-full', className)}
      data-testid="list-detail-shell-mobile"
    >
      {/* List Panel (always visible on mobile) */}
      <div className="flex-1">
        {renderListPanel()}
      </div>
      
      {/* Detail Drawer (opens when item selected) */}
      <AppleDrawer
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        position="bottom"
        title={mergedLabels.closeButton}
        closeButton
      >
        <div className="min-h-[60vh]">
          {/* Mobile back button */}
          <button
            onClick={handleCloseDetail}
            data-testid="detail-back-button"
            className={cn(
              'flex items-center gap-2 mb-4 text-[var(--apple-primary)]',
              designTokens.transitions.fast,
              'hover:opacity-80'
            )}
          >
            <IoChevronBackOutline className="w-5 h-5" />
            <span className="font-medium">{mergedLabels.backButton}</span>
          </button>
          
          {/* Detail content */}
          {renderDetailPanel()}
        </div>
      </AppleDrawer>
    </div>
  );
}
