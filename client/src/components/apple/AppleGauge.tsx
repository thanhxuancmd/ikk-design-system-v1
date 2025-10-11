import { designTokens } from '@/constants/design-tokens';

export type GaugeSize = 'sm' | 'md' | 'lg';

interface AppleGaugeProps {
  value: number;
  size?: GaugeSize;
  showValue?: boolean;
  label?: string;
  thickness?: number;
  autoColor?: boolean;
  color?: string;
  className?: string;
}

const sizeMap: Record<GaugeSize, number> = {
  sm: 80,
  md: 120,
  lg: 160,
};

const textSizeMap: Record<GaugeSize, string> = {
  sm: 'text-xl',
  md: 'text-2xl',
  lg: 'text-3xl',
};

export function AppleGauge({
  value,
  size = 'md',
  showValue = true,
  label,
  thickness = 8,
  autoColor = true,
  color,
  className = '',
}: AppleGaugeProps) {
  const normalizedValue = Math.min(Math.max(value, 0), 100);
  const diameter = sizeMap[size];
  const textSize = textSizeMap[size];
  
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * normalizedValue) / 100;

  const getAutoColor = (): string => {
    if (normalizedValue >= 70) {
      return designTokens.colors.semantic.success;
    } else if (normalizedValue >= 40) {
      return designTokens.colors.semantic.warning;
    } else {
      return designTokens.colors.semantic.error;
    }
  };

  const progressColor = color || (autoColor ? getAutoColor() : designTokens.colors.primary.DEFAULT);
  const trackColor = designTokens.colors.neutral[200];

  const ariaLabel = label 
    ? `${label}: ${normalizedValue}%` 
    : `Tiến độ: ${normalizedValue}%`;

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: diameter, height: diameter }}
      role="progressbar"
      aria-valuenow={normalizedValue}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={ariaLabel}
      data-testid="gauge"
    >
      <svg
        className="transform -rotate-90"
        width={diameter}
        height={diameter}
        viewBox="0 0 100 100"
        data-testid="gauge-svg"
      >
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={thickness}
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={progressColor}
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-300"
        />
      </svg>
      
      {showValue && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={`${textSize} font-bold text-gray-900`}
            data-testid="gauge-value"
          >
            {normalizedValue}%
          </span>
          {label && (
            <span
              className="text-xs text-gray-500 mt-0.5"
              data-testid="gauge-label"
            >
              {label}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
