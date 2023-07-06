import React from "react"
import { Search } from "../search/SearchBar"
import { Link, useLocation } from "react-router-dom"
import { useSearchParams } from "react-router-dom"
import { Outlet } from "react-router-dom"
import { useState, Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { ResidentForm } from "../residents/ResidentForm"
import { PlusCircleIcon } from "@heroicons/react/24/solid"

export const AddressSearch = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { address } = location.state
  console.log(address)
  function closeModal() {
    setIsOpen(false)
  }
  function openModal() {
    setIsOpen(true)
  }

  return (
    <div className="grid grid-cols-12 mx-5 md:mx-16 lg:mx-28 my-10">
      <div className="col-start-1 col-end-13 z-10">
        <Search />
      </div>
      <div className="bg-white col-start-1 col-end-13 divide-y">
        <div className="flex flex-row justify-between items-center px-3 py-6">
          <div className="basis-3/4">
            <p className="text-4xl font-bold">Residents</p>
          </div>
          <div className="flex justify-end">
            <button onClick={openModal}>
              <PlusCircleIcon className="text-amber-500 w-12 h-12" />
            </button>
            {/* <Transition appear show={isOpen} as={Fragment}>
              <Dialog as="div" className="relative z-20" onClose={closeModal}>
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
                        <ResidentForm
                          closeModal={closeModal}
                          address={address}
                        />
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition> */}
          </div>
        </div>
        <div className="flex flex-row px-4 py-6">
          <p className="text-xl font-light">{address}</p>
          <div className="block bg-red-300">
            <Link to="resident/new" state={{ address: address }}>
              New Residents
            </Link>
          </div>
        </div>
      </div>
      <div className="col-start-1 col-end-13">
        <Outlet context={address} />
      </div>
    </div>
  )
}
