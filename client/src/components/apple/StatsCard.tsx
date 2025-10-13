import { ReactNode, useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { designTokens } from '@/constants/design-tokens';

interface StatsCardChangeLabels {
  increaseLabel?: string;
  decreaseLabel?: string;
  neutralLabel?: string;
}

interface StatsCardProps {
  id: string;
  title: string;
  value: string | number;
  change?: number;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon?: ReactNode;
  color?: string;
  onClick?: () => void;
  className?: string;
  changeLabels?: Partial<StatsCardChangeLabels>;
  locale?: string;
}

const defaultChangeLabels: StatsCardChangeLabels = {
  increaseLabel: 'tăng',
  decreaseLabel: 'giảm',
  neutralLabel: '',
};

export function StatsCard({
  id,
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
  color,
  onClick,
  className = '',
  changeLabels: customChangeLabels,
  locale = 'vi-VN',
}: StatsCardProps) {
  const changeLabels = { ...defaultChangeLabels, ...customChangeLabels };
  const [displayValue, setDisplayValue] = useState<number>(0);
  const numericValue = typeof value === 'number' ? value : parseFloat(value) || 0;

  useEffect(() => {
    if (typeof value === 'number') {
      let start = 0;
      const end = value;
      const duration = 1000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setDisplayValue(end);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    } else {
      setDisplayValue(numericValue);
    }
  }, [value, numericValue]);

  const changeColors = {
    increase: 'text-green-600',
    decrease: 'text-red-600',
    neutral: 'text-gray-500',
  };

  const changeIcons = {
    increase: <TrendingUp className="w-4 h-4" />,
    decrease: <TrendingDown className="w-4 h-4" />,
    neutral: <Minus className="w-4 h-4" />,
  };

  const changeLabelMap = {
    increase: changeLabels.increaseLabel,
    decrease: changeLabels.decreaseLabel,
    neutral: changeLabels.neutralLabel,
  };

  return (
    <div
      data-testid={`stats-card-${id}`}
      onClick={onClick}
      className={`
        ${designTokens.borderRadius.md}
        ${designTokens.shadows.md}
        ${onClick ? 'cursor-pointer hover:' + designTokens.shadows.xl : ''}
        ${designTokens.transitions.base}
        bg-white p-6
        ${className}
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p
            data-testid={`stats-title-${id}`}
            className="text-sm font-medium text-gray-600 mb-2"
          >
            {title}
          </p>
          <p
            data-testid={`stats-value-${id}`}
            className="text-3xl font-bold text-gray-900"
            style={color ? { color } : undefined}
          >
            {typeof value === 'number' ? displayValue.toLocaleString(locale) : value}
          </p>

          {change !== undefined && (
            <div
              data-testid={`stats-change-${id}`}
              className={`flex items-center gap-1 mt-2 ${changeColors[changeType]}`}
            >
              {changeIcons[changeType]}
              <span className="text-sm font-medium">
                {Math.abs(change)}% {changeLabelMap[changeType]}
              </span>
            </div>
          )}
        </div>

        {icon && (
          <div
            data-testid={`stats-icon-${id}`}
            className="flex-shrink-0 ml-4"
            style={color ? { color } : undefined}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
