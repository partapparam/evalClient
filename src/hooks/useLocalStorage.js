import React, { useState } from "react"

export const useLocalStorage = () => {
  const [value, setValue] = useState(null)

  /**
   *
   * @param {String} key
   * @param {String} value
   */
  const setItem = (key, value) => {
    value = JSON.stringify(value)
    localStorage.setItem(key, value)
  }

  /**
   *
   * @param {String} key
   */
  const getItem = (key) => {
    const value = JSON.parse(localStorage.getItem(key))
    return value
  }

  /**
   *
   * @param {String} key
   */
  const removeItem = (key) => {
    localStorage.removeItem(key)
    setValue(null)
  }

  return { value, setItem, getItem, removeItem }
}
