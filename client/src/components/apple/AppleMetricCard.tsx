import { ReactNode } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { designTokens } from '@/constants/design-tokens';

interface AppleMetricCardProps {
  title: string;
  value: number | string;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  prefix?: string;
  suffix?: string;
  description?: string;
  icon?: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error';
  valueTestId?: string;
}

export function AppleMetricCard({
  title,
  value,
  change,
  trend = 'neutral',
  prefix,
  suffix,
  description,
  icon,
  variant = 'default',
  valueTestId = 'metric-value',
}: AppleMetricCardProps) {
  const formatValue = (val: number | string): string => {
    if (typeof val === 'number') {
      return val.toLocaleString('vi-VN');
    }
    return val;
  };

  const trendStyles = {
    up: 'text-green-600 bg-green-50',
    down: 'text-red-600 bg-red-50',
    neutral: 'text-gray-600 bg-gray-50',
  };

  const trendIcons = {
    up: <TrendingUp className="w-4 h-4" />,
    down: <TrendingDown className="w-4 h-4" />,
    neutral: <Minus className="w-4 h-4" />,
  };

  const variantColors = {
    default: 'text-gray-900',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    error: 'text-red-600',
  };

  return (
    <div
      data-testid="metric-card"
      className={`
        bg-white border border-gray-200
        ${designTokens.borderRadius.md}
        ${designTokens.shadows.sm}
        p-6
      `}
    >
      <div className="flex items-center gap-2 mb-3">
        {icon && (
          <div className="flex-shrink-0 text-gray-600">
            {icon}
          </div>
        )}
        <h3 data-testid="metric-title" className="text-sm font-medium text-gray-600">
          {title}
        </h3>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:gap-3 mb-2">
        <p
          data-testid={valueTestId}
          className={`text-3xl font-bold ${variantColors[variant]}`}
        >
          {prefix && <span>{prefix}</span>}
          {formatValue(value)}
          {suffix && <span>{suffix}</span>}
        </p>

        {change !== undefined && change !== null && !isNaN(change) && (
          <div
            data-testid="metric-trend"
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-md ${trendStyles[trend]} mt-2 md:mt-0 self-start`}
          >
            {trendIcons[trend]}
            <span className="text-sm font-medium">
              {change > 0 ? '+' : change < 0 ? '-' : ''}
              {new Intl.NumberFormat('vi-VN', {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              }).format(Math.abs(change))}%
            </span>
          </div>
        )}
      </div>

      {description && (
        <p className="text-sm text-gray-500">
          {description}
        </p>
      )}
    </div>
  );
}
