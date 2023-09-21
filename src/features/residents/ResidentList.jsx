import React, { useContext, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { ResidentCard } from "./ResidentCard"
import { ResidentsNotFound } from "./ResidentsNotFound"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectAllResidentsSelector } from "./residents.selectors"
import { fetchResidents } from "./residents.thunks"
import { LoadingSpinner } from "../../common/components/LoadingSpinner"
import { PlusCircleIcon } from "@heroicons/react/24/solid"
import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"
import { UserContext } from "../../providers/UserContext"
import { useSearchParams } from "react-router-dom"

export const ResidentList = () => {
  const dispatch = useDispatch()
  const residentStatus = useSelector((state) => state.residents.status)
  const [isOpen, setIsOpen] = useState(false)
  const { isLoggedIn } = useContext(UserContext)
  const location = useLocation()
  const residents = useSelector(selectAllResidentsSelector)
  const [searchParams] = useSearchParams()
  const searchAddress = searchParams.get("address")

  useEffect(() => {
    if (residentStatus === "idle") {
      try {
        dispatch(fetchResidents(searchAddress))
      } catch (error) {
        // console.log("failed to load residents", error.message)
      }
    }
  }, [dispatch, searchAddress, residentStatus])

  const residentView = residents.map((r) => (
    <div key={r.residentId}>
      <Link
        to={`/address/residents/profile?address=${searchAddress}&resident=${r.residentId}`}
        className="no-underline"
      >
        <ResidentCard resident={r} />
      </Link>
    </div>
  ))

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  // const noAuthButton = (
  //   <>
  //     <button type="button" onClick={openModal}>
  //       <PlusCircleIcon className="text-amber-500 w-12 h-12" />
  //     </button>
  //     <Transition appear show={isOpen} as={Fragment}>
  //       <Dialog as="div" className="relative z-10" onClose={closeModal}>
  //         <Transition.Child
  //           as={Fragment}
  //           enter="ease-out duration-300"
  //           enterFrom="opacity-0"
  //           enterTo="opacity-100"
  //           leave="ease-in duration-200"
  //           leaveFrom="opacity-100"
  //           leaveTo="opacity-0"
  //         >
  //           <div className="fixed inset-0 bg-black bg-opacity-25" />
  //         </Transition.Child>

  //         <div className="fixed inset-0 overflow-y-auto">
  //           <div className="flex min-h-full items-center justify-center p-4 text-center">
  //             <Transition.Child
  //               as={Fragment}
  //               enter="ease-out duration-300"
  //               enterFrom="opacity-0 scale-95"
  //               enterTo="opacity-100 scale-100"
  //               leave="ease-in duration-200"
  //               leaveFrom="opacity-100 scale-100"
  //               leaveTo="opacity-0 scale-95"
  //             >
  //               <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
  //                 <Dialog.Title
  //                   as="h3"
  //                   className="text-lg font-medium leading-6 text-gray-900"
  //                 >
  //                   Login in to your account to continue.
  //                 </Dialog.Title>
  //                 <div className="mt-2 text-right">
  //                   <Link
  //                     to={`../../login?redirect=true&address=${searchAddress}`}
  //                     state={{ path: location.pathname }}
  //                   >
  //                     <button
  //                       type="button"
  //                       className="rounded-md bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30"
  //                       onClick={closeModal}
  //                     >
  //                       Login
  //                     </button>
  //                   </Link>
  //                 </div>
  //               </Dialog.Panel>
  //             </Transition.Child>
  //           </div>
  //         </div>
  //       </Dialog>
  //     </Transition>
  //   </>
  // )

  return (
    <>
      <div className="bg-white col-start-1 col-end-13 divide-y">
        <div className="flex flex-row justify-between items-center px-3 py-6">
          <p className="font-extrabold text-3xl sm:text-4xl">Residents</p>
          <Link to={`add?address=${searchAddress}`}>
            <PlusCircleIcon className="text-amber-500 w-12 h-12" />
          </Link>
        </div>
        <p className="text-xl font-light px-4 py-6">{searchAddress}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {residentStatus === "loading" ? (
          <LoadingSpinner />
        ) : residentStatus !== "loading" &&
          residents &&
          residents.length > 0 ? (
          residentView
        ) : (
          <ResidentsNotFound />
        )}
      </div>
    </>
  )
}
