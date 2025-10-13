// Theme type definition
export interface AppleTheme {
  colors: {
    primary: string
    primaryHover: string
    primaryActive: string
    destructive: string
    destructiveHover: string
    success: string
    warning: string
    accent: string
  }
  name?: string
}

// Predefined themes
export const ikkTheme: AppleTheme = {
  colors: {
    primary: '#ff0086',
    primaryHover: '#e6007a',
    primaryActive: '#cc006e',
    destructive: '#ef4444',
    destructiveHover: '#dc2626',
    success: '#10b981',
    warning: '#f59e0b',
    accent: '#3b82f6',
  },
  name: 'IKK Pink'
}

export const appleTheme: AppleTheme = {
  colors: {
    primary: '#007AFF',
    primaryHover: '#0066CC',
    primaryActive: '#0055B3',
    destructive: '#FF3B30',
    destructiveHover: '#FF2D23',
    success: '#34C759',
    warning: '#FF9500',
    accent: '#5856D6',
  },
  name: 'Apple Blue'
}

// Theme factory
export function createTheme(overrides: Partial<AppleTheme>): AppleTheme {
  return {
    ...ikkTheme,
    ...overrides,
    colors: {
      ...ikkTheme.colors,
      ...overrides.colors,
    },
  }
}
