import React from "react"
import { Link, Outlet, useSearchParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectResidentByIdSelector } from "./residents.selectors"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { PlusCircleIcon } from "@heroicons/react/24/solid"
import { clearReviews } from "../reviews/reviews.slice"
import { fetchReviewsByResident } from "../reviews/reviews.thunks"

export const ResidentDetail = () => {
  const [searchParams] = useSearchParams()
  const dispatch = useDispatch()
  const residentId = searchParams.get("resident")
  const address = searchParams.get("address")
  const resident = useSelector((state) =>
    selectResidentByIdSelector(state, residentId)
  )
  const reviewStatus = useSelector((state) => state.reviews.status)

  useEffect(() => {
    try {
      if (reviewStatus === "idle") {
        dispatch(fetchReviewsByResident(residentId))
        console.log("Fetch Reviews Called")
      } else {
        console.log("does not run")
      }
    } catch (error) {
      console.log("Failed to load reivews", error.message)
    }
  }, [residentId])
  //   cleanup - this will run once component unmounds and we go back to resident list
  useEffect(() => {
    return () => {
      dispatch(clearReviews())
    }
  }, [dispatch])

  const residentDetailView = (
    <>
      <div className="flex flex-row flex-between items-center flex-wrap">
        <div className="grow my-3 space-x-6 basis-full">
          <h1 className="text-black font-extrabold text-4xl">
            {resident && resident.firstName.slice(0, 1)}.{" "}
            {resident && resident.lastName}
          </h1>
        </div>

        <div className="basis-full text-sm text-gray-600 hover:underline hover:bold hover:text-gray-800 transition">
          <Link replace to={`..?address=${address}`}>
            {address}
          </Link>
        </div>
        <div>
          {resident && resident.rating && (
            <>
              <p className="inline-block text-lg font-bold text-black">
                {resident.rating}
                <span className="text-yellow-400"> &#9733;</span>
              </p>
              <div className="flex flex-row flex-wrap text-sm">
                <div className="basis-1/2 flex flex-row justify-between pr-1">
                  <p className="text-gray-900">Payment</p>
                  <p>
                    {resident.payment}
                    <span className="text-gray-800"> &#9733;</span>
                  </p>
                </div>
                <div className="basis-1/2 flex flex-row justify-between pr-1 ">
                  <p className="text-gray-900">Respectful</p>
                  <p>
                    {resident.respectful}
                    <span className="text-gray-800"> &#9733;</span>
                  </p>
                </div>
                <div className="basis-1/2 flex flex-row justify-between pr-1">
                  <p className="text-gray-900">Friendly</p>
                  <p>
                    {resident.friendly}
                    <span className="text-gray-800"> &#9733;</span>
                  </p>
                </div>
                <div className="basis-1/2 flex flex-row justify-between pr-1">
                  <p className="text-gray-900">Patient</p>
                  <p>
                    {resident.patient}
                    <span className="text-gray-800"> &#9733;</span>
                  </p>
                </div>
              </div>
            </>
          )}
          {resident && !resident.rating && (
            <p className="text-blue-500 text-right">No reviews</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 border-t-2 divide-slate-400/2 my-3">
        <Outlet />
      </div>
    </>
  )
  return (
    <div className="container my-10 mx-auto px-10">
      {resident !== undefined ? (
        residentDetailView
      ) : (
        <div className="font-bold text-3xl py-10 text-center">
          404 - Something was not found!{" "}
          <Link className="text-indigo-700" to={`..?address=${address}`}>
            Click here to Go Back.
          </Link>
        </div>
      )}
    </div>
  )
}
