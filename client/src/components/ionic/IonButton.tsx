import { ReactNode } from 'react';

interface IonButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  color?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'light' | 'medium' | 'dark';
  fill?: 'clear' | 'outline' | 'solid' | 'default';
  size?: 'small' | 'default' | 'large';
  expand?: 'full' | 'block';
  shape?: 'round';
  strong?: boolean;
}

export function IonButton({
  children,
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  color = 'primary',
  fill = 'solid',
  size = 'default',
  expand,
  shape,
  strong = false
}: IonButtonProps) {
  const baseClasses = `
    ion-button
    inline-flex
    items-center
    justify-center
    font-medium
    text-center
    transition-all
    duration-200
    ease-in-out
    border-0
    outline-none
    cursor-pointer
    user-select-none
    vertical-align-top
    text-decoration-none
    white-space-nowrap
    position-relative
    overflow-hidden
  `;

  // Size classes
  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm min-h-[2rem]',
    default: 'px-4 py-2 text-base min-h-[2.75rem]',
    large: 'px-6 py-3 text-lg min-h-[3.5rem]'
  };

  // Color and fill classes
  const getColorClasses = () => {
    const colors = {
      primary: {
        solid: 'bg-[var(--ion-color-primary)] text-[var(--ion-color-primary-contrast)] hover:bg-[var(--ion-color-primary-shade)] active:bg-[var(--ion-color-primary-tint)]',
        outline: 'border-2 border-[var(--ion-color-primary)] text-[var(--ion-color-primary)] bg-transparent hover:bg-[var(--ion-color-primary)] hover:text-[var(--ion-color-primary-contrast)]',
        clear: 'text-[var(--ion-color-primary)] bg-transparent hover:bg-[var(--ion-color-primary-tint)] hover:bg-opacity-10',
        default: 'bg-[var(--ion-color-primary)] text-[var(--ion-color-primary-contrast)] hover:bg-[var(--ion-color-primary-shade)]'
      },
      secondary: {
        solid: 'bg-[var(--ion-color-secondary)] text-[var(--ion-color-secondary-contrast)] hover:bg-[var(--ion-color-secondary-shade)] active:bg-[var(--ion-color-secondary-tint)]',
        outline: 'border-2 border-[var(--ion-color-secondary)] text-[var(--ion-color-secondary)] bg-transparent hover:bg-[var(--ion-color-secondary)] hover:text-[var(--ion-color-secondary-contrast)]',
        clear: 'text-[var(--ion-color-secondary)] bg-transparent hover:bg-[var(--ion-color-secondary-tint)] hover:bg-opacity-10',
        default: 'bg-[var(--ion-color-secondary)] text-[var(--ion-color-secondary-contrast)] hover:bg-[var(--ion-color-secondary-shade)]'
      },
      tertiary: {
        solid: 'bg-[var(--ion-color-tertiary)] text-[var(--ion-color-tertiary-contrast)] hover:bg-[var(--ion-color-tertiary-shade)] active:bg-[var(--ion-color-tertiary-tint)]',
        outline: 'border-2 border-[var(--ion-color-tertiary)] text-[var(--ion-color-tertiary)] bg-transparent hover:bg-[var(--ion-color-tertiary)] hover:text-[var(--ion-color-tertiary-contrast)]',
        clear: 'text-[var(--ion-color-tertiary)] bg-transparent hover:bg-[var(--ion-color-tertiary-tint)] hover:bg-opacity-10',
        default: 'bg-[var(--ion-color-tertiary)] text-[var(--ion-color-tertiary-contrast)] hover:bg-[var(--ion-color-tertiary-shade)]'
      },
      success: {
        solid: 'bg-[var(--ion-color-success)] text-[var(--ion-color-success-contrast)] hover:bg-[var(--ion-color-success-shade)] active:bg-[var(--ion-color-success-tint)]',
        outline: 'border-2 border-[var(--ion-color-success)] text-[var(--ion-color-success)] bg-transparent hover:bg-[var(--ion-color-success)] hover:text-[var(--ion-color-success-contrast)]',
        clear: 'text-[var(--ion-color-success)] bg-transparent hover:bg-[var(--ion-color-success-tint)] hover:bg-opacity-10',
        default: 'bg-[var(--ion-color-success)] text-[var(--ion-color-success-contrast)] hover:bg-[var(--ion-color-success-shade)]'
      },
      warning: {
        solid: 'bg-[var(--ion-color-warning)] text-[var(--ion-color-warning-contrast)] hover:bg-[var(--ion-color-warning-shade)] active:bg-[var(--ion-color-warning-tint)]',
        outline: 'border-2 border-[var(--ion-color-warning)] text-[var(--ion-color-warning)] bg-transparent hover:bg-[var(--ion-color-warning)] hover:text-[var(--ion-color-warning-contrast)]',
        clear: 'text-[var(--ion-color-warning)] bg-transparent hover:bg-[var(--ion-color-warning-tint)] hover:bg-opacity-10',
        default: 'bg-[var(--ion-color-warning)] text-[var(--ion-color-warning-contrast)] hover:bg-[var(--ion-color-warning-shade)]'
      },
      danger: {
        solid: 'bg-[var(--ion-color-danger)] text-[var(--ion-color-danger-contrast)] hover:bg-[var(--ion-color-danger-shade)] active:bg-[var(--ion-color-danger-tint)]',
        outline: 'border-2 border-[var(--ion-color-danger)] text-[var(--ion-color-danger)] bg-transparent hover:bg-[var(--ion-color-danger)] hover:text-[var(--ion-color-danger-contrast)]',
        clear: 'text-[var(--ion-color-danger)] bg-transparent hover:bg-[var(--ion-color-danger-tint)] hover:bg-opacity-10',
        default: 'bg-[var(--ion-color-danger)] text-[var(--ion-color-danger-contrast)] hover:bg-[var(--ion-color-danger-shade)]'
      },
      light: {
        solid: 'bg-[var(--ion-color-light)] text-[var(--ion-color-light-contrast)] hover:bg-[var(--ion-color-light-shade)] active:bg-[var(--ion-color-light-tint)]',
        outline: 'border-2 border-[var(--ion-color-light)] text-[var(--ion-color-light)] bg-transparent hover:bg-[var(--ion-color-light)] hover:text-[var(--ion-color-light-contrast)]',
        clear: 'text-[var(--ion-color-light)] bg-transparent hover:bg-[var(--ion-color-light-tint)] hover:bg-opacity-10',
        default: 'bg-[var(--ion-color-light)] text-[var(--ion-color-light-contrast)] hover:bg-[var(--ion-color-light-shade)]'
      },
      medium: {
        solid: 'bg-[var(--ion-color-medium)] text-[var(--ion-color-medium-contrast)] hover:bg-[var(--ion-color-medium-shade)] active:bg-[var(--ion-color-medium-tint)]',
        outline: 'border-2 border-[var(--ion-color-medium)] text-[var(--ion-color-medium)] bg-transparent hover:bg-[var(--ion-color-medium)] hover:text-[var(--ion-color-medium-contrast)]',
        clear: 'text-[var(--ion-color-medium)] bg-transparent hover:bg-[var(--ion-color-medium-tint)] hover:bg-opacity-10',
        default: 'bg-[var(--ion-color-medium)] text-[var(--ion-color-medium-contrast)] hover:bg-[var(--ion-color-medium-shade)]'
      },
      dark: {
        solid: 'bg-[var(--ion-color-dark)] text-[var(--ion-color-dark-contrast)] hover:bg-[var(--ion-color-dark-shade)] active:bg-[var(--ion-color-dark-tint)]',
        outline: 'border-2 border-[var(--ion-color-dark)] text-[var(--ion-color-dark)] bg-transparent hover:bg-[var(--ion-color-dark)] hover:text-[var(--ion-color-dark-contrast)]',
        clear: 'text-[var(--ion-color-dark)] bg-transparent hover:bg-[var(--ion-color-dark-tint)] hover:bg-opacity-10',
        default: 'bg-[var(--ion-color-dark)] text-[var(--ion-color-dark-contrast)] hover:bg-[var(--ion-color-dark-shade)]'
      }
    };

    return colors[color][fill];
  };

  // Expand classes
  const expandClasses = {
    full: 'w-full',
    block: 'w-full block'
  };

  // Shape classes
  const shapeClasses = shape === 'round' ? 'rounded-full' : 'rounded-md';

  // Strong classes
  const strongClasses = strong ? 'font-bold' : '';

  // Disabled classes
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';

  // Active state classes
  const activeClasses = !disabled ? 'active:scale-95 active:brightness-90' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${getColorClasses()}
        ${expand ? expandClasses[expand] : ''}
        ${shapeClasses}
        ${strongClasses}
        ${disabledClasses}
        ${activeClasses}
        ${className}
      `}
      style={{
        '--ion-color-primary': '#3880ff',
        '--ion-color-primary-contrast': '#ffffff',
        '--ion-color-primary-shade': '#3171e0',
        '--ion-color-primary-tint': '#4c8dff',
        '--ion-color-secondary': '#3dc2ff',
        '--ion-color-secondary-contrast': '#ffffff',
        '--ion-color-secondary-shade': '#36abe0',
        '--ion-color-secondary-tint': '#50c8ff',
        '--ion-color-tertiary': '#5260ff',
        '--ion-color-tertiary-contrast': '#ffffff',
        '--ion-color-tertiary-shade': '#4854e0',
        '--ion-color-tertiary-tint': '#6370ff',
        '--ion-color-success': '#2dd36f',
        '--ion-color-success-contrast': '#ffffff',
        '--ion-color-success-shade': '#28ba62',
        '--ion-color-success-tint': '#42d77d',
        '--ion-color-warning': '#ffc409',
        '--ion-color-warning-contrast': '#000000',
        '--ion-color-warning-shade': '#e0ac08',
        '--ion-color-warning-tint': '#ffca22',
        '--ion-color-danger': '#eb445a',
        '--ion-color-danger-contrast': '#ffffff',
        '--ion-color-danger-shade': '#cf3c4f',
        '--ion-color-danger-tint': '#ed576b',
        '--ion-color-light': '#f4f5f8',
        '--ion-color-light-contrast': '#000000',
        '--ion-color-light-shade': '#d7d8da',
        '--ion-color-light-tint': '#f5f6f9',
        '--ion-color-medium': '#92949c',
        '--ion-color-medium-contrast': '#ffffff',
        '--ion-color-medium-shade': '#808289',
        '--ion-color-medium-tint': '#9d9fa6',
        '--ion-color-dark': '#222428',
        '--ion-color-dark-contrast': '#ffffff',
        '--ion-color-dark-shade': '#1e2023',
        '--ion-color-dark-tint': '#383a3e'
      } as React.CSSProperties}
    >
      {children}
    </button>
  );
}