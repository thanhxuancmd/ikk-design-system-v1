import { InputHTMLAttributes, useId } from 'react';
import { designTokens } from '@/constants/design-tokens';

interface AppleSwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
}

export function AppleSwitch({
  label,
  description,
  className = '',
  ...switchProps
}: AppleSwitchProps) {
  const id = useId();
  const switchId = switchProps.id || id;

  return (
    <div className={`flex items-start justify-between ${className}`}>
      <div className="flex-1">
        {label && (
          <label
            htmlFor={switchId}
            className={`
              ${designTokens.typography.small} font-medium text-gray-700 cursor-pointer
              ${switchProps.disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {label}
          </label>
        )}
        {description && (
          <p className={`mt-0.5 ${designTokens.typography.small} text-gray-500`}>
            {description}
          </p>
        )}
      </div>
      
      <div className="ml-4 flex items-center">
        <input
          id={switchId}
          type="checkbox"
          role="switch"
          className="sr-only peer"
          data-testid={switchProps.name ? `switch-${switchProps.name}` : 'switch'}
          {...switchProps}
        />
        <div
          className={`
            relative w-11 h-6 ${designTokens.borderRadius.full}
            bg-gray-300
            peer-checked:bg-[#ff0086]
            peer-focus:ring-2 peer-focus:ring-[#ff0086] peer-focus:ring-offset-1
            peer-disabled:opacity-50 peer-disabled:cursor-not-allowed
            ${designTokens.transitions.base}
            cursor-pointer
          `}
        >
          <div
            className={`
              absolute top-0.5 left-0.5
              w-5 h-5 ${designTokens.borderRadius.full}
              bg-white
              ${designTokens.transitions.base}
              peer-checked:translate-x-5
              shadow-sm
            `}
          />
        </div>
      </div>
    </div>
  );
}
