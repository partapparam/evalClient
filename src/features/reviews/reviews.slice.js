import { createSlice } from "@reduxjs/toolkit"
import {
  fetchReviewsByResident,
  fetchReviewsByUser,
  postReview,
} from "./reviews.thunks"

// TODO - Update Review Thunk
const initialState = { cards: [], loading: false, status: "idle", error: null }

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: initialState,
  reducers: {
    clearReviews(state, action) {
      console.log("clear review called in the slice")
      state.cards = []
      state.loading = false
      return
    },
  },
  extraReducers(builders) {
    builders
      .addCase(fetchReviewsByResident.pending, (state, action) => {
        state.loading = true
      })
      .addCase(fetchReviewsByResident.fulfilled, (state, action) => {
        state.loading = false
        state.cards = state.cards.concat(action.payload)
      })
      .addCase(fetchReviewsByResident.rejected, (state, action) => {
        console.log("Slice - request rejected")
        state.loading = false
      })
      .addCase(fetchReviewsByUser.pending, (state, action) => {
        state.loading = true
      })
      .addCase(fetchReviewsByUser.fulfilled, (state, action) => {
        state.loading = false
        state.cards = state.cards.concat(action.payload)
      })
      .addCase(postReview.fulfilled, (state, action) => {
        state.cards = [action.payload, ...state.cards]
        console.log("post Resident success")
      })
      .addCase(postReview.rejected, (state, action) => {
        console.log("post resident failed", action.error.message)
      })
  },
})

export const { clearReviews } = reviewsSlice.actions
export default reviewsSlice.reducer
