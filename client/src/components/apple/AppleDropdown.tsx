import { ReactNode } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent
} from '@radix-ui/react-dropdown-menu';
import { ChevronRight } from 'lucide-react';
import { designTokens } from '@/constants/design-tokens';

export interface DropdownItem {
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'item' | 'divider' | 'label';
  destructive?: boolean;
  items?: DropdownItem[];
}

interface AppleDropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'bottom' | 'left' | 'right';
}

function DropdownItems({ items }: { items: DropdownItem[] }) {
  return (
    <>
      {items.map((item, index) => {
        if (item.type === 'divider') {
          return (
            <DropdownMenu.Separator
              key={`divider-${index}`}
              className="border-t border-gray-200 my-1"
              data-testid={`dropdown-divider-${index}`}
            />
          );
        }
        
        if (item.type === 'label') {
          return (
            <DropdownMenu.Label
              key={`label-${index}`}
              className="text-xs text-gray-500 px-3 py-1.5 font-medium"
              data-testid={`dropdown-item-${index}`}
            >
              {item.label}
            </DropdownMenu.Label>
          );
        }
        
        if (item.items && item.items.length > 0) {
          return (
            <DropdownMenuSub key={`submenu-${index}`}>
              <DropdownMenuSubTrigger
                disabled={item.disabled}
                className={`
                  px-3 py-2 rounded-md
                  flex items-center gap-2 justify-between
                  outline-none cursor-pointer
                  transition-all duration-150
                  ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}
                  ${item.destructive 
                    ? 'text-red-600 hover:bg-red-50 focus:bg-red-50' 
                    : 'text-gray-900 hover:bg-gray-100 focus:bg-gray-100'
                  }
                `}
                data-testid={`dropdown-submenu-${index}`}
              >
                <div className="flex items-center gap-2">
                  {item.icon && <span className="w-4 h-4">{item.icon}</span>}
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </DropdownMenuSubTrigger>
              <DropdownMenu.Portal>
                <DropdownMenuSubContent
                  className="
                    min-w-[200px] bg-white border border-gray-200 rounded-lg shadow-lg
                    p-1
                    outline-none
                    animate-in fade-in-0 zoom-in-95
                    data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
                    data-[side=bottom]:slide-in-from-top-2
                    data-[side=left]:slide-in-from-right-2
                    data-[side=right]:slide-in-from-left-2
                    data-[side=top]:slide-in-from-bottom-2
                  "
                  sideOffset={8}
                  alignOffset={-4}
                >
                  <DropdownItems items={item.items} />
                </DropdownMenuSubContent>
              </DropdownMenu.Portal>
            </DropdownMenuSub>
          );
        }
        
        return (
          <DropdownMenu.Item
            key={`item-${index}`}
            onClick={item.onClick}
            disabled={item.disabled}
            className={`
              px-3 py-2 rounded-md
              flex items-center gap-2
              outline-none cursor-pointer
              transition-all duration-150
              ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}
              ${item.destructive 
                ? 'text-red-600 hover:bg-red-50 focus:bg-red-50' 
                : 'text-gray-900 hover:bg-gray-100 focus:bg-gray-100'
              }
            `}
            data-testid={`dropdown-item-${index}`}
          >
            {item.icon && <span className="w-4 h-4">{item.icon}</span>}
            <span>{item.label}</span>
          </DropdownMenu.Item>
        );
      })}
    </>
  );
}

export function AppleDropdown({
  trigger,
  items,
  align = 'end',
  side = 'bottom',
}: AppleDropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        {trigger}
      </DropdownMenu.Trigger>
      
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          side={side}
          align={align}
          className="
            min-w-[200px] bg-white border border-gray-200 rounded-lg shadow-lg
            p-1
            outline-none
            animate-in fade-in-0 zoom-in-95
            data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
            data-[side=bottom]:slide-in-from-top-2
            data-[side=left]:slide-in-from-right-2
            data-[side=right]:slide-in-from-left-2
            data-[side=top]:slide-in-from-bottom-2
          "
          style={{ zIndex: designTokens.zIndex.dropdown }}
          sideOffset={5}
          data-testid="dropdown-content"
        >
          <DropdownItems items={items} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
