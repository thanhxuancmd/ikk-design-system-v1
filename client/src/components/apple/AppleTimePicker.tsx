import { HTMLAttributes, useId, useState, useEffect, useRef, KeyboardEvent } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { IoTimeOutline } from 'react-icons/io5';
import { designTokens } from '@/constants/design-tokens';

interface AppleTimePickerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  label?: string;
  error?: string;
  helperText?: string;
  value?: string; // 'HH:mm' format
  onChange?: (time: string) => void;
  disabled?: boolean;
  minuteStep?: number;
  use24Hour?: boolean;
  name?: string;
}

function generateTimeOptions(minuteStep: number = 15, use24Hour: boolean = true): string[] {
  const times: string[] = [];
  const totalMinutes = 24 * 60;
  
  for (let minutes = 0; minutes < totalMinutes; minutes += minuteStep) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (use24Hour) {
      // 24-hour format: "09:00", "14:30", "23:45"
      const timeStr = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
      times.push(timeStr);
    } else {
      // 12-hour format with Vietnamese suffixes: "9:00 SA", "2:30 CH"
      let displayHour = hours % 12;
      if (displayHour === 0) displayHour = 12;
      const suffix = hours < 12 ? 'SA' : 'CH';
      const timeStr = `${displayHour}:${String(mins).padStart(2, '0')} ${suffix}`;
      times.push(timeStr);
    }
  }
  
  return times;
}

export function AppleTimePicker({
  label,
  error,
  helperText,
  value,
  onChange,
  disabled = false,
  minuteStep = 15,
  use24Hour = true,
  className = '',
  name,
  ...divProps
}: AppleTimePickerProps) {
  const id = useId();
  const inputId = divProps.id || id;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const timeOptions = generateTimeOptions(minuteStep, use24Hour);

  // Find the index of the selected value
  const selectedIndex = value ? timeOptions.indexOf(value) : -1;

  // Set initial focused index when opening
  useEffect(() => {
    if (open) {
      if (selectedIndex >= 0) {
        setFocusedIndex(selectedIndex);
      } else {
        setFocusedIndex(0);
      }
    }
  }, [open, selectedIndex]);

  // Scroll to focused item
  useEffect(() => {
    if (open && focusedIndex >= 0 && itemRefs.current[focusedIndex]) {
      itemRefs.current[focusedIndex]?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [focusedIndex, open]);

  const handleSelect = (time: string) => {
    onChange?.(time);
    setOpen(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (!open) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex((prev) => (prev + 1) % timeOptions.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex((prev) => (prev - 1 + timeOptions.length) % timeOptions.length);
        break;
      case 'Enter':
        e.preventDefault();
        if (focusedIndex >= 0) {
          handleSelect(timeOptions[focusedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setOpen(false);
        break;
      case 'Home':
        e.preventDefault();
        setFocusedIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setFocusedIndex(timeOptions.length - 1);
        break;
    }
  };

  return (
    <div className={`w-full ${className}`} {...divProps}>
      {label && (
        <label
          htmlFor={inputId}
          className={`block ${designTokens.typography.small} font-medium text-gray-700 mb-1.5`}
        >
          {label}
        </label>
      )}

      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <button
            id={inputId}
            type="button"
            disabled={disabled}
            onKeyDown={handleKeyDown}
            className={`
              w-full h-10 px-3 pr-10
              text-left
              ${designTokens.borderRadius.md}
              ${designTokens.shadows.sm}
              ${designTokens.transitions.base}
              border
              ${error ? 'border-red-500' : 'border-gray-300'}
              ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'bg-white hover:border-gray-400'}
              focus:outline-none focus:ring-2 focus:ring-[#ff0086] focus:border-[#ff0086]
              ${!value ? 'text-gray-400' : 'text-gray-900'}
            `}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            data-testid={name ? `timepicker-${name}` : 'timepicker'}
          >
            <span className="block truncate">{value || 'Chọn giờ'}</span>
            <IoTimeOutline className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </button>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            side="bottom"
            align="start"
            className={`
              bg-white border border-gray-200
              ${designTokens.borderRadius.lg}
              ${designTokens.shadows.md}
              outline-none
              animate-in fade-in-0 zoom-in-95
              data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
              data-[side=bottom]:slide-in-from-top-2
              w-[var(--radix-popover-trigger-width)]
            `}
            style={{ zIndex: designTokens.zIndex.popover }}
            sideOffset={5}
            data-testid="timepicker-popover"
          >
            <div
              ref={listRef}
              className="max-h-60 overflow-y-auto py-1"
              role="listbox"
              aria-label="Time options"
            >
              {timeOptions.map((time, index) => (
                <button
                  key={time}
                  ref={(el) => (itemRefs.current[index] = el)}
                  type="button"
                  onClick={() => handleSelect(time)}
                  onMouseEnter={() => setFocusedIndex(index)}
                  className={`
                    w-full px-3 py-2 text-left text-sm
                    ${designTokens.transitions.base}
                    ${
                      time === value
                        ? 'bg-[#ff0086] text-white'
                        : focusedIndex === index
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-900 hover:bg-gray-100'
                    }
                  `}
                  role="option"
                  aria-selected={time === value}
                  data-testid={`timepicker-option-${time}`}
                >
                  {time}
                </button>
              ))}
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>

      {error && (
        <p id={errorId} className="mt-1.5 text-sm text-red-600" data-testid={`error-${name}`}>
          {error}
        </p>
      )}

      {!error && helperText && (
        <p id={helperId} className="mt-1.5 text-sm text-gray-500" data-testid={`helper-${name}`}>
          {helperText}
        </p>
      )}
    </div>
  );
}
