import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useRef, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { confirmTokenThunk, updatePasswordThunk } from "./auth.thunks"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useNotification } from "../../hooks/useNotification"

export const UpdatePasswordForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()
  const password = useRef({})
  const dispatch = useDispatch()
  const forgotPasswordStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const notification = useNotification()
  const [token, setToken] = useState(() => searchParams.get("token"))
  const [email, setEmail] = useState(() => searchParams.get("e"))

  useEffect(() => {
    const confirmToken = async () => {
      try {
        // await setToken(searchParams.get("token"))
        // await setEmail(searchParams.get("e"))
        if (!email || !token) {
          throw Error("The password reset failed, please request a new token. ")
        }
        await dispatch(confirmTokenThunk(token)).unwrap()
      } catch (error) {
        notification.open(error.message, "error")
        navigate("..")
      }
    }
    confirmToken()
  }, [])

  password.current = watch("password", "")

  const onSubmit = async (data, e) => {
    e.preventDefault()
    try {
      if (data.password !== data.confirmPassword) {
        notification.open("The passwords do not match", "error")
        reset()
        return
      }
      delete data.confirmPassword
      data.token = token
      data.email = email
      const result = await dispatch(updatePasswordThunk(data)).unwrap
      notification.open(
        "Your password has been updated, please sign in.",
        "success"
      )
      navigate("/login")
    } catch (error) {
      notification.open(error.message, "error")
      navigate("..")
    } finally {
      reset()
    }
  }

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
            Update Your Password
          </h2>
        </div>
        <form
          className="mt-8 space-y-6 text-left"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="-space-y-px rounded-md shadow-sm">
            <div className="mt-2">
              <label
                htmlFor="apt"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                New Password
              </label>
              <div>
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
                {errors.password?.type === "required" && (
                  <p className="text-red-500">{errors.password?.message}</p>
                )}
              </div>
            </div>
            <div className="mt-2">
              <label
                htmlFor="apt"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm New Password
              </label>
              <div>
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
                {errors.confirmPassword?.type === "required" && (
                  <p className="text-red-500">
                    {errors.confirmPassword?.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div>
            <input
              type="submit"
              className="group relative flex w-full justify-center rounded-md py-2 px-3 text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-600"
            />
          </div>
        </form>
      </div>
    </div>
  )
}
