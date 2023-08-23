import React from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { loginUser } from "./auth.thunks"
import { UserContext } from "../../providers/UserContext"
import { Link } from "react-router-dom"
import { useNotification } from "../../hooks/useNotification"

export const LoginForm = () => {
  const { login } = useContext(UserContext)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { state } = useLocation()
  const notification = useNotification()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const onSubmit = async (data, e) => {
    e.preventDefault()
    try {
      const user = await dispatch(loginUser(data)).unwrap()
      await login(user)
      navigate(state?.path || "/profile", { replace: true })
    } catch (error) {
      notification.open(`Failed to login: ${error.message}`, "error")
    } finally {
      reset()
    }
  }

  return (
    <>
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
              Log in
            </h2>
          </div>
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
              <div className="font-light text-gray-400 text-right hover:text-gray-900 transition text-sm py-2">
                <Link to="/forgotPassword">Forgot password?</Link>
              </div>
            </div>

            <div>
              <input
                type="submit"
                className="group relative flex w-full justify-center rounded-md py-2 px-3 text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-600"
              />
            </div>
          </form>
          <div className="font-light text-purple-500 text-center hover:text-purple-700 transition">
            <Link to="/signup">
              <span className="text-gray-900">Need an account? </span>Sign up
              here.
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
