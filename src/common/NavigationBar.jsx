import React, { useContext } from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Bars3Icon } from "@heroicons/react/24/solid"
import logo from "./Eval_blue.svg"
import { UserContext } from "../providers/UserContext"

export const NavigationBar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false)
  const { isLoggedIn, logout } = useContext(UserContext)
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    toggleNav()
    navigate("/")
  }

  const toggleNav = () => {
    setNavbarOpen(!navbarOpen)
  }

  const closeNav = () => {
    setNavbarOpen(false)
  }
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-3 bg-purple-800">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link to="/" onClick={closeNav}>
              <img
                src={process.env.REACT_APP_LOGO_URL}
                className="w-12 inline"
                alt="logo"
              />
              <span className="text-yellow-400 font-light inline text-xs ">
                beta
              </span>
            </Link>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={toggleNav}
            >
              <Bars3Icon className="h-6 w-6 text-white" />
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow justify-end items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto lg:items-end xs:w-full pr-5 text-end font-light">
              {!isLoggedIn && (
                <>
                  <li className="nav-item">
                    <Link
                      className="px-3 py-2 flex items-center text-xs uppercase font-normal leading-snug text-white no-underline hover:opacity-75"
                      to="/login"
                      onClick={toggleNav}
                    >
                      <span className="ml-2">Login</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="px-3 py-2 flex items-center text-xs uppercase font-normal leading-snug text-white no-underline  hover:opacity-75"
                      to="/signup"
                      onClick={toggleNav}
                    >
                      <span className="ml-2">Signup</span>
                    </Link>
                  </li>
                </>
              )}
              {isLoggedIn && (
                <>
                  <li className="px-3 py-2 flex items-center text-md font-light leading-snug text-white no-underline  hover:opacity-75">
                    <Link to="/profile" onClick={toggleNav}>
                      <span className="ml-2">Profile</span>
                    </Link>
                  </li>
                  <li
                    className="px-3 py-2 flex items-center text-md font-light leading-snug text-white no-underline  hover:opacity-75"
                    onClick={handleLogout}
                  >
                    <button>
                      <span className="ml-2">Logout</span>
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
