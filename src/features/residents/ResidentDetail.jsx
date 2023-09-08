import React from "react"
import { Link, Outlet, useSearchParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectResidentByIdSelector } from "./residents.selectors"
import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useState } from "react"
import { ReviewForm } from "../reviews/ReviewForm"
import { PlusCircleIcon } from "@heroicons/react/24/solid"

export const ResidentDetail = () => {
  const [searchParams] = useSearchParams()
  const residentId = searchParams.get("resident")
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
          <h1 className="text-black font-extrabold text-4xl">
            {resident && resident.firstName.slice(0, 1)}.{" "}
            {resident && resident.lastName}
          </h1>
        </div>
        <div className="basis-1/4 flex justify-end">
          <button onClick={openModal}>
            <Link to={`add/review?address=${address}&resident=${residentId}`}>
              <PlusCircleIcon className="text-amber-500 w-12 h-12" />
            </Link>
          </button>
        </div>
        <div className="basis-full text-sm text-gray-600 underline hover:text-gray-800 ">
          <Link replace to={`..?address=${address}`}>
            {address}
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 border-t-4 divide-slate-400/2 my-3">
        <Outlet />
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
