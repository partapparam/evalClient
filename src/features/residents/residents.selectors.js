import { createSelector } from "@reduxjs/toolkit"

export const selectAllResidents = (state) => {
  return state.residents
}

export const selectAllResidentsSelector = createSelector(
  [selectAllResidents],
  (residents) => residents.cards
)

export const selectResidentByIdSelector = createSelector(
  [selectAllResidents, (state, residentId) => residentId],
  (residents, residentId) => {
    const resident = residents.cards.find((r) => r.residentId === +residentId)
    return resident
  }
)
