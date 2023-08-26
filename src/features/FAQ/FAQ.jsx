import React from "react"
import { FAQList } from "./faqList"
import { ChevronUpIcon } from "@heroicons/react/24/solid"
import { Disclosure, Transition } from "@headlessui/react"

export const FAQ = () => {
  return (
    <div className="w-full px-4 pt-16">
      <p className="text-3xl sm:text-4xl font-extrabold p-5 text-center">
        Frequently Asked Questions
      </p>
      <div className=" mx-auto w-full max-w-md rounded-2xl bg-white p-3">
        {FAQList.map((faq) => (
          <Disclosure>
            {({ open }) => (
              <div className="m-3">
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-5 py-3 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <span>{faq.title}</span>
                  <ChevronUpIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-purple-800`}
                  />
                </Disclosure.Button>
                <Transition
                  enter="transition duration-300 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-250 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                    {faq.content}
                  </Disclosure.Panel>
                </Transition>
              </div>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  )
}
