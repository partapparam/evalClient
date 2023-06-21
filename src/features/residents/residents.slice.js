import { createSlice } from "@reduxjs/toolkit"
import { fetchResidents, postResident } from "./residents.thunks"

const initialState = { cards: [], status: "idle", error: null }

const residentsSlice = createSlice({
  name: "residents",
  initialState,
  reducers: {
    resetResidents(state, action) {
      state.status = "idle"
      state.cards = []
      return
    },
  },
  extraReducers(builders) {
    builders
      .addCase(fetchResidents.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(fetchResidents.fulfilled, (state, action) => {
        state.status = "success"
        state.cards = state.cards.concat(action.payload)
      })
      .addCase(fetchResidents.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
      .addCase(postResident.fulfilled, (state, action) => {
        state.status = "success"
        console.log("success postResident Slice")
        console.log(action.payload)
        state.cards.push(action.payload)
      })
      .addCase(postResident.rejected, (state, action) => {
        state.status = "failed"
        console.log("failed postResident Slice")

        console.log("the request failed", action.error.message)
      })
  },
})

export const { resetResidents } = residentsSlice.actions

export default residentsSlice.reducer
