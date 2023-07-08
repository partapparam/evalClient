import React from "react"
import { Outlet } from "react-router-dom"
import { NavigationBar } from "./NavigationBar"
import { Example } from "./components/Example"

export const LandingPage = () => {
  return (
    <>
      <Example />
      <Outlet />
      {/* TODO - add in Footer */}
    </>
  )
}
