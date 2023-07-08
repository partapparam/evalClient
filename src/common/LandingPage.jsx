import React from "react"
import { Outlet } from "react-router-dom"
import { NavBar } from "./components/NavBar"

export const LandingPage = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      {/* TODO - add in Footer */}
    </>
  )
}
