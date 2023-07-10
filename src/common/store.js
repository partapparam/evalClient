import { configureStore } from "@reduxjs/toolkit"
import reviewsReducer from "../features/reviews/reviews.slice"
import authReducer from "../features/auth/auth.slice"
import residentsReducer from "../features/residents/residents.slice"
import addressReducer from "../features/addresses/address.slice"

export const store = configureStore({
  reducer: {
    reviews: reviewsReducer,
    auth: authReducer,
    residents: residentsReducer,
    address: addressReducer,
  },
})
