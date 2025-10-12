import { useState } from 'react';
import { Check, X, Video, MessageSquare, Package, FileText } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { designTokens } from '@/constants/design-tokens';
import { AppleTabs } from './AppleTabs';
import { AppleTable } from './AppleTable';
import { AppleButton } from './AppleButton';
import { AppleBadge } from './AppleBadge';
import { AppleAvatar } from './AppleAvatar';
import { ApplePagination } from './ApplePagination';
import { AppleSkeleton } from './AppleSkeleton';
import { EmptyState } from './EmptyState';
import { AppleDialog } from './AppleDialog';
import { AppleTextarea } from './AppleTextarea';

export type ModerationStatus = 'pending' | 'approved' | 'rejected';
export type ContentType = 'stream' | 'comment' | 'product' | 'post';

export interface ModerationItem {
  id: string;
  type: ContentType;
  content: string;
  preview?: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  timestamp: string;
  status: ModerationStatus;
  reason?: string;
}

export interface ContentModerationQueueProps {
  items: ModerationItem[];
  onApprove: (itemId: string) => void;
  onReject: (itemId: string, reason?: string) => void;
  onFilterChange?: (status: ModerationStatus | 'all') => void;
  currentFilter?: ModerationStatus | 'all';
  isLoading?: boolean;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
}

const contentTypeLabels: Record<ContentType, string> = {
  stream: 'Livestream',
  comment: 'Bình luận',
  product: 'Sản phẩm',
  post: 'Bài viết',
};

const contentTypeIcons: Record<ContentType, JSX.Element> = {
  stream: <Video className="w-4 h-4" />,
  comment: <MessageSquare className="w-4 h-4" />,
  product: <Package className="w-4 h-4" />,
  post: <FileText className="w-4 h-4" />,
};

const statusLabels: Record<ModerationStatus, string> = {
  pending: 'Chờ duyệt',
  approved: 'Đã duyệt',
  rejected: 'Từ chối',
};

const statusVariants: Record<ModerationStatus, 'warning' | 'success' | 'error'> = {
  pending: 'warning',
  approved: 'success',
  rejected: 'error',
};

export function ContentModerationQueue({
  items,
  onApprove,
  onReject,
  onFilterChange,
  currentFilter = 'all',
  isLoading = false,
  pagination,
}: ContentModerationQueueProps) {
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const filterTabs = [
    { id: 'all', label: 'Tất cả' },
    { id: 'pending', label: 'Chờ duyệt' },
    { id: 'approved', label: 'Đã duyệt' },
    { id: 'rejected', label: 'Từ chối' },
  ];

  const handleRejectClick = (itemId: string) => {
    setSelectedItemId(itemId);
    setRejectDialogOpen(true);
  };

  const handleRejectConfirm = () => {
    if (selectedItemId) {
      onReject(selectedItemId, rejectionReason || undefined);
      setRejectDialogOpen(false);
      setSelectedItemId(null);
      setRejectionReason('');
    }
  };

  const formatTimestamp = (timestamp: string) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { 
        addSuffix: true, 
        locale: vi 
      });
    } catch {
      return timestamp;
    }
  };

  const truncateContent = (content: string, maxLength: number = 100) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  const columns = [
    {
      key: 'content',
      header: 'Nội dung',
      render: (item: ModerationItem) => (
        <div className="flex items-start gap-3 min-w-[300px]">
          {item.preview && (
            <img
              src={item.preview}
              alt="Preview"
              className={`w-16 h-16 object-cover ${designTokens.borderRadius.md}`}
              data-testid={`preview-${item.id}`}
            />
          )}
          <div className="flex-1">
            <p className="text-sm text-gray-900" data-testid={`content-${item.id}`}>
              {truncateContent(item.content)}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: 'user',
      header: 'Người dùng',
      render: (item: ModerationItem) => (
        <div className="flex items-center gap-2 min-w-[150px]">
          <AppleAvatar
            src={item.user.avatar}
            name={item.user.name}
            size="sm"
          />
          <span className="text-sm text-gray-900" data-testid={`user-${item.id}`}>
            {item.user.name}
          </span>
        </div>
      ),
    },
    {
      key: 'type',
      header: 'Loại',
      render: (item: ModerationItem) => (
        <AppleBadge
          variant="default"
          size="sm"
          className="inline-flex items-center gap-1"
          data-testid={`type-badge-${item.type}`}
        >
          {contentTypeIcons[item.type]}
          <span>{contentTypeLabels[item.type]}</span>
        </AppleBadge>
      ),
    },
    {
      key: 'timestamp',
      header: 'Thời gian',
      render: (item: ModerationItem) => (
        <span className="text-sm text-gray-600" data-testid={`timestamp-${item.id}`}>
          {formatTimestamp(item.timestamp)}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Trạng thái',
      render: (item: ModerationItem) => (
        <AppleBadge
          variant={statusVariants[item.status]}
          size="sm"
          data-testid={`status-badge-${item.status}`}
        >
          {statusLabels[item.status]}
        </AppleBadge>
      ),
    },
    {
      key: 'actions',
      header: 'Thao tác',
      render: (item: ModerationItem) => (
        <div className="flex items-center gap-2">
          {item.status === 'pending' && (
            <>
              <AppleButton
                size="sm"
                variant="primary"
                onClick={() => onApprove(item.id)}
                className="inline-flex items-center gap-1 !bg-green-600 hover:!bg-green-700"
                data-testid={`button-approve-${item.id}`}
              >
                <Check className="w-4 h-4" />
                Phê duyệt
              </AppleButton>
              <AppleButton
                size="sm"
                variant="primary"
                onClick={() => handleRejectClick(item.id)}
                className="inline-flex items-center gap-1 !bg-red-600 hover:!bg-red-700"
                data-testid={`button-reject-${item.id}`}
              >
                <X className="w-4 h-4" />
                Từ chối
              </AppleButton>
            </>
          )}
          {item.status === 'rejected' && item.reason && (
            <span className="text-xs text-gray-500" data-testid={`reason-${item.id}`}>
              Lý do: {item.reason}
            </span>
          )}
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="w-full space-y-4" data-testid="moderation-queue">
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <AppleSkeleton key={i} width={100} height={40} variant="rectangular" />
          ))}
        </div>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <AppleSkeleton key={i} width="100%" height={80} variant="rectangular" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6" data-testid="moderation-queue">
      <AppleTabs
        tabs={filterTabs.map((tab) => ({
          ...tab,
          id: tab.id,
        }))}
        activeTab={currentFilter}
        onChange={(tabId) => onFilterChange?.(tabId as ModerationStatus | 'all')}
      />

      {items.length === 0 ? (
        <EmptyState
          variant="noData"
          title="Không có nội dung cần kiểm duyệt"
          description="Chưa có nội dung nào cần được kiểm duyệt trong danh mục này"
        />
      ) : (
        <>
          <div className="overflow-x-auto">
            <AppleTable
              columns={columns}
              data={items.map((item) => ({
                ...item,
                'data-testid': `moderation-item-${item.id}`,
              }))}
              striped
              hoverable
            />
          </div>

          {pagination && pagination.totalPages > 1 && (
            <div className="flex justify-center" data-testid="pagination">
              <ApplePagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={pagination.onPageChange}
                showFirstLast
              />
            </div>
          )}
        </>
      )}

      {rejectDialogOpen && (
        <div
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="reject-dialog-title"
          className="fixed inset-0 flex items-center justify-center p-4"
          style={{ zIndex: designTokens.zIndex.modal }}
        >
          <div
            onClick={() => {
              setRejectDialogOpen(false);
              setSelectedItemId(null);
              setRejectionReason('');
            }}
            className="absolute inset-0 bg-black/50 animate-fade-in"
          />
          <div
            className={`
              max-w-md w-full
              bg-white ${designTokens.borderRadius.lg} ${designTokens.shadows.xl}
              relative animate-scale-in
              p-6
            `}
          >
            <h2 id="reject-dialog-title" className="text-lg font-semibold mb-2">
              Từ chối nội dung
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Vui lòng nhập lý do từ chối nội dung này (tùy chọn)
            </p>
            <div className="mb-6">
              <AppleTextarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Nhập lý do từ chối..."
                rows={4}
                data-testid="rejection-reason-input"
              />
            </div>
            <div className="flex gap-3 justify-end">
              <AppleButton
                variant="secondary"
                size="md"
                onClick={() => {
                  setRejectDialogOpen(false);
                  setSelectedItemId(null);
                  setRejectionReason('');
                }}
              >
                Hủy
              </AppleButton>
              <AppleButton
                variant="primary"
                size="md"
                onClick={handleRejectConfirm}
                className="!bg-red-600 hover:!bg-red-700"
              >
                Từ chối
              </AppleButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
