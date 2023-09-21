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
        state.cards = [action.payload].concat(state.cards)
      })
      .addCase(postResident.rejected, (state, action) => {
        state.status = "failed"
      })
  },
})

export const { resetResidents } = residentsSlice.actions

export default residentsSlice.reducer
