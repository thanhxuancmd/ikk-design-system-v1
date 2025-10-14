import { ReactNode, useEffect, useState } from 'react';
import { IoCloseOutline, IoReloadOutline, IoDownloadOutline, IoCreateOutline } from 'react-icons/io5';
import { designTokens } from '@/constants/design-tokens';
import { AppleButton } from './AppleButton';
import { AppleDialog } from './AppleDialog';
import { AppleDropdown } from './AppleDropdown';

// Vietnamese default labels
const defaultLabels = {
  selectAll: "Chọn tất cả",
  deselectAll: "Bỏ chọn tất cả",
  selected: "đã chọn",
  undo: "Hoàn tác",
  export: "Xuất dữ liệu",
  exportCsv: "Xuất CSV",
  exportExcel: "Xuất Excel",
  exportJson: "Xuất JSON",
  batchEdit: "Chỉnh sửa hàng loạt",
  confirmDelete: "Xác nhận xóa",
  confirmDeleteMessage: "Bạn có chắc chắn muốn xóa {count} mục đã chọn?",
  cancel: "Hủy",
  confirm: "Xác nhận"
};

// Legacy interface for backward compatibility
export interface BulkAction {
  id: string;
  label: string;
  icon: ReactNode;
  onClick: (selectedIds: string[]) => void;
  variant?: 'default' | 'danger';
  disabled?: boolean;
}

// New action interface
export interface ActionItem {
  label: string;
  onClick: () => void;
  variant?: 'default' | 'destructive';
  icon?: ReactNode;
}

export interface BulkActionToolbarProps {
  // Existing props (keep all for backward compatibility)
  selectedCount: number;
  totalCount: number;
  selectedIds?: string[];
  actions?: BulkAction[] | ActionItem[];
  onSelectAll?: () => void;
  onDeselectAll?: () => void;
  onClose?: () => void;
  allSelected?: boolean;
  
  // NEW PROPS: Undo functionality
  onUndo?: () => void;
  canUndo?: boolean;
  undoLabel?: string;
  
  // Export functionality
  onExport?: (format: 'csv' | 'excel' | 'json') => void | Promise<void>;
  exportFormats?: Array<'csv' | 'excel' | 'json'>;
  
  // Batch edit
  onBatchEdit?: () => void;
  batchEditLabel?: string;
  
  // Confirmation for destructive actions
  confirmBeforeDelete?: boolean;
  deleteConfirmTitle?: string;
  deleteConfirmMessage?: string;
  
  // i18n labels
  labels?: {
    selectAll?: string;
    deselectAll?: string;
    selected?: string;
    undo?: string;
    export?: string;
    exportCsv?: string;
    exportExcel?: string;
    exportJson?: string;
    batchEdit?: string;
    confirmDelete?: string;
    confirmDeleteMessage?: string;
    cancel?: string;
    confirm?: string;
  };
  
  className?: string;
}

export function BulkActionToolbar({
  selectedCount,
  totalCount,
  selectedIds = [],
  actions = [],
  onSelectAll,
  onDeselectAll,
  onClose,
  allSelected = false,
  // New props
  onUndo,
  canUndo = false,
  undoLabel,
  onExport,
  exportFormats = ['csv', 'excel', 'json'],
  onBatchEdit,
  batchEditLabel,
  confirmBeforeDelete = false,
  deleteConfirmTitle,
  deleteConfirmMessage,
  labels: customLabels,
  className = ''
}: BulkActionToolbarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingAction, setPendingAction] = useState<any>(null);
  const [exporting, setExporting] = useState(false);

  // Merge custom labels with defaults
  const labels = { ...defaultLabels, ...customLabels };

  useEffect(() => {
    if (selectedCount > 0) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      setTimeout(() => setIsVisible(false), 200);
    }
  }, [selectedCount]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (selectedCount === 0) return;

      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'z':
            if (canUndo && onUndo) {
              e.preventDefault();
              onUndo();
            }
            break;
          case 'a':
            if (onSelectAll) {
              e.preventDefault();
              onSelectAll();
            }
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyboard);
    return () => document.removeEventListener('keydown', handleKeyboard);
  }, [canUndo, onUndo, onSelectAll, selectedCount]);

  const handleCheckboxChange = () => {
    if (allSelected || selectedCount === totalCount) {
      onDeselectAll?.();
    } else {
      onSelectAll?.();
    }
  };

  const handleActionClick = (action: any) => {
    // Check if it's a destructive action and confirmation is enabled
    const isDestructive = action.variant === 'destructive' || action.variant === 'danger';
    
    if (isDestructive && confirmBeforeDelete) {
      setPendingAction(action);
      setShowConfirmDialog(true);
    } else {
      // Execute action based on whether it's legacy or new format
      if ('id' in action && typeof action.onClick === 'function') {
        // Legacy BulkAction format
        action.onClick(selectedIds);
      } else {
        // New ActionItem format
        action.onClick();
      }
    }
  };

  const confirmAction = () => {
    if (pendingAction) {
      // Execute based on action format
      if ('id' in pendingAction && typeof pendingAction.onClick === 'function') {
        pendingAction.onClick(selectedIds);
      } else {
        pendingAction.onClick();
      }
    }
    setShowConfirmDialog(false);
    setPendingAction(null);
  };

  const handleExport = async (format: 'csv' | 'excel' | 'json') => {
    if (!onExport) return;
    
    setExporting(true);
    try {
      await onExport(format);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setExporting(false);
    }
  };

  const isIndeterminate = selectedCount > 0 && selectedCount < totalCount;

  if (!isVisible) return null;

  // Determine dialog title and message
  const dialogTitle = deleteConfirmTitle || labels.confirmDelete;
  const dialogMessage = (deleteConfirmMessage || labels.confirmDeleteMessage).replace(
    '{count}',
    selectedCount.toString()
  );

  return (
    <>
      <div
        role="toolbar"
        aria-label="Bulk actions toolbar"
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
            {/* Left Section */}
            <div className="flex items-center gap-4">
              {(onSelectAll || onDeselectAll) && (
                <label className="flex items-center gap-2 cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={allSelected || selectedCount === totalCount}
                      onChange={handleCheckboxChange}
                      className="sr-only peer"
                      aria-label={allSelected || selectedCount === totalCount ? labels.deselectAll : labels.selectAll}
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
                        <IoCloseOutline className="w-3.5 h-3.5 text-white rotate-45" strokeWidth={3} />
                      ) : null}
                    </div>
                  </div>
                  <span className={`${designTokens.typography.small} text-gray-700`}>
                    {labels.selectAll}
                  </span>
                </label>
              )}

              <span 
                className={`${designTokens.typography.small} font-medium text-gray-900`}
                aria-live="polite"
                aria-atomic="true"
                data-testid="text-selected-count"
              >
                {allSelected || selectedCount === totalCount
                  ? `Tất cả ${totalCount} mục đã chọn`
                  : `${selectedCount} ${labels.selected}`}
              </span>

              {/* Undo Button */}
              {onUndo && (
                <AppleButton
                  size="sm"
                  variant="secondary"
                  onClick={onUndo}
                  disabled={!canUndo}
                  aria-label={undoLabel || labels.undo}
                  data-testid="button-undo"
                >
                  <span className="flex items-center gap-2">
                    <IoReloadOutline className="w-4 h-4" />
                    <span>{undoLabel || labels.undo}</span>
                  </span>
                </AppleButton>
              )}
            </div>

            {/* Right Section - Actions */}
            <div className="flex items-center gap-2">
              {/* Batch Edit */}
              {onBatchEdit && (
                <AppleButton
                  size="sm"
                  variant="secondary"
                  onClick={onBatchEdit}
                  aria-label={batchEditLabel || labels.batchEdit}
                  data-testid="button-batch-edit"
                >
                  <span className="flex items-center gap-2">
                    <IoCreateOutline className="w-4 h-4" />
                    <span>{batchEditLabel || labels.batchEdit}</span>
                  </span>
                </AppleButton>
              )}

              {/* Export Dropdown */}
              {onExport && (
                <AppleDropdown
                  trigger={
                    <AppleButton 
                      size="sm" 
                      variant="secondary"
                      disabled={exporting}
                      aria-label={labels.export}
                      data-testid="dropdown-export"
                    >
                      <span className="flex items-center gap-2">
                        <IoDownloadOutline className="w-4 h-4" />
                        <span>{exporting ? 'Đang xuất...' : labels.export}</span>
                      </span>
                    </AppleButton>
                  }
                  items={exportFormats.map(format => ({
                    label: labels[`export${format.charAt(0).toUpperCase()}${format.slice(1)}` as keyof typeof labels] as string,
                    onClick: () => handleExport(format),
                    icon: <IoDownloadOutline className="w-4 h-4" />
                  }))}
                />
              )}

              {/* Custom Actions */}
              {actions.map((action, idx) => {
                const isDestructive = 'variant' in action && (action.variant === 'destructive' || action.variant === 'danger');
                
                return (
                  <AppleButton
                    key={'id' in action ? action.id : idx}
                    size="sm"
                    variant={isDestructive ? 'secondary' : 'secondary'}
                    onClick={() => handleActionClick(action)}
                    disabled={'disabled' in action ? action.disabled : false}
                    aria-label={action.label}
                    className={
                      isDestructive
                        ? '!text-red-600 hover:!bg-red-50 hover:!text-red-700'
                        : ''
                    }
                    data-testid={`button-action-${idx}`}
                  >
                    <span className="flex items-center gap-2">
                      {action.icon}
                      <span>{action.label}</span>
                    </span>
                  </AppleButton>
                );
              })}

              {onClose && (
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
                  <IoCloseOutline className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <AppleDialog
        open={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        title={dialogTitle}
        variant="destructive"
        data-testid="dialog-confirm-delete"
      >
        <p className="text-sm text-gray-600 mb-6" data-testid="text-confirm-message">
          {dialogMessage}
        </p>
        <div className="flex gap-3 justify-end">
          <AppleButton
            variant="secondary"
            onClick={() => setShowConfirmDialog(false)}
            aria-label={labels.cancel}
            data-testid="button-cancel-action"
          >
            {labels.cancel}
          </AppleButton>
          <AppleButton
            variant="primary"
            onClick={confirmAction}
            aria-label={labels.confirm}
            className="!bg-red-600 hover:!bg-red-700"
            data-testid="button-confirm-action"
          >
            {labels.confirm}
          </AppleButton>
        </div>
      </AppleDialog>
    </>
  );
}
