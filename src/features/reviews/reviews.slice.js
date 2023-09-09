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
      console.log("clear reviews called")
      state.cards = []
      state.loading = false
      state.status = "idle"
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
        state.status = "loaded"
        state.cards = action.payload
      })
      .addCase(fetchReviewsByResident.rejected, (state, action) => {
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
      })
      .addCase(postReview.rejected, (state, action) => {})
  },
})

export const { clearReviews } = reviewsSlice.actions
export default reviewsSlice.reducer
