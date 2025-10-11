import { designTokens } from '@/constants/design-tokens';

type CommissionType = 'percentage' | 'fixed';
type CommissionSize = 'sm' | 'md' | 'lg';

interface CommissionBadgeProps {
  rate: number;
  type?: CommissionType;
  amount?: number;
  size?: CommissionSize;
}

const sizeConfig: Record<CommissionSize, { text: string; padding: string }> = {
  sm: { text: 'text-xs', padding: 'px-2 py-1' },
  md: { text: 'text-sm', padding: 'px-3 py-1.5' },
  lg: { text: 'text-base', padding: 'px-4 py-2' },
};

export function CommissionBadge({
  rate,
  type = 'percentage',
  amount,
  size = 'md',
}: CommissionBadgeProps) {
  const sizeInfo = sizeConfig[size];

  const getGradientClass = (): string => {
    if (type === 'percentage') {
      if (rate > 20) {
        return 'bg-gradient-to-r from-pink-500 to-orange-500';
      } else if (rate >= 10) {
        return 'bg-gradient-to-r from-blue-500 to-blue-600';
      } else {
        return 'bg-gray-500';
      }
    }
    return 'bg-gradient-to-r from-pink-500 to-orange-500';
  };

  const shouldShimmer = type === 'percentage' && rate > 20;

  const formatAmount = (value: number): string => {
    return value.toLocaleString('vi-VN');
  };

  const displayValue = type === 'percentage' 
    ? `${rate}%` 
    : `${formatAmount(amount || 0)}đ`;

  return (
    <span
      data-testid={`commission-badge-${rate}`}
      className={`
        ${designTokens.badge.base}
        ${sizeInfo.text}
        ${sizeInfo.padding}
        ${getGradientClass()}
        text-white
        font-semibold
        relative
        overflow-hidden
      `}
      aria-label={type === 'percentage' ? `Hoa hồng ${rate}%` : `Hoa hồng ${formatAmount(amount || 0)} đồng`}
    >
      {shouldShimmer && (
        <span
          className="absolute inset-0 shimmer-effect"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
            animation: 'shimmer 2s infinite',
          }}
        />
      )}
      <span className="relative z-10">{displayValue}</span>
      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </span>
  );
}
