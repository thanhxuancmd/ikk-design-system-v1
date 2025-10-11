import { designTokens } from '@/constants/design-tokens';

interface PriceDisplayProps {
  price: number;
  originalPrice?: number;
  showDiscount?: boolean;
  size?: 'sm' | 'md' | 'lg';
  currency?: string;
  className?: string;
}

export function PriceDisplay({
  price,
  originalPrice,
  showDiscount = true,
  size = 'md',
  currency = 'đ',
  className = '',
}: PriceDisplayProps) {
  const formatPrice = (amount: number): string => {
    return amount.toLocaleString('vi-VN');
  };

  const discount = originalPrice && originalPrice > price
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
  };

  const originalPriceSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const hasDiscount = originalPrice && discount > 0;

  return (
    <div
      data-testid={`price-display-${price}`}
      className={`flex items-center gap-2 ${className}`}
    >
      <span
        data-testid="price-current"
        className={`font-semibold text-gray-900 ${sizeClasses[size]}`}
      >
        {formatPrice(price)}{currency}
      </span>

      {hasDiscount && (
        <>
          <span
            data-testid="price-original"
            className={`line-through text-gray-400 ${originalPriceSizeClasses[size]}`}
          >
            {formatPrice(originalPrice)}{currency}
          </span>

          {showDiscount && (
            <span
              data-testid="price-discount-badge"
              className={`
                inline-flex items-center px-2 py-0.5 rounded-md
                bg-[#ff0086] text-white font-medium text-xs
                ${designTokens.transitions.base}
              `}
            >
              -{discount}%
            </span>
          )}
        </>
      )}
    </div>
  );
}
