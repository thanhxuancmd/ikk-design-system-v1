import { ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { IoCloseOutline } from 'react-icons/io5';
import { designTokens } from '@/constants/design-tokens';
import { cn } from '@/lib/utils';

interface AppleDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  position?: 'left' | 'right' | 'bottom';
  title?: string;
  description?: string;
  children: ReactNode;
  closeButton?: boolean;
  className?: string;
}

const positionClasses = {
  left: 'fixed left-0 top-0 bottom-0 h-full w-full md:w-80 lg:w-96 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left',
  right: 'fixed right-0 top-0 bottom-0 h-full w-full md:w-80 lg:w-96 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right',
  bottom: 'fixed bottom-0 left-0 right-0 w-full max-h-[90vh] md:max-h-[80vh] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
};

export function AppleDrawer({
  open,
  onOpenChange,
  position = 'right',
  title,
  description,
  children,
  closeButton = true,
  className,
}: AppleDrawerProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-300"
          style={{ zIndex: designTokens.zIndex.modal }}
        />
        <Dialog.Content
          data-testid="drawer"
          className={cn(
            positionClasses[position],
            `bg-white ${designTokens.shadows['2xl']} ${designTokens.borderRadius.md} duration-300 ease-in-out flex flex-col`,
            className
          )}
          style={{ zIndex: designTokens.zIndex.modal + 1 }}
          aria-labelledby={title ? 'drawer-title' : undefined}
          aria-describedby={description ? 'drawer-description' : undefined}
        >
          {(title || description || closeButton) && (
            <div className="border-b border-gray-200 p-4 flex-shrink-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {title && (
                    <Dialog.Title
                      id="drawer-title"
                      className="text-lg font-semibold text-gray-900"
                      data-testid="drawer-title"
                    >
                      {title}
                    </Dialog.Title>
                  )}
                  {description && (
                    <Dialog.Description
                      id="drawer-description"
                      className="mt-1 text-sm text-gray-600"
                      data-testid="drawer-description"
                    >
                      {description}
                    </Dialog.Description>
                  )}
                </div>
                {closeButton && (
                  <Dialog.Close
                    aria-label="Đóng"
                    data-testid="drawer-close"
                    className={cn(
                      'ml-4 rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700',
                      'min-h-[44px] min-w-[44px] flex items-center justify-center',
                      designTokens.transitions.fast
                    )}
                  >
                    <IoCloseOutline className="h-5 w-5" />
                  </Dialog.Close>
                )}
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-4" data-testid="drawer-content">
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
