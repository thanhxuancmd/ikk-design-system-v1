import { useEffect } from 'react';
import { designTokens } from '@/constants/design-tokens';

interface AppleDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  variant?: 'default' | 'danger';
}

export function AppleDialog({
  open,
  onClose,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'default',
}: AppleDialogProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    onClose();
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const confirmButtonClass = variant === 'danger'
    ? 'bg-red-600 hover:bg-red-700 text-white'
    : 'bg-[#ff0086] hover:bg-[#e60078] text-white';

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      aria-describedby={description ? 'dialog-description' : undefined}
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ zIndex: designTokens.zIndex.modal }}
    >
      {/* Backdrop */}
      <div
        data-testid="dialog-backdrop"
        onClick={handleBackdropClick}
        className="absolute inset-0 bg-black/50 animate-fade-in"
      />

      {/* Dialog Content */}
      <div
        data-testid="dialog-content"
        className={`
          max-w-sm w-full
          bg-white ${designTokens.borderRadius.lg} ${designTokens.shadows.xl}
          relative animate-scale-in
          p-6
        `}
      >
        <h2 id="dialog-title" className="text-lg font-semibold mb-2" data-testid="dialog-title">
          {title}
        </h2>
        
        {description && (
          <p id="dialog-description" className="text-sm text-gray-600 mb-6" data-testid="dialog-description">
            {description}
          </p>
        )}

        <div className="flex gap-3 justify-end">
          <button
            onClick={handleCancel}
            data-testid="dialog-cancel"
            className={`
              px-4 py-2 rounded-lg
              bg-gray-100 hover:bg-gray-200 text-gray-700
              font-medium text-sm
              ${designTokens.transitions.fast}
            `}
          >
            {cancelText}
          </button>
          
          <button
            onClick={handleConfirm}
            data-testid="dialog-confirm"
            className={`
              px-4 py-2 rounded-lg
              ${confirmButtonClass}
              font-medium text-sm
              ${designTokens.transitions.fast}
            `}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
