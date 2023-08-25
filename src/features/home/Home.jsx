import React from "react"
import { Search } from "../search/SearchBar"

export const Home = () => {
  return (
    <div className="h-screen">
      <div
        className="bg-gradient-to-b from-purple-800 via-purple-500 to-white
       grid grid-rows-3 w-full h-full grid-cols-12"
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
        <div className="rows-span-1 min-w-3/4	col-start-1 col-end-13 md:col-start-3 md:col-end-11 lg:col-start-4 lg:col-end-10">
          <div className="text-center">
            <p className="mt-2 px-5 text-3xl leading-8 font-extrabold tracking-tight text-gray-800 sm:text-4xl">
              A better way to choose your clients
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
