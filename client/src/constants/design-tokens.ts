export const designTokens = {
  colors: {
    primary: {
      DEFAULT: '#ff0086',
      hover: '#e60078',
      active: '#cc006a',
      light: '#ff4da6',
      ultraLight: '#ffe6f2',
    },
    semantic: {
      success: '#10b981',
      successLight: '#6ee7b7',
      warning: '#f59e0b',
      warningLight: '#fbbf24',
      error: '#ef4444',
      errorLight: '#fca5a5',
      info: '#3b82f6',
      infoLight: '#93c5fd',
    },
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e8e8e8',
      300: '#d4d4d4',
      400: '#a0a0a0',
      500: '#737373',
      600: '#6b7280',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
  },
  spacing: {
    sectionSpacing: 'mb-12',
    container: 'max-w-7xl mx-auto px-4',
    componentGaps: {
      xs: 'gap-2',
      sm: 'gap-4',
      md: 'gap-6',
      lg: 'gap-8',
      xl: 'gap-12',
    },
  },
  borderRadius: {
    none: 'rounded-none',
    sm: 'rounded',
    md: 'rounded-lg',
    lg: 'rounded-xl',
    full: 'rounded-full',
  },
  shadows: {
    none: 'shadow-none',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    '2xl': 'shadow-2xl',
  },
  transitions: {
    fast: 'transition-all duration-150',
    base: 'transition-all duration-200',
    slow: 'transition-all duration-300',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  zIndex: {
    dropdown: '1000',
    sticky: '1020',
    fixed: '1030',
    modal: '1040',
    popover: '1050',
    toast: '1060',
  },
  button: {
    sizes: {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-2.5 text-sm',
      lg: 'px-8 py-3 text-base',
    },
    variants: {
      primary: 'bg-[var(--apple-primary)] hover:bg-[var(--apple-primary-hover)] active:bg-[var(--apple-primary-active)] text-white',
      secondary: 'bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700',
      outline: 'border-2 border-[var(--apple-primary)] hover:bg-[var(--apple-primary-light)] active:bg-[var(--apple-primary-active)]/20 text-[var(--apple-primary)]',
      destructive: 'bg-[var(--apple-destructive)] hover:bg-[var(--apple-destructive-hover)] text-white',
    },
    base: 'rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--apple-primary)] focus:ring-offset-2',
  },
  badge: {
    sizes: {
      sm: 'text-[10px] px-2 py-0.5',
      md: 'text-xs px-2.5 py-1',
    },
    variants: {
      primary: 'bg-[var(--apple-primary)] text-white',
      success: 'bg-[var(--apple-success-soft)] text-[var(--apple-success)]',
      warning: 'bg-[var(--apple-warning-soft)] text-[var(--apple-warning)]',
      error: 'bg-[var(--apple-destructive-soft)] text-[var(--apple-destructive)]',
      destructive: 'bg-[var(--apple-destructive-soft)] text-[var(--apple-destructive)]',
      info: 'bg-[var(--apple-accent-soft)] text-[var(--apple-accent)]',
      default: 'bg-gray-100 text-gray-800',
    },
    base: 'rounded-md font-medium inline-flex items-center',
  },
  typography: {
    h1: 'text-4xl font-bold',
    h2: 'text-2xl font-bold',
    h3: 'text-xl font-semibold',
    body: 'text-base',
    small: 'text-sm',
    description: 'text-gray-600',
  },
} as const;

export type ButtonSize = keyof typeof designTokens.button.sizes;
export type ButtonVariant = keyof typeof designTokens.button.variants;
export type BadgeSize = keyof typeof designTokens.badge.sizes;
export type BadgeVariant = keyof typeof designTokens.badge.variants;
