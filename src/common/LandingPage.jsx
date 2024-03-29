import React from "react"
import { Outlet } from "react-router-dom"
import { NavBar } from "./components/NavBar"
import { Footer } from "./components/Footer"

export const LandingPage = () => {
  return (
    <>
      <div className="flex flex-col relative">
        <NavBar />
        <div>
          <Outlet />
        </div>
        {/* <Outlet /> */}
        <div className="fixed bottom-0 w-full">
          <Footer />
        </div>
      </div>
    </>
  )
}
