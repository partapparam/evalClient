import { createSelector } from "@reduxjs/toolkit"

export const selectAddress = (state) => {
  return state.address
}

export const selectAddressSelector = createSelector(
  [selectAddress],
  (address) => address.formattedAddress
)
