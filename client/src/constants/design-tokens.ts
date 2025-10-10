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
  button: {
    sizes: {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-2.5 text-sm',
      lg: 'px-8 py-3 text-base',
    },
    variants: {
      primary: 'bg-[#ff0086] hover:bg-[#e60078] active:bg-[#cc006a] text-white',
      secondary: 'bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700',
      outline: 'border-2 border-[#ff0086] hover:bg-[#ffe6f2] active:bg-[#ff4da6]/20 text-[#ff0086]',
    },
    base: 'rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ff0086] focus:ring-offset-2',
  },
  badge: {
    sizes: {
      sm: 'text-[10px] px-2 py-0.5',
      md: 'text-xs px-2.5 py-1',
    },
    variants: {
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800',
      info: 'bg-blue-100 text-blue-800',
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
