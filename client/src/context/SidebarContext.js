import React, { useState, useMemo } from 'react'

// create context
export const SidebarContext = React.createContext()

export const SidebarProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const value = useMemo(
    () => {
      const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
      }

      const closeSidebar = () => {
        setIsSidebarOpen(false)
      }

      return ({
        isSidebarOpen,
        toggleSidebar,
        closeSidebar,
      })
    },
    [isSidebarOpen]
  )

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
}
