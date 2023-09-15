import React from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import { INDUSTRIES } from "../../common/constants"

export const EditProfileForm = () => {
  const { getItem, setItem } = useLocalStorage()
  let user = getItem("user")
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      industry: user.industry,
      jobTitle: user.jobTitle,
    },
  })
  console.log(user)

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
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              {...register("firstName")}
              type="text"
              required
              className="relative block w-full rounded-md border-2 my-2 py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3 border-gray-300 focus:border-blue-600 hover:border-blue-600"
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              {...register("lastName")}
              type="text"
              required
              className="relative block w-full rounded-md border-2 my-2 py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3 border-gray-300 focus:border-blue-600 hover:border-blue-600"
            />
          </div>
          <div>
            <label htmlFor="jobTitle">Job Title</label>
            <input
              id="jobTitle"
              {...register("jobTitle")}
              type="text"
              required
              className="relative block w-full rounded-md border-2 my-2 py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3 border-gray-300 focus:border-blue-600 hover:border-blue-600"
            />
          </div>
          <div>
            <label htmlFor="industry">Industry</label>
            <div className="mt-2">
              <select
                {...register("industry")}
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400 outline-2 outline outline-gray-300 focus:outline-blue-600 hover:outline-blue-600 sm:text-sm sm:leading-6 transition"
                placeholder="Select"
              >
                {INDUSTRIES.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-row text-right">
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
