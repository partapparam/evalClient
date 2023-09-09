import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectAllReviewsSelector } from "./reviews.selectors"
import { fetchReviewsByResident } from "./reviews.thunks"
import { useSearchParams } from "react-router-dom"
import { ReviewCard } from "./ReviewCard"
import { Reviews404 } from "./Reviews404"
import { clearReviews } from "./reviews.slice"
import { LoadingSpinner } from "../../common/components/LoadingSpinner"

export const ReviewsList = () => {
  const reviewLoading = useSelector((state) => state.reviews.loading)
  const reviews = useSelector(selectAllReviewsSelector)
  const reviewsView = reviews.map((r) => (
    <div key={r.reviewId}>
      <ReviewCard review={r} />
    </div>
  ))

  return (
    <div className="grid grid-cols-1 gap-y-5 py-5">
      <p className="text-3xl">Reviews</p>
      {reviewLoading === true ? (
        <LoadingSpinner />
      ) : reviews.length > 0 && reviews ? (
        reviewsView
      ) : (
        <Reviews404 />
      )}
    </div>
  )
}
