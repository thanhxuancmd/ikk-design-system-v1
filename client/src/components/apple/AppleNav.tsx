import { ReactNode, useState, useRef, useEffect } from 'react';
import { IoMenuOutline, IoCloseOutline, IoChevronDownOutline } from 'react-icons/io5';
import { designTokens } from '@/constants/design-tokens';

interface NavItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
  children?: NavItem[];
}

interface AppleNavProps {
  items: NavItem[];
  logo?: ReactNode;
  actions?: ReactNode;
  activeItem?: string;
  sticky?: boolean;
}

export function AppleNav({
  items,
  logo,
  actions,
  activeItem,
  sticky = false
}: AppleNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown && dropdownRefs.current[openDropdown]) {
        const dropdownEl = dropdownRefs.current[openDropdown];
        if (dropdownEl && !dropdownEl.contains(event.target as Node)) {
          setOpenDropdown(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdown]);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && openDropdown) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [openDropdown]);

  const navClass = `
    w-full bg-white border-b border-gray-200
    ${sticky ? `sticky top-0 ${designTokens.zIndex.sticky}` : ''}
    ${designTokens.transitions.base}
  `;

  const navItemClass = (isActive: boolean, hasChildren: boolean) => `
    px-4 py-2 text-sm font-medium ${designTokens.borderRadius.md}
    flex items-center gap-1
    ${designTokens.transitions.base}
    focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff0086] focus-visible:ring-offset-2
    ${isActive 
      ? 'text-[#ff0086]' 
      : 'text-gray-700 hover:text-[#ff0086] hover:bg-gray-50'
    }
  `;

  const dropdownItemClass = (isActive: boolean) => `
    w-full text-left px-4 py-2 text-sm
    ${designTokens.transitions.base}
    focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff0086] focus-visible:ring-offset-2
    ${isActive 
      ? 'bg-[#ff0086] text-white' 
      : 'text-gray-700 hover:bg-gray-100'
    }
  `;

  const renderNavItem = (item: NavItem, isMobile = false) => {
    const isActive = item.id === activeItem;
    const hasChildren = item.children && item.children.length > 0;
    const isDropdownOpen = openDropdown === item.id;

    if (hasChildren) {
      return (
        <div 
          key={item.id}
          className="relative"
          ref={(el) => (dropdownRefs.current[item.id] = el)}
        >
          <button
            onClick={() => setOpenDropdown(isDropdownOpen ? null : item.id)}
            data-testid={`nav-item-${item.id}`}
            className={navItemClass(isActive, true)}
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
          >
            {item.label}
            <IoChevronDownOutline 
              className={`w-4 h-4 ${designTokens.transitions.base} ${isDropdownOpen ? 'rotate-180' : ''}`} 
            />
          </button>

          {isDropdownOpen && (
            <div 
              className={`
                ${isMobile ? 'relative' : 'absolute'} 
                ${isMobile ? 'mt-1 ml-4' : 'top-full left-0 mt-1'}
                bg-white ${designTokens.borderRadius.md} ${designTokens.shadows.md}
                border border-gray-200
                ${isMobile ? 'w-full' : 'min-w-[200px]'}
                py-1
                ${designTokens.zIndex.dropdown}
              `}
              role="menu"
            >
              {item.children!.map((child) => {
                const isChildActive = child.id === activeItem;
                return (
                  <button
                    key={child.id}
                    onClick={() => {
                      child.onClick?.();
                      setOpenDropdown(null);
                      if (isMobile) setMobileMenuOpen(false);
                    }}
                    data-testid={`nav-item-${child.id}`}
                    className={dropdownItemClass(isChildActive)}
                    role="menuitem"
                  >
                    {child.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      );
    }

    return (
      <button
        key={item.id}
        onClick={() => {
          item.onClick?.();
          if (isMobile) setMobileMenuOpen(false);
        }}
        data-testid={`nav-item-${item.id}`}
        className={navItemClass(isActive, false)}
      >
        {item.label}
      </button>
    );
  };

  return (
    <nav className={navClass} aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          {logo && <div className="flex-shrink-0">{logo}</div>}

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 flex-1 justify-center">
            {items.map((item) => renderNavItem(item))}
          </div>

          {/* Actions */}
          {actions && <div className="hidden md:flex items-center gap-2">{actions}</div>}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="nav-toggle"
            className={`
              md:hidden p-2 ${designTokens.borderRadius.md} text-gray-700 hover:bg-gray-100
              focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff0086] focus-visible:ring-offset-2
              ${designTokens.transitions.base}
            `}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <IoCloseOutline className="w-6 h-6" /> : <IoMenuOutline className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-1">
              {items.map((item) => renderNavItem(item, true))}
              {actions && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  {actions}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
