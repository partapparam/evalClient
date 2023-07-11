import React from "react"

export const Footer = () => {
  return (
    <div className="w-full text-black bg-purple-200 flex justify-between px-1 sm:px-5 py-1 text-[10px] sm:text-[11px] font-light">
      <p>2023 Eval. All Rights Reserved.</p>
      <div className="flex flex-row space-x-6">
        <p className="hidden sm:block">Privacy Policy</p>
        <p className="hidden sm:block">Contact</p>
        <p>Share Feedback</p>
      </div>
    </div>
  )
}
