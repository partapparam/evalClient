import React from "react"
import { StarRating } from "../rating/StarRating"
import { formatDatePublic } from "../../common/convertDate"

export const ReviewCard = ({ review }) => {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col text-black bg-white drop-shadow-md rounded-lg p-3 my-3 md:p-5">
        <div className="flex flex-row">
          <div className="w-12 h-12 sm:w-20 sm:h-20">
            <img
              className="shadow h-12 w-12 sm:w-20 sm:h-20 rounded-full border-none object-cover"
              src={review.reviewerProfilePhoto}
              alt=""
            />
          </div>
          <div className="flex flex-col pl-4 w-full basis-5/6">
            <div className="flex flex-row justify-between items-center">
              <p className="text-md sm:text-lg font-bold">
                {review.reviewerFirstName} {review.reviewerLastName}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 text-right">
                {formatDatePublic(review.createdAt)}
              </p>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-500">
                {review.reviewerJobTitle}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex p-2 flex-row justify-between items-center w-full">
            <StarRating rate={review.rating} secondary={false} />
          </div>
          <div className="w-full px-2 py-4">{review.review}</div>
          <div className="flex p-2 flex-row flex-wrap w-full border-t-2">
            <div className="basis-1/2 sm:basis-1/2 py-3">
              <span className="font-light text-gray-700">Timely Payment</span>
              <StarRating rate={review.payment} secondary={true} />
            </div>
            <div className="basis-full sm:basis-1/2 py-3">
              <span className="font-light text-gray-700">Friendly</span>
              <StarRating rate={review.friendly} secondary={true} />
            </div>
            <div className="basis-full sm:basis-1/2 py-3">
              <span className="font-light text-gray-700">Patient</span>
              <StarRating rate={review.patient} secondary={true} />
            </div>
            <div className="basis-full sm:basis-1/2 py-3">
              <span className="font-light text-gray-700">Respectful</span>

              <StarRating rate={review.respectful} secondary={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
