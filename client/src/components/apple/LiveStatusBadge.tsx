import { designTokens } from '@/constants/design-tokens';
import { Clock } from 'lucide-react';

type LiveStatus = 'live' | 'offline' | 'scheduled';
type LiveStatusSize = 'sm' | 'md';

interface LiveStatusBadgeProps {
  status: LiveStatus;
  scheduledTime?: string;
  size?: LiveStatusSize;
}

const statusConfig: Record<LiveStatus, { label: string; color: string; bgColor: string }> = {
  live: { label: 'TRỰC TIẾP', color: 'text-white', bgColor: 'bg-red-600' },
  offline: { label: 'Ngoại tuyến', color: 'text-gray-700', bgColor: 'bg-gray-200' },
  scheduled: { label: 'Dự kiến', color: 'text-white', bgColor: 'bg-blue-600' },
};

const sizeConfig: Record<LiveStatusSize, { text: string; padding: string; dotSize: string }> = {
  sm: { text: 'text-xs', padding: 'px-2 py-1', dotSize: 'w-1.5 h-1.5' },
  md: { text: 'text-sm', padding: 'px-3 py-1.5', dotSize: 'w-2 h-2' },
};

export function LiveStatusBadge({
  status,
  scheduledTime,
  size = 'md',
}: LiveStatusBadgeProps) {
  const statusInfo = statusConfig[status];
  const sizeInfo = sizeConfig[size];

  const formatScheduledTime = (timeString: string): string => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
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
      aria-label={status === 'live' ? 'Đang phát trực tiếp' : status === 'scheduled' ? `Dự kiến lúc ${scheduledTime}` : 'Ngoại tuyến'}
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
          <Clock className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
        )}
        {status === 'offline' && (
          <span className={`${sizeInfo.dotSize} bg-gray-500 rounded-full`} />
        )}
        <span>
          {statusInfo.label}
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
