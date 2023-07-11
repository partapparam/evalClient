import React from "react"
import { useForm } from "react-hook-form"

export const Footer = () => {
  const { register, reset } = useForm()

  return (
    <div className="h-36 w-full text-black bg-slate-50">
      <h1>Footer</h1>
      <h2>Welcome to Eval</h2>
      <h3>Have feedback, leave it here</h3>
    </div>
  )
}
