import { HTMLAttributes, useId, useState, useEffect, useRef } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { Search, X, Loader2, Clock } from 'lucide-react';
import { designTokens } from '@/constants/design-tokens';

interface AppleSearchBarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  onSearch: (query: string) => void;
  suggestions?: string[];
  loading?: boolean;
  placeholder?: string;
  showRecent?: boolean;
  recentSearches?: string[];
  onSelectSuggestion?: (suggestion: string) => void;
  disabled?: boolean;
  recentLabel?: string;
  noResultsText?: string;
  clearButtonLabel?: string;
}

export function AppleSearchBar({
  value,
  onChange,
  onSearch,
  suggestions = [],
  loading = false,
  placeholder = 'Tìm kiếm...',
  showRecent = true,
  recentSearches = [],
  onSelectSuggestion,
  disabled = false,
  className = '',
  recentLabel = 'Tìm kiếm gần đây',
  noResultsText = 'Không có kết quả',
  clearButtonLabel = 'Xóa tìm kiếm',
  ...divProps
}: AppleSearchBarProps) {
  const id = useId();
  const inputId = `${id}-input`;
  const listboxId = `${id}-listbox`;
  
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Highlight matching text in suggestion
  const highlightMatch = (text: string, query: string): JSX.Element => {
    if (!query) return <>{text}</>;
    
    const index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return <>{text}</>;
    
    return (
      <>
        {text.substring(0, index)}
        <span className="font-semibold text-gray-900">
          {text.substring(index, index + query.length)}
        </span>
        {text.substring(index + query.length)}
      </>
    );
  };

  // Combine recent searches and suggestions
  const allItems = [
    ...(showRecent && recentSearches.length > 0 && !value ? recentSearches.map(s => ({ type: 'recent' as const, value: s })) : []),
    ...(suggestions.length > 0 && value ? suggestions.map(s => ({ type: 'suggestion' as const, value: s })) : [])
  ];

  const hasItems = allItems.length > 0;
  const showDropdown = isOpen && hasItems;

  // Debounce search
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (value.trim()) {
      debounceTimerRef.current = setTimeout(() => {
        onSearch(value);
      }, 300);
    }

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [value, onSearch]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  // Handle input change
  const handleInputChange = (newValue: string) => {
    onChange(newValue);
    setSelectedIndex(-1);
    
    // Open dropdown if there's content or showRecent is true
    if (newValue.trim() || showRecent) {
      setIsOpen(true);
    }
  };

  // Handle clear
  const handleClear = () => {
    onChange('');
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  // Handle suggestion selection
  const handleSelectSuggestion = (suggestion: string) => {
    onChange(suggestion);
    
    // Trigger onSearch immediately (no debounce)
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    onSearch(suggestion);
    
    // Call onSelectSuggestion if provided
    onSelectSuggestion?.(suggestion);
    
    // Close dropdown
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown) {
      if (e.key === 'Enter' && value.trim()) {
        // Trigger search immediately on Enter
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }
        onSearch(value);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < allItems.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && allItems[selectedIndex]) {
          handleSelectSuggestion(allItems[selectedIndex].value);
        } else if (value.trim()) {
          // Trigger search immediately on Enter
          if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
          }
          onSearch(value);
          setIsOpen(false);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
      case 'Tab':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // Handle input focus
  const handleFocus = () => {
    if (value.trim() || showRecent) {
      setIsOpen(true);
    }
  };

  // Handle input blur (with delay to allow click on suggestions)
  const handleBlur = () => {
    setTimeout(() => {
      setIsOpen(false);
      setSelectedIndex(-1);
    }, 200);
  };

  // Get active descendant ID
  const activeDescendantId = selectedIndex >= 0 ? `${listboxId}-option-${selectedIndex}` : undefined;

  return (
    <div className={className} {...divProps}>
      <Popover.Root open={showDropdown} onOpenChange={setIsOpen}>
        <Popover.Anchor asChild>
          <div className="relative">
            {/* Search Icon */}
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search className="w-5 h-5" />
            </div>

            {/* Input */}
            <input
              ref={inputRef}
              id={inputId}
              type="text"
              value={value}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder={placeholder}
              disabled={disabled}
              role="combobox"
              aria-autocomplete="list"
              aria-expanded={showDropdown}
              aria-controls={showDropdown ? listboxId : undefined}
              aria-activedescendant={activeDescendantId}
              data-testid="searchbar"
              className={`
                w-full h-10 pl-10 pr-10
                ${designTokens.borderRadius.md}
                ${designTokens.shadows.sm}
                ${designTokens.transitions.base}
                border border-gray-300
                ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'bg-white'}
                focus:outline-none focus:ring-2 focus:ring-[#ff0086] focus:border-[#ff0086]
                placeholder:text-gray-400
              `}
            />

            {/* Clear/Loading Button */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {loading ? (
                <Loader2 className="w-5 h-5 text-gray-400 animate-spin" data-testid="searchbar-loading" />
              ) : value.length > 0 ? (
                <button
                  type="button"
                  onClick={handleClear}
                  aria-label={clearButtonLabel}
                  disabled={disabled}
                  data-testid="searchbar-clear"
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              ) : null}
            </div>
          </div>
        </Popover.Anchor>

        {/* Dropdown */}
        <Popover.Portal>
          <Popover.Content
            id={listboxId}
            role="listbox"
            align="start"
            sideOffset={4}
            className={`
              w-[var(--radix-popover-trigger-width)]
              bg-white ${designTokens.borderRadius.lg} ${designTokens.shadows.md}
              border border-gray-200
              max-h-80 overflow-y-auto
              ${designTokens.transitions.base}
              z-50
            `}
            onOpenAutoFocus={(e) => e.preventDefault()}
            data-testid="searchbar-dropdown"
          >
            {allItems.length === 0 ? (
              <div className="px-3 py-4 text-center text-gray-500 text-sm">
                {noResultsText}
              </div>
            ) : (
              <div>
                {/* Recent Searches Section */}
                {showRecent && recentSearches.length > 0 && !value && (
                  <div>
                    <div className="px-3 py-2 text-xs font-medium text-gray-500 border-b bg-gray-50">
                      {recentLabel}
                    </div>
                    {recentSearches.map((search, index) => {
                      const globalIndex = index;
                      const isSelected = selectedIndex === globalIndex;
                      return (
                        <button
                          key={`recent-${index}`}
                          id={`${listboxId}-option-${globalIndex}`}
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => handleSelectSuggestion(search)}
                          data-testid={`searchbar-recent-${index}`}
                          className={`
                            w-full px-3 py-2.5 flex items-center gap-3
                            text-left ${designTokens.transitions.base}
                            ${isSelected ? 'bg-gray-100' : 'hover:bg-gray-50'}
                          `}
                        >
                          <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span className="text-gray-500 text-sm truncate">{search}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Suggestions Section */}
                {suggestions.length > 0 && value && (
                  <div>
                    {showRecent && recentSearches.length > 0 && !value && (
                      <div className="border-t" />
                    )}
                    {suggestions.map((suggestion, index) => {
                      const globalIndex = showRecent && recentSearches.length > 0 && !value 
                        ? recentSearches.length + index 
                        : index;
                      const isSelected = selectedIndex === globalIndex;
                      return (
                        <button
                          key={`suggestion-${index}`}
                          id={`${listboxId}-option-${globalIndex}`}
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => handleSelectSuggestion(suggestion)}
                          data-testid={`searchbar-suggestion-${index}`}
                          className={`
                            w-full px-3 py-2.5 flex items-center gap-3
                            text-left ${designTokens.transitions.base}
                            ${isSelected ? 'bg-gray-100' : 'hover:bg-gray-50'}
                          `}
                        >
                          <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span className="text-gray-700 text-sm truncate">
                            {highlightMatch(suggestion, value)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
