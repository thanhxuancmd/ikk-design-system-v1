import { useState } from 'react';
import { IoCheckmarkOutline, IoCloseOutline, IoVideocamOutline, IoChatboxOutline, IoCubeOutline, IoDocumentTextOutline } from 'react-icons/io5';
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

export interface ContentModerationLabels {
  // Tabs
  allTab?: string;
  pendingTab?: string;
  approvedTab?: string;
  rejectedTab?: string;
  
  // Actions
  approveButton?: string;
  rejectButton?: string;
  
  // Status badges
  pendingStatus?: string;
  approvedStatus?: string;
  rejectedStatus?: string;
  
  // Table headers
  contentColumn?: string;
  userColumn?: string;
  typeColumn?: string;
  timeColumn?: string;
  statusColumn?: string;
  actionsColumn?: string;
  
  // Content types
  streamType?: string;
  commentType?: string;
  productType?: string;
  postType?: string;
  
  // Empty state
  emptyTitle?: string;
  emptyDescription?: string;
  
  // Dialog
  rejectDialogTitle?: string;
  rejectDialogDescription?: string;
  rejectReasonPlaceholder?: string;
  cancelButton?: string;
  rejectDialogButton?: string;
  
  // Other
  reasonPrefix?: string;
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
  labels?: Partial<ContentModerationLabels>;
}

const defaultLabels: ContentModerationLabels = {
  // Tabs
  allTab: 'Tất cả',
  pendingTab: 'Chờ duyệt',
  approvedTab: 'Đã duyệt',
  rejectedTab: 'Từ chối',
  
  // Actions
  approveButton: 'Phê duyệt',
  rejectButton: 'Từ chối',
  
  // Status badges
  pendingStatus: 'Chờ duyệt',
  approvedStatus: 'Đã duyệt',
  rejectedStatus: 'Từ chối',
  
  // Table headers
  contentColumn: 'Nội dung',
  userColumn: 'Người dùng',
  typeColumn: 'Loại',
  timeColumn: 'Thời gian',
  statusColumn: 'Trạng thái',
  actionsColumn: 'Thao tác',
  
  // Content types
  streamType: 'Livestream',
  commentType: 'Bình luận',
  productType: 'Sản phẩm',
  postType: 'Bài viết',
  
  // Empty state
  emptyTitle: 'Không có nội dung cần kiểm duyệt',
  emptyDescription: 'Chưa có nội dung nào cần được kiểm duyệt trong danh mục này',
  
  // Dialog
  rejectDialogTitle: 'Từ chối nội dung',
  rejectDialogDescription: 'Vui lòng nhập lý do từ chối nội dung này (tùy chọn)',
  rejectReasonPlaceholder: 'Nhập lý do từ chối...',
  cancelButton: 'Hủy',
  rejectDialogButton: 'Từ chối',
  
  // Other
  reasonPrefix: 'Lý do:',
};

const contentTypeIcons: Record<ContentType, JSX.Element> = {
  stream: <IoVideocamOutline className="w-4 h-4" />,
  comment: <IoChatboxOutline className="w-4 h-4" />,
  product: <IoCubeOutline className="w-4 h-4" />,
  post: <IoDocumentTextOutline className="w-4 h-4" />,
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
  labels: customLabels,
}: ContentModerationQueueProps) {
  const labels = { ...defaultLabels, ...customLabels };
  
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const contentTypeLabels: Record<ContentType, string> = {
    stream: labels.streamType!,
    comment: labels.commentType!,
    product: labels.productType!,
    post: labels.postType!,
  };

  const statusLabels: Record<ModerationStatus, string> = {
    pending: labels.pendingStatus!,
    approved: labels.approvedStatus!,
    rejected: labels.rejectedStatus!,
  };

  const filterTabs = [
    { id: 'all', label: labels.allTab! },
    { id: 'pending', label: labels.pendingTab! },
    { id: 'approved', label: labels.approvedTab! },
    { id: 'rejected', label: labels.rejectedTab! },
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
      header: labels.contentColumn!,
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
      header: labels.userColumn!,
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
      header: labels.typeColumn!,
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
      header: labels.timeColumn!,
      render: (item: ModerationItem) => (
        <span className="text-sm text-gray-600" data-testid={`timestamp-${item.id}`}>
          {formatTimestamp(item.timestamp)}
        </span>
      ),
    },
    {
      key: 'status',
      header: labels.statusColumn!,
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
      header: labels.actionsColumn!,
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
                <IoCheckmarkOutline className="w-4 h-4" />
                {labels.approveButton}
              </AppleButton>
              <AppleButton
                size="sm"
                variant="primary"
                onClick={() => handleRejectClick(item.id)}
                className="inline-flex items-center gap-1 !bg-red-600 hover:!bg-red-700"
                data-testid={`button-reject-${item.id}`}
              >
                <IoCloseOutline className="w-4 h-4" />
                {labels.rejectButton}
              </AppleButton>
            </>
          )}
          {item.status === 'rejected' && item.reason && (
            <span className="text-xs text-gray-500" data-testid={`reason-${item.id}`}>
              {labels.reasonPrefix} {item.reason}
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
          title={labels.emptyTitle!}
          description={labels.emptyDescription!}
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
              {labels.rejectDialogTitle}
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              {labels.rejectDialogDescription}
            </p>
            <div className="mb-6">
              <AppleTextarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder={labels.rejectReasonPlaceholder}
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
                {labels.cancelButton}
              </AppleButton>
              <AppleButton
                variant="primary"
                size="md"
                onClick={handleRejectConfirm}
                className="!bg-red-600 hover:!bg-red-700"
              >
                {labels.rejectDialogButton}
              </AppleButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
