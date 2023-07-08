import React, { useContext, useEffect } from "react"
import { UserContext } from "../../providers/UserContext"
import { Navigate, useLocation } from "react-router-dom"
import { useNotification } from "../../hooks/useNotification"

export const RequiredAuth = ({ children }) => {
  const { isLoggedIn } = useContext(UserContext)
  const location = useLocation()
  const { errorNotification } = useNotification()

  useEffect(() => {
    if (isLoggedIn === false) {
      errorNotification("You must be logged in. ")
    }
  }, [isLoggedIn])

  return isLoggedIn === true ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  )
}
