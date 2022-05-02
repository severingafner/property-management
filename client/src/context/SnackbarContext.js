import React, { useState, useMemo } from 'react'

import Snackbar from '../components/Snackbar/Snackbar'

// create context
export const SnackbarContext = React.createContext()

export const SnackbarProvider = ({ children }) => {
  const [message, setMessage] = useState('Loading..')
  const [type, setType] = useState('neutral')
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)

  const value = useMemo(
    () => {
      let timeoutRef = null
      
      const openSnackbar = (message) => {
        clearTimeout(timeoutRef)
        setMessage(message)
        setType('neutral')
        setIsSnackbarOpen(true)
      }

      const closeSnackbar = () => {
        setMessage('Done!')
        setType('success')
        timeoutRef = setTimeout(() => {
          setIsSnackbarOpen(false)
        }, 1000)
      }

      return ({
        openSnackbar,
        closeSnackbar,
      })
    },
    []
  )

  return (
    <SnackbarContext.Provider value={value}>
      <Snackbar isOpen={isSnackbarOpen} message={message} type={type}/>
      {children}
    </SnackbarContext.Provider>
  )
}
