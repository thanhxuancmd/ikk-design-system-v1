import { createContext, useContext, useEffect, useState } from 'react'
import type { AppleTheme } from './theme'
import { ikkTheme } from './theme'

interface ThemeContextValue {
  theme: AppleTheme
  setTheme: (theme: AppleTheme) => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function AppleThemeProvider({
  children,
  defaultTheme = ikkTheme,
}: {
  children: React.ReactNode
  defaultTheme?: AppleTheme
}) {
  const [theme, setTheme] = useState<AppleTheme>(defaultTheme)

  useEffect(() => {
    // Apply theme to CSS variables
    const root = document.documentElement
    root.style.setProperty('--apple-primary', theme.colors.primary)
    root.style.setProperty('--apple-primary-hover', theme.colors.primaryHover)
    root.style.setProperty('--apple-primary-active', theme.colors.primaryActive)
    root.style.setProperty('--apple-destructive', theme.colors.destructive)
    root.style.setProperty('--apple-destructive-hover', theme.colors.destructiveHover)
    root.style.setProperty('--apple-success', theme.colors.success)
    root.style.setProperty('--apple-warning', theme.colors.warning)
    root.style.setProperty('--apple-accent', theme.colors.accent)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useAppleTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useAppleTheme must be used within AppleThemeProvider')
  }
  return context
}
