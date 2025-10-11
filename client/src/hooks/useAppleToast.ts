import { useAppleToastContext } from '@/contexts/AppleToastContext';

interface ToastOptions {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

export function useAppleToast() {
  const { addToast } = useAppleToastContext();

  return {
    toast: (options: ToastOptions) => addToast(options),
    success: (message: string, duration?: number) => addToast({ message, type: 'success', duration }),
    error: (message: string, duration?: number) => addToast({ message, type: 'error', duration }),
    warning: (message: string, duration?: number) => addToast({ message, type: 'warning', duration }),
    info: (message: string, duration?: number) => addToast({ message, type: 'info', duration }),
  };
}
