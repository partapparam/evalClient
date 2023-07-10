import { createSlice } from "@reduxjs/toolkit"

const initialState = { formattedAddress: null, error: null }

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    addAddress(state, action) {
      console.log("Saving address")
      state.formattedAddress = action.payload
      return
    },
    removeAddress(state, action) {
      console.log("removing address")
      state.formattedAddress = null
      return
    },
  },
})

export const { addAddress, removeAddress } = addressSlice.actions

export default addressSlice.reducer
