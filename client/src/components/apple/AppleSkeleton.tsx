interface AppleSkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  className?: string;
  animation?: 'pulse' | 'wave';
}

export function AppleSkeleton({
  variant = 'text',
  width,
  height,
  className = '',
  animation = 'pulse',
}: AppleSkeletonProps) {
  const variantStyles = {
    text: 'rounded h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const animationClass = animation === 'pulse' ? 'animate-pulse' : 'animate-wave';

  const style: React.CSSProperties = {};
  if (width) {
    style.width = typeof width === 'number' ? `${width}px` : width;
  }
  if (height) {
    style.height = typeof height === 'number' ? `${height}px` : height;
  }

  // Set default dimensions for circular variant
  if (variant === 'circular' && !width && !height) {
    style.width = '40px';
    style.height = '40px';
  }

  return (
    <div
      data-testid={`skeleton-${variant}`}
      className={`
        ${variantStyles[variant]}
        ${animationClass}
        bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200
        ${className}
      `}
      style={style}
    />
  );
}
