export const formatDatePublic = (dateString) => {
  const options = { year: "numeric", month: "long" }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

export const formatDatePrivate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" }
  return new Date(dateString).toLocaleDateString(undefined, options)
}
