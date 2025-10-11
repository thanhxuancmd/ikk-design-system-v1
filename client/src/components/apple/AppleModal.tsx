import { ReactNode, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { designTokens } from '@/constants/design-tokens';

interface AppleModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
}

const sizeMap = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
};

export function AppleModal({
  open,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnBackdrop = true,
  closeOnEscape = true,
}: AppleModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      
      // Focus trap
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements && focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      }

      // Prevent body scroll
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = '';
        previousActiveElement.current?.focus();
      };
    }
  }, [open]);

  useEffect(() => {
    if (!closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onClose, closeOnEscape]);

  if (!open) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ zIndex: designTokens.zIndex.modal }}
    >
      {/* Backdrop */}
      <div
        data-testid="modal-backdrop"
        onClick={handleBackdropClick}
        className="absolute inset-0 bg-black/50 animate-fade-in"
      />

      {/* Modal Content */}
      <div
        ref={modalRef}
        data-testid="modal-content"
        className={`
          ${sizeMap[size]} w-full
          bg-white ${designTokens.borderRadius.lg} ${designTokens.shadows.xl}
          relative animate-scale-in
          max-h-[90vh] flex flex-col
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          {title && (
            <h2 id="modal-title" className="text-xl font-semibold" data-testid="modal-title">
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            aria-label="Close"
            data-testid="modal-close"
            className={`
              ml-auto text-gray-500 hover:text-gray-700
              ${designTokens.transitions.fast}
            `}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1" data-testid="modal-body">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="p-6 border-t" data-testid="modal-footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
