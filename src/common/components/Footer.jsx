import React from "react"
import { Link } from "react-router-dom"
import { useState, Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { FeedbackForm } from "../../features/home/FeedbackForm"

export const Footer = () => {
  const [isOpen, setIsOpen] = useState(false)

  const closeModal = () => {
    setIsOpen(false)
  }

  const openModal = () => {
    setIsOpen(true)
  }
  return (
    <div className="w-full text-black bg-purple-200 flex justify-between px-1 sm:px-5 py-1 text-[10px] sm:text-[11px] font-light">
      <p>2023 Eval. All Rights Reserved.</p>
      <div className="flex flex-row space-x-6">
        <Link to="faq" className="hidden sm:block">
          FAQ
        </Link>
        <p className="hidden sm:block">Privacy Policy</p>
        <p className="hidden sm:block">Contact</p>
        <p onClick={openModal}>Share Feedback</p>
      </div>
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
                  <Dialog.Title className="text-3xl font-extrabold py-5 text-gray-900">
                    Provide Feedback
                  </Dialog.Title>
                  <FeedbackForm closeModal={closeModal} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}
