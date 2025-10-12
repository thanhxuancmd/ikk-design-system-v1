import { useState, useEffect } from 'react';
import { Plus, Trash2, Calculator } from 'lucide-react';
import { designTokens } from '@/constants/design-tokens';
import { AppleSelect } from './AppleSelect';
import { AppleInput } from './AppleInput';
import { AppleButton } from './AppleButton';
import { AppleCard } from './AppleCard';
import { AppleDatePicker } from './AppleDatePicker';
import { DateRange } from 'react-day-picker';

export type KOCTier = 'nano' | 'micro' | 'macro' | 'mega' | 'celebrity';

export interface CommissionRule {
  id: string;
  tier: KOCTier;
  category?: string;
  commissionRate: number;
  startDate?: string;
  endDate?: string;
}

export interface CommissionRulesEditorProps {
  rules: CommissionRule[];
  onChange: (rules: CommissionRule[]) => void;
  onSave: (rules: CommissionRule[]) => void;
  onCancel?: () => void;
  categories?: string[];
  isLoading?: boolean;
}

const tierLabels: Record<KOCTier, string> = {
  nano: 'Nano (< 10K followers)',
  micro: 'Micro (10K - 100K)',
  macro: 'Macro (100K - 1M)',
  mega: 'Mega (1M - 10M)',
  celebrity: 'Celebrity (> 10M)',
};

export function CommissionRulesEditor({
  rules,
  onChange,
  onSave,
  onCancel,
  categories = [],
  isLoading = false,
}: CommissionRulesEditorProps) {
  const [localRules, setLocalRules] = useState<CommissionRule[]>(rules);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setLocalRules(rules);
  }, [rules]);

  const generateId = () => `rule-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const addRule = () => {
    const newRule: CommissionRule = {
      id: generateId(),
      tier: 'nano',
      category: undefined,
      commissionRate: 10,
      startDate: undefined,
      endDate: undefined,
    };
    const updatedRules = [...localRules, newRule];
    setLocalRules(updatedRules);
    onChange(updatedRules);
  };

  const removeRule = (ruleId: string) => {
    if (localRules.length <= 1) {
      setErrors({ general: 'Phải có ít nhất 1 quy tắc' });
      return;
    }
    const updatedRules = localRules.filter((rule) => rule.id !== ruleId);
    setLocalRules(updatedRules);
    onChange(updatedRules);
    setErrors({});
  };

  const updateRule = (ruleId: string, updates: Partial<CommissionRule>) => {
    const updatedRules = localRules.map((rule) =>
      rule.id === ruleId ? { ...rule, ...updates } : rule
    );
    setLocalRules(updatedRules);
    onChange(updatedRules);
  };

  const validateRules = (): boolean => {
    const newErrors: Record<string, string> = {};

    localRules.forEach((rule) => {
      if (rule.commissionRate < 0 || rule.commissionRate > 100) {
        newErrors[rule.id] = 'Tỷ lệ hoa hồng phải từ 0% đến 100%';
      }
    });

    if (localRules.length === 0) {
      newErrors.general = 'Phải có ít nhất 1 quy tắc';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateRules()) {
      onSave(localRules);
    }
  };

  const handleCancel = () => {
    setLocalRules(rules);
    setErrors({});
    onCancel?.();
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('vi-VN') + 'đ';
  };

  const calculatePreview = (rate: number) => {
    const samplePrice = 1000000;
    const commission = (samplePrice * rate) / 100;
    return {
      price: samplePrice,
      rate,
      commission,
    };
  };

  const tierOptions = Object.entries(tierLabels).map(([value, label]) => ({
    value,
    label,
  }));

  const categoryOptions = [
    { value: '', label: 'Tất cả danh mục' },
    ...categories.map((cat) => ({ value: cat, label: cat })),
  ];

  return (
    <div className="w-full space-y-6" data-testid="commission-rules-editor">
      <div className="flex items-center justify-between">
        <h2 className={`${designTokens.typography.h2} text-gray-900`}>
          Quản lý Quy tắc Hoa hồng
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-4 py-2 bg-gray-100 rounded-lg">
            <div className="col-span-3 text-sm font-semibold text-gray-700">Cấp độ KOC</div>
            <div className="col-span-2 text-sm font-semibold text-gray-700">Danh mục</div>
            <div className="col-span-2 text-sm font-semibold text-gray-700">Tỷ lệ hoa hồng</div>
            <div className="col-span-4 text-sm font-semibold text-gray-700">Thời gian hiệu lực</div>
            <div className="col-span-1 text-sm font-semibold text-gray-700"></div>
          </div>

          {/* Rule Rows */}
          {localRules.map((rule) => (
            <div
              key={rule.id}
              className={`grid grid-cols-12 gap-4 p-4 border ${designTokens.borderRadius.lg} ${
                errors[rule.id] ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'
              }`}
              data-testid={`rule-row-${rule.id}`}
            >
              <div className="col-span-3">
                <AppleSelect
                  options={tierOptions}
                  value={rule.tier}
                  onChange={(e) => updateRule(rule.id, { tier: e.target.value as KOCTier })}
                  disabled={isLoading}
                  name={`tier-${rule.id}`}
                  data-testid={`select-tier-${rule.id}`}
                />
              </div>

              <div className="col-span-2">
                <AppleSelect
                  options={categoryOptions}
                  value={rule.category || ''}
                  onChange={(e) => updateRule(rule.id, { category: e.target.value || undefined })}
                  disabled={isLoading}
                  name={`category-${rule.id}`}
                  data-testid={`select-category-${rule.id}`}
                />
              </div>

              <div className="col-span-2">
                <AppleInput
                  type="number"
                  min={0}
                  max={100}
                  value={rule.commissionRate}
                  onChange={(e) =>
                    updateRule(rule.id, { commissionRate: parseFloat(e.target.value) || 0 })
                  }
                  disabled={isLoading}
                  error={errors[rule.id]}
                  name={`commission-rate-${rule.id}`}
                  data-testid={`input-commission-rate-${rule.id}`}
                  rightIcon={<span className="text-gray-500">%</span>}
                />
              </div>

              <div className="col-span-4">
                <AppleDatePicker
                  mode="range"
                  selected={
                    rule.startDate && rule.endDate
                      ? { from: new Date(rule.startDate), to: new Date(rule.endDate) }
                      : undefined
                  }
                  onSelect={(dateRange) => {
                    if (dateRange && typeof dateRange === 'object' && 'from' in dateRange) {
                      const range = dateRange as DateRange;
                      updateRule(rule.id, {
                        startDate: range.from?.toISOString(),
                        endDate: range.to?.toISOString(),
                      });
                    }
                  }}
                  disabled={isLoading}
                  name={`date-range-${rule.id}`}
                />
              </div>

              <div className="col-span-1 flex items-start justify-center">
                <AppleButton
                  variant="secondary"
                  size="sm"
                  onClick={() => removeRule(rule.id)}
                  disabled={isLoading || localRules.length <= 1}
                  data-testid={`button-remove-rule-${rule.id}`}
                  className="!text-red-600 hover:!text-red-700 hover:!bg-red-50 !bg-transparent"
                >
                  <Trash2 className="w-4 h-4" />
                </AppleButton>
              </div>

              {errors[rule.id] && (
                <div className="col-span-12 text-sm text-red-600">{errors[rule.id]}</div>
              )}
            </div>
          ))}

          {errors.general && (
            <div className="text-sm text-red-600 px-4">{errors.general}</div>
          )}

          <AppleButton
            variant="secondary"
            size="md"
            onClick={addRule}
            disabled={isLoading}
            data-testid="button-add-rule"
            className="w-full inline-flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Thêm quy tắc mới
          </AppleButton>
        </div>

        {/* Preview Panel */}
        <div className="lg:col-span-1">
          <AppleCard data-testid="preview-panel">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-900">
                <Calculator className="w-5 h-5 text-[#ff0086]" />
                <h3 className={`${designTokens.typography.h3}`}>Xem trước tính toán</h3>
              </div>

              <div className={`p-4 bg-gray-50 ${designTokens.borderRadius.lg} space-y-3`}>
                {localRules.slice(0, 3).map((rule) => {
                  const preview = calculatePreview(rule.commissionRate);
                  return (
                    <div key={rule.id} className="space-y-1 pb-3 border-b border-gray-200 last:border-0 last:pb-0">
                      <p className="text-xs font-semibold text-gray-600">
                        {tierLabels[rule.tier]}
                      </p>
                      <p className="text-sm text-gray-700">
                        Giá sản phẩm: <span className="font-semibold">{formatCurrency(preview.price)}</span>
                      </p>
                      <p className="text-sm text-gray-700">
                        Tỷ lệ hoa hồng: <span className="font-semibold">{preview.rate}%</span>
                      </p>
                      <p className="text-sm text-[#ff0086] font-semibold">
                        Hoa hồng nhận được: {formatCurrency(preview.commission)}
                      </p>
                    </div>
                  );
                })}
              </div>

              <p className="text-xs text-gray-500">
                * Đây là tính toán mẫu với sản phẩm giá 1.000.000đ
              </p>
            </div>
          </AppleCard>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
        <AppleButton
          variant="secondary"
          size="md"
          onClick={handleCancel}
          disabled={isLoading}
          data-testid="button-cancel"
        >
          Hủy bỏ
        </AppleButton>
        <AppleButton
          variant="primary"
          size="md"
          onClick={handleSave}
          disabled={isLoading}
          data-testid="button-save"
        >
          {isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
        </AppleButton>
      </div>
    </div>
  );
}
