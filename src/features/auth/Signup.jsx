import React, { useContext, useRef } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../providers/UserContext"
import { useNotification } from "../../hooks/useNotification"
import { Link } from "react-router-dom"
import { signupUser } from "./auth.thunks"
import { INDUSTRIES } from "../../common/constants"

export const SignupForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const notification = useNotification()
  const [addRequestStatus, setAddRequestStatus] = useState("idle")
  const [confirmTerms, setConfirmTerms] = useState(false)
  const { login } = useContext(UserContext)
  const password = useRef({})
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      jobTitle: "",
      industry: "",
      confirmPassword: "",
    },
  })
  password.current = watch("password", "")

  const onSubmit = async (data, e) => {
    e.preventDefault()
    try {
      setAddRequestStatus("pending")
      const user = await dispatch(signupUser(data)).unwrap()
      await login(user)
      notification.open(
        "Welcome to Eval! Please add a profile photo",
        "success"
      )
      navigate("/profile")
    } catch (error) {
      notification.open(`Error: ${error.message}`, "error")
    } finally {
      reset()
      setAddRequestStatus("idle")
    }
  }

  return (
    <>
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <p className="mt-3 text-center text-3xl font-extrabold text-gray-900">
              Sign up for Eval
            </p>
          </div>
          <form className="mt-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-10 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    {...register("firstName", {
                      required: "Please enter a first name.",
                    })}
                    type="text"
                    name="firstName"
                    id="firstName"
                    autoComplete="firstName"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400 outline-2 outline outline-gray-300 focus:outline-blue-600 hover:outline-blue-600 sm:text-sm sm:leading-6 transition"
                  />
                  {errors.firstName?.type === "required" && (
                    <p className="form-input-error text-red-500" role="alert">
                      {errors.firstName?.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    {...register("lastName", {
                      required: "Please enter a last name.",
                    })}
                    type="text"
                    name="lastName"
                    id="lastName"
                    autoComplete="lastName"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400 outline-2 outline outline-gray-300 focus:outline-blue-600 hover:outline-blue-600 sm:text-sm sm:leading-6 transition"
                  />
                  {errors.lastName?.type === "required" && (
                    <p className="text-red-500" role="alert">
                      {errors.lastName?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="jobTitle"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Job Title
              </label>
              <div className="mt-2">
                <input
                  {...register("jobTitle", {
                    required: "Please enter your job title",
                  })}
                  type="text"
                  name="jobTitle"
                  id="jobTitle"
                  placeholder="Salesperson, Technician, Installer etc."
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400 outline-2 outline outline-gray-300 focus:outline-blue-600 hover:outline-blue-600 sm:text-sm sm:leading-6 transition"
                />
                <p className="text-xs text-gray-400 py-1">
                  * Kept confidential
                </p>
                {errors.jobTitle?.type === "required" && (
                  <p className="text-red-500" role="alert">
                    {errors.jobTitle?.message}
                  </p>
                )}
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="industry"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Industry
              </label>
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
                {errors.industry?.type === "required" && (
                  <p className="text-red-500" role="alert">
                    {errors.industry?.message}
                  </p>
                )}
              </div>
            </div>
            <div className="sm:col-span-3">
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
                      message: "Password must be atleast 6 characters.",
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
                      if (watch("password") !== value) {
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
                  <p className="text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <input
                type="checkbox"
                onClick={() => setConfirmTerms(!confirmTerms)}
                className="mr-2"
              />
              <label>I accept the Eval Privacy Policy and Terms of Use.</label>
            </div>

            <div>
              <input
                disabled={!confirmTerms}
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-emerald-500 hover:bg-emerald-600 py-2 px-3 text-sm font-semibold text-white disabled:opacity-80 disabled:cursor-not-allowed"
              />
            </div>
            <div className="font-light text-gray-400 text-center hover:text-gray-900 transition">
              <Link to="/login">Already a member? Login</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
