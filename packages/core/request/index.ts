import Axios from "axios"
import { platform } from "../config/platform"

const axios = Axios.create({
  baseURL: platform.baseURL,
  withCredentials: true,
})

axios.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response) {
      throw error.response
    } else if (error.request) {
      throw error.request
    } else {
      throw error.message
    }
  }
)

export const get = async function (url: string, param?: any) {
  return await axios({
    url,
    method: "GET",
    params: { ...param },
  })
}

export const post = async function (url: string, data: any, param?: any) {
  return await axios({
    url,
    data,
    method: "POST",
    withCredentials: true,
    params: { ...param },
  })
}
