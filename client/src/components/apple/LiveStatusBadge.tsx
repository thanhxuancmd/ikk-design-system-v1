import { designTokens } from '@/constants/design-tokens';
import { IoTimeOutline } from 'react-icons/io5';

type LiveStatus = 'live' | 'offline' | 'scheduled';
type LiveStatusSize = 'sm' | 'md';

interface LiveStatusLabels {
  liveLabel?: string;
  offlineLabel?: string;
  scheduledLabel?: string;
  liveAriaLabel?: string;
  offlineAriaLabel?: string;
  scheduledAriaLabel?: string;
}

interface LiveStatusBadgeProps {
  status: LiveStatus;
  scheduledTime?: string;
  size?: LiveStatusSize;
  labels?: Partial<LiveStatusLabels>;
  locale?: string;
}

const defaultLabels: LiveStatusLabels = {
  liveLabel: 'TRỰC TIẾP',
  offlineLabel: 'Ngoại tuyến',
  scheduledLabel: 'Dự kiến',
  liveAriaLabel: 'Đang phát trực tiếp',
  offlineAriaLabel: 'Ngoại tuyến',
  scheduledAriaLabel: 'Dự kiến lúc',
};

const statusConfigColors: Record<LiveStatus, { color: string; bgColor: string }> = {
  live: { color: 'text-white', bgColor: 'bg-red-600' },
  offline: { color: 'text-gray-700', bgColor: 'bg-gray-200' },
  scheduled: { color: 'text-white', bgColor: 'bg-blue-600' },
};

const sizeConfig: Record<LiveStatusSize, { text: string; padding: string; dotSize: string }> = {
  sm: { text: 'text-xs', padding: 'px-2 py-1', dotSize: 'w-1.5 h-1.5' },
  md: { text: 'text-sm', padding: 'px-3 py-1.5', dotSize: 'w-2 h-2' },
};

export function LiveStatusBadge({
  status,
  scheduledTime,
  size = 'md',
  labels: customLabels,
  locale = 'vi-VN',
}: LiveStatusBadgeProps) {
  const labels = { ...defaultLabels, ...customLabels };
  const statusInfo = statusConfigColors[status];
  const sizeInfo = sizeConfig[size];
  
  const getStatusLabel = (status: LiveStatus): string => {
    const labelMap = {
      live: labels.liveLabel,
      offline: labels.offlineLabel,
      scheduled: labels.scheduledLabel,
    };
    return labelMap[status] || status;
  };

  const formatScheduledTime = (timeString: string): string => {
    const date = new Date(timeString);
    return date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <span
      data-testid={`live-status-${status}`}
      className={`
        ${designTokens.badge.base}
        ${sizeInfo.text}
        ${sizeInfo.padding}
        ${statusInfo.bgColor}
        ${statusInfo.color}
        font-semibold
        relative
      `}
      aria-label={status === 'live' ? labels.liveAriaLabel : status === 'scheduled' ? `${labels.scheduledAriaLabel} ${scheduledTime}` : labels.offlineAriaLabel}
    >
      <span className="flex items-center gap-2">
        {status === 'live' && (
          <span className="relative flex items-center justify-center">
            <span
              className={`${sizeInfo.dotSize} bg-white rounded-full animate-pulse`}
              style={{
                animation: 'pulse-dot 1.5s ease-in-out infinite',
              }}
            />
            <span
              className={`absolute ${sizeInfo.dotSize} bg-white rounded-full opacity-75`}
              style={{
                animation: 'ping-dot 1.5s ease-in-out infinite',
              }}
            />
          </span>
        )}
        {status === 'scheduled' && scheduledTime && (
          <IoTimeOutline className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
        )}
        {status === 'offline' && (
          <span className={`${sizeInfo.dotSize} bg-gray-500 rounded-full`} />
        )}
        <span>
          {getStatusLabel(status)}
          {status === 'scheduled' && scheduledTime && ` ${formatScheduledTime(scheduledTime)}`}
        </span>
      </span>
      <style>{`
        @keyframes pulse-dot {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        @keyframes ping-dot {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </span>
  );
}
