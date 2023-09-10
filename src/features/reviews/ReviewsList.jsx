import React from "react"
import { useSelector } from "react-redux"
import { selectAllReviewsSelector } from "./reviews.selectors"
import { ReviewCard } from "./ReviewCard"
import { Reviews404 } from "./Reviews404"
import { LoadingSpinner } from "../../common/components/LoadingSpinner"
import { useSearchParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { PlusCircleIcon } from "@heroicons/react/24/solid"

export const ReviewsList = () => {
  const reviewLoading = useSelector((state) => state.reviews.loading)
  const [searchParams] = useSearchParams()
  const residentId = searchParams.get("resident")
  const address = searchParams.get("address")
  const reviews = useSelector(selectAllReviewsSelector)
  const reviewsView = reviews.map((r) => (
    <div key={r.reviewId}>
      <ReviewCard review={r} />
    </div>
  ))

  return (
    <div className="grid grid-cols-1 gap-y-5 py-5">
      <div className="flex flex-row justify-between">
        <p className="text-2xl basis-3/4">Reviews</p>
        <div className="basis-1/4 flex justify-end">
          <button>
            <Link to={`add/review?address=${address}&resident=${residentId}`}>
              <PlusCircleIcon className="text-amber-500 w-12 h-12" />
            </Link>
          </button>
        </div>
      </div>

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
