import React, { createContext, useContext, useState, useEffect } from 'react'

interface NavigationContextType {
  showGlobalNavigation: boolean
  setShowGlobalNavigation: (show: boolean) => void
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [showGlobalNavigation, setShowGlobalNavigation] = useState(() => {
    // Load from localStorage, default to true
    const saved = localStorage.getItem('showGlobalNavigation')
    return saved !== null ? JSON.parse(saved) : true
  })

  useEffect(() => {
    // Save to localStorage whenever it changes
    localStorage.setItem('showGlobalNavigation', JSON.stringify(showGlobalNavigation))
  }, [showGlobalNavigation])

  return (
    <NavigationContext.Provider value={{ showGlobalNavigation, setShowGlobalNavigation }}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider')
  }
  return context
}