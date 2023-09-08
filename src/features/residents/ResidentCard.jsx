import { ArrowSmallRightIcon } from "@heroicons/react/20/solid"
import React from "react"

export const ResidentCard = ({ resident }) => {
  // fix aggreation in Sql and get rating for Residents or 0.0 if nothing exists. And get scores based on their payment and review count
  return (
    <div className="my-1 mx-1">
      <div className="relative bg-slate-100 hover:bg-slate-50 hover:shadow-xl p-10 shadow-md rounded-lg mx-auto transition-all">
        <div className="mx-auto">
          <div>
            <div className="flex justify-between items-baseline py-4 text-base leading-7 text-gray-800 border-b ">
              <h1 className="text-3xl sm:text-4xl font-bold py-2 block">
                {resident.firstName.slice(0, 1)}. {resident.lastName}
                <p className="text-sm p-2 bg-green-300">
                  Unit: {resident.unit}
                </p>
              </h1>
              {/* If no reviews for resident, change UI */}
              {resident && resident.rating && (
                <p className="inline-block text-lg font-bold text-black">
                  {resident.rating}
                  <span className="text-yellow-400"> &#9733;</span>
                </p>
              )}
              {resident && !resident.rating && (
                <p className="font-bold text-blue-500 text-right">No reviews</p>
              )}
            </div>
            <div className="py-4 text-base font-light leading-4 space-y-4">
              <div className="flex flex-row justify-between">
                <p className="text-gray-900">Payment</p>
                <p>
                  {resident.payment}
                  <span className="text-gray-800"> &#9733;</span>
                </p>
              </div>
              <div className="flex flex-row justify-between">
                <p className="text-gray-900">Respectful</p>
                <p>
                  {resident.respectful}
                  <span className="text-gray-800"> &#9733;</span>
                </p>
              </div>
              <div className="flex flex-row justify-between">
                <p className="text-gray-900">Friendly</p>
                <p>
                  {resident.friendly}
                  <span className="text-gray-800"> &#9733;</span>
                </p>
              </div>
              <div className="flex flex-row justify-between">
                <p className="text-gray-900">Patient</p>
                <p>
                  {resident.patient}
                  <span className="text-gray-800"> &#9733;</span>
                </p>
              </div>

              <p className="pt-3 text-right underline text-gray-700">
                Reviews: {resident.totalReviews || 0}
                <ArrowSmallRightIcon className="inline h-8 w-8 text-indigo-600" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
