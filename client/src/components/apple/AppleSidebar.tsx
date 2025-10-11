import { ReactNode, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { designTokens } from '@/constants/design-tokens';

interface SidebarItem {
  id: string;
  label: string;
  icon?: ReactNode;
  href?: string;
  onClick?: () => void;
  badge?: string | number;
}

interface AppleSidebarProps {
  items: SidebarItem[];
  activeItem?: string;
  collapsed?: boolean;
  onToggle?: () => void;
  width?: string;
}

export function AppleSidebar({
  items,
  activeItem,
  collapsed: controlledCollapsed,
  onToggle,
  width = 'w-64'
}: AppleSidebarProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  
  // Use controlled collapsed if provided, otherwise use internal state
  const isCollapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalCollapsed(!internalCollapsed);
    }
  };

  const sidebarClass = `
    ${isCollapsed ? 'w-16' : width}
    h-screen bg-white border-r border-gray-200 
    flex flex-col
    ${designTokens.transitions.base}
    md:relative fixed left-0 top-0 ${designTokens.zIndex.fixed} md:z-auto
  `;

  const itemClass = (isActive: boolean) => `
    flex items-center gap-3 px-4 py-3 text-sm font-medium
    ${designTokens.borderRadius.md} mx-2
    ${designTokens.transitions.base}
    focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff0086] focus-visible:ring-offset-2
    ${isActive 
      ? 'bg-[#ff0086] text-white' 
      : 'text-gray-700 hover:bg-gray-100'
    }
  `;

  return (
    <aside className={sidebarClass} aria-label="Sidebar navigation">
      {/* Toggle Button */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && <span className="font-semibold text-gray-900">Menu</span>}
        <button
          onClick={handleToggle}
          data-testid="sidebar-toggle"
          className={`
            p-2 ${designTokens.borderRadius.md} text-gray-600 hover:bg-gray-100
            focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff0086] focus-visible:ring-offset-2
            ${designTokens.transitions.base}
            ${isCollapsed ? 'mx-auto' : ''}
          `}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-expanded={!isCollapsed}
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          {items.map((item) => {
            const isActive = item.id === activeItem;

            return (
              <li key={item.id}>
                <button
                  onClick={item.onClick}
                  data-testid={`sidebar-item-${item.id}`}
                  className={itemClass(isActive)}
                  aria-current={isActive ? 'page' : undefined}
                  title={isCollapsed ? item.label : undefined}
                >
                  {item.icon && (
                    <span className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </span>
                  )}
                  
                  {!isCollapsed && (
                    <>
                      <span className="flex-1 text-left truncate">{item.label}</span>
                      
                      {item.badge !== undefined && (
                        <span 
                          className={`
                            px-2 py-0.5 text-xs font-medium rounded-full
                            ${isActive ? 'bg-white/20 text-white' : 'bg-[#ff0086] text-white'}
                          `}
                        >
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}

                  {isCollapsed && item.badge !== undefined && (
                    <span 
                      className="absolute top-2 right-2 w-2 h-2 bg-[#ff0086] rounded-full"
                      aria-label={`${item.badge} notifications`}
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
