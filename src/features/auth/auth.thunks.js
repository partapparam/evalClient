import { createAsyncThunk } from "@reduxjs/toolkit"
import {
  login,
  signup,
  profilePhoto,
  forgotPassword,
  confirmToken,
  updatePassword,
} from "./auth.service"

export const loginUser = createAsyncThunk("auth/loginUser", async (user) => {
  try {
    const response = await login(user)
    if (response.data.message === "error") {
      throw new Error(response.data.data)
    }
    return response.data
  } catch (error) {
    console.log("error login", error)
    throw new Error(error.message)
  }
})

export const signupUser = createAsyncThunk("auth/signupUser", async (data) => {
  try {
    const response = await signup(data)
    if (response.data.message === "error") {
      if (response.data.message === "error") throw Error(response.data.data)
    }
    return response.data
  } catch (error) {
    console.log("error signup thunk", error)
    throw new Error(error.message)
  }
})

export const updateImage = createAsyncThunk("auth/update", async (data) => {
  try {
    const response = await profilePhoto(data)
    if (response.data.message === "error") throw Error(response.data.data)

    return response.data.data
  } catch (error) {
    console.log("update profile Error", error)
    throw new Error(error.message)
  }
})

export const forgotPasswordThunk = createAsyncThunk(
  "auth/forgotPassword",
  async (data) => {
    try {
      const response = await forgotPassword(data)
      if (response.data.message === "error") throw Error(response.data.data)
      return response.data.data
    } catch (error) {
      console.log("Forgot Password Thunk error", error.message)
      throw Error(error.message)
    }
  }
)

export const confirmTokenThunk = createAsyncThunk(
  "auth/confirmToken",
  async (data) => {
    try {
      const response = await confirmToken(data)
      if (response.data.message === "error") throw Error(response.data.data)
      return response.data.data
    } catch (error) {
      console.log("Confirm Token Thunk Error", error)
      throw Error(error.message)
    }
  }
)

export const updatePasswordThunk = createAsyncThunk(
  "auth/updatePassword",
  async (data) => {
    try {
      const response = await updatePassword(data)
      if (response.data.message === "error") throw Error(response.data.data)
      return response.data.data
    } catch (error) {
      console.log("Update Password Thunk error", error)
      throw Error(error.message)
    }
  }
)
