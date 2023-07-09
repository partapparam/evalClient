import React from "react"
import { useForm } from "react-hook-form"
import logo from "../../common/Eval_blue.svg"
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
  // TODO errors and validation
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

      if (state?.address) {
        navigate("/")
        // successNotification("Login successful")
      } else {
        navigate("/profile")
      }
    } catch (error) {
      notification.open(`Failed to login: ${error.message}`, "Error")
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
                  className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
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
                  className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <input
                type="submit"
                className="group relative flex w-full justify-center rounded-md py-2 px-3 text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              />
            </div>
          </form>
          <div className="font-light text-gray-400 text-center hover:text-gray-900 transition underline">
            <Link to="/signup">New to Eval? Create an account </Link>
          </div>
        </div>
      </div>
    </>
  )
}
