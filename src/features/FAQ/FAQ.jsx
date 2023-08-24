import React from "react"
import { FAQList } from "./faqList"
import { ClipboardIcon } from "@heroicons/react/24/solid"

export const FAQ = () => {
  return (
    <div className="mt-10">
      <dl className="">
        {FAQList.map((faq) => (
          <div className="flex space-y-10 md:space-y-0 m-5 p-5 ">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                <ClipboardIcon className="h-6 w-6 text-blue-800" />
              </div>
            </div>
            <div className="ml-4">
              <dt className="text-xl leading-6 font-bold text-gray-900">
                {faq.title}
              </dt>
              <dd className="mt-2 text-base text-gray-500">{faq.content}</dd>
            </div>
          </div>
        ))}
      </dl>
    </div>
  )
}
