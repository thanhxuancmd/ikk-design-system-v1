import { InputHTMLAttributes, useId } from 'react';
import { designTokens } from '@/constants/design-tokens';

interface AppleRadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
}

export function AppleRadio({
  label,
  description,
  className = '',
  ...radioProps
}: AppleRadioProps) {
  const id = useId();
  const radioId = radioProps.id || id;

  return (
    <div className={`flex items-start ${className}`}>
      <div className="relative flex items-center h-5">
        <input
          id={radioId}
          type="radio"
          className="sr-only peer"
          data-testid={radioProps.name ? `radio-${radioProps.name}-${radioProps.value}` : 'radio'}
          {...radioProps}
        />
        <div
          className={`
            w-5 h-5 ${designTokens.borderRadius.full}
            border-2 border-gray-300
            ${designTokens.transitions.base}
            peer-checked:border-[#ff0086]
            peer-focus:ring-2 peer-focus:ring-[#ff0086] peer-focus:ring-offset-1
            peer-disabled:opacity-50 peer-disabled:cursor-not-allowed
            flex items-center justify-center
            cursor-pointer
          `}
        >
          <div
            className={`
              w-2.5 h-2.5 ${designTokens.borderRadius.full}
              bg-[#ff0086]
              ${designTokens.transitions.base}
              opacity-0 peer-checked:opacity-100
            `}
          />
        </div>
      </div>
      <div className="ml-3 flex-1">
        <label
          htmlFor={radioId}
          className={`
            ${designTokens.typography.small} font-medium text-gray-700 cursor-pointer
            ${radioProps.disabled ? 'opacity-50 cursor-not-allowed' : ''}
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

interface AppleRadioGroupProps {
  label?: string;
  options: Array<{ value: string; label: string; description?: string }>;
  value?: string;
  onChange?: (value: string) => void;
  name: string;
}

export function AppleRadioGroup({
  label,
  options,
  value,
  onChange,
  name,
}: AppleRadioGroupProps) {
  return (
    <div className="w-full" role="radiogroup" aria-label={label}>
      {label && (
        <div className={`${designTokens.typography.small} font-medium text-gray-700 mb-2`}>
          {label}
        </div>
      )}
      <div className="space-y-3">
        {options.map((option) => (
          <AppleRadio
            key={option.value}
            name={name}
            value={option.value}
            label={option.label}
            description={option.description}
            checked={value === option.value}
            onChange={(e) => onChange?.(e.target.value)}
          />
        ))}
      </div>
    </div>
  );
}
