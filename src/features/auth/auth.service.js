import axiosClient from "../../common/axios/axios.instance"

const login = async (body) => {
  const response = axiosClient.post("auth/login", body)
  return response
}

const signup = async (body) => {
  console.log(body)

  const response = axiosClient.post("auth/signup", body)

  return response
}

// Update User Profile and Profile Image
const profilePhoto = async (body) => {
  const response = await axiosClient.put("users/update/photo", body, {
    headers: { "Content-Type": "multipart/form-data" },
  })
  return response
}

const forgotPassword = async (body) => {
  const response = await axiosClient.post("auth/forgotPassword", body)
  return response
}

const confirmToken = async (token) => {
  const response = await axiosClient.get("auth/confirm/token", {
    params: { token },
  })
  return response
}

const updatePassword = async (body) => {
  const response = axiosClient.put("auth/update/passwordByEmail", body)
  return response
}

export {
  login,
  signup,
  profilePhoto,
  forgotPassword,
  confirmToken,
  updatePassword,
}
