import { createSlice } from "@reduxjs/toolkit"
import {
  confirmTokenThunk,
  forgotPasswordThunk,
  loginUser,
  signupUser,
  updatePasswordThunk,
  editProfileThunk,
} from "./auth.thunks"

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
        state.status = "idle"
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
      })
      .addCase(forgotPasswordThunk.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(forgotPasswordThunk.fulfilled, (state, action) => {
        state.status = "idle"
      })
      .addCase(forgotPasswordThunk.rejected, (state, action) => {
        state.status = "failed"
      })
      .addCase(confirmTokenThunk.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(confirmTokenThunk.fulfilled, (state, action) => {
        state.user = action.payload
        state.status = "idle"
      })
      .addCase(confirmTokenThunk.rejected, (state, action) => {
        state.status = "failed"
      })
      .addCase(updatePasswordThunk.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(updatePasswordThunk.fulfilled, (state, action) => {
        state.status = "idle"
      })
      .addCase(updatePasswordThunk.rejected, (state, action) => {
        state.status = "failed"
      })
      .addCase(editProfileThunk.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(editProfileThunk.fulfilled, (state, action) => {
        state.status = "success"
      })
      .addCase(editProfileThunk.rejected, (state, action) => {
        state.status = "failed"
      })
  },
})

export default authSlice.reducer
