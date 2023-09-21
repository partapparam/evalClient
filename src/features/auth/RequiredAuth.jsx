import React, { useContext, useEffect } from "react"
import { UserContext } from "../../providers/UserContext"
import { Navigate, useLocation, useSearchParams } from "react-router-dom"
import { useNotification } from "../../hooks/useNotification"

export const RequiredAuth = ({ children }) => {
  const { isLoggedIn } = useContext(UserContext)
  const location = useLocation()
  const notification = useNotification()
  const [searchParams] = useSearchParams()
  const address = searchParams.get("address")
  const resident = searchParams.get("resident")
  let redirect = ""

  useEffect(() => {
    if (isLoggedIn === false) {
      notification.open("You must be logged in.", "Error: ")
    }
  }, [isLoggedIn])

  if (address && resident) {
    redirect = `${location.pathname}?address=${address}&resident=${resident}`
  } else if (address && resident == null) {
    redirect = `${location.pathname}?address=${address}`
  } else {
    redirect = location.pathname
  }

  return isLoggedIn === true ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: redirect }} />
  )
}
