import { createAsyncThunk } from "@reduxjs/toolkit"
import { residentService } from "./residents.service"

export const fetchResidents = createAsyncThunk(
  "residents/fetchResidents",
  async (address) => {
    try {
      const response = await residentService.getResidents(address)
      if (response.data.message === "error") {
        throw new Error(response.data.data)
      }
      return response.data.data
    } catch (error) {
      // console.log("error fetching residents", error)
      throw new Error(error.message)
    }
  }
)

export const postResident = createAsyncThunk(
  "residents/postResident",
  async (resident) => {
    try {
      const response = await residentService.postResident({ resident })
      if (response.data.message === "error") {
        throw new Error(response.data.data)
      }
      return response.data.data
    } catch (error) {
      // console.error("error while saving", error)
      throw new Error(error.message)
    }
  }
)
