import { SelectHTMLAttributes, useId } from 'react';
import { IoChevronDownOutline } from 'react-icons/io5';
import { designTokens } from '@/constants/design-tokens';

interface AppleSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: Array<{ value: string; label: string }>;
}

export function AppleSelect({
  label,
  error,
  helperText,
  options,
  className = '',
  ...selectProps
}: AppleSelectProps) {
  const id = useId();
  const selectId = selectProps.id || id;
  const errorId = `${selectId}-error`;
  const helperId = `${selectId}-helper`;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={selectId}
          className={`block ${designTokens.typography.small} font-medium text-gray-700 mb-1.5`}
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        <select
          id={selectId}
          className={`
            w-full h-10 px-3 pr-10
            ${designTokens.borderRadius.md}
            ${designTokens.shadows.sm}
            ${designTokens.transitions.base}
            border
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${selectProps.disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'bg-white'}
            focus:outline-none focus:ring-2 focus:ring-[#ff0086] focus:border-[#ff0086]
            appearance-none
            ${className}
          `}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          data-testid={selectProps.name ? `select-${selectProps.name}` : 'select'}
          {...selectProps}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <IoChevronDownOutline className="w-4 h-4" />
        </div>
      </div>

      {error && (
        <p id={errorId} className="mt-1.5 text-sm text-red-600" data-testid={`error-${selectProps.name}`}>
          {error}
        </p>
      )}
      
      {!error && helperText && (
        <p id={helperId} className="mt-1.5 text-sm text-gray-500" data-testid={`helper-${selectProps.name}`}>
          {helperText}
        </p>
      )}
    </div>
  );
}
