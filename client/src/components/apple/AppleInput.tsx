import { InputHTMLAttributes, ReactNode, useId } from 'react';
import { designTokens } from '@/constants/design-tokens';

interface AppleInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export function AppleInput({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className = '',
  ...inputProps
}: AppleInputProps) {
  const id = useId();
  const inputId = inputProps.id || id;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className={`block ${designTokens.typography.small} font-medium text-gray-700 mb-1.5`}
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}
        
        <input
          id={inputId}
          className={`
            w-full h-10 px-3
            ${leftIcon ? 'pl-10' : ''}
            ${rightIcon ? 'pr-10' : ''}
            ${designTokens.borderRadius.md}
            ${designTokens.shadows.sm}
            ${designTokens.transitions.base}
            border
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${inputProps.disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'bg-white'}
            focus:outline-none focus:ring-2 focus:ring-[#ff0086] focus:border-[#ff0086]
            placeholder:text-gray-400
            ${className}
          `}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          data-testid={inputProps.name ? `input-${inputProps.name}` : 'input'}
          {...inputProps}
        />
        
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {rightIcon}
          </div>
        )}
      </div>

      {error && (
        <p id={errorId} className="mt-1.5 text-sm text-red-600" data-testid={`error-${inputProps.name}`}>
          {error}
        </p>
      )}
      
      {!error && helperText && (
        <p id={helperId} className="mt-1.5 text-sm text-gray-500" data-testid={`helper-${inputProps.name}`}>
          {helperText}
        </p>
      )}
    </div>
  );
}
