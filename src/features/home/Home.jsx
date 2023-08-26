import React from "react"
import { Search } from "../search/SearchBar"

export const Home = () => {
  return (
    <div className="h-screen">
      <div
        className="bg-gradient-to-b from-purple-800 via-purple-500 to-orange-300
       flex flex-col w-full h-full justify-center items-center"
      >
        <div className="text-center">
          <img
            src={process.env.REACT_APP_LOGO_URL}
            className="w-24 h-24 md:w-48 md:h-48"
            alt="logo"
          />
        </div>
        <div className="text-center">
          <p className="px-8 py-10 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            A better way to choose your clients
          </p>
        </div>
        <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 py-3">
          <Search />
        </div>
      </div>
    </div>
  )
}
