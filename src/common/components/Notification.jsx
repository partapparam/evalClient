import React from "react"
import { useNotification } from "../../hooks/useNotification"
import { Transition } from "@headlessui/react"

export const Notification = () => {
  const { notification } = useNotification()

  const successAlert = (
    // <Transition
    //   appear={true}
    //   show={!!notification}
    //   enter="transition-opacity duration-400"
    //   enterFrom="opacity-0"
    //   enterTo="opacity-90"
    //   leave="transition-opacity duration-500"
    //   leaveFrom="opacity-90"
    //   leaveTo="opacity-0"
    // >
    <div>
      {notification && notification.message && (
        <p className="bg-green-600 p-3 rounded-sm shadow-lg text-white z-50 fixed top-16 right-4 w-[calc(100vw-30px)] opacity-90 sm:w-2/5 md:w-1/4">
          {notification.message}
        </p>
      )}
    </div>
    // </Transition>
  )

  const errorAlert = (
    <div>
      {notification && notification.message && (
        <p className=" bg-rose-700 p-3 rounded-sm shadow-lg text-white z-50 fixed top-16 right-4 w-[calc(100vw-30px)] sm:w-2/5 md:w-1/4">
          {notification.message}
        </p>
      )}
    </div>
  )

  return (
    <div className="transition-all">
      <Transition
        appear={true}
        show={!!notification}
        enter="transition-opacity duration-400"
        enterFrom="opacity-0"
        enterTo="opacity-90"
        leave="transition-opacity duration-500"
        leaveFrom="opacity-90"
        leaveTo="opacity-0"
      >
        <div>
          {notification && notification.status === "success"
            ? successAlert
            : errorAlert}
        </div>
      </Transition>
    </div>
  )
}
