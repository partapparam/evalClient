import React from "react"
import { HIWList } from "./howItWorksList"

export const HowItWorks = () => {
  return (
    <div className="w-full">
      <div className=" mx-auto w-full max-w-md rounded-2xl bg-white space-y-6">
        {HIWList.map((item, index) => (
          <div className="flex flex-col items-center text-center">
            <p className="text-lg sm:text-xl px-3 py-1 inline text-white rounded-full bg-purple-400">
              {index + 1}
            </p>
            <p className="text-md font-bold">{item.title}</p>
            <p className="text-sm">{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
