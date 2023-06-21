import React from "react"
import { useState, useCallback, createContext } from "react"

export const NotificationContext = createContext({
  notification: null,
  addNotification: () => {},
  removeNotification: () => {},
})

// This is provided to the rest of the app in Route Setup. Children are all components that will have access to this context
export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null)

  // Set and Remove Notification
  const addNotification = (message, status) =>
    setNotification({ message, status })
  const removeNotification = () => setNotification(null)

  // UseCallback will memoize our function so it not recreated on re-renders
  const contextValue = {
    notification,
    addNotification: useCallback((message, status) => {
      addNotification(message, status)
      setTimeout(() => {
        removeNotification()
      }, 3000)
    }, []),
    // removeNotification: useCallback(() => {
    //   console.log("removie Notification called")
    //   removeNotification()
    // }, []),
  }

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  )
}
