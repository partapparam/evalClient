import { createSlice } from "@reduxjs/toolkit"
import { loginUser, signupUser } from "./auth.thunks"

const initialState = { user: null, state: "idle", error: null }

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builders) {
    builders
      .addCase(loginUser.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "active"
        state.user = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        console.log(action.payload)
        state.user = action.payload
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = "failed"
        console.log("the request failed", action.error.message)
      })
  },
})

export default authSlice.reducer
