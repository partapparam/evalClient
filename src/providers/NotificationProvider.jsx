import React from "react"
import { useState, useMemo, createContext } from "react"
import { createPortal } from "react-dom"
import { Notification } from "../common/components/Notification"

function generateUEID() {
  let first = (Math.random() * 46656) | 0
  let second = (Math.random() * 46656) | 0
  first = ("000" + first.toString(36)).slice(-3)
  second = ("000" + second.toString(36)).slice(-3)

  return first + second
}

export const NotificationContext = createContext({
  notification: null,
  addNotification: () => {},
  removeNotification: () => {},
})

// This is provided to the rest of the app in Route Setup. Children are all components that will have access to this context
export const NotificationProvider = (props) => {
  const [notifications, setNotifications] = useState([])
  const open = (content, status) => {
    console.log("open is run")
    setNotifications((currentNotifications) => [
      ...currentNotifications,
      { id: generateUEID(), content, status },
    ])
  }

  const close = (id) => {
    console.log("close is run")
    setNotifications((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    )
  }

  // Memoize contextValue
  const contextValue = useMemo(() => ({ open }), [])

  return (
    <NotificationContext.Provider value={contextValue}>
      {props.children}

      {createPortal(
        <div className="toasts-wrapper">
          {notifications &&
            notifications.map((notification) => (
              <Notification
                key={notification.id}
                close={() => close(notification.id)}
              >
                {notification.status} + {notification.content} +{" "}
                {notification.id}
              </Notification>
            ))}
        </div>,
        document.body
      )}
    </NotificationContext.Provider>
  )
}
