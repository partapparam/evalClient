import React from "react"
import { Outlet } from "react-router-dom"
import { NavBar } from "./components/NavBar"
import { Footer } from "./components/Footer"

export const LandingPage = () => {
  return (
    <>
      <div className=" flex justify-between flex-col">
        <NavBar />
        <Outlet />
        <Footer />
      </div>
    </>
  )
}
