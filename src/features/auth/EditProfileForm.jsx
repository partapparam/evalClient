import React from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"

export const EditProfileForm = () => {
  const { register, handleSubmit, reset } = useForm()
  const onSubmit = (data) => [console.log(data)]

  return (
    <div>
      <p className="text-3xl font-extrabold">Edit Profile</p>
      <form
        className="mt-8 space-y-6 text-left"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="-space-y-px rounded-md shadow-sm">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              {...register("email", { required: "Please enter an email" })}
              name="email"
              type="email"
              required
              autoComplete="email"
              className="relative block w-full rounded-md border-2 my-2 py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3 border-gray-300 focus:border-blue-600 hover:border-blue-600"
              placeholder="Email address"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              {...register("password", {
                required: "please enter a password",
              })}
              required
              name="password"
              type="password"
              autoComplete="current-password"
              className="relative block w-full rounded-md border-2 my-2 py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3 border-gray-300 focus:border-blue-600 hover:border-blue-600"
              placeholder="Password"
            />
          </div>
        </div>

        <div className="flex flex-row">
          <Link
            to=".."
            className="text-sm py-2 px-3 font-semibold bg-red-300 rounded-md text-white shadow-s hover:bg-red-400"
          >
            Cancel
          </Link>
          <input
            type="submit"
            className="rounded-md py-2 px-3 text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-600"
          />
        </div>
      </form>
    </div>
  )
}
