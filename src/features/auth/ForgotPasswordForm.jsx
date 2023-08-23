import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useNotification } from "../../hooks/useNotification"
import { forgotPasswordThunk } from "./auth.thunks"
import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"

export const ForgotPasswordForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const notification = useNotification()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  })

  const formSubmit = async (data, event) => {
    event.preventDefault()
    try {
      const response = await dispatch(forgotPasswordThunk(data)).unwrap()
      console.log(response)
      notification.open("Reset email sent.", "success")
      navigate("form/success")
    } catch (error) {
      console.log("this error is called", error)
      notification.open(
        `Failed to reset your password: ${error.message}`,
        "error"
      )
    } finally {
      handleCancel()
    }
  }

  const handleCancel = () => {
    reset()
  }

  return (
    <>
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
              Forgot Password
            </h2>
            <p className="text-center">Enter your email</p>
          </div>
          <form
            className="mt-8 space-y-6 text-left"
            onSubmit={handleSubmit(formSubmit)}
          >
            <div className="-space-y-px rounded-md shadow-sm">
              <label htmlFor="email" className="sr-only">
                Enter your email
              </label>
              <input
                {...register("email", {
                  required: "Please enter your email.",
                })}
                id="email"
                required
                name="email"
                type="email"
                className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3 outline-2 outline outline-gray-300 focus:outline-blue-600 hover:outline-blue-600"
                placeholder="Email"
              />
              {errors.email?.type === "required" && (
                <p className="form-input-error text-red-500" role="alert">
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div className="flex justify-end">
              <button type="button" className="btn-secondary m-2">
                Cancel
              </button>
              <input
                type="submit"
                value="Submit"
                className="btn-primary my-2"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
