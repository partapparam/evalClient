import React from "react"
import { Search } from "../search/SearchBar"
import { Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectAddressSelector } from "./address.selectors"
import { NoAddress } from "./NoAddress"

export const AddressSearch = () => {
  const address = useSelector(selectAddressSelector)
  console.log("address")
  return (
    <div className="grid grid-cols-12 mx-5 md:mx-16 lg:mx-28 my-10">
      <div className="col-start-1 col-end-13 z-10">
        <Search />
      </div>
      <div className="col-start-1 col-end-13">
        {address ? <Outlet /> : <NoAddress />}
      </div>
    </div>
  )
}
