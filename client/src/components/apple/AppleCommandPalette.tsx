import { ReactNode, useState, useEffect, useRef, useMemo } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { designTokens } from '@/constants/design-tokens';

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  shortcut?: string;
  category?: string;
  onSelect: () => void;
}

interface AppleCommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  commands: CommandItem[];
  placeholder?: string;
  emptyText?: string;
}

const RECENT_ITEMS_KEY = 'apple-command-palette-recent';
const MAX_RECENT_ITEMS = 5;

export function AppleCommandPalette({
  open,
  onOpenChange,
  commands,
  placeholder = 'Tìm kiếm lệnh...',
  emptyText = 'Không tìm thấy kết quả',
}: AppleCommandPaletteProps) {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentItemIds, setRecentItemIds] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Load recent items from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_ITEMS_KEY);
      if (stored) {
        setRecentItemIds(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load recent items:', error);
    }
  }, []);

  // Fuzzy match helper function
  const fuzzyMatch = (text: string, query: string): number => {
    const textLower = text.toLowerCase();
    const queryLower = query.toLowerCase();

    // Exact start match
    if (textLower.startsWith(queryLower)) {
      return 100;
    }

    // Word start match - check if query matches the start of any word
    const words = textLower.split(/\s+/);
    for (const word of words) {
      if (word.startsWith(queryLower)) {
        return 50;
      }
    }

    // Contains match - check if all characters appear in order
    let textIndex = 0;
    for (let i = 0; i < queryLower.length; i++) {
      const char = queryLower[i];
      const foundIndex = textLower.indexOf(char, textIndex);
      if (foundIndex === -1) {
        return 0; // Character not found
      }
      textIndex = foundIndex + 1;
    }
    return 25;
  };

  // Filter and score commands with fuzzy matching
  const filteredCommands = useMemo(() => {
    if (!search) return commands;
    
    const scoredCommands = commands
      .map((cmd) => {
        const labelScore = fuzzyMatch(cmd.label, search);
        const descScore = cmd.description ? fuzzyMatch(cmd.description, search) : 0;
        const maxScore = Math.max(labelScore, descScore);
        
        return {
          command: cmd,
          score: maxScore,
        };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((item) => item.command);
    
    return scoredCommands;
  }, [commands, search]);

  // Get recent commands
  const recentCommands = useMemo(() => {
    if (search) return []; // Don't show recent when searching
    
    return recentItemIds
      .map((id) => commands.find((cmd) => cmd.id === id))
      .filter((cmd): cmd is CommandItem => cmd !== undefined);
  }, [recentItemIds, commands, search]);

  // Group commands by category
  const groupedCommands = useMemo(() => {
    const groups: { [key: string]: CommandItem[] } = {};
    
    // Add recent category first if we have recent items and no search
    if (recentCommands.length > 0 && !search) {
      groups['Gần đây'] = recentCommands;
    }
    
    // Group filtered commands
    filteredCommands.forEach((cmd) => {
      // Skip if command is already in recent items (to avoid duplication)
      if (recentCommands.some((recent) => recent.id === cmd.id)) {
        return;
      }
      
      const category = cmd.category || 'Khác';
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(cmd);
    });
    
    return groups;
  }, [filteredCommands, recentCommands, search]);

  // Flatten for keyboard navigation
  const flatCommands = useMemo(() => {
    const flat: CommandItem[] = [];
    Object.values(groupedCommands).forEach((items) => {
      flat.push(...items);
    });
    return flat;
  }, [groupedCommands]);

  // Update recent items
  const updateRecentItems = (commandId: string) => {
    try {
      const updated = [commandId, ...recentItemIds.filter((id) => id !== commandId)].slice(
        0,
        MAX_RECENT_ITEMS
      );
      setRecentItemIds(updated);
      localStorage.setItem(RECENT_ITEMS_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to update recent items:', error);
    }
  };

  // Reset state when dialog opens/closes
  useEffect(() => {
    if (open) {
      setSearch('');
      setSelectedIndex(0);
      // Focus input when dialog opens
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  }, [open]);

  // Reset selected index when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  // Scroll selected item into view
  useEffect(() => {
    if (listRef.current && flatCommands.length > 0) {
      const selectedElement = listRef.current.querySelector(
        `[data-command-index="${selectedIndex}"]`
      );
      if (selectedElement) {
        selectedElement.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth',
        });
      }
    }
  }, [selectedIndex, flatCommands]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => 
        prev < flatCommands.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (flatCommands[selectedIndex]) {
        flatCommands[selectedIndex].onSelect();
        updateRecentItems(flatCommands[selectedIndex].id);
        onOpenChange(false);
      }
    }
  };

  const handleCommandSelect = (cmd: CommandItem) => {
    cmd.onSelect();
    updateRecentItems(cmd.id);
    onOpenChange(false);
  };

  let commandIndex = 0;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          data-testid="command-palette-overlay"
          className="fixed inset-0 bg-black/50 animate-fade-in"
          style={{ zIndex: designTokens.zIndex.modal }}
        />
        <Dialog.Content
          className={`
            fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
            max-w-2xl w-full
            bg-white ${designTokens.borderRadius.lg} ${designTokens.shadows['2xl']}
            animate-scale-in
            flex flex-col
            max-h-[600px]
          `}
          style={{ zIndex: designTokens.zIndex.modal + 1 }}
          onKeyDown={handleKeyDown}
        >
          {/* Search Input */}
          <div className="p-4">
            <input
              ref={inputRef}
              data-testid="command-palette-input"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={placeholder}
              className={`
                w-full text-lg px-2 py-1
                bg-transparent ${designTokens.borderRadius.md}
                border-none outline-none
                placeholder:text-gray-400
                focus:ring-2 focus:ring-[#ff0086]
              `}
            />
          </div>

          {/* Command List */}
          <div
            ref={listRef}
            data-testid="command-palette-list"
            className="border-t max-h-96 overflow-y-auto"
          >
            {flatCommands.length === 0 ? (
              <div className="px-3 py-8 text-center text-gray-500">
                {emptyText}
              </div>
            ) : (
              Object.entries(groupedCommands).map(([category, items]) => (
                <div key={category}>
                  {/* Category Header */}
                  <div className="text-xs text-gray-500 px-3 py-1.5 font-medium border-b bg-gray-50">
                    {category}
                  </div>

                  {/* Command Items */}
                  {items.map((cmd) => {
                    const currentIndex = commandIndex++;
                    const isSelected = currentIndex === selectedIndex;

                    return (
                      <button
                        key={cmd.id}
                        data-testid={`command-item-${cmd.id}`}
                        data-command-index={currentIndex}
                        onClick={() => handleCommandSelect(cmd)}
                        className={`
                          w-full px-3 py-2.5 flex items-center justify-between
                          ${designTokens.transitions.base}
                          ${isSelected ? 'bg-gray-100' : 'hover:bg-gray-50'}
                          text-left
                        `}
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          {cmd.icon && (
                            <div className="w-5 h-5 flex-shrink-0 text-gray-600">
                              {cmd.icon}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-900">
                              {cmd.label}
                            </div>
                            {cmd.description && (
                              <div className="text-sm text-gray-500 truncate">
                                {cmd.description}
                              </div>
                            )}
                          </div>
                        </div>

                        {cmd.shortcut && (
                          <div className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600 ml-2 flex-shrink-0">
                            {cmd.shortcut}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
