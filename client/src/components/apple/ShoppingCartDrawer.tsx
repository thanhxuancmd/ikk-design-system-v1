import * as Dialog from '@radix-ui/react-dialog';
import { X, Trash2, ShoppingCart, Plus, Minus } from 'lucide-react';
import { designTokens } from '@/constants/design-tokens';
import { cn } from '@/lib/utils';

export interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  variant?: string;
}

export interface ShoppingCartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onCheckout: () => void;
  discount?: number;
  shipping?: number;
}

function formatVietnameseCurrency(amount: number): string {
  return amount.toLocaleString('vi-VN') + 'đ';
}

export function ShoppingCartDrawer({
  open,
  onOpenChange,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  discount = 0,
  shipping = 0,
}: ShoppingCartDrawerProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal - discount + shipping;
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleQuantityDecrease = (itemId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      onUpdateQuantity(itemId, currentQuantity - 1);
    }
  };

  const handleQuantityIncrease = (itemId: string, currentQuantity: number) => {
    if (currentQuantity < 99) {
      onUpdateQuantity(itemId, currentQuantity + 1);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-300"
          style={{ zIndex: designTokens.zIndex.modal }}
        />
        <Dialog.Content
          data-testid="drawer-shopping-cart"
          className={cn(
            'fixed right-0 top-0 bottom-0 h-full w-full md:w-96 lg:w-[28rem]',
            'bg-white border-l border-gray-200',
            designTokens.shadows['2xl'],
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right',
            'duration-300 ease-in-out flex flex-col'
          )}
          style={{ zIndex: designTokens.zIndex.modal + 1 }}
          aria-labelledby="cart-drawer-title"
        >
          {/* Header */}
          <div className="border-b border-gray-200 p-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <Dialog.Title
                id="cart-drawer-title"
                className="text-lg font-semibold text-gray-900"
                data-testid="drawer-title"
              >
                Giỏ Hàng
              </Dialog.Title>
              <Dialog.Close
                aria-label="Đóng giỏ hàng"
                data-testid="button-close-cart"
                className={cn(
                  'rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700',
                  'min-h-[44px] min-w-[44px] flex items-center justify-center',
                  designTokens.transitions.fast
                )}
              >
                <X className="h-5 w-5" />
              </Dialog.Close>
            </div>
          </div>

          {/* Content */}
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="mb-4 rounded-full bg-gray-100 p-6">
                <ShoppingCart className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Giỏ hàng trống
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Chưa có sản phẩm nào trong giỏ hàng
              </p>
              <button
                onClick={() => onOpenChange(false)}
                className={cn(
                  'px-6 py-2.5 text-sm font-medium rounded-lg',
                  'bg-[#ff0086] hover:bg-[#e60078] text-white',
                  designTokens.transitions.base
                )}
                data-testid="button-explore-products"
              >
                Khám Phá Sản Phẩm
              </button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-4" data-testid="cart-items-container">
                <div className="space-y-4">
                  {items.map((item) => {
                    const itemSubtotal = item.price * item.quantity;
                    return (
                      <div
                        key={item.id}
                        data-testid={`cart-item-${item.id}`}
                        className="flex gap-4 p-3 rounded-lg border border-gray-200 bg-white hover:border-gray-300 transition-colors"
                      >
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 rounded-lg object-cover"
                            data-testid={`img-product-${item.id}`}
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex-1 min-w-0">
                              <h4
                                className="font-medium text-gray-900 truncate"
                                data-testid={`text-product-name-${item.id}`}
                              >
                                {item.name}
                              </h4>
                              {item.variant && (
                                <p
                                  className="text-xs text-gray-500 mt-0.5"
                                  data-testid={`text-variant-${item.id}`}
                                >
                                  {item.variant}
                                </p>
                              )}
                            </div>
                            <button
                              onClick={() => onRemoveItem(item.id)}
                              aria-label="Xóa sản phẩm"
                              data-testid={`button-remove-${item.id}`}
                              className={cn(
                                'p-1 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50',
                                designTokens.transitions.fast
                              )}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleQuantityDecrease(item.id, item.quantity)}
                                disabled={item.quantity <= 1}
                                aria-label="Giảm số lượng"
                                data-testid={`button-decrease-${item.id}`}
                                className={cn(
                                  'w-7 h-7 rounded-md border border-gray-300 flex items-center justify-center',
                                  'text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed',
                                  designTokens.transitions.fast
                                )}
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span
                                className="w-8 text-center text-sm font-medium text-gray-900"
                                data-testid={`text-quantity-${item.id}`}
                              >
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleQuantityIncrease(item.id, item.quantity)}
                                disabled={item.quantity >= 99}
                                aria-label="Tăng số lượng"
                                data-testid={`button-increase-${item.id}`}
                                className={cn(
                                  'w-7 h-7 rounded-md border border-gray-300 flex items-center justify-center',
                                  'text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed',
                                  designTokens.transitions.fast
                                )}
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>

                            {/* Item Subtotal */}
                            <div className="text-right">
                              <p
                                className="text-sm font-semibold text-gray-900"
                                data-testid={`text-item-subtotal-${item.id}`}
                              >
                                {formatVietnameseCurrency(itemSubtotal)}
                              </p>
                              <p
                                className="text-xs text-gray-500"
                                data-testid={`text-unit-price-${item.id}`}
                              >
                                {formatVietnameseCurrency(item.price)}/sp
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Footer Summary */}
              <div className="border-t border-gray-200 p-4 flex-shrink-0 bg-gray-50">
                <div className="space-y-3 mb-4">
                  {/* Subtotal */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Tạm tính</span>
                    <span
                      className="font-medium text-gray-900"
                      data-testid="text-subtotal"
                    >
                      {formatVietnameseCurrency(subtotal)}
                    </span>
                  </div>

                  {/* Discount */}
                  {discount > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">Giảm giá</span>
                        <span className="px-2 py-0.5 rounded-md bg-green-100 text-green-800 text-xs font-medium">
                          Voucher
                        </span>
                      </div>
                      <span
                        className="font-medium text-green-600"
                        data-testid="text-discount"
                      >
                        -{formatVietnameseCurrency(discount)}
                      </span>
                    </div>
                  )}

                  {/* Shipping */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      {shipping === 0 ? 'Miễn phí vận chuyển' : 'Phí vận chuyển'}
                    </span>
                    <span
                      className={cn(
                        'font-medium',
                        shipping === 0 ? 'text-green-600' : 'text-gray-900'
                      )}
                      data-testid="text-shipping"
                    >
                      {shipping === 0 ? 'Miễn phí' : formatVietnameseCurrency(shipping)}
                    </span>
                  </div>

                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-semibold text-gray-900">
                        Tổng cộng
                      </span>
                      <span
                        className="text-lg font-bold text-[#ff0086]"
                        data-testid="text-total"
                      >
                        {formatVietnameseCurrency(total)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={onCheckout}
                  disabled={items.length === 0}
                  data-testid="button-checkout"
                  className={cn(
                    'w-full py-3 rounded-lg font-semibold text-white',
                    'bg-[#ff0086] hover:bg-[#e60078] active:bg-[#cc006a]',
                    'disabled:bg-gray-300 disabled:cursor-not-allowed',
                    designTokens.transitions.base,
                    'focus:outline-none focus:ring-2 focus:ring-[#ff0086] focus:ring-offset-2'
                  )}
                >
                  Thanh Toán ({totalItems} sản phẩm)
                </button>
              </div>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
