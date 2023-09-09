import React from "react"
import { useSelector } from "react-redux"
import { selectAllReviewsSelector } from "./reviews.selectors"
import { ReviewCard } from "./ReviewCard"
import { Reviews404 } from "./Reviews404"
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
      <p className="text-2xl">Reviews</p>
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
