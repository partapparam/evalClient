import React from "react"
import { Outlet } from "react-router-dom"
import { NavigationBar } from "./NavigationBar"

export const LandingPage = () => {
  return (
    <>
      <NavigationBar />
      <Outlet />
      {/* TODO - add in Footer */}
    </>
  )
}
