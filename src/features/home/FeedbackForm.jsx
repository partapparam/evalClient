import React from "react"
import { useForm } from "react-hook-form"

import { useNotification } from "../../hooks/useNotification"
import { sendFeedback } from "./feedback.service"

export const FeedbackForm = ({ closeModal }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const notification = useNotification()

  const formSubmit = async (data) => {
    console.log(data)
    try {
      const result = await sendFeedback(data)
      notification.open(
        "Thank you for providing feedback on how we can improve.",
        "success"
      )
      closeModal()
    } catch (error) {
      notification.open("Please try again, there was an issue.", "error")
    } finally {
      reset()
    }
  }

  const formCancel = () => {
    reset()
    closeModal()
  }

  return (
    <div>
      <form onSubmit={handleSubmit(formSubmit)} className="flex flex-col">
        <div className="my-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-900"
          >
            Your Email
          </label>
          <div className="mt-2">
            <input
              {...register("email", {
                required: "Please enter your email",
              })}
              type="email"
              name="email"
              id="email"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400 outline-2 outline outline-gray-300 focus:outline-blue-600 hover:outline-blue-600 sm:text-sm sm:leading-6 transition"
            />
            {errors.email?.type === "required" && (
              <p className="form-input-error text-red-500" role="alert">
                {errors.email?.message}
              </p>
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor="feedback"
            className="block text-sm font-medium text-gray-900"
          >
            How can we improve?
          </label>
          <textarea
            maxLength={500}
            required
            {...register("feedback")}
            rows={6}
            cols={30}
            className="block w-full rounded-md border-2 p-2  text-gray-900 shadow-sm border-gray-300 placeholder:text-gray-400 "
          />
        </div>
        <div className="mt-4 text-right">
          <button
            type="button"
            className="inline-flex mx-2 justify-center rounded-md border border-transparent bg-red-300 px-4 py-2 text-sm font-medium text-white hover:bg-red-400 "
            onClick={formCancel}
          >
            Cancel
          </button>
          <input
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-green-400 px-4 py-2 text-sm font-medium text-white hover:bg-green-500 "
          />
        </div>
      </form>
    </div>
  )
}
