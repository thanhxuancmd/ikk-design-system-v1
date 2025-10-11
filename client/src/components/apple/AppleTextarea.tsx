import { TextareaHTMLAttributes, useId, useState } from 'react';
import { designTokens } from '@/constants/design-tokens';

interface AppleTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  maxLength?: number;
  showCount?: boolean;
}

export function AppleTextarea({
  label,
  error,
  helperText,
  maxLength,
  showCount = false,
  className = '',
  ...textareaProps
}: AppleTextareaProps) {
  const id = useId();
  const textareaId = textareaProps.id || id;
  const errorId = `${textareaId}-error`;
  const helperId = `${textareaId}-helper`;
  const [count, setCount] = useState(textareaProps.value?.toString().length || 0);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCount(e.target.value.length);
    textareaProps.onChange?.(e);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className={`${designTokens.typography.small} font-medium text-gray-700`}
          >
            {label}
          </label>
        )}
        {showCount && maxLength && (
          <span className={`${designTokens.typography.small} text-gray-500`}>
            {count}/{maxLength}
          </span>
        )}
      </div>
      
      <textarea
        id={textareaId}
        maxLength={maxLength}
        className={`
          w-full min-h-[100px] px-3 py-2
          ${designTokens.borderRadius.md}
          ${designTokens.shadows.sm}
          ${designTokens.transitions.base}
          border
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${textareaProps.disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'bg-white'}
          focus:outline-none focus:ring-2 focus:ring-[#ff0086] focus:border-[#ff0086]
          placeholder:text-gray-400
          resize-y
          ${className}
        `}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? errorId : helperText ? helperId : undefined}
        data-testid={textareaProps.name ? `textarea-${textareaProps.name}` : 'textarea'}
        onChange={handleChange}
        {...textareaProps}
      />

      {error && (
        <p id={errorId} className="mt-1.5 text-sm text-red-600" data-testid={`error-${textareaProps.name}`}>
          {error}
        </p>
      )}
      
      {!error && helperText && (
        <p id={helperId} className="mt-1.5 text-sm text-gray-500" data-testid={`helper-${textareaProps.name}`}>
          {helperText}
        </p>
      )}
    </div>
  );
}
