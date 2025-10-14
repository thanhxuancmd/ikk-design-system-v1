import { ReactNode } from 'react';
import { IoServerOutline, IoSearchOutline, IoLockClosedOutline, IoHelpCircleOutline, IoCloudOfflineOutline } from 'react-icons/io5';
import { designTokens } from '@/constants/design-tokens';
import { AppleButton } from './AppleButton';

export type EmptyStateVariant = 'noData' | 'noResults' | 'noPermission' | 'notFound' | 'offline';

export interface EmptyStateProps {
  variant?: EmptyStateVariant;
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const variantConfig: Record<EmptyStateVariant, {
  icon: ReactNode;
  title: string;
  description: string;
}> = {
  noData: {
    icon: <IoServerOutline className="w-30 h-30" />,
    title: "Chưa có dữ liệu",
    description: "Dữ liệu sẽ xuất hiện ở đây khi có sẵn"
  },
  noResults: {
    icon: <IoSearchOutline className="w-30 h-30" />,
    title: "Không tìm thấy kết quả",
    description: "Hãy thử tìm kiếm với từ khóa khác"
  },
  noPermission: {
    icon: <IoLockClosedOutline className="w-30 h-30" />,
    title: "Không có quyền truy cập",
    description: "Bạn không có quyền xem nội dung này"
  },
  notFound: {
    icon: <IoHelpCircleOutline className="w-30 h-30" />,
    title: "Không tìm thấy trang",
    description: "Trang bạn tìm kiếm không tồn tại"
  },
  offline: {
    icon: <IoCloudOfflineOutline className="w-30 h-30" />,
    title: "Mất kết nối",
    description: "Kiểm tra kết nối mạng và thử lại"
  }
};

export function EmptyState({
  variant = 'noData',
  title,
  description,
  icon,
  action,
  className = ''
}: EmptyStateProps) {
  const config = variantConfig[variant];
  const displayIcon = icon || config.icon;
  const displayTitle = title || config.title;
  const displayDescription = description || config.description;

  return (
    <div 
      className={`flex flex-col items-center justify-center py-16 px-4 ${className}`}
      data-testid="empty-state"
    >
      <div 
        className="text-gray-400 mb-6"
        data-testid="empty-state-icon"
        style={{ width: '120px', height: '120px' }}
      >
        <div className="w-full h-full flex items-center justify-center">
          {displayIcon}
        </div>
      </div>
      
      <h3 
        className={`${designTokens.typography.h3} text-gray-900 mb-2 text-center`}
        data-testid="empty-state-title"
      >
        {displayTitle}
      </h3>
      
      <p 
        className={`${designTokens.typography.small} ${designTokens.typography.description} text-center max-w-md mb-6`}
        data-testid="empty-state-description"
      >
        {displayDescription}
      </p>
      
      {action && (
        <AppleButton
          variant="primary"
          size="md"
          onClick={action.onClick}
          data-testid="empty-state-action"
        >
          {action.label}
        </AppleButton>
      )}
    </div>
  );
}
