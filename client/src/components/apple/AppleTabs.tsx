import { ReactNode, useEffect, useRef } from 'react';
import { designTokens } from '@/constants/design-tokens';

interface AppleTabsProps {
  tabs: Array<{ id: string; label: string; icon?: ReactNode }>;
  activeTab: string;
  onChange: (tabId: string) => void;
  variant?: 'underline' | 'pills';
}

export function AppleTabs({ 
  tabs, 
  activeTab, 
  onChange, 
  variant = 'underline' 
}: AppleTabsProps) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    let nextIndex = currentIndex;

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        nextIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
        break;
      case 'ArrowRight':
        e.preventDefault();
        nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
        break;
      case 'Home':
        e.preventDefault();
        nextIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        nextIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    tabRefs.current[nextIndex]?.focus();
    onChange(tabs[nextIndex].id);
  };

  useEffect(() => {
    const activeIndex = tabs.findIndex(tab => tab.id === activeTab);
    if (activeIndex !== -1 && document.activeElement?.getAttribute('role') === 'tab') {
      tabRefs.current[activeIndex]?.focus();
    }
  }, [activeTab, tabs]);

  const baseTabClass = `
    flex items-center gap-2 px-4 py-2 text-sm font-medium
    focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff0086] focus-visible:ring-offset-2
    ${designTokens.transitions.base}
  `;

  const underlineVariantClass = (isActive: boolean) => `
    border-b-2 ${isActive 
      ? 'border-[#ff0086] text-[#ff0086]' 
      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
    }
  `;

  const pillsVariantClass = (isActive: boolean) => `
    ${designTokens.borderRadius.md} ${isActive 
      ? 'bg-[#ff0086] text-white' 
      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }
  `;

  return (
    <div 
      role="tablist" 
      aria-label="Tabs"
      className={`flex ${variant === 'pills' ? 'gap-2 p-1 bg-gray-100 rounded-lg inline-flex' : 'border-b border-gray-200'}`}
    >
      {tabs.map((tab, index) => {
        const isActive = tab.id === activeTab;
        
        return (
          <button
            key={tab.id}
            ref={(el) => (tabRefs.current[index] = el)}
            role="tab"
            aria-selected={isActive}
            aria-controls={`tabpanel-${tab.id}`}
            tabIndex={isActive ? 0 : -1}
            data-testid={`tab-${tab.id}`}
            onClick={() => onChange(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`
              ${baseTabClass}
              ${variant === 'underline' ? underlineVariantClass(isActive) : pillsVariantClass(isActive)}
            `}
          >
            {tab.icon && <span className="w-5 h-5 flex items-center justify-center">{tab.icon}</span>}
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
