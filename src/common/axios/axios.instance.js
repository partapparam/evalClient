import axios from "axios"

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL_DEV,
})
axiosClient.interceptors.request.use(
  (config) => {
    // JSON.stringify to store token and JSON.parse to deserialize it from string into JSON
    const token = JSON.parse(localStorage.getItem("token"))
    if (token) {
      config.headers["Authorization"] = "Bearer " + token
    }
    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Response interceptor for API calls
axiosClient.interceptors.response.use(
  (response) => {
    console.log(response.status)
    if (response.status === 403) {
      console.log("status is matched")
    }
    return response
  },
  async function (error) {
    // console.log(error)
    if (error.response.status === 401) {
      // localStorage.removeItem("token")
      // go to Login page
      // window.location.href = "/login"
      throw Error("Token is expired")
    }
    return Promise.reject(error)
  }
)

export default axiosClient
