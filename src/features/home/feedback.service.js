import axiosClient from "../../common/axios/axios.instance"

export const sendFeedback = async (body) => {
  const response = axiosClient.post("feedback/", body)
  return response
}
