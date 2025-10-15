import React from 'react';

export interface AppleInlineErrorProps {
  /** Error message to display */
  message?: string;
  /** Whether to show the error */
  show?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * AppleInlineError - A component to display inline error messages below form fields
 * 
 * @example
 * ```tsx
 * <AppleInlineError 
 *   message="This field is required" 
 *   show={true} 
 * />
 * ```
 */
export const AppleInlineError: React.FC<AppleInlineErrorProps> = ({
  message,
  show = true,
  className = '',
}) => {
  if (!show || !message) {
    return null;
  }

  return (
    <div
      className={`flex items-start gap-1.5 mt-1.5 text-sm text-red-600 dark:text-red-400 ${className}`}
      role="alert"
      aria-live="polite"
    >
      <svg
        className="w-4 h-4 mt-0.5 flex-shrink-0"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
      <span>{message}</span>
    </div>
  );
};

export default AppleInlineError;

