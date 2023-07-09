import React from "react"
import { useNotification } from "../../hooks/useNotification"
import { Transition } from "@headlessui/react"

export const Notification = (props) => {
  return (
    <div className="bg-green-400 p-10">
      <div>{props.children}</div>
      <button onClick={props.close}>x</button>
    </div>
  )
}
