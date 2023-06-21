import axiosClient from "../../common/axios/axios.instance"

const getReviewsByResidentId = async (residentId) => {
  const response = axiosClient.get("reviews/resident", {
    params: { residentId },
  })
  return response
}

const getReviewsByUserId = async (userId) => {
  const response = axiosClient.get("reviews/user", {
    params: { userId },
  })
  return response
}

const postReview = async (review) => {
  const response = axiosClient.post("reviews", review)
  return response
}

export { getReviewsByResidentId, getReviewsByUserId, postReview }
