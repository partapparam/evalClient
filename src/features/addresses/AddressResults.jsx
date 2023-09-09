import React from "react"
import { Search } from "../search/SearchBar"
import { NoAddress } from "./NoAddress"
import { useSearchParams } from "react-router-dom"
import { ResidentList } from "../residents/ResidentList"

export const AddressResults = () => {
  const [searchParams] = useSearchParams()
  const searchAddress = searchParams.get("address")
  return (
    <div className="grid grid-cols-12 mx-5 md:mx-16 lg:mx-28 my-10">
      <div className="col-start-1 col-end-13 z-10">
        <Search />
      </div>
      <div className="col-start-1 col-end-13">
        {searchAddress ? <ResidentList /> : <NoAddress />}
      </div>
    </div>
  )
}
