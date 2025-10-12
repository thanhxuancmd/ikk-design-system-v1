import { ReactNode, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { designTokens } from '@/constants/design-tokens';
import { AppleButton } from './AppleButton';

export interface BulkAction {
  id: string;
  label: string;
  icon: ReactNode;
  onClick: (selectedIds: string[]) => void;
  variant?: 'default' | 'danger';
  disabled?: boolean;
}

export interface BulkActionToolbarProps {
  selectedCount: number;
  totalCount: number;
  selectedIds: string[];
  actions: BulkAction[];
  onSelectAll?: () => void;
  onDeselectAll?: () => void;
  onClose: () => void;
  allSelected?: boolean;
  className?: string;
}

export function BulkActionToolbar({
  selectedCount,
  totalCount,
  selectedIds,
  actions,
  onSelectAll,
  onDeselectAll,
  onClose,
  allSelected = false,
  className = ''
}: BulkActionToolbarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (selectedCount > 0) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      setTimeout(() => setIsVisible(false), 200);
    }
  }, [selectedCount]);

  const handleCheckboxChange = () => {
    if (allSelected || selectedCount === totalCount) {
      onDeselectAll?.();
    } else {
      onSelectAll?.();
    }
  };

  const isIndeterminate = selectedCount > 0 && selectedCount < totalCount;

  if (!isVisible) return null;

  return (
    <div
      className={`
        sticky top-0 bg-white border-b border-gray-200 shadow-md
        ${designTokens.transitions.base}
        transform
        ${isAnimating ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
        ${className}
      `}
      style={{ zIndex: designTokens.zIndex.sticky }}
      data-testid="bulk-action-toolbar"
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {(onSelectAll || onDeselectAll) && (
              <label className="flex items-center gap-2 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={allSelected || selectedCount === totalCount}
                    onChange={handleCheckboxChange}
                    className="sr-only peer"
                    data-testid="checkbox-select-all"
                  />
                  <div
                    className={`
                      w-5 h-5 ${designTokens.borderRadius.sm}
                      border-2 border-gray-300
                      ${designTokens.transitions.base}
                      peer-checked:bg-[#ff0086] peer-checked:border-[#ff0086]
                      peer-focus:ring-2 peer-focus:ring-[#ff0086] peer-focus:ring-offset-1
                      flex items-center justify-center
                    `}
                  >
                    {isIndeterminate ? (
                      <div className="w-2.5 h-0.5 bg-[#ff0086]" />
                    ) : (selectedCount === totalCount || allSelected) ? (
                      <X className="w-3.5 h-3.5 text-white rotate-45" strokeWidth={3} />
                    ) : null}
                  </div>
                </div>
                <span className={`${designTokens.typography.small} text-gray-700`}>
                  Chọn tất cả
                </span>
              </label>
            )}

            <span 
              className={`${designTokens.typography.small} font-medium text-gray-900`}
              data-testid="text-selected-count"
            >
              {allSelected || selectedCount === totalCount
                ? `Tất cả ${totalCount} mục đã chọn`
                : `${selectedCount} mục đã chọn`}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {actions.map((action) => (
              <AppleButton
                key={action.id}
                variant={action.variant === 'danger' ? 'secondary' : 'secondary'}
                size="sm"
                onClick={() => action.onClick(selectedIds)}
                disabled={action.disabled}
                className={
                  action.variant === 'danger'
                    ? '!text-red-600 hover:!bg-red-50 hover:!text-red-700'
                    : ''
                }
                data-testid={`button-bulk-action-${action.id}`}
              >
                <span className="flex items-center gap-2">
                  {action.icon}
                  <span>{action.label}</span>
                </span>
              </AppleButton>
            ))}

            <button
              onClick={onClose}
              className={`
                p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100
                ${designTokens.transitions.base}
                focus:outline-none focus:ring-2 focus:ring-[#ff0086] focus:ring-offset-1
              `}
              aria-label="Close toolbar"
              data-testid="button-close-toolbar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
