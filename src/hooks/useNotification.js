import { useContext } from "react"
import { NotificationContext } from "../providers/NotificationProvider"

/**
 *
 * By creating a hook, we can avoid having to do useContext in every component
 * exposes the addNotification and removeNotification functions, and the notification
 */
export const useNotification = () => {
  const { notification, addNotification } = useContext(NotificationContext)

  const successNotification = (message) => {
    addNotification(message, "success")
  }
  const errorNotification = (message) => {
    addNotification(message, "error")
  }

  return { notification, successNotification, errorNotification }
}
