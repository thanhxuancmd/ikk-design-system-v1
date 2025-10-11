import { designTokens } from '@/constants/design-tokens';

interface AppleLoadingProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  text?: string;
  fullScreen?: boolean;
}

const sizeMap = {
  sm: 'w-6 h-6 border-2',
  md: 'w-10 h-10 border-3',
  lg: 'w-16 h-16 border-4',
};

export function AppleLoading({
  size = 'md',
  color = '#ff0086',
  text,
  fullScreen = false,
}: AppleLoadingProps) {
  const spinner = (
    <div
      className="flex flex-col items-center justify-center gap-3"
      aria-live="polite"
      aria-busy="true"
    >
      <div
        data-testid="loading-spinner"
        className={`
          ${sizeMap[size]}
          rounded-full border-t-transparent
          animate-spin
        `}
        style={{ borderColor: `${color} transparent transparent transparent` }}
      />
      {text && (
        <p className="text-sm text-gray-600" data-testid="loading-text">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center bg-black/30"
        style={{ zIndex: designTokens.zIndex.modal }}
        data-testid="loading-fullscreen"
      >
        {spinner}
      </div>
    );
  }

  return spinner;
}
