import React, { Fragment, useContext } from "react"
import { Disclosure } from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "../../providers/UserContext"
import { LoginForm } from "../../features/auth/Login"

export const NavBar = () => {
  const { isLoggedIn, logout } = useContext(UserContext)
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <Disclosure as="nav" className="bg-purple-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-violet-300 transition duration-300">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-baseline justify-center sm:items-end sm:justify-between">
                <div className="flex flex-shrink-0 items-center">
                  <Disclosure.Button as={Link} to="/">
                    <img
                      className="inline h-12 w-auto lg:hidden"
                      src={process.env.REACT_APP_LOGO_URL}
                      alt="Your Company"
                    />
                    <span className="text-yellow-400 font-light inline text-xs lg:hidden">
                      beta
                    </span>
                  </Disclosure.Button>
                  <Link to="/">
                    <img
                      className="hidden h-12 w-auto lg:inline"
                      src={process.env.REACT_APP_LOGO_URL}
                      alt="Your Company"
                    />
                    <span className="hidden text-yellow-400 font-light lg:inline text-xs ">
                      beta
                    </span>
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {!isLoggedIn && (
                      <>
                        <Link to="/login">
                          <p className="text-slate-100 hover:bg-violet-400 transition duration-300 rounded-md px-3 py-2 text-sm font-medium">
                            Login
                          </p>
                        </Link>

                        <Link to="/signup">
                          <p className="text-slate-100 hover:bg-violet-400 transition duration-300 rounded-md px-3 py-2 text-sm font-medium">
                            Signup
                          </p>
                        </Link>
                      </>
                    )}
                    {isLoggedIn && (
                      <>
                        <Link to="/profile">
                          <p className="text-slate-100 hover:bg-violet-400 transition duration-300 rounded-md px-3 py-2 text-sm font-medium">
                            Profile
                          </p>
                        </Link>
                        <p
                          className="text-slate-100 hover:bg-violet-400 transition duration-300 rounded-md px-3 py-2 text-sm font-medium"
                          onClick={handleLogout}
                        >
                          <button>Logout</button>
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {!isLoggedIn && (
                <>
                  <Disclosure.Button as={Link} to="/login">
                    <p className="text-slate-100 hover:bg-violet-400 transition duration-300 rounded-md px-3 py-2 text-sm font-medium">
                      Login
                    </p>
                  </Disclosure.Button>
                  <Disclosure.Button as={Link} to="/signup">
                    <p className="text-slate-100 hover:bg-violet-400 transition duration-300 rounded-md px-3 py-2 text-sm font-medium">
                      Signup
                    </p>
                  </Disclosure.Button>
                </>
              )}
              {isLoggedIn && (
                <>
                  <Disclosure.Button as={Link} to="/profile">
                    <p className="text-slate-100 hover:bg-violet-400 transition duration-300 rounded-md px-3 py-2 text-sm font-medium">
                      Profile
                    </p>
                  </Disclosure.Button>

                  <Disclosure.Button as={Link} to="/">
                    <p
                      className="text-slate-100 hover:bg-violet-400 transition duration-300 rounded-md px-3 py-2 text-sm font-medium"
                      onClick={handleLogout}
                    >
                      Logout
                    </p>
                  </Disclosure.Button>
                </>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
