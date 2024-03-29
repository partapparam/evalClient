import React, { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { StarRatingForm } from "../rating/StarRatingForm"
import { useDispatch } from "react-redux"
import { postReview } from "./reviews.thunks"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import { useNotification } from "../../hooks/useNotification"
import { useSearchParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { selectResidentByIdSelector } from "../residents/residents.selectors"

export const ReviewForm = () => {
  const dispatch = useDispatch()
  const { getItem } = useLocalStorage()
  const [searchParams] = useSearchParams()
  const notification = useNotification()
  const residentId = searchParams.get("resident")
  const address = searchParams.get("address")
  const navigate = useNavigate()
  const resident = useSelector((state) =>
    selectResidentByIdSelector(state, residentId)
  )
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {
      review: "",
    },
  })

  const onSubmit = async (data, e) => {
    data.residentId = resident.residentId
    const reviewer = getItem("user")
    data.ReviewerUserId = reviewer.userId
    data.reviewerFirstName = reviewer.firstName
    data.reviewerLastName = reviewer.lastName
    data.reviewerJobTitle = reviewer.jobTitle
    data.reviewerProfilePhoto = reviewer.profilePhoto
    try {
      await dispatch(postReview(data)).unwrap()
      notification.open("Review saved.", "success")
    } catch (error) {
      notification.open("Review was not saved, try again.", "error")
    } finally {
      handleReset()
    }
  }
  const handleReset = () => {
    reset()
    navigate(`..?address=${address}&resident=${residentId}`, { replace: true })
  }

  return (
    <form className="py-5 md:py-8 lg:py-15" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <div>
          <h1 className="sm:text-2xl text-xl font-bold text-gray-900">
            Leave a review
          </h1>
          <p className="mt-1 text-xs leading-3 text-gray-500">
            This information will be used to create a public review, so please
            be careful what you enter.
          </p>

          <div className="my-6 grid grid-cols-1 gap-y-4 gap-x-6">
            <div>
              <label htmlFor="star" className="block text-gray-900">
                Rate your overall experience.
              </label>
              <div className="mt-2">
                <Controller
                  name="rating"
                  control={control}
                  rules={{ required: "A rating is required" }}
                  // defaultValue={5}
                  render={({ field: { onChange, value } }) => (
                    <StarRatingForm
                      value={Number(value)}
                      onChange={onChange}
                      secondary={false}
                    />
                  )}
                />
                {errors.rating?.type === "required" && (
                  <p className="form-input-error text-red-500">
                    {errors.rating?.message}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2 border-y border-gray-900/10 py-6">
              <div>
                <label htmlFor="star" className="block text-gray-900">
                  Timely Payment
                </label>
                <div className="mt-2">
                  <Controller
                    name="payment"
                    control={control}
                    rules={{ required: "A payment rating is required" }}
                    // defaultValue={5}
                    //
                    render={({ field: { onChange, value } }) => (
                      <StarRatingForm
                        value={Number(value)}
                        onChange={onChange}
                        secondary={true}
                      />
                    )}
                  />
                  {errors.payment?.type === "required" && (
                    <p className="form-input-error text-red-500">
                      {errors.payment?.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="star" className="block text-gray-900">
                  Friendly
                </label>
                <div className="mt-2">
                  <Controller
                    name="friendly"
                    control={control}
                    rules={{ required: "A rating is required" }}
                    // defaultValue={5}
                    //
                    render={({ field: { onChange, value } }) => (
                      <StarRatingForm
                        value={Number(value)}
                        onChange={onChange}
                        secondary={true}
                      />
                    )}
                  />
                  {errors.rating?.type === "required" && (
                    <p className="form-input-error text-red-500">
                      {errors.rating?.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="star" className="block text-gray-900">
                  Respectful
                </label>
                <div className="mt-2">
                  <Controller
                    name="respectful"
                    control={control}
                    rules={{ required: "A rating is required" }}
                    // defaultValue={5}
                    //
                    render={({ field: { onChange, value } }) => (
                      <StarRatingForm
                        value={Number(value)}
                        onChange={onChange}
                        secondary={true}
                      />
                    )}
                  />
                  {errors.respectful?.type === "required" && (
                    <p className="form-input-error text-red-500">
                      {errors.respectful?.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="star" className="block text-gray-900">
                  Patient
                </label>
                <div className="mt-2">
                  <Controller
                    name="patient"
                    control={control}
                    rules={{ required: "A rating is required" }}
                    // defaultValue={5}
                    //
                    render={({ field: { onChange, value } }) => (
                      <StarRatingForm
                        value={Number(value)}
                        onChange={onChange}
                        secondary={true}
                      />
                    )}
                  />
                  {errors.patient?.type === "required" && (
                    <p className="form-input-error text-red-500">
                      {errors.patient?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="review"
              className="text-base font-semibold leading-5 text-gray-900"
            >
              Review
            </label>
            <textarea
              maxLength={300}
              // name="review"
              {...register("review")}
              rows={6}
              cols={30}
              className="block w-full rounded-md border-0 p-2  text-gray-900 shadow-sm ring-1 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="mt-2 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm py-2 px-3 font-semibold bg-red-300 rounded-md text-white shadow-s hover:bg-red-400"
            onClick={handleReset}
          >
            Cancel
          </button>
          <input
            type="submit"
            className="rounded-md bg-emerald-500 hover:bg-emerald-600 py-2 px-6 text-sm font-semibold text-white shadow-s"
          />
        </div>
      </div>
    </form>
  )
}
