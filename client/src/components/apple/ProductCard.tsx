import { designTokens } from '@/constants/design-tokens';
import { AppleBadge } from '@/components/apple';
import { Star } from 'lucide-react';

interface ProductCardLabels {
  discountPrefix?: string;
  soldPrefix?: string;
}

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  rating?: number;
  soldCount?: number;
  badges?: string[];
  onClick?: () => void;
  currencySymbol?: string;
  locale?: string;
  labels?: Partial<ProductCardLabels>;
}

const defaultLabels: ProductCardLabels = {
  discountPrefix: 'Giảm',
  soldPrefix: 'Đã bán',
};

export function ProductCard({
  id,
  name,
  price,
  originalPrice,
  discount,
  image,
  rating,
  soldCount,
  badges = [],
  onClick,
  currencySymbol = 'đ',
  locale = 'vi-VN',
  labels: customLabels,
}: ProductCardProps) {
  const labels = { ...defaultLabels, ...customLabels };
  
  const formatPrice = (amount: number): string => {
    return amount.toLocaleString(locale);
  };

  const calculateDiscount = (): number => {
    if (discount) return discount;
    if (originalPrice && originalPrice > price) {
      return Math.round(((originalPrice - price) / originalPrice) * 100);
    }
    return 0;
  };

  const discountPercentage = calculateDiscount();

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star
            key={i}
            className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400"
            data-testid={`star-filled-${i}`}
          />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Star
            key={i}
            className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400"
            style={{ clipPath: 'inset(0 50% 0 0)' }}
            data-testid={`star-half-${i}`}
          />
        );
      } else {
        stars.push(
          <Star
            key={i}
            className="w-3.5 h-3.5 text-gray-300"
            data-testid={`star-empty-${i}`}
          />
        );
      }
    }
    return stars;
  };

  return (
    <article
      data-testid={`product-card-${id}`}
      className={`
        ${designTokens.borderRadius.md}
        ${designTokens.shadows.md}
        ${designTokens.transitions.base}
        bg-white
        overflow-hidden
        ${onClick ? 'cursor-pointer hover:shadow-xl' : ''}
        max-w-sm
      `}
      onClick={onClick}
      aria-label={`${name} - ${formatPrice(price)}đ`}
    >
      {/* Product Image */}
      <div className="relative">
        <div className="relative h-56 overflow-hidden bg-gray-100">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
            data-testid={`product-image-${id}`}
          />
        </div>

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div
            className="absolute top-3 left-3 bg-[#ff0086] text-white px-2.5 py-1 rounded-md font-bold text-xs"
            data-testid={`discount-badge-${id}`}
            aria-label={`${discountPercentage}% discount`}
          >
            {labels.discountPrefix} {discountPercentage}%
          </div>
        )}

        {/* Additional Badges */}
        {badges.length > 0 && (
          <div className="absolute top-3 right-3 flex flex-col gap-1.5">
            {badges.map((badge, index) => (
              <AppleBadge
                key={index}
                variant="info"
                size="sm"
                className="shadow-sm"
                data-testid={`badge-${id}-${index}`}
              >
                {badge}
              </AppleBadge>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        <h3
          className="font-semibold text-gray-900 line-clamp-2 text-base leading-snug"
          data-testid={`product-name-${id}`}
        >
          {name}
        </h3>

        {/* Rating */}
        {rating !== undefined && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5" data-testid={`rating-${id}`}>
              {renderStars(rating)}
            </div>
            <span className="text-xs text-gray-600" data-testid={`rating-value-${id}`}>
              {rating.toFixed(1)}
            </span>
          </div>
        )}

        {/* Price Section */}
        <div className="flex items-baseline gap-2 flex-wrap">
          <span
            className="text-[#ff0086] font-bold text-xl"
            data-testid={`price-${id}`}
            aria-label={`Price: ${formatPrice(price)} Vietnamese Dong`}
          >
            {formatPrice(price)}{currencySymbol}
          </span>
          {originalPrice && originalPrice > price && (
            <span
              className="text-gray-400 line-through text-sm"
              data-testid={`original-price-${id}`}
              aria-label={`Original price: ${formatPrice(originalPrice)} Vietnamese Dong`}
            >
              {formatPrice(originalPrice)}{currencySymbol}
            </span>
          )}
        </div>

        {/* Sold Count */}
        {soldCount !== undefined && (
          <div className="text-xs text-gray-600" data-testid={`sold-count-${id}`}>
            {labels.soldPrefix} {formatPrice(soldCount)}
          </div>
        )}
      </div>
    </article>
  );
}
