import React from "react"
import { Search } from "../search/SearchBar"

export const Home = () => {
  return (
    <div className="mb-10">
      <div
        className="bg-gradient-to-b from-purple-800 via-purple-500 to-orange-300
       grid grid-rows-2 w-full grid-cols-12 h-96"
      >
        <div className="rows-span-1 self-end justify-self-center col-span-12">
          <img
            src={process.env.REACT_APP_LOGO_URL}
            className="w-48 h-48"
            alt="logo"
          />
        </div>
        <div className="rows-span-1 min-w-3/4	col-start-1 col-end-13 md:col-start-3 md:col-end-11 lg:col-start-4 lg:col-end-10">
          <Search />
        </div>
      </div>
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <p className="mt-2 text-4xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              A better way to choose your clients
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Eval was created by a group with more than 20 years in the home
              service industry. From this experience, Eval was born to help with
              the unknown factors of working with new clients.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
