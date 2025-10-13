// Theme type definition
export interface AppleTheme {
  colors: {
    primary: string
    primaryHover: string
    primaryActive: string
    primarySoft: string
    primaryLight: string
    destructive: string
    destructiveHover: string
    destructiveSoft: string
    destructiveText: string
    success: string
    successSoft: string
    successText: string
    warning: string
    warningSoft: string
    warningText: string
    accent: string
    accentSoft: string
    accentText: string
  }
  name?: string
}

// Predefined themes
export const ikkTheme: AppleTheme = {
  colors: {
    primary: '#ff0086',
    primaryHover: '#e6007a',
    primaryActive: '#cc006e',
    primarySoft: 'rgba(255, 0, 134, 0.1)',
    primaryLight: 'rgba(255, 0, 134, 0.2)',
    destructive: '#ef4444',
    destructiveHover: '#dc2626',
    destructiveSoft: 'rgba(239, 68, 68, 0.1)',
    destructiveText: '#991b1b',
    success: '#10b981',
    successSoft: 'rgba(16, 185, 129, 0.2)',
    successText: '#065f46',
    warning: '#f59e0b',
    warningSoft: 'rgba(245, 158, 11, 0.2)',
    warningText: '#92400e',
    accent: '#3b82f6',
    accentSoft: 'rgba(59, 130, 246, 0.2)',
    accentText: '#1e40af',
  },
  name: 'IKK Pink'
}

export const appleTheme: AppleTheme = {
  colors: {
    primary: '#007AFF',
    primaryHover: '#0066CC',
    primaryActive: '#0055B3',
    primarySoft: 'rgba(0, 122, 255, 0.1)',
    primaryLight: 'rgba(0, 122, 255, 0.2)',
    destructive: '#FF3B30',
    destructiveHover: '#FF2D23',
    destructiveSoft: 'rgba(255, 59, 48, 0.1)',
    destructiveText: '#991b1b',
    success: '#34C759',
    successSoft: 'rgba(52, 199, 89, 0.2)',
    successText: '#065f46',
    warning: '#FF9500',
    warningSoft: 'rgba(255, 149, 0, 0.2)',
    warningText: '#92400e',
    accent: '#5856D6',
    accentSoft: 'rgba(88, 86, 214, 0.2)',
    accentText: '#1e40af',
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
