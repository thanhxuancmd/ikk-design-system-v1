import { useState, useEffect, useRef } from 'react';
import { Bell, Check, X, Trash2, AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { AppleAvatar } from './AppleAvatar';
import { AppleTabs } from './AppleTabs';
import { AppleButton } from './AppleButton';
import { AppleLoading } from './AppleLoading';
import { EmptyState } from './EmptyState';
import { designTokens } from '@/constants/design-tokens';
import { cn } from '@/lib/utils';

export interface Notification {
  id: string | number;
  type?: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date | string;
  isRead: boolean;
  avatar?: string;
  actionLabel?: string;
  onAction?: () => void;
  link?: string;
}

export interface AppleNotificationCenterProps {
  notifications: Notification[];
  onMarkAsRead?: (notificationId: string | number) => void;
  onMarkAllAsRead?: () => void;
  onClearAll?: () => void;
  onNotificationClick?: (notification: Notification) => void;
  isLoading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  maxHeight?: string;
  showClearAll?: boolean;
  labels?: {
    title?: string;
    allTab?: string;
    unreadTab?: string;
    readTab?: string;
    markAsRead?: string;
    markAllAsRead?: string;
    clearAll?: string;
    noNotifications?: string;
    noUnreadNotifications?: string;
    loading?: string;
    timeAgo?: (date: Date) => string;
  };
  className?: string;
  triggerClassName?: string;
}

const defaultTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - new Date(date).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return "Vừa xong";
  if (diffMins < 60) return `${diffMins} phút trước`;
  if (diffHours < 24) return `${diffHours} giờ trước`;
  if (diffDays < 7) return `${diffDays} ngày trước`;
  return new Date(date).toLocaleDateString('vi-VN');
};

const defaultLabels = {
  title: "Thông báo",
  allTab: "Tất cả",
  unreadTab: "Chưa đọc",
  readTab: "Đã đọc",
  markAsRead: "Đánh dấu đã đọc",
  markAllAsRead: "Đánh dấu tất cả đã đọc",
  clearAll: "Xóa tất cả",
  noNotifications: "Không có thông báo",
  noUnreadNotifications: "Không có thông báo chưa đọc",
  loading: "Đang tải...",
  timeAgo: defaultTimeAgo,
};

const notificationTypeIcons = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
};

const notificationTypeColors = {
  info: 'text-blue-500',
  success: 'text-green-500',
  warning: 'text-yellow-500',
  error: 'text-red-500',
};

export function AppleNotificationCenter({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onClearAll,
  onNotificationClick,
  isLoading = false,
  hasMore = false,
  onLoadMore,
  maxHeight = "500px",
  showClearAll = false,
  labels: customLabels,
  className = '',
  triggerClassName = '',
}: AppleNotificationCenterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  
  const labels = { ...defaultLabels, ...customLabels };
  const timeAgo = labels.timeAgo || defaultTimeAgo;

  const unreadNotifications = notifications.filter(n => !n.isRead);
  const readNotifications = notifications.filter(n => n.isRead);
  const unreadCount = unreadNotifications.length;
  const allCount = notifications.length;
  const readCount = readNotifications.length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current && 
        !panelRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleTogglePanel = () => {
    setIsOpen(!isOpen);
  };

  const handleNotificationClick = (notification: Notification) => {
    if (onNotificationClick) {
      onNotificationClick(notification);
    }
    if (!notification.isRead && onMarkAsRead) {
      onMarkAsRead(notification.id);
    }
  };

  const handleMarkAsRead = (notificationId: string | number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onMarkAsRead) {
      onMarkAsRead(notificationId);
    }
  };

  const handleMarkAllAsRead = () => {
    if (onMarkAllAsRead) {
      onMarkAllAsRead();
    }
  };

  const handleClearAll = () => {
    if (onClearAll) {
      onClearAll();
    }
    setIsOpen(false);
  };

  const getFilteredNotifications = () => {
    switch (activeTab) {
      case 'unread':
        return unreadNotifications;
      case 'read':
        return readNotifications;
      default:
        return notifications;
    }
  };

  const filteredNotifications = getFilteredNotifications();

  const tabs = [
    { id: 'all', label: `${labels.allTab} (${allCount})` },
    { id: 'unread', label: `${labels.unreadTab} (${unreadCount})` },
    { id: 'read', label: `${labels.readTab} (${readCount})` },
  ];

  return (
    <div className={cn("relative", className)}>
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        onClick={handleTogglePanel}
        className={cn(
          "relative p-2 rounded-lg hover:bg-gray-100 transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-[var(--apple-primary)] focus:ring-offset-2",
          triggerClassName
        )}
        aria-label="Notifications"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        data-testid="notification-trigger"
      >
        <Bell className="w-5 h-5 text-gray-600" />
        {unreadCount > 0 && (
          <span
            className={cn(
              "absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5",
              "flex items-center justify-center",
              "bg-[var(--apple-destructive)] text-white",
              "text-xs font-semibold rounded-full",
              "animate-scale-in"
            )}
            aria-label={`${unreadCount} unread notifications`}
            data-testid="notification-badge"
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Notification center"
          className={cn(
            "absolute right-0 mt-2 w-96 max-w-[calc(100vw-2rem)]",
            "bg-white border border-gray-200 rounded-xl shadow-xl",
            "animate-scale-in",
            "z-[1050]"
          )}
          style={{ maxHeight }}
          data-testid="notification-panel"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className={cn(designTokens.typography.h3, "text-gray-900")}>
              {labels.title}
            </h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && onMarkAllAsRead && (
                <button
                  onClick={handleMarkAllAsRead}
                  className={cn(
                    "text-sm text-[var(--apple-primary)] hover:text-[var(--apple-primary-hover)]",
                    "font-medium transition-colors",
                    "focus:outline-none focus:ring-2 focus:ring-[var(--apple-primary)] focus:ring-offset-2 rounded px-2 py-1"
                  )}
                  data-testid="button-mark-all-read"
                >
                  {labels.markAllAsRead}
                </button>
              )}
              {showClearAll && allCount > 0 && onClearAll && (
                <button
                  onClick={handleClearAll}
                  className={cn(
                    "p-1.5 rounded-lg hover:bg-gray-100",
                    "text-gray-500 hover:text-gray-700 transition-colors",
                    "focus:outline-none focus:ring-2 focus:ring-[var(--apple-primary)] focus:ring-offset-2"
                  )}
                  aria-label={labels.clearAll}
                  data-testid="button-clear-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 px-4">
            <AppleTabs
              tabs={tabs}
              activeTab={activeTab}
              onChange={setActiveTab}
              variant="underline"
            />
          </div>

          {/* Notification List */}
          <div 
            className="overflow-y-auto"
            style={{ maxHeight: `calc(${maxHeight} - 120px)` }}
            role="list"
          >
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <AppleLoading size="md" text={labels.loading} />
              </div>
            ) : filteredNotifications.length === 0 ? (
              <EmptyState
                variant="noData"
                title={activeTab === 'unread' ? labels.noUnreadNotifications : labels.noNotifications}
                description=""
                className="py-8"
              />
            ) : (
              <>
                {filteredNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onClick={() => handleNotificationClick(notification)}
                    onMarkAsRead={(e) => handleMarkAsRead(notification.id, e)}
                    timeAgo={timeAgo}
                    labels={labels}
                  />
                ))}
                {hasMore && onLoadMore && (
                  <div className="p-4 text-center border-t border-gray-100">
                    <button
                      onClick={onLoadMore}
                      className="text-sm text-[var(--apple-primary)] hover:text-[var(--apple-primary-hover)] font-medium"
                      data-testid="button-load-more"
                    >
                      Tải thêm
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

interface NotificationItemProps {
  notification: Notification;
  onClick: () => void;
  onMarkAsRead: (e: React.MouseEvent) => void;
  timeAgo: (date: Date) => string;
  labels: typeof defaultLabels;
}

function NotificationItem({
  notification,
  onClick,
  onMarkAsRead,
  timeAgo,
  labels,
}: NotificationItemProps) {
  const TypeIcon = notification.type ? notificationTypeIcons[notification.type] : null;
  const typeColor = notification.type ? notificationTypeColors[notification.type] : 'text-gray-500';
  const timestamp = notification.timestamp instanceof Date 
    ? notification.timestamp 
    : new Date(notification.timestamp);

  return (
    <div
      role="listitem"
      className={cn(
        "p-4 border-b border-gray-100 cursor-pointer transition-colors",
        "hover:bg-gray-50",
        !notification.isRead && "bg-[var(--apple-primary-soft)]"
      )}
      onClick={onClick}
      data-testid={`notification-${notification.id}`}
    >
      <div className="flex gap-3">
        {/* Avatar or Icon */}
        <div className="flex-shrink-0">
          {notification.avatar ? (
            <AppleAvatar
              src={notification.avatar}
              name={notification.title}
              size="sm"
            />
          ) : TypeIcon ? (
            <div className={cn("w-8 h-8 rounded-full flex items-center justify-center bg-gray-100")}>
              <TypeIcon className={cn("w-4 h-4", typeColor)} />
            </div>
          ) : (
            <AppleAvatar
              name={notification.title}
              size="sm"
            />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className={cn(
              "text-sm font-semibold text-gray-900 truncate",
              !notification.isRead && "font-bold"
            )}>
              {notification.title}
            </h4>
            {!notification.isRead && (
              <div 
                className="flex-shrink-0 w-2 h-2 bg-[var(--apple-primary)] rounded-full mt-1"
                aria-label="Unread"
                data-testid={`unread-indicator-${notification.id}`}
              />
            )}
          </div>
          
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {notification.message}
          </p>
          
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-500">
              {timeAgo(timestamp)}
            </span>
            
            <div className="flex items-center gap-2">
              {notification.actionLabel && notification.onAction && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    notification.onAction?.();
                  }}
                  className={cn(
                    "text-xs font-medium text-[var(--apple-primary)]",
                    "hover:text-[var(--apple-primary-hover)] transition-colors"
                  )}
                  data-testid={`notification-action-${notification.id}`}
                >
                  {notification.actionLabel}
                </button>
              )}
              
              {!notification.isRead && (
                <button
                  onClick={onMarkAsRead}
                  className={cn(
                    "p-1 rounded-md hover:bg-white transition-colors",
                    "text-gray-400 hover:text-[var(--apple-primary)]",
                    "focus:outline-none focus:ring-2 focus:ring-[var(--apple-primary)]"
                  )}
                  aria-label={labels.markAsRead}
                  data-testid={`button-mark-read-${notification.id}`}
                >
                  <Check className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
