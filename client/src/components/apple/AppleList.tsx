import { ReactNode } from 'react';
import { designTokens } from '@/constants/design-tokens';
import { AppleAvatar } from './AppleAvatar';

interface ListItem {
  id: string;
  title: string;
  description?: string;
  icon?: ReactNode;
  avatar?: { src?: string; name: string };
  badge?: string | number;
  actions?: ReactNode;
  onClick?: () => void;
}

interface AppleListProps {
  items: ListItem[];
  divided?: boolean;
  hoverable?: boolean;
  emptyMessage?: string;
}

export function AppleList({
  items,
  divided = false,
  hoverable = false,
  emptyMessage = 'No items to display',
}: AppleListProps) {
  if (items.length === 0) {
    return (
      <div className="w-full p-8 text-center text-gray-500 border border-gray-200 rounded-lg">
        {emptyMessage}
      </div>
    );
  }

  return (
    <ul role="list" className={`w-full ${designTokens.borderRadius.md} overflow-hidden`}>
      {items.map((item, index) => (
        <li
          key={item.id}
          data-testid={`list-item-${item.id}`}
          className={`
            py-3 px-4
            flex items-center gap-4
            ${hoverable ? 'hover:bg-gray-50' : ''}
            ${item.onClick ? 'cursor-pointer' : ''}
            ${divided && index < items.length - 1 ? 'border-b border-gray-200' : ''}
            ${designTokens.transitions.base}
          `}
          onClick={item.onClick}
        >
          {/* Left: Icon or Avatar */}
          {item.icon && (
            <div className="flex-shrink-0 text-gray-600">
              {item.icon}
            </div>
          )}
          
          {item.avatar && (
            <div className="flex-shrink-0">
              <AppleAvatar
                src={item.avatar.src}
                name={item.avatar.name}
                size="md"
              />
            </div>
          )}

          {/* Center: Title and Description */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {item.title}
            </p>
            {item.description && (
              <p className="text-sm text-gray-500 truncate">
                {item.description}
              </p>
            )}
          </div>

          {/* Right: Badge or Actions */}
          {item.badge !== undefined && (
            <div className="flex-shrink-0">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                {item.badge}
              </span>
            </div>
          )}

          {item.actions && (
            <div className="flex-shrink-0">
              {item.actions}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
