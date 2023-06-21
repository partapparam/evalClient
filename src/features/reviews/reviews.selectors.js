import { createSelector } from "@reduxjs/toolkit"

export const selectAllReviews = (state) => state.reviews

export const selectAllReviewsSelector = createSelector(
  [selectAllReviews],
  (reviews) => reviews.cards
)

export const selectReviewByIdSelector = createSelector(
  [selectAllReviews, (state, reviewId) => reviewId],
  (reviews, reviewId) => {
    console.log("Review Id Selector called")
    const review = reviews.cards.find((r) => r.reviewId === reviewId)
    return review
  }
)
