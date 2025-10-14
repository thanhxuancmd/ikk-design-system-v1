import { ReactNode } from 'react';
import { IoCheckmarkCircleOutline, IoCloseCircleOutline, IoWarningOutline, IoInformationCircleOutline, IoCloseOutline } from 'react-icons/io5';
import { designTokens } from '@/constants/design-tokens';

interface AppleAlertProps {
  severity: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  children: ReactNode;
  onClose?: () => void;
  icon?: ReactNode;
}

const iconMap = {
  success: IoCheckmarkCircleOutline,
  error: IoCloseCircleOutline,
  warning: IoWarningOutline,
  info: IoInformationCircleOutline,
};

const colorMap = {
  success: {
    bg: 'bg-[var(--apple-success-soft)]',
    border: 'border-[var(--apple-success)]',
    text: 'text-[var(--apple-success-text)]',
    icon: 'text-[var(--apple-success)]',
  },
  error: {
    bg: 'bg-[var(--apple-destructive-soft)]',
    border: 'border-[var(--apple-destructive)]',
    text: 'text-[var(--apple-destructive-text)]',
    icon: 'text-[var(--apple-destructive)]',
  },
  warning: {
    bg: 'bg-[var(--apple-warning-soft)]',
    border: 'border-[var(--apple-warning)]',
    text: 'text-[var(--apple-warning-text)]',
    icon: 'text-[var(--apple-warning)]',
  },
  info: {
    bg: 'bg-[var(--apple-accent-soft)]',
    border: 'border-[var(--apple-accent)]',
    text: 'text-[var(--apple-accent-text)]',
    icon: 'text-[var(--apple-accent)]',
  },
};

export function AppleAlert({ severity, title, children, onClose, icon }: AppleAlertProps) {
  const DefaultIcon = iconMap[severity];
  const colors = colorMap[severity];

  return (
    <div
      role="alert"
      data-testid={`alert-${severity}`}
      className={`
        ${colors.bg} ${colors.border} ${colors.text}
        border-l-4 ${designTokens.borderRadius.md}
        p-4 relative
        ${designTokens.transitions.base}
      `}
    >
      <div className="flex items-start gap-3">
        <div className={`${colors.icon} flex-shrink-0 mt-0.5`}>
          {icon || <DefaultIcon className="w-5 h-5" />}
        </div>
        
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className="font-semibold mb-1" data-testid={`alert-${severity}-title`}>
              {title}
            </h4>
          )}
          <div className="text-sm" data-testid={`alert-${severity}-content`}>
            {children}
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close"
            data-testid={`alert-${severity}-close`}
            className={`
              ${colors.icon} hover:opacity-70
              flex-shrink-0
              ${designTokens.transitions.fast}
            `}
          >
            <IoCloseOutline className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
