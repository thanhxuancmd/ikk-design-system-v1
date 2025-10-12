import { HTMLAttributes, useId, useState } from 'react';
import { DayPicker, DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import * as Popover from '@radix-ui/react-popover';
import { Calendar } from 'lucide-react';
import { designTokens } from '@/constants/design-tokens';
import 'react-day-picker/dist/style.css';

interface AppleDatePickerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  label?: string;
  error?: string;
  helperText?: string;
  mode: 'single' | 'range';
  selected?: Date | DateRange;
  onSelect?: (date: Date | DateRange | undefined) => void;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  name?: string;
}

export function AppleDatePicker({
  label,
  error,
  helperText,
  mode,
  selected,
  onSelect,
  disabled = false,
  minDate,
  maxDate,
  className = '',
  name,
  ...divProps
}: AppleDatePickerProps) {
  const id = useId();
  const inputId = divProps.id || id;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;
  const [open, setOpen] = useState(false);

  const formatDateDisplay = () => {
    if (!selected) {
      return mode === 'single' ? 'Chọn ngày' : 'Chọn khoảng thời gian';
    }

    if (mode === 'single' && selected instanceof Date) {
      return format(selected, 'dd/MM/yyyy', { locale: vi });
    }

    if (mode === 'range' && selected && typeof selected === 'object' && 'from' in selected) {
      const range = selected as DateRange;
      if (range.from) {
        const fromStr = format(range.from, 'dd/MM/yyyy', { locale: vi });
        if (range.to) {
          const toStr = format(range.to, 'dd/MM/yyyy', { locale: vi });
          return `${fromStr} - ${toStr}`;
        }
        return fromStr;
      }
    }

    return mode === 'single' ? 'Chọn ngày' : 'Chọn khoảng thời gian';
  };

  const handleSelect = (date: Date | DateRange | undefined) => {
    onSelect?.(date);
    
    // Close popover after selection
    if (mode === 'single' && date) {
      setOpen(false);
    } else if (mode === 'range' && date && typeof date === 'object' && 'from' in date && 'to' in date) {
      const range = date as DateRange;
      if (range.from && range.to) {
        setOpen(false);
      }
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
              ${!selected ? 'text-gray-400' : 'text-gray-900'}
            `}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            data-testid={name ? `datepicker-${name}` : 'datepicker'}
          >
            <span className="block truncate">{formatDateDisplay()}</span>
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
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
              p-3
              outline-none
              animate-in fade-in-0 zoom-in-95
              data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
              data-[side=bottom]:slide-in-from-top-2
            `}
            style={{ zIndex: designTokens.zIndex.popover }}
            sideOffset={5}
            data-testid="datepicker-popover"
          >
            <div data-testid="datepicker-calendar" role="application" aria-label="Lịch chọn ngày">
              <DayPicker
                mode={mode}
                selected={selected as any}
                onSelect={handleSelect as any}
                locale={vi}
                disabled={disabled ? true : minDate || maxDate ? (date) => {
                  if (minDate && date < minDate) return true;
                  if (maxDate && date > maxDate) return true;
                  return false;
                } : undefined}
                modifiersClassNames={{
                  selected: 'bg-[#ff0086] text-white hover:bg-[#ff0086]',
                  today: 'font-bold',
                  disabled: 'opacity-50 cursor-not-allowed',
                }}
                className="rdp-custom"
                classNames={{
                  months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
                  month: 'space-y-4',
                  caption: 'flex justify-center pt-1 relative items-center',
                  caption_label: 'text-sm font-medium',
                  nav: 'space-x-1 flex items-center',
                  nav_button: 'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 hover:bg-gray-100 rounded-md transition-all',
                  nav_button_previous: 'absolute left-1',
                  nav_button_next: 'absolute right-1',
                  table: 'w-full border-collapse space-y-1',
                  head_row: 'flex',
                  head_cell: 'text-gray-500 rounded-md w-9 font-normal text-[0.8rem]',
                  row: 'flex w-full mt-2',
                  cell: 'text-center text-sm p-0 relative [&:has([aria-selected])]:bg-[#ff0086]/10 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
                  day: 'h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-gray-100 rounded-md transition-all',
                  day_selected: 'bg-[#ff0086] text-white hover:bg-[#ff0086] hover:text-white focus:bg-[#ff0086] focus:text-white',
                  day_today: 'bg-gray-100 text-gray-900',
                  day_outside: 'text-gray-400 opacity-50',
                  day_disabled: 'text-gray-400 opacity-50 cursor-not-allowed',
                  day_range_middle: 'aria-selected:bg-[#ff0086]/10 aria-selected:text-gray-900',
                  day_hidden: 'invisible',
                }}
              />
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
