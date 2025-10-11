import { InputHTMLAttributes, useId } from 'react';
import { Check } from 'lucide-react';
import { designTokens } from '@/constants/design-tokens';

interface AppleCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
}

export function AppleCheckbox({
  label,
  description,
  className = '',
  ...checkboxProps
}: AppleCheckboxProps) {
  const id = useId();
  const checkboxId = checkboxProps.id || id;

  return (
    <div className={`flex items-start ${className}`}>
      <div className="relative flex items-center h-5">
        <input
          id={checkboxId}
          type="checkbox"
          className="sr-only peer"
          data-testid={checkboxProps.name ? `checkbox-${checkboxProps.name}` : 'checkbox'}
          {...checkboxProps}
        />
        <div
          className={`
            w-5 h-5 ${designTokens.borderRadius.sm}
            border-2 border-gray-300
            ${designTokens.transitions.base}
            peer-checked:bg-[#ff0086] peer-checked:border-[#ff0086]
            peer-focus:ring-2 peer-focus:ring-[#ff0086] peer-focus:ring-offset-1
            peer-disabled:opacity-50 peer-disabled:cursor-not-allowed
            flex items-center justify-center
            cursor-pointer
          `}
        >
          <Check 
            className={`
              w-3.5 h-3.5 text-white
              ${designTokens.transitions.base}
              opacity-0 peer-checked:opacity-100
            `}
          />
        </div>
      </div>
      <div className="ml-3 flex-1">
        <label
          htmlFor={checkboxId}
          className={`
            ${designTokens.typography.small} font-medium text-gray-700 cursor-pointer
            ${checkboxProps.disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          {label}
        </label>
        {description && (
          <p className={`mt-0.5 ${designTokens.typography.small} text-gray-500`}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
