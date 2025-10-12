import { useState } from 'react';
import { Tag, X, Loader2 } from 'lucide-react';
import { designTokens } from '@/constants/design-tokens';

export interface VoucherInputProps {
  onApply: (code: string) => Promise<VoucherResult>;
  appliedVoucher?: AppliedVoucher;
  onRemove?: () => void;
  disabled?: boolean;
  className?: string;
}

export interface VoucherResult {
  success: boolean;
  discount?: {
    type: 'percentage' | 'fixed';
    value: number;
  };
  message?: string;
}

export interface AppliedVoucher {
  code: string;
  discount: {
    type: 'percentage' | 'fixed';
    value: number;
  };
}

function formatDiscount(discount: { type: 'percentage' | 'fixed'; value: number }): string {
  if (discount.type === 'percentage') {
    return `${discount.value}%`;
  }
  return `${discount.value.toLocaleString('vi-VN')}đ`;
}

export function VoucherInput({
  onApply,
  appliedVoucher,
  onRemove,
  disabled = false,
  className = '',
}: VoucherInputProps) {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApply = async () => {
    if (!code.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await onApply(code.toUpperCase());
      
      if (!result.success) {
        setError(result.message || 'Mã không hợp lệ');
      } else {
        setCode('');
      }
    } catch (err) {
      setError('Đã có lỗi xảy ra');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value.toUpperCase());
    setError(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !disabled && !isLoading && !appliedVoucher) {
      handleApply();
    }
  };

  const isInputDisabled = disabled || isLoading || !!appliedVoucher;

  return (
    <div className={className}>
      <div className="flex items-start gap-3">
        <div className="flex-1 relative">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Tag className="w-5 h-5" />
            </div>
            
            <input
              type="text"
              value={code}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              disabled={isInputDisabled}
              placeholder={appliedVoucher ? appliedVoucher.code : "Nhập mã giảm giá (VD: SALE50)"}
              className={`
                w-full h-11 pl-11 pr-3
                ${designTokens.borderRadius.md}
                ${designTokens.shadows.sm}
                ${designTokens.transitions.base}
                border
                ${error ? 'border-red-500' : 'border-gray-300'}
                ${isInputDisabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'bg-white'}
                focus:outline-none focus:ring-2 focus:ring-[#ff0086] focus:border-[#ff0086]
                placeholder:text-gray-400
                text-sm font-medium
                uppercase
              `}
              data-testid="input-voucher-code"
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby={error ? 'voucher-error' : undefined}
            />
          </div>
        </div>

        {appliedVoucher ? (
          <button
            onClick={onRemove}
            disabled={disabled}
            className={`
              h-11 px-4
              ${designTokens.borderRadius.md}
              ${designTokens.transitions.base}
              bg-gray-100 hover:bg-gray-200 active:bg-gray-300
              text-gray-700
              font-medium text-sm
              flex items-center gap-2
              focus:outline-none focus:ring-2 focus:ring-[#ff0086] focus:ring-offset-2
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            data-testid="button-remove-voucher"
            aria-label="Xóa mã"
            title="Xóa mã"
          >
            <X className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleApply}
            disabled={!code.trim() || isLoading || disabled}
            className={`
              h-11 px-6
              ${designTokens.borderRadius.md}
              ${designTokens.transitions.base}
              ${
                !code.trim() || isLoading || disabled
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-[#ff0086] hover:bg-[#e60078] active:bg-[#cc006a]'
              }
              text-white
              font-medium text-sm
              flex items-center gap-2
              focus:outline-none focus:ring-2 focus:ring-[#ff0086] focus:ring-offset-2
              min-w-[100px] justify-center
            `}
            data-testid="button-apply-voucher"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Đang kiểm tra...</span>
              </>
            ) : (
              'Áp dụng'
            )}
          </button>
        )}
      </div>

      {appliedVoucher && (
        <div className="mt-3">
          <span
            className={`
              ${designTokens.badge.base}
              ${designTokens.badge.variants.success}
              ${designTokens.badge.sizes.md}
            `}
            data-testid="badge-voucher-success"
          >
            Giảm {formatDiscount(appliedVoucher.discount)}
          </span>
        </div>
      )}

      {error && (
        <p
          id="voucher-error"
          className="mt-2 text-sm text-red-600"
          data-testid="text-voucher-error"
        >
          {error}
        </p>
      )}
    </div>
  );
}
