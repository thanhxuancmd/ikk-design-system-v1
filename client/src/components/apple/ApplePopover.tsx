import { ReactNode } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { IoCloseOutline } from 'react-icons/io5';
import { designTokens } from '@/constants/design-tokens';

interface ApplePopoverProps {
  trigger: ReactNode;
  children: ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  title?: string;
  showCloseButton?: boolean;
  onClose?: () => void;
}

export function ApplePopover({
  trigger,
  children,
  side = 'bottom',
  align = 'center',
  title,
  showCloseButton = true,
  onClose,
}: ApplePopoverProps) {
  return (
    <Popover.Root onOpenChange={(open) => {
      if (!open && onClose) {
        onClose();
      }
    }}>
      <Popover.Trigger asChild>
        {trigger}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          side={side}
          align={align}
          className="
            max-w-[400px] bg-white border border-gray-200 rounded-lg shadow-xl
            p-4
            outline-none
            animate-in fade-in-0 zoom-in-95
            data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
            data-[side=bottom]:slide-in-from-top-2
            data-[side=left]:slide-in-from-right-2
            data-[side=right]:slide-in-from-left-2
            data-[side=top]:slide-in-from-bottom-2
          "
          style={{ zIndex: designTokens.zIndex.popover }}
          sideOffset={5}
          data-testid="popover-content"
        >
          {title && (
            <div className="flex justify-between items-center mb-4">
              <h3 
                className="text-base font-semibold text-gray-900"
                data-testid="popover-title"
              >
                {title}
              </h3>
              {showCloseButton && (
                <Popover.Close
                  className="
                    rounded-md p-1 
                    text-gray-400 hover:text-[#ff0086] hover:bg-gray-100
                    transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-[#ff0086] focus:ring-offset-2
                  "
                  aria-label="Close"
                  data-testid="popover-close"
                >
                  <IoCloseOutline className="h-4 w-4" />
                </Popover.Close>
              )}
            </div>
          )}
          
          {!title && showCloseButton && (
            <div className="flex justify-end mb-2">
              <Popover.Close
                className="
                  rounded-md p-1 
                  text-gray-400 hover:text-[#ff0086] hover:bg-gray-100
                  transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-[#ff0086] focus:ring-offset-2
                "
                aria-label="Close"
                data-testid="popover-close"
              >
                <IoCloseOutline className="h-4 w-4" />
              </Popover.Close>
            </div>
          )}
          
          <div className="max-h-96 overflow-y-auto">
            {children}
          </div>
          
          <Popover.Arrow className="fill-white stroke-gray-200 stroke-1" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
