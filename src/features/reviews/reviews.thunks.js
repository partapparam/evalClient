import { createAsyncThunk } from "@reduxjs/toolkit"
import * as reviewsService from "./reviews.service"

export const fetchReviewsByResident = createAsyncThunk(
  "reviews/fetchReviewsByResident",
  async (residentId) => {
    try {
      const response = await reviewsService.getReviewsByResidentId(residentId)
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

export const fetchReviewsByUser = createAsyncThunk(
  "reviews/fetchReviewsByUser",
  async (userId) => {
    try {
      const response = await reviewsService.getReviewsByUserId(userId)
      if (response.data.message === "error") {
        throw new Error(response.data.data)
      }
      return response.data.data
    } catch (error) {
      console.log("error fetching residents by user id", error)
      throw new Error(error.message)
    }
  }
)

export const postReview = createAsyncThunk(
  "reviews/postReview",
  async (review) => {
    try {
      const response = await reviewsService.postReview(review)
      if (response.data.message === "error") {
        throw new Error(response.data.data)
      }
      return response.data.data
    } catch (error) {
      console.log("error with postReview", error)
      throw new Error(error.message)
    }
  }
)
