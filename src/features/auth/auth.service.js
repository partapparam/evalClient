import axiosClient from "../../common/axios/axios.instance"

const login = async (body) => {
  // try {
  const response = axiosClient.post("auth/login", body)
  return response
  // } catch (error) {
  //   console.log("Auth Login error", error)
  //   throw new Error("Login service failed")
  // }
}

const signup = async (body) => {
  console.log(body)
  // try {
  const response = axiosClient.post("auth/signup", body)

  return response
  // } catch (error) {
  //   console.log("Auth Signup error", error)
  //   throw new Error("Signup service failed")
  // }
}

// Update User Profile and Profile Image
const profilePhoto = async (body) => {
  const response = await axiosClient.put("users/update/photo", body, {
    headers: { "Content-Type": "multipart/form-data" },
  })
  return response
}

const forgotPassword = async (body) => {
  try {
    const response = await axiosClient.post("auth/password/forgot", body)
    return response
  } catch (error) {
    console.log("Auth Signup error", error)
    throw new Error("Signup service failed")
  }
}

export { login, signup, profilePhoto, forgotPassword }
