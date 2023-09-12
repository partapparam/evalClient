import React from "react"
import { useForm } from "react-hook-form"

export const FeedbackForm = ({ closeModal }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const formSubmit = (data) => {
    console.log(data)
    reset()
  }

  const formCancel = () => {
    reset()
    closeModal()
  }

  return (
    <div>
      <form onSubmit={handleSubmit(formSubmit)} className="flex flex-col">
        <div className="">
          <label
            htmlFor="apt"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email
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
            className="text-base font-semibold leading-5 text-gray-900"
          >
            Review
          </label>
          <textarea
            maxLength={500}
            required
            {...register("feedback")}
            rows={6}
            cols={30}
            className="block w-full rounded-md border-0 p-2  text-gray-900 shadow-sm ring-1 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-4">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-red-200 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
            onClick={formCancel}
          >
            Cancel
          </button>
          <input
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-200 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          />
        </div>
      </form>
    </div>
  )
}
