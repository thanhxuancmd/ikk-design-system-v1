import { useState, useEffect } from 'react';
import { Plus, Trash2, Calculator } from 'lucide-react';
import { designTokens } from '@/constants/design-tokens';
import { AppleSelect } from './AppleSelect';
import { AppleInput } from './AppleInput';
import { AppleButton } from './AppleButton';
import { AppleCard } from './AppleCard';
import { AppleDatePicker } from './AppleDatePicker';
import { DateRange } from 'react-day-picker';

// Keep for backward compatibility, but now it's a string type
export type KOCTier = string;

export interface CommissionRule {
  id: string;
  tier: string;
  category?: string;
  commissionRate: number;
  startDate?: string;
  endDate?: string;
}

export interface CommissionRulesLabels {
  // Headers
  title?: string;
  levelColumn?: string;
  categoryColumn?: string;
  rateColumn?: string;
  validityPeriodColumn?: string;
  
  // Buttons
  addRuleButton?: string;
  removeRuleButton?: string;
  saveButton?: string;
  savingButton?: string;
  cancelButton?: string;
  
  // Category options
  allCategoriesOption?: string;
  
  // Preview
  previewTitle?: string;
  previewPriceLabel?: string;
  previewRateLabel?: string;
  previewCommissionLabel?: string;
  previewNote?: string;
  
  // Errors
  minRulesError?: string;
  rateRangeError?: string;
}

// Default IKK tier options
const defaultLevelOptions = [
  'Nano (< 10K followers)',
  'Micro (10K - 100K)',
  'Macro (100K - 1M)',
  'Mega (1M - 10M)',
  'Celebrity (> 10M)',
];

// Default IKK category options
const defaultCategoryOptions = [
  'Fashion & Beauty',
  'Tech & Gaming',
  'Food & Beverage',
  'Lifestyle',
  'Sports',
];

// Default Vietnamese labels
const defaultLabels: CommissionRulesLabels = {
  title: 'Quản lý Quy tắc Hoa hồng',
  levelColumn: 'Cấp độ KOC',
  categoryColumn: 'Danh mục',
  rateColumn: 'Tỷ lệ hoa hồng',
  validityPeriodColumn: 'Thời gian hiệu lực',
  addRuleButton: 'Thêm quy tắc mới',
  removeRuleButton: 'Xóa',
  saveButton: 'Lưu thay đổi',
  savingButton: 'Đang lưu...',
  cancelButton: 'Hủy bỏ',
  allCategoriesOption: 'Tất cả danh mục',
  previewTitle: 'Xem trước tính toán',
  previewPriceLabel: 'Giá sản phẩm',
  previewRateLabel: 'Tỷ lệ hoa hồng',
  previewCommissionLabel: 'Hoa hồng nhận được',
  previewNote: '* Đây là tính toán mẫu với sản phẩm giá 1.000.000đ',
  minRulesError: 'Phải có ít nhất 1 quy tắc',
  rateRangeError: 'Tỷ lệ hoa hồng phải từ 0% đến 100%',
};

export interface CommissionRulesEditorProps {
  rules: CommissionRule[];
  onChange: (rules: CommissionRule[]) => void;
  onSave: (rules: CommissionRule[]) => void;
  onCancel?: () => void;
  categories?: string[]; // Kept for backward compatibility
  levelOptions?: string[]; // Custom tier names
  categoryOptions?: string[]; // Custom categories
  labels?: Partial<CommissionRulesLabels>; // Custom UI text
  isLoading?: boolean;
}

export function CommissionRulesEditor({
  rules,
  onChange,
  onSave,
  onCancel,
  categories = [],
  levelOptions: customLevelOptions,
  categoryOptions: customCategoryOptions,
  labels: customLabels,
  isLoading = false,
}: CommissionRulesEditorProps) {
  // Merge custom options with defaults
  const levelOptions = customLevelOptions || defaultLevelOptions;
  const categoryOptions = customCategoryOptions || (categories.length > 0 ? categories : defaultCategoryOptions);
  const labels = { ...defaultLabels, ...customLabels };

  const [localRules, setLocalRules] = useState<CommissionRule[]>(rules);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setLocalRules(rules);
  }, [rules]);

  const generateId = () => `rule-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const addRule = () => {
    const newRule: CommissionRule = {
      id: generateId(),
      tier: levelOptions[0], // Use first level option as default
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
      setErrors({ general: labels.minRulesError || defaultLabels.minRulesError! });
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
        newErrors[rule.id] = labels.rateRangeError || defaultLabels.rateRangeError!;
      }
    });

    if (localRules.length === 0) {
      newErrors.general = labels.minRulesError || defaultLabels.minRulesError!;
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

  const tierSelectOptions = levelOptions.map((label) => ({
    value: label,
    label: label,
  }));

  const categorySelectOptions = [
    { value: '', label: labels.allCategoriesOption || defaultLabels.allCategoriesOption! },
    ...categoryOptions.map((cat) => ({ value: cat, label: cat })),
  ];

  return (
    <div className="w-full space-y-6" data-testid="commission-rules-editor">
      <div className="flex items-center justify-between">
        <h2 className={`${designTokens.typography.h2} text-gray-900`}>
          {labels.title}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-4 py-2 bg-gray-100 rounded-lg">
            <div className="col-span-3 text-sm font-semibold text-gray-700">{labels.levelColumn}</div>
            <div className="col-span-2 text-sm font-semibold text-gray-700">{labels.categoryColumn}</div>
            <div className="col-span-2 text-sm font-semibold text-gray-700">{labels.rateColumn}</div>
            <div className="col-span-4 text-sm font-semibold text-gray-700">{labels.validityPeriodColumn}</div>
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
                  options={tierSelectOptions}
                  value={rule.tier}
                  onChange={(e) => updateRule(rule.id, { tier: e.target.value })}
                  disabled={isLoading}
                  name={`tier-${rule.id}`}
                  data-testid={`select-tier-${rule.id}`}
                />
              </div>

              <div className="col-span-2">
                <AppleSelect
                  options={categorySelectOptions}
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
            {labels.addRuleButton}
          </AppleButton>
        </div>

        {/* Preview Panel */}
        <div className="lg:col-span-1">
          <AppleCard data-testid="preview-panel">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-900">
                <Calculator className="w-5 h-5 text-[#ff0086]" />
                <h3 className={`${designTokens.typography.h3}`}>{labels.previewTitle}</h3>
              </div>

              <div className={`p-4 bg-gray-50 ${designTokens.borderRadius.lg} space-y-3`}>
                {localRules.slice(0, 3).map((rule) => {
                  const preview = calculatePreview(rule.commissionRate);
                  return (
                    <div key={rule.id} className="space-y-1 pb-3 border-b border-gray-200 last:border-0 last:pb-0">
                      <p className="text-xs font-semibold text-gray-600">
                        {rule.tier}
                      </p>
                      <p className="text-sm text-gray-700">
                        {labels.previewPriceLabel}: <span className="font-semibold">{formatCurrency(preview.price)}</span>
                      </p>
                      <p className="text-sm text-gray-700">
                        {labels.previewRateLabel}: <span className="font-semibold">{preview.rate}%</span>
                      </p>
                      <p className="text-sm text-[#ff0086] font-semibold">
                        {labels.previewCommissionLabel}: {formatCurrency(preview.commission)}
                      </p>
                    </div>
                  );
                })}
              </div>

              <p className="text-xs text-gray-500">
                {labels.previewNote}
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
          {labels.cancelButton}
        </AppleButton>
        <AppleButton
          variant="primary"
          size="md"
          onClick={handleSave}
          disabled={isLoading}
          data-testid="button-save"
        >
          {isLoading ? labels.savingButton : labels.saveButton}
        </AppleButton>
      </div>
    </div>
  );
}
