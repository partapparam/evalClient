import { useContext } from "react"
import { NotificationContext } from "../providers/NotificationProvider"

/**
 *
 * By creating a hook, we can avoid having to do useContext in every component
 * exposes the addNotification and removeNotification functions, and the notification
 */
export const useNotification = () => useContext(NotificationContext)
