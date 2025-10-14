import { designTokens } from '@/constants/design-tokens';
import { AppleBadge } from '@/components/apple';
import { IoCalendarOutline, IoPeopleOutline, IoTrophyOutline } from 'react-icons/io5';

type CampaignType = 'review' | 'checkin' | 'cpi' | 'cpa' | 'seeding';
type CampaignStatus = 'draft' | 'recruiting' | 'in-progress' | 'completed';

interface CampaignCardLabels {
  draftLabel?: string;
  recruitingLabel?: string;
  inProgressLabel?: string;
  completedLabel?: string;
  rewardLabel?: string;
  pointsLabel?: string;
  kocNeededLabel?: string;
  kocAppliedSuffix?: string;
  deadlineLabel?: string;
  expiredLabel?: string;
  todayLabel?: string;
  tomorrowLabel?: string;
  daysLabel?: string;
}

interface CampaignCardProps {
  id: string;
  title: string;
  brandName: string;
  brandLogo?: string;
  category: string;
  type: CampaignType;
  reward: number;
  kocNeeded: number;
  kocApplied: number;
  deadline: string;
  status: CampaignStatus;
  onClick?: () => void;
  labels?: Partial<CampaignCardLabels>;
  locale?: string;
}

const defaultLabels: CampaignCardLabels = {
  draftLabel: 'Bản nháp',
  recruitingLabel: 'Đang tuyển',
  inProgressLabel: 'Đang thực hiện',
  completedLabel: 'Hoàn thành',
  rewardLabel: 'Thưởng:',
  pointsLabel: 'điểm',
  kocNeededLabel: 'KOC cần',
  kocAppliedSuffix: 'KOC đã ứng tuyển',
  deadlineLabel: 'Hạn nộp:',
  expiredLabel: 'Đã hết hạn',
  todayLabel: 'Hôm nay',
  tomorrowLabel: 'Ngày mai',
  daysLabel: 'ngày',
};

const typeConfig: Record<CampaignType, { label: string; variant: 'default' | 'info' | 'success' | 'warning' | 'error' }> = {
  review: { label: 'Review', variant: 'info' },
  checkin: { label: 'Check-in', variant: 'success' },
  cpi: { label: 'CPI', variant: 'warning' },
  cpa: { label: 'CPA', variant: 'error' },
  seeding: { label: 'Seeding', variant: 'default' },
};

const statusConfigColors: Record<CampaignStatus, { color: string }> = {
  draft: { color: 'bg-gray-100 text-gray-800' },
  recruiting: { color: 'bg-blue-100 text-blue-800' },
  'in-progress': { color: 'bg-orange-100 text-orange-800' },
  completed: { color: 'bg-green-100 text-green-800' },
};

export function CampaignCard({
  id,
  title,
  brandName,
  brandLogo,
  category,
  type,
  reward,
  kocNeeded,
  kocApplied,
  deadline,
  status,
  onClick,
  labels: customLabels,
  locale = 'vi-VN',
}: CampaignCardProps) {
  const labels = { ...defaultLabels, ...customLabels };
  const typeInfo = typeConfig[type];
  const statusInfo = statusConfigColors[status];
  const progress = (kocApplied / kocNeeded) * 100;
  
  const getStatusLabel = (status: CampaignStatus): string => {
    const statusLabelMap = {
      draft: labels.draftLabel,
      recruiting: labels.recruitingLabel,
      'in-progress': labels.inProgressLabel,
      completed: labels.completedLabel,
    };
    return statusLabelMap[status] || status;
  };

  const formatDeadline = (dateString: string): string => {
    const deadlineDate = new Date(dateString);
    const now = new Date();
    const diffTime = deadlineDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return labels.expiredLabel || 'Expired';
    } else if (diffDays === 0) {
      return labels.todayLabel || 'Today';
    } else if (diffDays === 1) {
      return labels.tomorrowLabel || 'Tomorrow';
    } else if (diffDays < 7) {
      return `${diffDays} ${labels.daysLabel || 'days'}`;
    } else {
      return deadlineDate.toLocaleDateString(locale);
    }
  };

  const formatReward = (amount: number): string => {
    return amount.toLocaleString(locale);
  };

  return (
    <article
      data-testid={`campaign-card-${id}`}
      className={`
        ${designTokens.borderRadius.md}
        ${designTokens.shadows.md}
        ${designTokens.transitions.base}
        bg-white
        overflow-hidden
        ${onClick ? 'cursor-pointer hover:shadow-xl' : ''}
        max-w-md
      `}
      onClick={onClick}
      aria-label={`${title} - ${brandName} - ${getStatusLabel(status)}`}
    >
      {/* Header Section */}
      <div className="p-6 pb-4">
        <div className="flex items-start gap-4">
          {brandLogo && (
            <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
              <img
                src={brandLogo}
                alt={brandName}
                className="w-full h-full object-cover"
                data-testid={`brand-logo-${id}`}
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-sm text-gray-600"
                data-testid={`brand-name-${id}`}
              >
                {brandName}
              </span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500">{category}</span>
            </div>
            <h3
              className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2"
              data-testid={`campaign-title-${id}`}
            >
              {title}
            </h3>
            <div className="flex items-center gap-2">
              <AppleBadge
                variant={typeInfo.variant}
                size="sm"
                data-testid={`type-badge-${id}`}
              >
                {typeInfo.label}
              </AppleBadge>
              <span
                className={`
                  ${designTokens.badge.base}
                  ${designTokens.badge.sizes.sm}
                  ${statusInfo.color}
                `}
                data-testid={`status-badge-${id}`}
              >
                {getStatusLabel(status)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Reward Section */}
      <div className="px-6 pb-4">
        <div className="flex items-center gap-2">
          <IoTrophyOutline className="w-4 h-4 text-[#ff0086]" />
          <span className="text-sm text-gray-600">{labels.rewardLabel}</span>
          <span
            className="font-semibold text-[#ff0086]"
            data-testid={`reward-${id}`}
          >
            {formatReward(reward)} {labels.pointsLabel}
          </span>
        </div>
      </div>

      {/* KOC Progress Section */}
      <div className="px-6 pb-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <IoPeopleOutline className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">{labels.kocNeededLabel}</span>
            </div>
            <span
              className="font-semibold text-gray-900"
              data-testid={`koc-progress-${id}`}
            >
              {kocApplied}/{kocNeeded}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-[#ff0086] h-full transition-all duration-300 rounded-full"
              style={{ width: `${Math.min(progress, 100)}%` }}
              data-testid={`progress-bar-${id}`}
              aria-label={`${progress.toFixed(0)}% ${labels.kocAppliedSuffix}`}
            />
          </div>
        </div>
      </div>

      {/* Deadline Section */}
      <div className="px-6 pb-6 pt-2 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <IoCalendarOutline className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{labels.deadlineLabel}</span>
          <span
            className="text-sm font-medium text-gray-900"
            data-testid={`deadline-${id}`}
          >
            {formatDeadline(deadline)}
          </span>
        </div>
      </div>
    </article>
  );
}
