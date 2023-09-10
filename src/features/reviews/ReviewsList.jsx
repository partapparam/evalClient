import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { selectAllReviewsSelector } from "./reviews.selectors"
import { ReviewCard } from "./ReviewCard"
import { Reviews404 } from "./Reviews404"
import { LoadingSpinner } from "../../common/components/LoadingSpinner"
import { useSearchParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { PlusCircleIcon } from "@heroicons/react/24/solid"
import { CheckBadgeIcon } from "@heroicons/react/20/solid"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import { useState } from "react"

export const ReviewsList = () => {
  const reviewLoading = useSelector((state) => state.reviews.loading)
  const [searchParams] = useSearchParams()
  const { getItem } = useLocalStorage()
  const user = getItem("user")
  const residentId = searchParams.get("resident")
  const address = searchParams.get("address")
  const reviews = useSelector(selectAllReviewsSelector)
  const reviewsView = reviews.map((r) => (
    <div key={r.reviewId}>
      <ReviewCard review={r} />
    </div>
  ))

  const checkIfUserHasReviewed = async () => {}
  const [hasReviewed, setHasReviewed] = useState(false)

  // Run once we have reviews to ensure the user has not reviewed before.
  // If they have, change state
  useEffect(() => {
    const check = reviews.find((r) => r.reviewUserIdFkey === user.userId)
    console.log("check = ", check)
    if (check) setHasReviewed(true)
  }, [reviews])

  const userHasReviewedButton = (
    // Showcase that the user has left a review. Instead of button + a tooltip, just show word.
    <span className="group relative">
      {/* <CheckBadgeIcon className="text-green-500 w-12 h-12" />
      <span className="absolute z-10 top-10 scale-0 rounded p-2 text-xs text-green-500 group-hover:scale-100">
        Reviewed!
      </span> */}
      <span className=" z-10  text-xs text-green-500 ">Reviewed!</span>
    </span>
  )

  const userHasNotReviewedButton = (
    <button>
      <Link to={`add/review?address=${address}&resident=${residentId}`}>
        <PlusCircleIcon className="text-amber-500 w-12 h-12" />
      </Link>
    </button>
  )

  return (
    <div className="grid grid-cols-1 gap-y-5 py-5">
      <div className="flex flex-row justify-between items-center">
        <p className="text-2xl basis-3/4">Reviews</p>
        <div className="basis-1/4 flex justify-end">
          {hasReviewed ? userHasReviewedButton : userHasNotReviewedButton}
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
