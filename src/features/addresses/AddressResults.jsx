import React from "react"
import { Search } from "../search/SearchBar"
import { useLocation } from "react-router-dom"
import { Outlet } from "react-router-dom"

export const AddressSearch = () => {
  const location = useLocation()
  const { address } = location.state

  return (
    <div className="grid grid-cols-12 mx-5 md:mx-16 lg:mx-28 my-10">
      <div className="col-start-1 col-end-13 z-10">
        <Search />
      </div>
      <div className="col-start-1 col-end-13">
        <Outlet context={address} />
      </div>
    </div>
  )
}
