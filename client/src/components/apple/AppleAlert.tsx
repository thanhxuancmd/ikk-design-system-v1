import { ReactNode } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { designTokens } from '@/constants/design-tokens';

interface AppleAlertProps {
  severity: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  children: ReactNode;
  onClose?: () => void;
  icon?: ReactNode;
}

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const colorMap = {
  success: {
    bg: 'bg-[#6ee7b7]/20',
    border: 'border-[#10b981]',
    text: 'text-[#065f46]',
    icon: 'text-[#10b981]',
  },
  error: {
    bg: 'bg-[#fca5a5]/20',
    border: 'border-[#ef4444]',
    text: 'text-[#991b1b]',
    icon: 'text-[#ef4444]',
  },
  warning: {
    bg: 'bg-[#fbbf24]/20',
    border: 'border-[#f59e0b]',
    text: 'text-[#92400e]',
    icon: 'text-[#f59e0b]',
  },
  info: {
    bg: 'bg-[#93c5fd]/20',
    border: 'border-[#3b82f6]',
    text: 'text-[#1e40af]',
    icon: 'text-[#3b82f6]',
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
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
