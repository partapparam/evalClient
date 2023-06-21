import React, { useState, createContext } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  /**
   * Use State Initialization function to check local storage for User Token
   */

  const { setItem, removeItem, getItem } = useLocalStorage()
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const user = getItem("token")
    return user !== null
  })

  /**
   *
   * @param {Boolean} status
   */
  const toggleLogin = async (status) => {
    await setIsLoggedIn(status)
  }

  const login = async (user) => {
    setItem("user", user.data)
    setItem("token", user.token)
    toggleLogin(true)
  }
  const logout = async () => {
    removeItem("token")
    removeItem("user")
    toggleLogin(false)
  }

  return (
    <UserContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}
