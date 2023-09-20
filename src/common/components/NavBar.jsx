import React from "react"
import { Disclosure, Transition, Dialog } from "@headlessui/react"
import { Bars3Icon, XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "../../providers/UserContext"
import { useState, Fragment, useContext } from "react"
import { HowItWorks } from "../../features/home/HowItWorks"
import {
  ExclamationCircleIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/20/solid"

export const NavBar = () => {
  const { isLoggedIn, logout } = useContext(UserContext)
  const [isOpen, setIsOpen] = useState(true)
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
  }

  const closeModal = () => {
    setIsOpen(false)
  }
  const openModal = () => {
    setIsOpen(true)
  }

  return (
    <Disclosure as="nav" className="bg-purple-800 relative z-50">
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
                  <Link to="/">
                    <img
                      className="inline h-12 w-auto lg:hidden"
                      src={process.env.REACT_APP_LOGO_URL}
                      alt="Your Company"
                    />
                    <span className="text-yellow-400 font-light inline text-xs lg:hidden">
                      beta
                    </span>
                  </Link>
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
                    <p
                      onClick={openModal}
                      className="text-slate-100 bg-rose-500 hover:bg-rose-600 transition hover:cursor-pointer duration-300 rounded-md px-3 py-2 text-sm font-medium"
                    >
                      How Eval Works?
                    </p>
                    <Link to="/faq">
                      <p className="text-slate-100 hover:bg-violet-400 transition duration-300 rounded-md px-3 py-2 text-sm font-medium">
                        FAQ
                      </p>
                    </Link>
                    {!isLoggedIn && (
                      <>
                        <Link to="/login">
                          <p className="text-slate-100 hover:bg-violet-400 transition duration-300 rounded-md px-3 py-2 text-sm font-medium">
                            Login
                          </p>
                        </Link>

                        <Link to="/signup">
                          <p className="text-slate-100 hover:bg-violet-400 transition duration-300 rounded-md px-3 py-2 text-sm font-medium">
                            Sign up
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
              {/* How it works TODO */}
              {/* <div className="sm:hidden">
                <QuestionMarkCircleIcon className=" bg-white rounded-full w-6 h-6 text-rose-500 text-xs" />
              </div> */}
              <div className="sm:hidden">
                <ExclamationCircleIcon
                  onClick={openModal}
                  className=" bg-white rounded-full w-6 h-6 text-rose-500 text-xs"
                />
              </div>
            </div>
          </div>
          <Transition
            enter="transition duration-400 ease-out"
            enterFrom="transform  opacity-0"
            enterTo="transform  opacity-100"
            leave="transition duration-350 ease-out"
            leaveFrom="transform opacity-100"
            leaveTo="transform opacity-0"
          >
            <Disclosure.Panel className="sm:hidden z-50 absolute bg-purple-800  w-full shadow-lg">
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
                        Sign up
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
                <Disclosure.Button as={Link} to="/faq">
                  <p className="text-slate-100 hover:bg-violet-400 transition duration-300 rounded-md px-3 py-2 text-sm font-medium">
                    FAQ
                  </p>
                </Disclosure.Button>

                {/* TODO How it works  */}
                {/* <Disclosure.Button>
                  <p
                    onClick={openModal}
                    className="text-slate-100 hover:bg-rose-600 bg-rose-500 transition duration-300 rounded-md px-3 py-2 text-sm font-medium"
                  >
                    How It Works
                  </p>
                </Disclosure.Button> */}
              </div>
            </Disclosure.Panel>
          </Transition>
          {/* how It work */}

          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>
              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <div className="w-full text-right">
                        <XCircleIcon
                          onClick={closeModal}
                          className="text-gray-700 w-6 "
                        />
                      </div>
                      <Dialog.Title className="text-3xl font-extrabold py-5 text-gray-900 text-center">
                        How to use Eval?
                      </Dialog.Title>
                      <HowItWorks />
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </>
      )}
    </Disclosure>
  )
}
