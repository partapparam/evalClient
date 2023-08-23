import React from "react"
import { useForm } from "react-hook-form"

export const UpdatePasswordForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data, e) => {}

  return (
    <div className="flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="sm:col-span-3">
          <label
            htmlFor="apt"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Password
          </label>
          <div className="mt-2">
            <input
              {...register("password", {
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters.",
                },
                required: "Password is required",
              })}
              type="password"
              name="password"
              id="password"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400 outline-2 outline outline-gray-300 focus:outline-blue-600 hover:outline-blue-600 sm:text-sm sm:leading-6 transition"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
        </div>
        <div className="sm:col-span-3">
          <label
            htmlFor="apt"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Confirm Password
          </label>
          <div className="mt-2">
            <input
              {...register("confirmPassword", {
                required: true,
                validate: (value) => {
                  if (watch("password") != value) {
                    return "Password do not match"
                  }
                },
              })}
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400 outline-2 outline outline-gray-300 focus:outline-blue-600 hover:outline-blue-600 sm:text-sm sm:leading-6 transition"
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>
        <div>
          <input type="submit" value="Change Password" />
        </div>
      </form>
    </div>
  )
}