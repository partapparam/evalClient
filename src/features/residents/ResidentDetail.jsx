import React from "react"
import { Link, Outlet, useSearchParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectResidentByIdSelector } from "./residents.selectors"
import { useParams } from "react-router-dom"
import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useState } from "react"
import { ReviewForm } from "../reviews/ReviewForm"
import { PlusCircleIcon } from "@heroicons/react/24/solid"

export const ResidentDetail = () => {
  const { residentId } = useParams()
  const [searchParams] = useSearchParams()
  const id = searchParams.get("resident")
  const address = searchParams.get("address")
  const resident = useSelector((state) =>
    selectResidentByIdSelector(state, residentId)
  )

  const [isOpen, setIsOpen] = useState(false)
  function closeModal() {
    setIsOpen(false)
  }
  function openModal() {
    setIsOpen(true)
  }

  console.log("Resident", resident)

  const residentDetailView = (
    <>
      <div className="flex flex-row flex-between items-center flex-wrap">
        <div className="grow my-3 space-x-6 basis-3/4">
          <h1 className="text-black font-bold text-4xl">
            {resident && resident.firstName.slice(0, 1)}.{" "}
            {resident && resident.lastName}
          </h1>
        </div>
        <div className="basis-1/4 flex justify-end">
          <button onClick={openModal}>
            <PlusCircleIcon className="text-amber-500 w-12 h-12" />
          </button>
        </div>
        <div>
          <Transition appear show={isOpen} as={Fragment}>
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
                    <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <ReviewForm closeModal={closeModal} resident={resident} />
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
        <div className="basis-full text-sm text-gray-600 underline hover:text-gray-800 ">
          <Link to={".."}>{address}</Link>
        </div>
      </div>
      <div className="grid grid-cols-1 border-t-4 divide-slate-400/2 my-3">
        <Outlet context={residentId} />
      </div>
    </>
  )
  return (
    <div className="container my-10 mx-auto px-10">
      {resident !== undefined ? (
        residentDetailView
      ) : (
        <div className="font-bold text-3xl py-10 text-center">
          404 - Something was not found!{" "}
          <Link className="text-indigo-700" to="..">
            Click here to Go Back.
          </Link>
        </div>
      )}
    </div>
  )
}
