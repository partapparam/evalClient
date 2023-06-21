import axiosClient from "../../common/axios/axios.instance"

const getResidents = async (address) => {
  const response = await axiosClient.get("residents", {
    params: { address },
  })

  return response
}

const postResident = async ({ resident }) => {
  const response = axiosClient.post("residents", { resident })
  return response
}
export const residentService = { getResidents, postResident }
