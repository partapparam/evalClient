import React from "react"
import { Link, useOutletContext } from "react-router-dom"
import { ResidentCard } from "./ResidentCard"
import { ResidentsNotFound } from "./ResidentsNotFound"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectAllResidentsSelector } from "./residents.selectors"
import { fetchResidents } from "./residents.thunks"
import { LoadingSpinner } from "../../common/components/LoadingSpinner"
import { PlusCircleIcon } from "@heroicons/react/24/solid"

export const ResidentList = () => {
  const dispatch = useDispatch()
  const residentStatus = useSelector((state) => state.residents.status)
  const address = useOutletContext()

  useEffect(() => {
    if (residentStatus === "idle") {
      try {
        dispatch(fetchResidents(address))
      } catch (error) {
        console.log("failed to load residents", error.message)
      }
    }
  }, [dispatch, address, residentStatus])

  const residents = useSelector(selectAllResidentsSelector)

  const residentView = residents.map((r) => (
    <div key={r.residentId}>
      <Link to={`/address/residents/${r.residentId}`} className="no-underline">
        <ResidentCard resident={r} />
      </Link>
    </div>
  ))

  return (
    <>
      <div className="bg-white col-start-1 col-end-13 divide-y">
        <div className="flex flex-row justify-between items-center px-3 py-6">
          <p className="font-extrabold text-3xl sm:text-4xl">Residents</p>
          <Link to="../../add/resident" state={{ address: address }}>
            <PlusCircleIcon className="text-amber-500 w-12 h-12" />
          </Link>
        </div>
        <p className="text-xl font-light px-4 py-6">{address}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {residentStatus === "loading" ? (
          <LoadingSpinner />
        ) : residentStatus !== "loading" &&
          residents &&
          residents.length > 0 ? (
          residentView
        ) : (
          <ResidentsNotFound />
        )}
      </div>
    </>
  )
}
