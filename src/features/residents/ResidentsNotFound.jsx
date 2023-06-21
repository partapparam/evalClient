import React from "react"

export const ResidentsNotFound = () => {
  return (
    <div className="container mx-auto bg-gray-100 w-auto col-span-full my-10 text-center p-5">
      <p className="text-4xl font-light py-8">Hmmm...</p>
      <p className="text-2xl font-light">
        No residents found at this address. Please create a new resident.
      </p>
    </div>
  )
}
