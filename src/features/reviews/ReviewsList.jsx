import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectAllReviewsSelector } from "./reviews.selectors"
import { fetchReviewsByResident } from "./reviews.thunks"
import { useOutletContext } from "react-router-dom"
import { ReviewCard } from "./ReviewCard"
import { Reviews404 } from "./Reviews404"
import { clearReviews } from "./reviews.slice"
import { LoadingSpinner } from "../../common/components/LoadingSpinner"

export const ReviewsList = () => {
  const dispatch = useDispatch()
  const reviewStatus = useSelector((state) => state.reviews.loading)
  const residentId = useOutletContext()

  useEffect(() => {
    try {
      dispatch(fetchReviewsByResident(residentId))
    } catch (error) {
      console.log("Failed to load reivews", error.message)
    }
  }, [residentId])

  //   cleanup - this will run once component unmounds and we go back to resident list
  useEffect(() => {
    return () => {
      console.log("Clear reviews called")
      dispatch(clearReviews())
    }
  }, [dispatch])
  const reviews = useSelector(selectAllReviewsSelector)
  const reviewsView = reviews.map((r) => (
    <div key={r.reviewId}>
      <ReviewCard review={r} />
    </div>
  ))

  return (
    <div className="grid grid-cols-1 gap-y-5 py-5">
      <p className="text-3xl">Reviews</p>
      {reviewStatus === true ? (
        <LoadingSpinner />
      ) : reviews.length > 0 && reviews ? (
        reviewsView
      ) : (
        <Reviews404 />
      )}
    </div>
  )
}
