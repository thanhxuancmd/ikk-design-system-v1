import { ReactNode } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { designTokens } from '@/constants/design-tokens';

interface AppleTooltipProps {
  children: ReactNode;
  content: ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  delayDuration?: number;
  disabled?: boolean;
}

export function AppleTooltip({
  children,
  content,
  side = 'top',
  delayDuration = 200,
  disabled = false,
}: AppleTooltipProps) {
  if (disabled) {
    return <>{children}</>;
  }

  return (
    <Tooltip.Provider delayDuration={delayDuration}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          {children}
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side={side}
            className="
              max-w-[280px] px-3 py-2 rounded-lg shadow-lg
              bg-[#ff0086] text-white
              select-none
              animate-in fade-in-0 zoom-in-95
              data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
              data-[side=bottom]:slide-in-from-top-2
              data-[side=left]:slide-in-from-right-2
              data-[side=right]:slide-in-from-left-2
              data-[side=top]:slide-in-from-bottom-2
            "
            style={{ zIndex: designTokens.zIndex.popover }}
            sideOffset={5}
            data-testid="tooltip-content"
          >
            {content}
            <Tooltip.Arrow className="fill-[#ff0086]" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
