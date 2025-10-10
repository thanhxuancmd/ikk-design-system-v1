import { ReactNode } from 'react';

interface IonCardProps {
  children: ReactNode;
  className?: string;
  button?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  color?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'light' | 'medium' | 'dark';
  fill?: 'clear' | 'outline' | 'solid';
}

interface IonCardHeaderProps {
  children: ReactNode;
  className?: string;
}

interface IonCardContentProps {
  children: ReactNode;
  className?: string;
}

interface IonCardTitleProps {
  children: ReactNode;
  className?: string;
  size?: 'large' | 'small';
}

interface IonCardSubtitleProps {
  children: ReactNode;
  className?: string;
}

export function IonCard({ 
  children, 
  className = '', 
  button = false, 
  onClick, 
  disabled = false,
  color = 'light',
  fill = 'solid'
}: IonCardProps) {
  const baseClasses = `
    ion-card
    relative
    rounded-lg
    shadow-md
    overflow-hidden
    transition-all
    duration-300
    ease-in-out
  `;

  const colorClasses = {
    primary: fill === 'solid' ? 'bg-[var(--ion-color-primary)] text-[var(--ion-color-primary-contrast)]' : 
             fill === 'outline' ? 'border-2 border-[var(--ion-color-primary)] text-[var(--ion-color-primary)] bg-transparent' :
             'text-[var(--ion-color-primary)] bg-transparent',
    secondary: fill === 'solid' ? 'bg-[var(--ion-color-secondary)] text-[var(--ion-color-secondary-contrast)]' :
               fill === 'outline' ? 'border-2 border-[var(--ion-color-secondary)] text-[var(--ion-color-secondary)] bg-transparent' :
               'text-[var(--ion-color-secondary)] bg-transparent',
    tertiary: fill === 'solid' ? 'bg-[var(--ion-color-tertiary)] text-[var(--ion-color-tertiary-contrast)]' :
              fill === 'outline' ? 'border-2 border-[var(--ion-color-tertiary)] text-[var(--ion-color-tertiary)] bg-transparent' :
              'text-[var(--ion-color-tertiary)] bg-transparent',
    success: fill === 'solid' ? 'bg-[var(--ion-color-success)] text-[var(--ion-color-success-contrast)]' :
             fill === 'outline' ? 'border-2 border-[var(--ion-color-success)] text-[var(--ion-color-success)] bg-transparent' :
             'text-[var(--ion-color-success)] bg-transparent',
    warning: fill === 'solid' ? 'bg-[var(--ion-color-warning)] text-[var(--ion-color-warning-contrast)]' :
             fill === 'outline' ? 'border-2 border-[var(--ion-color-warning)] text-[var(--ion-color-warning)] bg-transparent' :
             'text-[var(--ion-color-warning)] bg-transparent',
    danger: fill === 'solid' ? 'bg-[var(--ion-color-danger)] text-[var(--ion-color-danger-contrast)]' :
            fill === 'outline' ? 'border-2 border-[var(--ion-color-danger)] text-[var(--ion-color-danger)] bg-transparent' :
            'text-[var(--ion-color-danger)] bg-transparent',
    light: fill === 'solid' ? 'bg-[var(--ion-color-light)] text-[var(--ion-color-light-contrast)]' :
           fill === 'outline' ? 'border-2 border-[var(--ion-color-light)] text-[var(--ion-color-light)] bg-transparent' :
           'text-[var(--ion-color-light)] bg-transparent',
    medium: fill === 'solid' ? 'bg-[var(--ion-color-medium)] text-[var(--ion-color-medium-contrast)]' :
            fill === 'outline' ? 'border-2 border-[var(--ion-color-medium)] text-[var(--ion-color-medium)] bg-transparent' :
            'text-[var(--ion-color-medium)] bg-transparent',
    dark: fill === 'solid' ? 'bg-[var(--ion-color-dark)] text-[var(--ion-color-dark-contrast)]' :
          fill === 'outline' ? 'border-2 border-[var(--ion-color-dark)] text-[var(--ion-color-dark)] bg-transparent' :
          'text-[var(--ion-color-dark)] bg-transparent'
  };

  const buttonClasses = button ? `
    cursor-pointer
    hover:shadow-lg
    active:scale-[0.98]
    active:shadow-sm
    ${!disabled ? 'hover:brightness-105' : 'opacity-50 cursor-not-allowed'}
  ` : '';

  const Component = button ? 'button' : 'div';

  return (
    <Component
      className={`${baseClasses} ${colorClasses[color]} ${buttonClasses} ${className}`}
      onClick={button && !disabled ? onClick : undefined}
      disabled={button ? disabled : undefined}
      style={{
        '--ion-color-primary': '#3880ff',
        '--ion-color-primary-contrast': '#ffffff',
        '--ion-color-secondary': '#3dc2ff',
        '--ion-color-secondary-contrast': '#ffffff',
        '--ion-color-tertiary': '#5260ff',
        '--ion-color-tertiary-contrast': '#ffffff',
        '--ion-color-success': '#2dd36f',
        '--ion-color-success-contrast': '#ffffff',
        '--ion-color-warning': '#ffc409',
        '--ion-color-warning-contrast': '#000000',
        '--ion-color-danger': '#eb445a',
        '--ion-color-danger-contrast': '#ffffff',
        '--ion-color-light': '#f4f5f8',
        '--ion-color-light-contrast': '#000000',
        '--ion-color-medium': '#92949c',
        '--ion-color-medium-contrast': '#ffffff',
        '--ion-color-dark': '#222428',
        '--ion-color-dark-contrast': '#ffffff'
      } as React.CSSProperties}
    >
      {children}
    </Component>
  );
}

export function IonCardHeader({ children, className = '' }: IonCardHeaderProps) {
  return (
    <div className={`ion-card-header px-4 pt-4 pb-2 ${className}`}>
      {children}
    </div>
  );
}

export function IonCardContent({ children, className = '' }: IonCardContentProps) {
  return (
    <div className={`ion-card-content px-4 pb-4 ${className}`}>
      {children}
    </div>
  );
}

export function IonCardTitle({ children, className = '', size = 'large' }: IonCardTitleProps) {
  const sizeClasses = {
    large: 'text-xl font-bold',
    small: 'text-lg font-semibold'
  };

  return (
    <h2 className={`ion-card-title ${sizeClasses[size]} text-[var(--ion-text-color)] mb-2 ${className}`}>
      {children}
    </h2>
  );
}

export function IonCardSubtitle({ children, className = '' }: IonCardSubtitleProps) {
  return (
    <h3 className={`ion-card-subtitle text-sm font-medium text-[var(--ion-color-medium)] ${className}`}>
      {children}
    </h3>
  );
}