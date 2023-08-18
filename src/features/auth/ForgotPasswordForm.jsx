import React from "react"
import { useState } from "react"

export const ForgotPasswordForm = () => {
  const [email, setEmail] = useState()

  const handleSubmit = (event) => {
    event.preventDefault()
    setEmail(event.target.value)
    console.log(email)
    console.log(event.target)
  }

  return (
    <>
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
              Forgot Password
            </h2>
          </div>
          <form className="mt-8 space-y-6 text-left" onSubmit={handleSubmit}>
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email" className="sr-only">
                  Enter your email
                </label>
                <input
                  id="email"
                  required
                  name="email"
                  type="email"
                  className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3 outline-2 outline outline-gray-300 focus:outline-blue-600 hover:outline-blue-600"
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button type="button" className="btn-secondary m-2">
                Cancel
              </button>
              <button type="submit" className="btn-primary my-2">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
