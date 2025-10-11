import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface AppleToast {
  id: string;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

interface ToastContextValue {
  toasts: AppleToast[];
  addToast: (toast: Omit<AppleToast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

let toastId = 0;

export function AppleToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<AppleToast[]>([]);

  const addToast = useCallback((toast: Omit<AppleToast, 'id'>) => {
    const id = `toast-${++toastId}`;
    const newToast = { ...toast, id };
    
    setToasts((prev) => [...prev, newToast]);

    const duration = toast.duration ?? 3000;
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useAppleToastContext() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useAppleToastContext must be used within AppleToastProvider');
  }
  return context;
}
