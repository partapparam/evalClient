import React from "react"
import { useForm } from "react-hook-form"
import { postResident } from "./residents.thunks"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useNotification } from "../../hooks/useNotification"

export const ResidentForm = ({ closeModal, address }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { successNotification, errorNotification } = useNotification()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      type: "home",
      apt: "",
    },
  })
  // TODO handle on submit with resident slice
  const onSubmit = async (data) => {
    data.address = address
    try {
      const resident = await dispatch(postResident(data)).unwrap()
      successNotification(
        `${resident.firstName} ${resident.lastName} is now a resident`
      )
      navigate(`residents/${resident.residentId}`)
    } catch (error) {
      console.log("Failed to save resident", error)
      errorNotification("Could not create new resident, try again.")
    } finally {
      closeModal()
      handleReset()
    }
  }
  const handleReset = () => {
    reset()
    closeModal()
  }
  return (
    // <form className="m-1 p-5 md:p-8 lg:p-15" onSubmit={handleSubmit(onSubmit)}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-8">
        <div className="border-b border-gray-900/10 pb-12">
          <h1 className="font-extrabold text-2xl sm:text-4xl leading-7 text-gray-900">
            New Resident
          </h1>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be used public, so please be careful what you
            enter.
          </p>

          <div className="mt-3 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="visitType"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                First Name
              </label>
              <div className="mt-1">
                <input
                  {...register("firstName", {
                    required: "Please enter a first name.",
                  })}
                  type="text"
                  name="firstName"
                  id="firstName"
                  autoComplete="firstName"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.firstName?.type === "required" && (
                  <p className="form-input-error" role="alert">
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
              <div className="mt-1">
                <input
                  {...register("lastName", {
                    required: "Please enter a last name.",
                  })}
                  type="text"
                  name="lastName"
                  id="lastName"
                  autoComplete="lastName"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.lastName?.type === "required" && (
                  <p className="form-input-error" role="alert">
                    {errors.lastName?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-6">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Residence Type
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Is this a Home or is the Resident a tenant of a Multi-Family
            Property?
          </p>

          <div className="my-3 space-y-3">
            <div className="mt-3 space-y-3">
              <div className="relative">
                <select
                  {...register("type")}
                  className="block appearance-none w-full border border-gray-400 text-gray-800 py-3 px-4 pr-8 mr-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value="home">Home</option>
                  <option value="apartment">Apartment</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="apt"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Apartment Number
                </label>
                <div className="mt-2">
                  <input
                    {...register("apt")}
                    type="text"
                    name="apt"
                    id="apt"
                    placeholder="#"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* TODO - Make the apt input hidden unless restype = multi */}

      <div className="mt-3 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm  font-semibold leading-6 text-red-600"
          onClick={handleReset}
        >
          {/* TODO handle cancel button 
          clear the form and go back to resident page*/}
          Cancel
        </button>
        <input
          type="submit"
          className="rounded-md bg-emerald-500 py-2 px-5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600 "
        />
      </div>
    </form>
  )
}
