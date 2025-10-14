import { designTokens } from '@/constants/design-tokens';
import { AppleAvatar, AppleBadge } from '@/components/apple';
import { IoStarOutline, IoCheckmarkCircleOutline, IoPeopleOutline, IoTrendingUpOutline } from 'react-icons/io5';

type KOCLevel = 'Nano' | 'Micro' | 'Macro' | 'Celebrity';

interface KOCCardLabels {
  verifiedLabel?: string;
  followersLabel?: string;
  campaignsLabel?: string;
  nanoLabel?: string;
  microLabel?: string;
  macroLabel?: string;
  celebrityLabel?: string;
}

interface KOCCardProps {
  id: string;
  name: string;
  avatar?: string;
  level: KOCLevel;
  followers: number;
  rating: number;
  completedCampaigns: number;
  categories: string[];
  isVerified: boolean;
  onClick?: () => void;
  labels?: Partial<KOCCardLabels>;
  locale?: string;
}

const defaultLabels: KOCCardLabels = {
  verifiedLabel: 'Đã xác minh',
  followersLabel: 'Người theo dõi',
  campaignsLabel: 'Chiến dịch',
  nanoLabel: 'Nano',
  microLabel: 'Micro',
  macroLabel: 'Macro',
  celebrityLabel: 'Celebrity',
};

const levelConfig: Record<KOCLevel, { color: string; variant: 'default' | 'info' | 'success' | 'warning' | 'error' }> = {
  Nano: { color: 'bg-blue-100 text-blue-800', variant: 'info' },
  Micro: { color: 'bg-green-100 text-green-800', variant: 'success' },
  Macro: { color: 'bg-purple-100 text-purple-800', variant: 'warning' },
  Celebrity: { color: 'bg-pink-100 text-pink-800', variant: 'error' },
};

export function KOCCard({
  id,
  name,
  avatar,
  level,
  followers,
  rating,
  completedCampaigns,
  categories,
  isVerified,
  onClick,
  labels: customLabels,
  locale = 'vi-VN',
}: KOCCardProps) {
  const labels = { ...defaultLabels, ...customLabels };
  
  const formatFollowers = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toLocaleString(locale);
  };
  
  const getLevelLabel = (level: KOCLevel): string => {
    const labelMap = {
      Nano: labels.nanoLabel,
      Micro: labels.microLabel,
      Macro: labels.macroLabel,
      Celebrity: labels.celebrityLabel,
    };
    return labelMap[level] || level;
  };

  const levelInfo = levelConfig[level];

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <IoStarOutline
            key={i}
            className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400"
          />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <IoStarOutline
            key={i}
            className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400"
            style={{ clipPath: 'inset(0 50% 0 0)' }}
          />
        );
      } else {
        stars.push(
          <IoStarOutline
            key={i}
            className="w-3.5 h-3.5 text-gray-300"
          />
        );
      }
    }
    return stars;
  };

  return (
    <article
      data-testid={`koc-card-${id}`}
      className={`
        ${designTokens.borderRadius.md}
        ${designTokens.shadows.md}
        ${designTokens.transitions.base}
        bg-white
        overflow-hidden
        ${onClick ? 'cursor-pointer hover:shadow-xl' : ''}
        max-w-sm
      `}
      onClick={onClick}
      aria-label={`${name} - ${level} KOC${isVerified ? ' (Verified)' : ''}`}
    >
      {/* Header Section */}
      <div className="p-6 pb-4">
        <div className="flex items-start gap-4">
          <AppleAvatar
            src={avatar}
            name={name}
            size="lg"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3
                className="font-semibold text-gray-900 text-lg truncate"
                data-testid={`koc-name-${id}`}
              >
                {name}
              </h3>
              {isVerified && (
                <IoCheckmarkCircleOutline
                  className="w-5 h-5 text-[#ff0086] flex-shrink-0"
                  data-testid={`verified-badge-${id}`}
                  aria-label={labels.verifiedLabel}
                />
              )}
            </div>
            
            {/* Level Badge */}
            <div className="mt-2">
              <AppleBadge
                variant={levelInfo.variant}
                size="sm"
                data-testid={`level-badge-${id}`}
              >
                {getLevelLabel(level)}
              </AppleBadge>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-0.5" data-testid={`koc-rating-${id}`}>
                {renderStars(rating)}
              </div>
              <span className="text-sm text-gray-600" data-testid={`rating-value-${id}`}>
                {rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="px-6 pb-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <IoPeopleOutline className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">{labels.followersLabel}</p>
              <p className="font-semibold text-gray-900" data-testid={`followers-${id}`}>
                {formatFollowers(followers)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <IoTrendingUpOutline className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">{labels.campaignsLabel}</p>
              <p className="font-semibold text-gray-900" data-testid={`campaigns-${id}`}>
                {completedCampaigns}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      {categories.length > 0 && (
        <div className="px-6 pb-6 pt-2 border-t border-gray-100">
          <div className="flex flex-wrap gap-1.5" data-testid={`categories-${id}`}>
            {categories.slice(0, 3).map((category, index) => (
              <AppleBadge
                key={index}
                variant="default"
                size="sm"
                data-testid={`category-${id}-${index}`}
              >
                {category}
              </AppleBadge>
            ))}
            {categories.length > 3 && (
              <AppleBadge
                variant="default"
                size="sm"
                data-testid={`category-more-${id}`}
              >
                +{categories.length - 3}
              </AppleBadge>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
