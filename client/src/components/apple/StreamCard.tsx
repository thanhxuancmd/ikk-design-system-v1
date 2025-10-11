import { designTokens } from '@/constants/design-tokens';
import { AppleAvatar, AppleBadge } from '@/components/apple';
import { Eye } from 'lucide-react';

interface StreamCardProps {
  id: string;
  title: string;
  streamerName: string;
  streamerAvatar?: string;
  thumbnail: string;
  viewerCount: number;
  isLive: boolean;
  category: string;
  variant?: 'default' | 'compact';
  onClick?: () => void;
}

export function StreamCard({
  id,
  title,
  streamerName,
  streamerAvatar,
  thumbnail,
  viewerCount,
  isLive,
  category,
  variant = 'default',
  onClick,
}: StreamCardProps) {
  const isCompact = variant === 'compact';
  
  const formatViewerCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <article
      data-testid={`stream-card-${id}`}
      className={`
        ${designTokens.borderRadius.md}
        ${designTokens.shadows.md}
        ${designTokens.transitions.base}
        bg-white
        overflow-hidden
        ${onClick ? 'cursor-pointer hover:shadow-xl' : ''}
        ${isCompact ? 'max-w-sm' : 'max-w-md'}
      `}
      onClick={onClick}
      aria-label={`${title} by ${streamerName}`}
    >
      {/* Thumbnail with Live Badge Overlay */}
      <div className="relative">
        <div className={`relative ${isCompact ? 'h-40' : 'h-48'} overflow-hidden bg-gray-100`}>
          <img
            src={thumbnail}
            alt={`${title} thumbnail`}
            className="w-full h-full object-cover"
            data-testid={`stream-thumbnail-${id}`}
          />
        </div>
        
        {/* Live Badge Overlay */}
        {isLive && (
          <div
            className="absolute top-3 left-3 bg-[#ff0086] text-white px-2.5 py-1 rounded-md font-semibold text-xs flex items-center gap-1.5"
            data-testid={`live-badge-${id}`}
            aria-label="Live stream"
          >
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            TRỰC TIẾP
          </div>
        )}
        
        {/* Viewer Count */}
        <div
          className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1.5"
          data-testid={`viewer-count-${id}`}
          aria-label={`${viewerCount} viewers`}
        >
          <Eye className="w-3.5 h-3.5" />
          {formatViewerCount(viewerCount)} người xem
        </div>
      </div>

      {/* Stream Info */}
      <div className={`p-4 ${isCompact ? 'space-y-2' : 'space-y-3'}`}>
        <div className="flex items-start gap-3">
          <AppleAvatar
            src={streamerAvatar}
            name={streamerName}
            size={isCompact ? 'sm' : 'md'}
          />
          <div className="flex-1 min-w-0">
            <h3
              className={`font-semibold text-gray-900 line-clamp-2 ${isCompact ? 'text-sm' : 'text-base'}`}
              data-testid={`stream-title-${id}`}
            >
              {title}
            </h3>
            <p
              className={`text-gray-600 mt-1 ${isCompact ? 'text-xs' : 'text-sm'}`}
              data-testid={`streamer-name-${id}`}
            >
              {streamerName}
            </p>
          </div>
        </div>
        
        <AppleBadge variant="default" size="sm">
          {category}
        </AppleBadge>
      </div>
    </article>
  );
}
