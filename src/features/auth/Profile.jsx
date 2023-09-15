import React, { useState, useEffect } from "react"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { updateImage } from "./auth.thunks"
import { formatDatePublic } from "../../common/convertDate"
import { useNotification } from "../../hooks/useNotification"
import { LoadingSpinner } from "../../common/components/LoadingSpinner"
import { Outlet } from "react-router-dom"
import { Link } from "react-router-dom"

export const Profile = () => {
  const { getItem, setItem } = useLocalStorage()
  const dispatch = useDispatch()
  const { register, handleSubmit, reset } = useForm()
  let user
  const [imagePreview, setImagePreview] = useState("")
  const [imageFile, setImageFile] = useState(null)
  const notification = useNotification()
  const [loadingView, setLoadingView] = useState(false)

  const onSubmit = async (data, event) => {
    event.preventDefault()
    // By default, Axios has excellent request body handling. Pass in a FormData instance and it will use multipart/form-data as Content-Type
    try {
      setLoadingView(true)
      const imageForm = new FormData()
      imageForm.append("profilePhoto", imageFile)
      //   imageForm.append("oldPhoto", user.profilePhoto)
      const returnedUser = await dispatch(updateImage(imageForm)).unwrap()
      notification.open("Profile photo changed", "success")
      setItem("user", returnedUser)
    } catch (error) {
      console.log("Failed to save image", error)
      notification.open(error.message, "error")
    } finally {
      reset()
      setLoadingView(false)
      setImageFile(null)
      setImagePreview("")
    }
  }
  /**
   * The URL.createObjectURL() method takes an object (like our file) and creates a temporary localURL that is tied to the document/page it is created in.
   */
  const handleChange = (event) => {
    setImageFile(event.target.files[0])
    setImagePreview(URL.createObjectURL(event.target.files[0]))
  }

  useEffect(() => {
    user = localStorage.getItem("user")
    console.log("runnning user")
  }, [user])

  return (
    <div className="flex flex-col md:flex-row mx-5">
      {loadingView && <LoadingSpinner />}
      <div className="my-5 flex flex-col md:basis-1/3">
        <div className="bg-slate-100 shadow-md place-self-center p-8 my-5">
          <div className="mt-2 p-5">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt=""
                className="w-40 h-40 rounded-full shadow"
              />
            ) : (
              <img
                src={user.profilePhoto}
                alt=""
                className="w-40 h-40 rounded-full shadow"
              />
            )}
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-row gap-4 text-center">
              <label
                htmlFor="profilePhoto"
                className="basis-1/2 p-1 cursor-pointer text-black border-2 border-indigo-900 hover:bg-gray-200 bg-white transition-all rounded-sm"
              >
                <input
                  type="file"
                  {...register("profilePhoto")}
                  id="profilePhoto"
                  accept=".png, .jpg, .jpeg"
                  className="hidden"
                  onChange={handleChange}
                />
                <span>Change</span>
              </label>
              <input
                type="submit"
                className="rounded-sm bg-emerald-400 text-white 
              hover:bg-emerald-500 basis-1/2 p-1 disabled:bg-emerald-300 cursor-pointer disabled:cursor-not-allowed	"
                disabled={imagePreview === "" ? true : false}
              />
            </div>
          </form>
        </div>
        <div className="place-self-center">
          <p className="text-3xl font-extrabold">
            {user.firstName} {user.lastName}
          </p>
          <p>{user.jobTitle}</p>
          <p className="text-gray-600 font-light">
            Member since: {formatDatePublic(user.createdAt)}
          </p>
          <p className="text-center my-2">
            <Link
              to="edit"
              className="py-1 px-2 rounded-md border-2 border-gray-800 hover:bg-gray-200 "
            >
              Edit
            </Link>
          </p>
        </div>
      </div>
      <div className=" md:basis-2/3 p-5">
        <Outlet />
      </div>
    </div>
  )
}
