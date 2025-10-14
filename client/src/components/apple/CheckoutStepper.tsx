import { useState } from 'react';
import { IoCheckmarkOutline, IoChevronBackOutline, IoChevronForwardOutline, IoCubeOutline, IoCardOutline, IoDocumentTextOutline } from 'react-icons/io5';
import { AppleInput } from './AppleInput';
import { AppleSelect } from './AppleSelect';
import { AppleRadioGroup } from './AppleRadio';
import { AppleTextarea } from './AppleTextarea';
import { AppleButton } from './AppleButton';
import { AppleCheckbox } from './AppleCheckbox';
import { designTokens } from '@/constants/design-tokens';

interface ShippingInfo {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  note?: string;
}

interface PaymentInfo {
  method: 'cod' | 'bank' | 'ewallet';
  bankName?: string;
  accountNumber?: string;
}

interface OrderSummary {
  items: Array<{ name: string; quantity: number; price: number }>;
  subtotal: number;
  shipping: number;
  total: number;
}

interface CheckoutStepperProps {
  onComplete: (data: { shipping: ShippingInfo; payment: PaymentInfo }) => void;
  onCancel?: () => void;
  orderSummary: OrderSummary;
  className?: string;
}

interface ValidationErrors {
  fullName?: string;
  phone?: string;
  address?: string;
  city?: string;
  district?: string;
  method?: string;
  bankName?: string;
  terms?: string;
}

const CITIES = [
  { value: '', label: 'Chọn Tỉnh/Thành phố' },
  { value: 'hanoi', label: 'Hà Nội' },
  { value: 'hochiminh', label: 'Hồ Chí Minh' },
  { value: 'danang', label: 'Đà Nẵng' },
  { value: 'haiphong', label: 'Hải Phòng' },
  { value: 'cantho', label: 'Cần Thơ' },
];

const DISTRICTS = [
  { value: '', label: 'Chọn Quận/Huyện' },
  { value: 'district1', label: 'Quận 1' },
  { value: 'district2', label: 'Quận 2' },
  { value: 'district3', label: 'Quận 3' },
  { value: 'district4', label: 'Quận 4' },
  { value: 'district5', label: 'Quận 5' },
];

const BANKS = [
  { value: '', label: 'Chọn ngân hàng' },
  { value: 'vietcombank', label: 'Vietcombank' },
  { value: 'techcombank', label: 'Techcombank' },
  { value: 'vcb', label: 'VCB' },
  { value: 'acb', label: 'ACB' },
  { value: 'mbbank', label: 'MB Bank' },
];

export function CheckoutStepper({
  onComplete,
  onCancel,
  orderSummary,
  className = '',
}: CheckoutStepperProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // Form state
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    note: '',
  });

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    method: 'cod',
    bankName: '',
    accountNumber: '',
  });

  const steps = [
    { number: 1, label: 'Thông tin giao hàng', icon: IoCubeOutline },
    { number: 2, label: 'Thanh toán', icon: IoCardOutline },
    { number: 3, label: 'Xác nhận', icon: IoDocumentTextOutline },
  ];

  const validateStep1 = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!shippingInfo.fullName.trim()) {
      newErrors.fullName = 'Vui lòng nhập Họ và tên';
    }
    if (!shippingInfo.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập Số điện thoại';
    }
    if (!shippingInfo.address.trim()) {
      newErrors.address = 'Vui lòng nhập Địa chỉ';
    }
    if (!shippingInfo.city) {
      newErrors.city = 'Vui lòng chọn Tỉnh/Thành phố';
    }
    if (!shippingInfo.district) {
      newErrors.district = 'Vui lòng chọn Quận/Huyện';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!paymentInfo.method) {
      newErrors.method = 'Vui lòng chọn Phương thức thanh toán';
    }
    if (paymentInfo.method === 'bank' && !paymentInfo.bankName) {
      newErrors.bankName = 'Vui lòng chọn Ngân hàng';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!agreeToTerms) {
      newErrors.terms = 'Vui lòng đồng ý với điều khoản dịch vụ';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    let isValid = false;

    if (currentStep === 1) {
      isValid = validateStep1();
    } else if (currentStep === 2) {
      isValid = validateStep2();
    }

    if (isValid && currentStep < 3) {
      setCurrentStep(currentStep + 1);
      setErrors({});
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const handleComplete = () => {
    if (validateStep3()) {
      onComplete({ shipping: shippingInfo, payment: paymentInfo });
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const getPaymentMethodLabel = () => {
    switch (paymentInfo.method) {
      case 'cod':
        return 'Thanh toán khi nhận hàng';
      case 'bank':
        return 'Chuyển khoản ngân hàng';
      case 'ewallet':
        return 'Ví điện tử (Momo, ZaloPay)';
      default:
        return '';
    }
  };

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`} data-testid="checkout-stepper">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          {/* Connecting Line */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10" />
          <div
            className="absolute top-5 left-0 h-0.5 bg-[#ff0086] -z-10 transition-all duration-300"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />

          {steps.map((step) => {
            const isCompleted = currentStep > step.number;
            const isActive = currentStep === step.number;
            const Icon = step.icon;

            return (
              <div key={step.number} className="flex flex-col items-center" data-testid={`progress-step-${step.number}`}>
                <div
                  className={`
                    w-10 h-10 ${designTokens.borderRadius.full}
                    flex items-center justify-center
                    ${designTokens.transitions.base}
                    ${
                      isCompleted || isActive
                        ? 'bg-[#ff0086] text-white'
                        : 'bg-gray-200 text-gray-500'
                    }
                    ${isActive ? 'ring-4 ring-[#ffe6f2]' : ''}
                  `}
                >
                  {isCompleted ? (
                    <IoCheckmarkOutline className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>
                <span
                  className={`
                    mt-2 ${designTokens.typography.small} font-medium text-center
                    ${isActive ? 'text-[#ff0086]' : 'text-gray-600'}
                  `}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className={`${designTokens.borderRadius.lg} ${designTokens.shadows.md} bg-white p-6 mb-6`}>
        {/* Step 1: Shipping Information */}
        {currentStep === 1 && (
          <div data-testid="step-content-1">
            <h2 className={`${designTokens.typography.h2} mb-6`}>Bước 1: Thông tin giao hàng</h2>
            <div className="space-y-4">
              <AppleInput
                label="Họ và tên"
                name="fullname"
                value={shippingInfo.fullName}
                onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                error={errors.fullName}
                placeholder="Nhập họ và tên"
                required
              />
              <AppleInput
                label="Số điện thoại"
                name="phone"
                type="tel"
                value={shippingInfo.phone}
                onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                error={errors.phone}
                placeholder="Nhập số điện thoại"
                required
              />
              <AppleInput
                label="Địa chỉ"
                name="address"
                value={shippingInfo.address}
                onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                error={errors.address}
                placeholder="Nhập địa chỉ"
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AppleSelect
                  label="Tỉnh/Thành phố"
                  name="city"
                  value={shippingInfo.city}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                  error={errors.city}
                  options={CITIES}
                  required
                />
                <AppleSelect
                  label="Quận/Huyện"
                  name="district"
                  value={shippingInfo.district}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, district: e.target.value })}
                  error={errors.district}
                  options={DISTRICTS}
                  required
                />
              </div>
              <AppleTextarea
                label="Ghi chú"
                name="note"
                value={shippingInfo.note}
                onChange={(e) => setShippingInfo({ ...shippingInfo, note: e.target.value })}
                placeholder="Nhập ghi chú (tùy chọn)"
                rows={3}
              />
            </div>
          </div>
        )}

        {/* Step 2: Payment Method */}
        {currentStep === 2 && (
          <div data-testid="step-content-2">
            <h2 className={`${designTokens.typography.h2} mb-6`}>Bước 2: Thanh toán</h2>
            <div className="space-y-4">
              <AppleRadioGroup
                label="Phương thức thanh toán"
                name="payment-method"
                value={paymentInfo.method}
                onChange={(value) =>
                  setPaymentInfo({ ...paymentInfo, method: value as 'cod' | 'bank' | 'ewallet' })
                }
                options={[
                  {
                    value: 'cod',
                    label: 'Thanh toán khi nhận hàng',
                    description: 'Thanh toán tiền mặt khi nhận hàng',
                  },
                  {
                    value: 'bank',
                    label: 'Chuyển khoản ngân hàng',
                    description: 'Chuyển khoản trực tiếp qua ngân hàng',
                  },
                  {
                    value: 'ewallet',
                    label: 'Ví điện tử (Momo, ZaloPay)',
                    description: 'Thanh toán qua ví điện tử',
                  },
                ]}
              />

              {/* Bank Transfer Details */}
              {paymentInfo.method === 'bank' && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-4">
                  <AppleSelect
                    label="Chọn ngân hàng"
                    name="bank"
                    value={paymentInfo.bankName || ''}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, bankName: e.target.value })}
                    error={errors.bankName}
                    options={BANKS}
                    required
                  />
                  {paymentInfo.bankName && (
                    <div>
                      <p className={`${designTokens.typography.small} font-medium text-gray-700 mb-2`}>
                        Số tài khoản
                      </p>
                      <div className={`p-3 bg-white ${designTokens.borderRadius.md} border border-gray-300`}>
                        <p className="font-mono text-lg font-semibold text-gray-900">
                          1234 5678 9012 3456
                        </p>
                        <p className={`${designTokens.typography.small} text-gray-600 mt-1`}>
                          Tên tài khoản: CÔNG TY TNHH ABC
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* E-wallet QR Code */}
              {paymentInfo.method === 'ewallet' && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className={`${designTokens.typography.small} font-medium text-gray-700 mb-3`}>
                    Quét mã QR để thanh toán
                  </p>
                  <div className="flex justify-center">
                    <div className="w-48 h-48 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center">
                      <p className="text-gray-400 text-center">QR Code<br />Placeholder</p>
                    </div>
                  </div>
                  <p className={`${designTokens.typography.small} text-gray-600 text-center mt-3`}>
                    Hỗ trợ Momo, ZaloPay
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Order Review */}
        {currentStep === 3 && (
          <div data-testid="step-content-3">
            <h2 className={`${designTokens.typography.h2} mb-6`}>Bước 3: Xác nhận đơn hàng</h2>

            {/* Shipping Summary */}
            <div className="mb-6" data-testid="summary-shipping">
              <h3 className={`${designTokens.typography.h3} mb-3 flex items-center`}>
                <IoCubeOutline className="w-5 h-5 mr-2 text-[#ff0086]" />
                Thông tin giao hàng
              </h3>
              <div className={`p-4 bg-gray-50 ${designTokens.borderRadius.md} space-y-2`}>
                <div className="flex justify-between">
                  <span className="text-gray-600">Họ và tên:</span>
                  <span className="font-medium">{shippingInfo.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Số điện thoại:</span>
                  <span className="font-medium">{shippingInfo.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Địa chỉ:</span>
                  <span className="font-medium text-right">{shippingInfo.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tỉnh/Thành phố:</span>
                  <span className="font-medium">
                    {CITIES.find((c) => c.value === shippingInfo.city)?.label}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Quận/Huyện:</span>
                  <span className="font-medium">
                    {DISTRICTS.find((d) => d.value === shippingInfo.district)?.label}
                  </span>
                </div>
                {shippingInfo.note && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ghi chú:</span>
                    <span className="font-medium text-right">{shippingInfo.note}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Summary */}
            <div className="mb-6" data-testid="summary-payment">
              <h3 className={`${designTokens.typography.h3} mb-3 flex items-center`}>
                <IoCardOutline className="w-5 h-5 mr-2 text-[#ff0086]" />
                Phương thức thanh toán
              </h3>
              <div className={`p-4 bg-gray-50 ${designTokens.borderRadius.md}`}>
                <p className="font-medium">{getPaymentMethodLabel()}</p>
                {paymentInfo.method === 'bank' && paymentInfo.bankName && (
                  <p className="text-gray-600 mt-1">
                    {BANKS.find((b) => b.value === paymentInfo.bankName)?.label}
                  </p>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="mb-6" data-testid="summary-order">
              <h3 className={`${designTokens.typography.h3} mb-3 flex items-center`}>
                <IoDocumentTextOutline className="w-5 h-5 mr-2 text-[#ff0086]" />
                Tổng đơn hàng
              </h3>
              <div className={`p-4 bg-gray-50 ${designTokens.borderRadius.md} space-y-3`}>
                {orderSummary.items.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-gray-600">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="border-t border-gray-300 pt-3 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tạm tính:</span>
                    <span className="font-medium">{formatCurrency(orderSummary.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phí vận chuyển:</span>
                    <span className="font-medium">{formatCurrency(orderSummary.shipping)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t border-gray-300 pt-3">
                    <span className="text-gray-900">Tổng cộng:</span>
                    <span className="text-[#ff0086]">{formatCurrency(orderSummary.total)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="mb-4">
              <AppleCheckbox
                name="terms"
                label="Tôi đã đọc và đồng ý với điều khoản dịch vụ"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
              />
              {errors.terms && (
                <p className="mt-1.5 text-sm text-red-600">{errors.terms}</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <div>
          {currentStep > 1 && (
            <AppleButton
              variant="secondary"
              onClick={handleBack}
              data-testid="button-back"
              className="flex items-center"
            >
              <IoChevronBackOutline className="w-4 h-4 mr-1" />
              Quay lại
            </AppleButton>
          )}
          {onCancel && currentStep === 1 && (
            <AppleButton
              variant="secondary"
              onClick={onCancel}
              data-testid="button-cancel"
            >
              Hủy
            </AppleButton>
          )}
        </div>

        <div>
          {currentStep < 3 ? (
            <AppleButton
              variant="primary"
              onClick={handleNext}
              data-testid="button-next"
              className="flex items-center"
            >
              Tiếp tục
              <IoChevronForwardOutline className="w-4 h-4 ml-1" />
            </AppleButton>
          ) : (
            <AppleButton
              variant="primary"
              onClick={handleComplete}
              data-testid="button-complete"
              className="flex items-center"
            >
              <IoCheckmarkOutline className="w-4 h-4 mr-1" />
              Hoàn tất đơn hàng
            </AppleButton>
          )}
        </div>
      </div>
    </div>
  );
}
