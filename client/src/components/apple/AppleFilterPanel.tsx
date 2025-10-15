import { useState } from 'react';
import * as Collapsible from '@radix-ui/react-collapsible';
import { IoChevronDownOutline } from 'react-icons/io5';
import { DateRange } from 'react-day-picker';
import { designTokens } from '@/constants/design-tokens';
import { AppleCheckbox } from './AppleCheckbox';
import { AppleRadioGroup } from './AppleRadio';
import { AppleSelect } from './AppleSelect';
import { AppleDatePicker } from './AppleDatePicker';
import { AppleButton } from './AppleButton';

export type FilterType = 'checkbox' | 'radio' | 'range' | 'date' | 'select';

export interface FilterOption {
  label: string;
  value: string | number;
}

export interface FilterGroup {
  id: string;
  label: string;
  type: FilterType;
  options?: FilterOption[];
  min?: number;
  max?: number;
  step?: number;
  dateMode?: 'single' | 'range';
  defaultOpen?: boolean;
}

export interface AppleFilterPanelProps {
  filters: FilterGroup[];
  values: Record<string, any>;
  onChange: (values: Record<string, any>) => void;
  onApply?: () => void;
  onReset?: () => void;
  showActions?: boolean;
  collapsible?: boolean;
  className?: string;
}

export function AppleFilterPanel({
  filters,
  values,
  onChange,
  onApply,
  onReset,
  showActions = true,
  collapsible = true,
  className = '',
}: AppleFilterPanelProps) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    filters.forEach((filter) => {
      initial[filter.id] = filter.defaultOpen ?? true;
    });
    return initial;
  });

  const toggleGroup = (groupId: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  const handleFilterChange = (filterId: string, value: any) => {
    onChange({
      ...values,
      [filterId]: value,
    });
  };

  const handleCheckboxChange = (filterId: string, optionValue: string | number, checked: boolean) => {
    const currentValues = (values[filterId] as Array<string | number>) || [];
    const newValues = checked
      ? [...currentValues, optionValue]
      : currentValues.filter((v) => v !== optionValue);
    
    handleFilterChange(filterId, newValues);
  };

  const handleReset = () => {
    if (onReset) {
      onReset();
    }
  };

  const renderFilterContent = (filter: FilterGroup) => {
    const filterValue = values?.[filter.id];

    switch (filter.type) {
      case 'checkbox':
        if (!filter.options) return null;
        return (
          <div className="space-y-2">
            {filter.options.map((option) => (
              <AppleCheckbox
                key={option.value}
                name={`${filter.id}-${option.value}`}
                label={option.label}
                checked={((filterValue as Array<string | number>) || []).includes(option.value)}
                onChange={(e) => handleCheckboxChange(filter.id, option.value, e.target.checked)}
                data-testid={`checkbox-${filter.id}-${option.value}`}
              />
            ))}
          </div>
        );

      case 'radio':
        if (!filter.options) return null;
        return (
          <AppleRadioGroup
            name={filter.id}
            options={filter.options.map((opt) => ({
              value: String(opt.value),
              label: opt.label,
            }))}
            value={filterValue ? String(filterValue) : undefined}
            onChange={(value) => handleFilterChange(filter.id, value)}
          />
        );

      case 'range':
        const rangeValue = (filterValue as { min?: number; max?: number }) || {};
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={`block ${designTokens.typography.small} font-medium text-gray-700 mb-1.5`}>
                  Từ
                </label>
                <input
                  type="number"
                  min={filter.min}
                  max={filter.max}
                  step={filter.step || 1}
                  value={rangeValue.min ?? filter.min ?? 0}
                  onChange={(e) => handleFilterChange(filter.id, {
                    ...rangeValue,
                    min: parseFloat(e.target.value),
                  })}
                  className={`
                    w-full h-10 px-3
                    ${designTokens.borderRadius.md}
                    ${designTokens.shadows.sm}
                    ${designTokens.transitions.base}
                    border border-gray-300
                    bg-white
                    focus:outline-none focus:ring-2 focus:ring-[#ff0086] focus:border-[#ff0086]
                  `}
                  data-testid={`range-min-${filter.id}`}
                />
              </div>
              <div>
                <label className={`block ${designTokens.typography.small} font-medium text-gray-700 mb-1.5`}>
                  Đến
                </label>
                <input
                  type="number"
                  min={filter.min}
                  max={filter.max}
                  step={filter.step || 1}
                  value={rangeValue.max ?? filter.max ?? 100}
                  onChange={(e) => handleFilterChange(filter.id, {
                    ...rangeValue,
                    max: parseFloat(e.target.value),
                  })}
                  className={`
                    w-full h-10 px-3
                    ${designTokens.borderRadius.md}
                    ${designTokens.shadows.sm}
                    ${designTokens.transitions.base}
                    border border-gray-300
                    bg-white
                    focus:outline-none focus:ring-2 focus:ring-[#ff0086] focus:border-[#ff0086]
                  `}
                  data-testid={`range-max-${filter.id}`}
                />
              </div>
            </div>
          </div>
        );

      case 'date':
        return (
          <AppleDatePicker
            mode={filter.dateMode || 'single'}
            selected={filterValue}
            onSelect={(date) => handleFilterChange(filter.id, date)}
            name={filter.id}
          />
        );

      case 'select':
        if (!filter.options) return null;
        return (
          <AppleSelect
            options={filter.options.map((opt) => ({
              value: String(opt.value),
              label: opt.label,
            }))}
            value={filterValue ? String(filterValue) : ''}
            onChange={(e) => handleFilterChange(filter.id, e.target.value)}
            name={filter.id}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div 
      className={`bg-white ${designTokens.borderRadius.lg} p-4 ${className}`}
      data-testid="filter-panel"
    >
      <div className="space-y-4">
        {filters.map((filter, index) => {
          const isLastGroup = index === filters.length - 1;
          const isOpen = openGroups[filter.id];

          if (collapsible) {
            return (
              <Collapsible.Root
                key={filter.id}
                open={isOpen}
                onOpenChange={() => toggleGroup(filter.id)}
                className={!isLastGroup ? 'border-b border-gray-200 pb-4' : ''}
                data-testid={`filter-group-${filter.id}`}
              >
                <Collapsible.Trigger
                  className="w-full flex justify-between items-center font-medium text-gray-900 cursor-pointer group"
                  aria-label={isOpen ? 'Thu gọn' : 'Mở rộng'}
                  data-testid={`filter-group-trigger-${filter.id}`}
                >
                  <span className={designTokens.typography.small}>{filter.label}</span>
                  <IoChevronDownOutline
                    className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                  />
                </Collapsible.Trigger>

                <Collapsible.Content
                  className="overflow-hidden transition-all duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
                >
                  <div className="pt-3">
                    {renderFilterContent(filter)}
                  </div>
                </Collapsible.Content>
              </Collapsible.Root>
            );
          }

          return (
            <div
              key={filter.id}
              className={!isLastGroup ? 'border-b border-gray-200 pb-4' : ''}
              data-testid={`filter-group-${filter.id}`}
            >
              <div className="font-medium text-gray-900 mb-3">
                <span className={designTokens.typography.small}>{filter.label}</span>
              </div>
              {renderFilterContent(filter)}
            </div>
          );
        })}
      </div>

      {showActions && (
        <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
          <AppleButton
            variant="primary"
            size="md"
            onClick={onApply}
            className="flex-1"
            data-testid="button-apply-filters"
          >
            Áp dụng
          </AppleButton>
          <AppleButton
            variant="secondary"
            size="md"
            onClick={handleReset}
            className="flex-1"
            data-testid="button-reset-filters"
          >
            Đặt lại
          </AppleButton>
        </div>
      )}
    </div>
  );
}
