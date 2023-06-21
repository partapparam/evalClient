import { configureStore } from "@reduxjs/toolkit"
import reviewsReducer from "../features/reviews/reviews.slice"
import authReducer from "../features/auth/auth.slice"
import residentsReducer from "../features/residents/residents.slice"

export const store = configureStore({
  reducer: {
    reviews: reviewsReducer,
    auth: authReducer,
    residents: residentsReducer,
  },
})

/**
 * This tels Redux that we want our top-level state object to have a field named Reviews inside, and all the data for state.reviews will be updated by the reviewsReducer function when actions are dispatched
 */
