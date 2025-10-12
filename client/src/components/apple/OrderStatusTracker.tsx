import { ShoppingBag, Package, Truck, CheckCircle, AlertCircle, Check } from 'lucide-react';
import { designTokens } from '@/constants/design-tokens';
import { format } from 'date-fns';

export type OrderStatus = 'ordered' | 'processing' | 'shipping' | 'delivered' | 'cancelled';

export interface OrderStatusStep {
  status: OrderStatus;
  label: string;
  timestamp?: string;
  description?: string;
}

export interface OrderStatusTrackerProps {
  currentStatus: OrderStatus;
  steps?: OrderStatusStep[];
  showTimestamps?: boolean;
  className?: string;
}

const statusOrder: OrderStatus[] = ['ordered', 'processing', 'shipping', 'delivered'];

const defaultSteps: Record<OrderStatus, { label: string; description: string; icon: typeof ShoppingBag }> = {
  ordered: {
    label: 'Đã đặt hàng',
    description: 'Đơn hàng đã được tạo',
    icon: ShoppingBag,
  },
  processing: {
    label: 'Đang xử lý',
    description: 'Đang chuẩn bị hàng',
    icon: Package,
  },
  shipping: {
    label: 'Đang giao hàng',
    description: 'Đơn hàng đang trên đường',
    icon: Truck,
  },
  delivered: {
    label: 'Đã giao hàng',
    description: 'Giao hàng thành công',
    icon: CheckCircle,
  },
  cancelled: {
    label: 'Đã hủy',
    description: 'Đơn hàng đã bị hủy',
    icon: AlertCircle,
  },
};

function formatTimestamp(timestamp: string): string {
  try {
    const date = new Date(timestamp);
    return format(date, 'dd/MM/yyyy HH:mm');
  } catch {
    return timestamp;
  }
}

function getStepState(
  stepStatus: OrderStatus,
  currentStatus: OrderStatus,
  isCancelled: boolean
): 'completed' | 'active' | 'pending' {
  if (isCancelled) {
    return 'pending';
  }

  const stepIndex = statusOrder.indexOf(stepStatus);
  const currentIndex = statusOrder.indexOf(currentStatus);

  if (stepIndex < currentIndex) {
    return 'completed';
  } else if (stepIndex === currentIndex) {
    return 'active';
  }
  return 'pending';
}

export function OrderStatusTracker({
  currentStatus,
  steps,
  showTimestamps = true,
  className = '',
}: OrderStatusTrackerProps) {
  const isCancelled = currentStatus === 'cancelled';

  const displaySteps: OrderStatusStep[] = steps || statusOrder.map(status => ({
    status,
    label: defaultSteps[status].label,
    description: defaultSteps[status].description,
  }));

  return (
    <div className={className} data-testid="order-status-tracker">
      {isCancelled && (
        <div
          className={`
            mb-6 p-4
            ${designTokens.borderRadius.md}
            bg-red-50 border border-red-200
            flex items-start gap-3
          `}
        >
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-red-900">
              {defaultSteps.cancelled.label}
            </h4>
            <p className="text-sm text-red-700 mt-1">
              {defaultSteps.cancelled.description}
            </p>
          </div>
        </div>
      )}

      <div className="relative">
        {displaySteps.map((step, index) => {
          const stepState = getStepState(step.status, currentStatus, isCancelled);
          const StepIcon = defaultSteps[step.status]?.icon || ShoppingBag;
          const isLast = index === displaySteps.length - 1;

          const iconColor = 
            stepState === 'completed' ? 'text-[#ff0086]' :
            stepState === 'active' ? 'text-[#ff0086]' :
            'text-gray-400';

          const lineColor = 
            stepState === 'completed' ? 'bg-[#ff0086]' :
            'bg-gray-300';

          return (
            <div
              key={step.status}
              className="relative flex items-start gap-4 pb-8 last:pb-0"
              data-testid={`status-step-${step.status}`}
            >
              {!isLast && (
                <div
                  className={`
                    absolute left-5 top-10 bottom-0 w-0.5
                    ${lineColor}
                    ${designTokens.transitions.base}
                  `}
                />
              )}

              <div className="relative flex-shrink-0">
                <div
                  className={`
                    w-10 h-10
                    ${designTokens.borderRadius.full}
                    ${
                      stepState === 'completed'
                        ? 'bg-[#ff0086]'
                        : stepState === 'active'
                        ? 'bg-white border-2 border-[#ff0086]'
                        : 'bg-gray-200'
                    }
                    flex items-center justify-center
                    ${designTokens.transitions.base}
                  `}
                  data-testid={`status-icon-${step.status}`}
                >
                  {stepState === 'completed' ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : stepState === 'active' ? (
                    <div
                      className="w-3 h-3 rounded-full bg-[#ff0086] animate-pulse"
                    />
                  ) : (
                    <StepIcon className={`w-5 h-5 ${iconColor}`} />
                  )}
                </div>
              </div>

              <div className="flex-1 pt-1.5">
                <h4
                  className={`
                    text-sm font-semibold
                    ${
                      stepState === 'completed' || stepState === 'active'
                        ? 'text-gray-900'
                        : 'text-gray-400'
                    }
                    ${designTokens.transitions.base}
                  `}
                  data-testid={`status-label-${step.status}`}
                >
                  {step.label}
                </h4>

                {step.description && (
                  <p
                    className={`
                      text-sm mt-1
                      ${
                        stepState === 'completed' || stepState === 'active'
                          ? 'text-gray-600'
                          : 'text-gray-400'
                      }
                      ${designTokens.transitions.base}
                    `}
                  >
                    {step.description}
                  </p>
                )}

                {showTimestamps && step.timestamp && (stepState === 'completed' || stepState === 'active') && (
                  <p
                    className="text-xs text-gray-500 mt-1"
                    data-testid={`status-timestamp-${step.status}`}
                  >
                    {formatTimestamp(step.timestamp)}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
