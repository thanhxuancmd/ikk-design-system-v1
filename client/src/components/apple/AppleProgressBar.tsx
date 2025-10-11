import { designTokens } from '@/constants/design-tokens';

export type ProgressSize = 'sm' | 'md' | 'lg';
export type ProgressVariant = 'determinate' | 'indeterminate';
export type ProgressColor = 'primary' | 'success' | 'warning' | 'error';

interface AppleProgressBarProps {
  value: number;
  size?: ProgressSize;
  variant?: ProgressVariant;
  color?: ProgressColor;
  showLabel?: boolean;
  label?: string;
  className?: string;
}

const sizeMap: Record<ProgressSize, string> = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
};

const colorMap: Record<ProgressColor, string> = {
  primary: designTokens.colors.primary.DEFAULT,
  success: designTokens.colors.semantic.success,
  warning: designTokens.colors.semantic.warning,
  error: designTokens.colors.semantic.error,
};

export function AppleProgressBar({
  value,
  size = 'md',
  variant = 'determinate',
  color = 'primary',
  showLabel = false,
  label,
  className = '',
}: AppleProgressBarProps) {
  const normalizedValue = Math.min(Math.max(value, 0), 100);
  const heightClass = sizeMap[size];
  const fillColor = colorMap[color];
  
  const displayLabel = label || `${normalizedValue}%`;
  const ariaLabel = variant === 'indeterminate' 
    ? 'Đang tải' 
    : `Tiến độ: ${normalizedValue}%`;

  return (
    <div 
      className={`flex items-center gap-3 ${className}`}
      data-testid="progress-bar"
    >
      <div 
        className={`flex-1 bg-gray-200 rounded-full overflow-hidden ${heightClass}`}
        data-testid="progress-track"
        role="progressbar"
        aria-valuenow={variant === 'determinate' ? normalizedValue : undefined}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={ariaLabel}
      >
        {variant === 'determinate' ? (
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ 
              width: `${normalizedValue}%`,
              backgroundColor: fillColor 
            }}
            data-testid="progress-fill"
          />
        ) : (
          <div
            className="h-full w-1/4 rounded-full"
            style={{ 
              backgroundColor: fillColor,
              animation: 'progress-indeterminate 1.5s ease-in-out infinite'
            }}
            data-testid="progress-fill"
          />
        )}
      </div>
      
      {showLabel && (
        <span 
          className="text-sm font-medium text-gray-700"
          data-testid="progress-label"
        >
          {displayLabel}
        </span>
      )}
    </div>
  );
}
