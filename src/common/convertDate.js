export const formatDatePublic = (dateString) => {
  const options = { year: "numeric", month: "short" }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

export const formatDatePrivate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" }
  return new Date(dateString).toLocaleDateString(undefined, options)
}
