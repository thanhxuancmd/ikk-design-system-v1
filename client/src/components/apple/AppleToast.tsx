import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useAppleToastContext, AppleToast as ToastType } from '@/contexts/AppleToastContext';
import { designTokens } from '@/constants/design-tokens';

interface ToastProps {
  toast: ToastType;
}

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const colorMap = {
  success: {
    bg: 'bg-green-50',
    border: 'border-green-500',
    text: 'text-green-800',
    icon: 'text-green-500',
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-500',
    text: 'text-red-800',
    icon: 'text-red-500',
  },
  warning: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-500',
    text: 'text-yellow-800',
    icon: 'text-yellow-500',
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-500',
    text: 'text-blue-800',
    icon: 'text-blue-500',
  },
};

function Toast({ toast }: ToastProps) {
  const { removeToast } = useAppleToastContext();
  const type = toast.type || 'info';
  const Icon = iconMap[type];
  const colors = colorMap[type];
  const role = type === 'error' || type === 'warning' ? 'alert' : 'status';

  return (
    <div
      role={role}
      aria-live={type === 'error' ? 'assertive' : 'polite'}
      data-testid={toast.id}
      className={`
        ${colors.bg} ${colors.border} ${colors.text}
        border-l-4 ${designTokens.borderRadius.md} ${designTokens.shadows.lg}
        p-4 pr-10 min-w-[320px] max-w-md relative
        animate-slide-in-right
        ${designTokens.transitions.base}
      `}
      style={{ zIndex: designTokens.zIndex.toast }}
    >
      <div className="flex items-start gap-3">
        <Icon className={`${colors.icon} w-5 h-5 flex-shrink-0 mt-0.5`} />
        <p className="flex-1 text-sm font-medium">{toast.message}</p>
        <button
          onClick={() => removeToast(toast.id)}
          aria-label="Close"
          data-testid={`${toast.id}-close`}
          className={`
            absolute top-4 right-4
            ${colors.text} hover:opacity-70
            ${designTokens.transitions.fast}
          `}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export function AppleToastContainer() {
  const { toasts } = useAppleToastContext();

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed top-4 right-4 flex flex-col gap-3 pointer-events-none"
      style={{ zIndex: designTokens.zIndex.toast }}
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast toast={toast} />
        </div>
      ))}
    </div>
  );
}
